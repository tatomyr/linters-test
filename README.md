# OpenAPI Linter Race

[![Last race](https://img.shields.io/github/last-commit/tatomyr/oasbench/main?path=results&label=last%20race)](https://github.com/tatomyr/oasbench/actions/workflows/benchmark.yml)

Speed benchmark of OpenAPI linters on public API descriptions.
Every linter runs at its latest release (Redocly CLI also at its latest snapshot) with its default ruleset; Spectral has none, so it gets [`.spectral.yaml`](.spectral.yaml), which extends `spectral:oas`.

## Results

<!-- BENCHMARK:START -->
Generated 2026-10-29 09:25 UTC by [this workflow run](https://github.com/tatomyr/oasbench/actions/runs/40849433091) on AMD EPYC 7763 64-Core Processor, 4 cores, 15 GB RAM, Linux 7.0.0-1017-azure, Node v24.22.1.
Each command ran 5 times, one after another, after a 5 s pause; the time is wall-clock from process start to exit, as `time` reports it, and the table shows the median. A command that did not finish within 5 minutes was killed and not repeated. ☠️ marks a command that was killed or crashed. 🐎 marks the fastest tool for each API description, and 🐌 the slowest.

| Median lint time, s | Azure Compute<br><small>205 ops<br>2.3 MB</small> | Stripe<br><small>612 ops<br>6.3 MB</small> | DigitalOcean<br><small>858 ops<br>4.1 MB</small> | AWS EC2<br><small>1188 ops<br>5.6 MB</small> | GitHub<br><small>1254 ops<br>10.7 MB</small> | Cloudflare<br><small>3793 ops<br>20.5 MB</small> |
| --- | :---: | :---: | :---: | :---: | :---: | :---: |
| **redocly-latest**<br><small>v2.72.0</small> | <br>[0.85](results/azure/redocly-latest.1.txt) | 🐎<br>[1.63](results/stripe/redocly-latest.1.txt) | <br>[2.86](results/digitalocean/redocly-latest.1.txt) | 🐎<br>[2.33](results/aws-ec2/redocly-latest.1.txt) | <br>[4.83](results/github/redocly-latest.1.txt) | 🐎<br>[8.62](results/cloudflare/redocly-latest.1.txt) |
| **redocly**<br><small>v0.0.0-snapshot.1793262755</small> | <br>[0.84](results/azure/redocly.1.txt) | <br>[1.65](results/stripe/redocly.1.txt) | <br>[2.83](results/digitalocean/redocly.1.txt) | <br>[2.38](results/aws-ec2/redocly.1.txt) | 🐎<br>[4.79](results/github/redocly.1.txt) | <br>[8.67](results/cloudflare/redocly.1.txt) |
| **vacuum**<br><small>v0.35.7</small> | 🐎<br>[0.50](results/azure/vacuum.1.txt) | <br>[2.50](results/stripe/vacuum.1.txt) | <br>[4.05](results/digitalocean/vacuum.1.txt) | <br>[3.44](results/aws-ec2/vacuum.1.txt) | <br>[8.17](results/github/vacuum.1.txt) | <br>[10.80](results/cloudflare/vacuum.1.txt) |
| **speakeasy**<br><small>v1.805.0</small> | <br>[0.63](results/azure/speakeasy.1.txt) | <br>[4.58](results/stripe/speakeasy.1.txt) | 🐎<br>[2.46](results/digitalocean/speakeasy.1.txt) | 🐌<br>[11.25](results/aws-ec2/speakeasy.1.txt) | <br>[8.80](results/github/speakeasy.1.txt) | <br>[15.23](results/cloudflare/speakeasy.1.txt) |
| **spectral**<br><small>v6.17.0</small> | <br>[4.54](results/azure/spectral.1.txt) | 🐌<br>[20.08](results/stripe/spectral.1.txt) | <br>[46.39](results/digitalocean/spectral.1.txt) | <br>[8.91](results/aws-ec2/spectral.1.txt) | 🐌<br>[75.23](results/github/spectral.1.txt) | 🐌<br>[115.12](results/cloudflare/spectral.1.txt) |
| **scalar**<br><small>v2.13.2</small> | 🐌<br>[22.05](results/azure/scalar.1.txt) | ☠️<br>[67.50](results/stripe/scalar.1.txt) | 🐌<br>[236.45](results/digitalocean/scalar.1.txt) | ☠️<br>[300.07](results/aws-ec2/scalar.1.txt) | ☠️<br>[300.10](results/github/scalar.1.txt) | ☠️<br>[300.17](results/cloudflare/scalar.1.txt) |
<!-- BENCHMARK:END -->

## OpenAPI Descriptions

The [workflow](.github/workflows/benchmark.yml) downloads the latest version of each source and bundles it into one file in `openapi/` with `redocly bundle`:

- [Azure Compute](https://github.com/Azure/azure-rest-api-specs/tree/main/specification/compute/resource-manager/Microsoft.Compute/Compute/stable/2026-04-01) (Swagger 2.0, MIT)
- [Stripe](https://github.com/stripe/openapi/blob/master/openapi/spec3.yaml) (MIT)
- [DigitalOcean](https://github.com/digitalocean/openapi/tree/main/specification) (Apache-2.0)
- [AWS EC2](https://github.com/APIs-guru/openapi-directory/blob/main/APIs/amazonaws.com/ec2/2016-11-15/openapi.yaml) (CC0-1.0, converted from the AWS SDK model by APIs.guru)
- [GitHub](https://github.com/github/rest-api-description/blob/main/descriptions/api.github.com/api.github.com.yaml) (MIT)
- [Cloudflare](https://github.com/cloudflare/api-schemas/blob/main/openapi.yaml) (BSD-3-Clause)

