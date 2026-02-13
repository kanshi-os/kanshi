# @kanshi/worker

Kanshi OS event processing worker.

Asynchronously processes agent events with policy evaluation.

## Features

- Event processing from queue
- Policy evaluation integration
- Structured logging
- BullMQ-ready architecture (currently uses in-memory queue)

## Getting Started

```bash
pnpm install
pnpm --filter worker start
```

Worker will start listening for events and output "Worker ready".

## Usage

```typescript
import { processEvent } from '@kanshi/worker';
import type { AgentEvent } from '@kanshi/types';

const event: AgentEvent = {
  agentId: 'agent-001',
  eventType: 'tool_call',
  payload: { tool: 'web_search' },
};

const result = processEvent(event);
console.log(result); // { allowed: true, decision: 'allow', ... }
```

## Environment Variables

- `PORT` - Redis/queue port (future)
- `QUEUE_NAME` - Job queue name (default: kanshi-events)
