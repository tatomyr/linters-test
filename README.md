# OpenAPI Linter Race

Speed benchmark of OpenAPI linters on public API descriptions.
Every linter runs at its latest release (Redocly CLI also at its latest snapshot) with its default ruleset; Spectral has none, so it gets [`.spectral.yaml`](.spectral.yaml), which extends `spectral:oas`.

## Results

<!-- BENCHMARK:START -->
Generated 2026-10-28 12:57 UTC by [this workflow run](https://github.com/tatomyr/linters-test/actions/runs/40692005529) on AMD EPYC 7763 64-Core Processor, 4 cores, 15 GB RAM, Linux 7.0.0-1017-azure, Node v24.21.0.
Each command ran 5 times, one after another, after a 5 s pause; the time is wall-clock from process start to exit, as `time` reports it, and the table shows the median. A command that did not finish within 5 minutes was killed and not repeated. 💥 marks a command that crashed; its output has the error.

| Tool | Azure Compute<br>205 ops, 2.3 MB | Stripe<br>612 ops, 6.3 MB | DigitalOcean<br>858 ops, 4.1 MB | AWS EC2<br>1,188 ops, 5.6 MB | GitHub<br>1,254 ops, 10.7 MB | Cloudflare<br>3,793 ops, 20.5 MB |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `redocly@2.71.2` | [1.10 s](results/azure/redocly.1.txt) | [1.91 s](results/stripe/redocly.1.txt) | [3.09 s](results/digitalocean/redocly.1.txt) | [2.61 s](results/aws-ec2/redocly.1.txt) | [5.05 s](results/github/redocly.1.txt) | [8.97 s](results/cloudflare/redocly.1.txt) |
| `vacuum@0.35.7` | [0.54 s](results/azure/vacuum.1.txt) | [2.61 s](results/stripe/vacuum.1.txt) | [4.19 s](results/digitalocean/vacuum.1.txt) | [3.52 s](results/aws-ec2/vacuum.1.txt) | [8.43 s](results/github/vacuum.1.txt) | [11.19 s](results/cloudflare/vacuum.1.txt) |
| `spectral@6.17.0` | [4.48 s](results/azure/spectral.1.txt) | [19.73 s](results/stripe/spectral.1.txt) | [46.35 s](results/digitalocean/spectral.1.txt) | [9.07 s](results/aws-ec2/spectral.1.txt) | [76.38 s](results/github/spectral.1.txt) | [111.09 s](results/cloudflare/spectral.1.txt) |
| `scalar@2.13.2` | [22.88 s](results/azure/scalar.1.txt) | [💥 crashed](results/stripe/scalar.1.txt) | [268.23 s](results/digitalocean/scalar.1.txt) | [300.07 s](results/aws-ec2/scalar.1.txt) | [300.12 s](results/github/scalar.1.txt) | [300.18 s](results/cloudflare/scalar.1.txt) |
| `speakeasy@1.805.0` | [0.66 s](results/azure/speakeasy.1.txt) | [4.57 s](results/stripe/speakeasy.1.txt) | [2.50 s](results/digitalocean/speakeasy.1.txt) | [11.41 s](results/aws-ec2/speakeasy.1.txt) | [8.69 s](results/github/speakeasy.1.txt) | [15.67 s](results/cloudflare/speakeasy.1.txt) |
<!-- BENCHMARK:END -->

## OpenAPI Descriptions

The [workflow](.github/workflows/benchmark.yml) downloads the latest version of each source and bundles it into one file in `openapi/` with `redocly bundle`:

- [Azure Compute](https://github.com/Azure/azure-rest-api-specs/tree/main/specification/compute/resource-manager/Microsoft.Compute/Compute/stable/2026-04-01) (Swagger 2.0, MIT)
- [Stripe](https://github.com/stripe/openapi/blob/master/openapi/spec3.yaml) (MIT)
- [DigitalOcean](https://github.com/digitalocean/openapi/tree/main/specification) (Apache-2.0)
- [AWS EC2](https://github.com/APIs-guru/openapi-directory/blob/main/APIs/amazonaws.com/ec2/2016-11-15/openapi.yaml) (CC0-1.0, converted from the AWS SDK model by APIs.guru)
- [GitHub](https://github.com/github/rest-api-description/blob/main/descriptions/api.github.com/api.github.com.yaml) (MIT)
- [Cloudflare](https://github.com/cloudflare/api-schemas/blob/main/openapi.yaml) (BSD-3-Clause)

