// Renders results/ into README.md between the BENCHMARK markers:
// a row per tool, a column per description, the median wall-clock time in each cell.
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const readmePath = path.join(root, 'README.md');
const resultsDir = path.join(root, 'results');

const START = '<!-- BENCHMARK:START -->';
const END = '<!-- BENCHMARK:END -->';

const { RUNS, PAUSE_SECONDS, TIMEOUT_SECONDS } = process.env;
const TIMEOUT_EXIT_CODE = 124;
const TIMEOUT_MINUTES = TIMEOUT_SECONDS / 60;

const descriptionNames = {
  azure: 'Azure Compute',
  stripe: 'Stripe',
  digitalocean: 'DigitalOcean',
  'aws-ec2': 'AWS EC2',
  github: 'GitHub',
  cloudflare: 'Cloudflare',
};

const readResult = (...parts) => readFileSync(path.join(resultsDir, ...parts), 'utf8');
const readRows = (file) => readResult(file).trim().split('\n').map((line) => line.split(' '));

const toolVersions = Object.fromEntries(readRows('versions.txt'));
const tools = Object.keys(toolVersions);
const descriptions = readRows('descriptions.txt')
  .map(([id, operations, bytes]) => ({ id, name: descriptionNames[id], operations: Number(operations), size: `${(bytes / 1e6).toFixed(1)} MB` }))
  .sort((left, right) => left.operations - right.operations);

function summarizeRuns(description, tool) {
  const times = readResult(description.id, `${tool}.times`).trim().split('\n').map(Number).sort((left, right) => left - right);
  const exitCode = Number(readResult(description.id, `${tool}.1.txt`).match(/^exit (\d+)$/m)[1]);
  const diedFromSignal = exitCode > 128;
  return {
    median: times[Math.floor(times.length / 2)],
    isFinished: exitCode !== TIMEOUT_EXIT_CODE && !diedFromSignal,
    outputLink: `results/${description.id}/${tool}.1.txt`,
  };
}

function markColumnCells(description) {
  const summaries = tools.map((tool) => summarizeRuns(description, tool));
  const finishedMedians = summaries.filter(({ isFinished }) => isFinished).map(({ median }) => median);
  const fastest = Math.min(...finishedMedians);
  const slowest = Math.max(...finishedMedians);
  return summaries.map(({ median, isFinished, outputLink }) => ({
    marker: !isFinished ? '☠️' : median === fastest ? '🐎' : median === slowest ? '🐌' : '',
    median,
    outputLink,
  }));
}

const formatCell = ({ marker, median, outputLink }) => `${marker}<br>[${median.toFixed(2)}](${outputLink})`;

const columns = descriptions.map(markColumnCells);
const toolRows = tools.map((tool, index) => {
  const cells = columns.map((column) => column[index]);
  const countMarkers = (marker) => cells.filter((cell) => cell.marker === marker).length;
  return { tool, cells, deaths: countMarkers('☠️'), wins: countMarkers('🐎'), losses: countMarkers('🐌') };
});
// Fewer ☠️ first, then fewer 🐌, then more 🐎.
toolRows.sort((left, right) => left.deaths - right.deaths || left.losses - right.losses || right.wins - left.wins);

const header = ['Median lint time, s', ...descriptions.map((description) => `${description.name}<br><small>${description.operations} ops<br>${description.size}</small>`)];
const alignment = ['---', ...descriptions.map(() => ':---:')];
const rows = toolRows.map(({ tool, cells }) => [`**${tool}**<br><small>v${toolVersions[tool]}</small>`, ...cells.map(formatCell)]);
const table = [header, alignment, ...rows].map((cells) => `| ${cells.join(' | ')} |`).join('\n');

const [runUrl, runDate] = readResult('run.txt').trim().split('\n');
const rendered = [
  START,
  `Generated ${runDate} by [this workflow run](${runUrl}) on ${readResult('machine.txt').trim()}.`,
  `Each command ran ${RUNS} times, one after another, after a ${PAUSE_SECONDS} s pause; ` +
    'the time is wall-clock from process start to exit, as `time` reports it, and the table shows the median. ' +
    `A command that did not finish within ${TIMEOUT_MINUTES} minutes was killed and not repeated. ☠️ marks a command that was killed or crashed. ` +
    '🐎 marks the fastest tool for each API description, and 🐌 the slowest.',
  '',
  table,
  END,
].join('\n');

const readme = readFileSync(readmePath, 'utf8');
const start = readme.indexOf(START);
const end = readme.indexOf(END) + END.length;
writeFileSync(readmePath, readme.slice(0, start) + rendered + readme.slice(end));
