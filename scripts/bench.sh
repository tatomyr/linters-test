#!/usr/bin/env bash
# Usage: scripts/bench.sh <tool> <lint command...>; runs `<lint command...> <file>` for every file in openapi/.
tool=$1
shift
# `time` prints the wall-clock seconds, one number per line of the .times file.
TIMEFORMAT=%R
for file in openapi/*.yaml; do
  description=$(basename $file .yaml)
  mkdir -p results/$description
  sleep $PAUSE_SECONDS
  for run in $(seq $RUNS); do
    output=results/$description/$tool.$run.txt
    times=results/$description/$tool.times
    { time timeout -s KILL $TIMEOUT_SECONDS "$@" $file > $output 2>&1; echo "exit $?" >> $output; } 2>> $times
    echo "$description, run $run: $(tail -1 $times) s"
    if grep -qx "exit 124" $output; then break; fi
  done
done
