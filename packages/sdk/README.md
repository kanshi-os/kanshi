# @kanshi/sdk

Client SDK for Kanshi OS API.

Provides TypeScript client for interacting with the Kanshi API.

## Installation

```bash
pnpm add @kanshi/sdk
```

## Usage

```typescript
import { KanshiClient } from '@kanshi/sdk';

const client = new KanshiClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.kanshi.internal',
});

// Check health
const health = await client.health();
console.log(health); // { ok: true }

// Ingest an event
const response = await client.ingestEvent({
  agentId: 'agent-001',
  eventType: 'tool_call',
  payload: {
    tool: 'web_search',
    query: 'test',
  },
});
console.log(response); // { accepted: true, eventId: '...', timestamp: '...' }
```

## Configuration

- `apiKey` (required): API key for authentication
- `baseUrl` (required): Base URL of Kanshi API
- `timeout` (optional): Request timeout in milliseconds (default: 30000)
