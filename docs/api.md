# API Documentation

## Overview

Kanshi API is RESTful, structured with version prefixes (`/v1/`). All responses are JSON.

## Authentication

API requests require authentication. Include your API key in the `Authorization` header:

```
Authorization: Bearer YOUR_API_KEY
```

## Error Responses

All errors follow this format:

```json
{
  "error": "error_code",
  "message": "Human-readable error message",
  "statusCode": 400
}
```

## Endpoints

### Health Check

**Endpoint**: `GET /health`

**Description**: Check if the API is running.

**Response** (200):
```json
{
  "ok": true
}
```

**Example**:
```bash
curl -X GET http://localhost:3000/health
```

---

### List Agents

**Endpoint**: `GET /v1/agents`

**Description**: List all known agents.

**Response** (200):
```json
{
  "agents": [
    {
      "id": "agent-001",
      "name": "Research Agent",
      "status": "active",
      "lastSeen": "2026-02-13T10:30:00Z",
      "tags": ["research", "production"]
    }
  ]
}
```

**Example**:
```bash
curl -X GET http://localhost:3000/v1/agents \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

### Ingest Event

**Endpoint**: `POST /v1/events`

**Description**: Submit an agent activity event for processing.

**Request Body**:
```json
{
  "agentId": "agent-001",
  "eventType": "tool_call",
  "payload": {
    "tool": "web_search",
    "query": "latest news on AI",
    "timestamp": "2026-02-13T10:30:00Z"
  }
}
```

**Response** (202):
```json
{
  "accepted": true,
  "eventId": "evt_abc123",
  "timestamp": "2026-02-13T10:30:00Z"
}
```

**Errors**:
- `400 Bad Request`: Invalid event format
- `401 Unauthorized`: Invalid or missing API key
- `429 Too Many Requests`: Rate limit exceeded

**Example**:
```bash
curl -X POST http://localhost:3000/v1/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "agentId": "agent-001",
    "eventType": "tool_call",
    "payload": {
      "tool": "web_search",
      "query": "latest news"
    }
  }'
```

---

### OpenAPI Documentation

**Endpoint**: `GET /docs`

**Description**: Interactive Swagger UI for API exploration.

**Endpoint**: `GET /openapi.json`

**Description**: Raw OpenAPI 3.0 schema in JSON format.

---

## Rate Limiting

- **Per Agent**: 1000 requests per minute
- **Per API Key**: 5000 requests per minute
- **Global**: 100,000 requests per minute

Rate limit headers:
```
x-ratelimit-limit: 1000
x-ratelimit-remaining: 999
x-ratelimit-reset: 1676188200
```

---

## Event Types

Common event types:

| Type | Description |
|------|-------------|
| `tool_call` | Agent invoked an external tool |
| `model_response` | Model generated a response |
| `event_stream_start` | Event stream started |
| `event_stream_end` | Event stream ended |
| `error` | Error occurred during execution |
| `policy_query` | Agent queried a policy |

---

## Examples

### Python

```python
import requests

API_KEY = "your-api-key"
BASE_URL = "http://localhost:3000"

def ingest_event(agent_id, event_type, payload):
    response = requests.post(
        f"{BASE_URL}/v1/events",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "agentId": agent_id,
            "eventType": event_type,
            "payload": payload,
        }
    )
    return response.json()

result = ingest_event(
    "agent-001",
    "tool_call",
    {"tool": "web_search", "query": "python best practices"}
)
print(result)
```

### JavaScript (using SDK)

```javascript
import { KanshiClient } from '@kanshi/sdk';

const client = new KanshiClient({
  apiKey: 'your-api-key',
  baseUrl: 'http://localhost:3000',
});

const result = await client.events.ingest({
  agentId: 'agent-001',
  eventType: 'tool_call',
  payload: {
    tool: 'web_search',
    query: 'python best practices',
  },
});

console.log(result);
```

---

## Pagination

List endpoints support pagination:

```bash
curl "http://localhost:3000/v1/agents?limit=20&offset=0"
```

**Query Parameters**:
- `limit`: Number of results (default: 50, max: 100)
- `offset`: Number of results to skip (default: 0)

---

## Versioning

API version is in the URL path: `/v1/`. Breaking changes will increment the version.

Legacy versions will be supported for 12 months after a new version is released.
