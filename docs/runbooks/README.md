# Runbooks

Operational procedures for Kanshi OS.

## Getting Started

See [Deployment](./deployment.md) for initial setup.

## Common Procedures

### Restarting Services

```bash
# Restart all services
kubectl rollout restart deployment -n kanshi

# Restart specific service
kubectl rollout restart deployment/kanshi-api -n kanshi
kubectl rollout restart deployment/kanshi-worker -n kanshi
kubectl rollout restart deployment/kanshi-web -n kanshi
```

### Viewing Logs

```bash
# API logs
kubectl logs -f deployment/kanshi-api -n kanshi

# Worker logs
kubectl logs -f deployment/kanshi-worker -n kanshi

# Follow multiple pods
kubectl logs -f deployment/kanshi-api -n kanshi --all-containers
```

### Database Migrations

```bash
# Run pending migrations
pnpm --filter api run db:migrate

# Rollback last migration
pnpm --filter api run db:migrate:rollback

# Check migration status
pnpm --filter api run db:migrate:status
```

### Scaling Workers

```bash
# Scale worker deployment
kubectl scale deployment/kanshi-worker --replicas=5 -n kanshi

# Configure autoscaling (HPA)
kubectl apply -f infra/k8s/hpa-worker.yaml
```

### Checking Health

```bash
# API health
curl https://api.kanshi.internal/health

# Metrics (Prometheus)
curl https://prometheus.kanshi.internal/api/v1/query

# Database connectivity
kubectl exec -it deployment/kanshi-api -n kanshi -- pnpm db:health-check
```

## Alerts

Common alerts and remediation:

| Alert | Cause | Action |
|-------|-------|--------|
| API error rate >1% | Bug or overload | Check logs; scale up if needed |
| Worker lag >30s | Queue bottleneck | Scale workers; check DB performance |
| DB connection pool exhausted | Connection leak | Restart affected service; review logs |
| Memory usage >80% | Memory leak or overload | Restart pod; check logs for leak |

## Incident Response

See [Incident Response Playbook](./incident-response.md) (TBD).

## Backups

```bash
# Backup database
pg_dump -U postgres kanshi > backup-$(date +%s).sql

# Restore from backup
psql -U postgres kanshi < backup-12345.sql
```

## Upgrades

```bash
# Build new images
pnpm build
docker build -t kanshi-api:v1.1.0 -f apps/api/Dockerfile .

# Deploy canary
kubectl set image deployment/kanshi-api kanshi-api=kanshi-api:v1.1.0 -n kanshi --record

# Monitor rollout
kubectl rollout status deployment/kanshi-api -n kanshi

# Rollback if needed
kubectl rollout undo deployment/kanshi-api -n kanshi
```

## Security: Rotating API Keys

```bash
# Generate new key
pnpm --filter api run cli:generate-api-key

# Add to environment
kubectl set env deployment/kanshi-api \
  API_KEYS="$OLD_KEY,$NEW_KEY" \
  -n kanshi

# Wait for pods to restart
kubectl rollout status deployment/kanshi-api -n kanshi

# Remove old key after monitoring
kubectl set env deployment/kanshi-api \
  API_KEYS="$NEW_KEY" \
  -n kanshi
```

## Performance Tuning

See [Performance Tuning Guide](./performance-tuning.md) (TBD).
