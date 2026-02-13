# Docker

Dockerfile configurations for Kanshi OS services.

## Building Images

Each service has its own Dockerfile:

```bash
# API
docker build -f apps/api/Dockerfile -t kanshi-api:latest .

# Worker
docker build -f apps/worker/Dockerfile -t kanshi-worker:latest .

# Web
docker build -f apps/web/Dockerfile -t kanshi-web:latest .
```

## Service Images

- `kanshi-api` - Fastify API server
- `kanshi-worker` - Event processing worker
- `kanshi-web` - Next.js dashboard

## Docker Compose

See `docker-compose.yml` in repository root for local development.
