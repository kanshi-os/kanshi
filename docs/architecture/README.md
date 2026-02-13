# Architecture

## System Overview

Kanshi OS is a modular, event-driven control plane for AI agent oversight. It operates on a clear separation of concerns:

### Key Principles

1. **No Runtime Custody**: Kanshi does not execute agent code or manage execution environments
2. **Event-Driven**: All agent activity is captured as immutable events
3. **Policy-First**: Actions are evaluated against configurable policies
4. **Audit Trail**: Complete historical record of all decisions
5. **Modular Design**: Each component is independently deployable

## System Components

### apps/api
The primary API surface for external integration.

- **Event Ingestion**: `POST /v1/events` accepts agent activity events
- **Agent Queries**: `GET /v1/agents` lists known agents
- **Health Check**: `GET /health` for monitoring
- **OpenAPI Documentation**: `GET /docs` for API exploration

**Technology**: Fastify + TypeScript + Zod validation

### apps/web
Dashboard for observability and configuration.

- Agent status and activity monitoring
- Policy management UI
- Audit log viewing
- System health overview

**Technology**: Next.js + React + TypeScript

### apps/worker
Asynchronous event processing and policy evaluation.

- Consumes events from ingestion queue
- Evaluates policies against events
- Records policy decisions
- Maintains statistics

**Technology**: Node.js TypeScript + BullMQ (queue-ready)

### packages/types
Shared TypeScript type definitions used across all services.

```
- Agent: identifier, metadata, status
- AgentEvent: event type, payload, timestamp
- PolicyResult: decision, reason, score
```

### packages/sdk
Client SDK for agent integration and API access.

- Typed API client
- Event submission helpers
- Retry logic and error handling

### packages/logger
Structured logging utilities with consistent formatting.

- Pino-based JSON logging
- Log levels and context
- Correlation IDs

### packages/policy
Policy evaluation engine.

- Policy parsing and validation
- Rule evaluation
- Decision generation

### packages/ui
Shared React components for web and potential future UIs.

- Divider, Card, Agent Feed
- Consistent styling
- Accessibility support

## Data Flow

```
[Agent] 
  ↓
  [SDK] 
    ↓
    [API: POST /v1/events]
      ↓
      [Event Store]
        ↓
        [Worker: processEvent]
          ↓
          [Policy Evaluator]
            ↓
            [Audit Log + Metrics]
```

## Deployment Architecture

### Development
- All services run locally via `pnpm dev`
- In-memory storage for testing
- No external dependencies required

### Production
- Docker containers for each service
- Kubernetes orchestration
- PostgreSQL for persistence
- Redis for queue (optional, in-memory fallback)
- gRPC for internal service communication

See `infra/` for infrastructure-as-code.

## Scalability Considerations

1. **Horizontal Scaling**: Stateless API and fully distributed workers
2. **Event Streaming**: BullMQ supports distributed job processing
3. **Policy Caching**: Policy evaluation results cached at multiple layers
4. **Metrics**: Prometheus-compatible metrics exported by all services

## Security Model

- **No Secrets Custody**: No cryptographic keys or credentials stored
- **Audit Everything**: All decisions logged and timestamped
- **Network Isolation**: Control plane should be network-isolated from agent environments
- **Input Validation**: Zod schemas validate all external input
- **RBAC Ready**: Multi-tenancy and role-based access control patterns

## Testing Strategy

- **Unit Tests**: Vitest for individual functions
- **Integration Tests**: For API endpoints and worker jobs
- **E2E**: Optional, typically in separate repository
- **Coverage Target**: >80% for core packages
