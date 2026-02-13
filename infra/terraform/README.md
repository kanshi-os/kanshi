# Terraform

Terraform modules for Kanshi OS cloud infrastructure.

Supports deployment to AWS, GCP, and Azure (configured via `main.tf`).

## Structure

- `main.tf` - Provider and resource definitions
- `variables.tf` - Input variables
- `outputs.tf` - Output values
- `terraform.tfvars.example` - Example variables

## Quick Start

```bash
# Initialize Terraform
terraform init

# Plan deployment
terraform plan

# Apply configuration
terraform apply
```

## Modules

- `network/` - VPC/Network setup
- `compute/` - VM/Container instances
- `database/` - PostgreSQL database
- `messaging/` - Redis queue setup
- `monitoring/` - Prometheus/Grafana stack

## Environment Variables

Create `terraform.tfvars`:

```hcl
environment = "production"
region      = "us-east-1"
app_name    = "kanshi"
```

## Notes

- Terraform state is stored in GCS/S3 (configure backend)
- Sensitive variables should use TF_VAR environment variables
- Always run `terraform plan` before `apply`
