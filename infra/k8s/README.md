# Kubernetes

Kubernetes manifests for Kanshi OS deployment.

## Structure

- `namespaces.yaml` - Kanshi namespace
- `configmaps.yaml` - Configuration data
- `secrets.yaml` - Secrets (DO NOT commit)
- `api-deployment.yaml` - API service deployment
- `worker-deployment.yaml` - Worker deployment
- `web-deployment.yaml` - Web dashboard deployment
- `services.yaml` - Service definitions
- `ingress.yaml` - Ingress configuration
- `hpa.yaml` - Horizontal Pod Autoscaler config

## Deployment

```bash
# Create namespace
kubectl create namespace kanshi

# Apply all manifests
kubectl apply -f k8s/

# Monitor deployment
kubectl rollout status deployment/kanshi-api -n kanshi
```

## Accessing Services

### Port Forward (Development)

```bash
# API
kubectl port-forward svc/kanshi-api 3000:3000 -n kanshi

# Web
kubectl port-forward svc/kanshi-web 3001:3000 -n kanshi
```

### Ingress (Production)

See `ingress.yaml` for production ingress configuration.
