# API Linters Test

Speed benchmark of OpenAPI linters on public API descriptions.
Every linter runs at its latest release with its default ruleset; Spectral has none, so it gets [`.spectral.yaml`](.spectral.yaml), which extends `spectral:oas`.

## Results

<!-- BENCHMARK:START -->
No results yet. Open Actions, Benchmark, Run workflow on GitHub; the workflow fills this section and commits it.
<!-- BENCHMARK:END -->

## OpenAPI Descriptions

The [workflow](.github/workflows/benchmark.yml) downloads these sources at the pinned commits into `openapi/`. DigitalOcean and Azure Compute are multi-file, so they get bundled into one file each with `redocly bundle`.

| File | Source | License |
| --- | --- | --- |
| `azure.yaml` (Swagger 2.0) | [Azure/azure-rest-api-specs](https://github.com/Azure/azure-rest-api-specs/tree/8b747d606f494c1ceb4db2de65d657fa00ed0c4f/specification/compute/resource-manager/Microsoft.Compute/Compute/stable/2026-04-01), Compute `2026-04-01`, commit `8b747d6` | MIT |
| `stripe.yaml` (OpenAPI 3.0) | [stripe/openapi](https://github.com/stripe/openapi/blob/30d3391cc09a0f67ad29bee002f570811b19e1da/openapi/spec3.yaml), commit `30d3391` | MIT |
| `digitalocean.yaml` (OpenAPI 3.0) | [digitalocean/openapi](https://github.com/digitalocean/openapi/tree/8041307476bda69ea1640dcf44b220dd653c6808/specification), commit `8041307` | Apache-2.0 |
| `aws-ec2.yaml` (OpenAPI 3.0) | [APIs-guru/openapi-directory](https://github.com/APIs-guru/openapi-directory/blob/f04b8d0bcd39c52e1cf3ad7a5fe744709832ae49/APIs/amazonaws.com/ec2/2016-11-15/openapi.yaml), commit `f04b8d0`, a conversion of the AWS SDK model | CC0-1.0 |
| `github.yaml` (OpenAPI 3.0) | [github/rest-api-description](https://github.com/github/rest-api-description/blob/9f6ad3b0ba6f7ef9619adb7135a1a56de62ed2d3/descriptions/api.github.com/api.github.com.yaml), commit `9f6ad3b` | MIT |
| `cloudflare.yaml` (OpenAPI 3.0) | [cloudflare/api-schemas](https://github.com/cloudflare/api-schemas/blob/f20240cf7d68bcebb138ab5ed5240ed523cb10ef/openapi.yaml), commit `f20240c` | BSD-3-Clause |
