# @kanshi/logger

Structured logging utilities for Kanshi OS.

Provides a simple console-based JSON logger with support for debug, info, warn, and error levels.

## Installation

```bash
pnpm add @kanshi/logger
```

## Usage

```typescript
import { createLogger } from '@kanshi/logger';

const logger = createLogger('my-module');

logger.info('Service started', { port: 3000 });
logger.warn('High memory usage', { rss: 1024 * 1024 * 512 });
logger.error('Failed to connect', new Error('Connection refused'));
logger.debug('Processing event', { eventId: 'evt-123' });
```

## Output

All logs are JSON formatted with timestamps:

```json
{
  "timestamp": "2026-02-13T10:30:00.000Z",
  "level": "INFO",
  "context": "my-module",
  "message": "Service started",
  "meta": {
    "port": 3000
  }
}
```
