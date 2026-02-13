# @kanshi/api

Kanshi OS API server built with Fastify.

## Features

- RESTful API for event ingestion
- Agent management endpoints
- OpenAPI/Swagger documentation
- Input validation with Zod
- Structured logging

## Getting Started

```bash
pnpm install
pnpm --filter api dev
```

Server will be available at `http://localhost:3000`

## API Endpoints

- `GET /health` - Health check
- `GET /v1/agents` - List agents
- `POST /v1/events` - Ingest event
- `GET /openapi.json` - OpenAPI schema

## Environment Variables

- `PORT` - Port to listen on (default: 3000)
- `HOST` - Host to bind to (default: 0.0.0.0)
- `NODE_ENV` - Environment (development/production)
