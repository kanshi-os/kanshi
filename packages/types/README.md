# @kanshi/types

Shared TypeScript type definitions for Kanshi OS.

Defines interfaces for:
- `Agent` - AI agents in the system
- `AgentEvent` - Events from agents
- `PolicyResult` - Results of policy evaluation
- `HealthCheckResponse` - Health check responses
- `EventIngestRequest` / `EventIngestResponse` - Event ingestion

## Installation

```bash
pnpm add @kanshi/types
```

## Usage

```typescript
import type { Agent, AgentEvent, PolicyResult } from '@kanshi/types';

const agent: Agent = {
  id: 'agent-001',
  name: 'Research Agent',
  status: 'active',
  lastSeen: new Date().toISOString(),
  tags: ['research'],
};

const event: AgentEvent = {
  agentId: 'agent-001',
  eventType: 'tool_call',
  payload: { tool: 'web_search', query: 'test' },
};

const result: PolicyResult = {
  allowed: true,
  decision: 'allow',
  reason: 'Matches whitelist policy',
  riskScore: 10,
  policies: ['policy-001'],
};
```
