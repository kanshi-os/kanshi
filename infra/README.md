# Infrastructure

Infrastructure-as-Code and deployment configurations for Kanshi OS.

## Directories

- **docker/** - Container configurations for each service
- **k8s/** - Kubernetes manifests for production deployment
- **terraform/** - Terraform modules for cloud infrastructure

## Quick Start

### Local Docker Compose

```bash
# Build images
docker-compose build

# Run services
docker-compose up
```

### Kubernetes Deployment

```bash
# Apply configurations
kubectl apply -f k8s/

# Check deployment
kubectl get pods -n kanshi
```

### Terraform

```bash
cd terraform
terraform init
terraform apply
```

## Environment-Specific Configs

- `dev/` - Development settings
- `staging/` - Staging environment
- `prod/` - Production-hardened configs
