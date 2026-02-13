import Fastify from 'fastify';
import { createLogger } from '@kanshi/logger';
import type { Agent, HealthCheckResponse, EventIngestResponse } from '@kanshi/types';
import { z } from 'zod';

const logger = createLogger('api');

const app = Fastify({ logger: false });

// Health check endpoint
app.get('/health', async (): Promise<HealthCheckResponse> => {
  return { ok: true };
});

// Mock agents database (stub)
const agents: Agent[] = [];

// Get agents endpoint
app.get('/v1/agents', async () => {
  return { agents };
});

// Event ingestion schema
const EventIngestSchema = z.object({
  agentId: z.string().min(1),
  eventType: z.string().min(1),
  payload: z.record(z.unknown()).optional(),
});

// Ingest event endpoint
app.post<{ Body: unknown }>('/v1/events', async (request, reply): Promise<EventIngestResponse> => {
  try {
    const data = EventIngestSchema.parse(request.body);
    const eventId = `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = new Date().toISOString();

    logger.info('Event ingested', { eventId, agentId: data.agentId, eventType: data.eventType });

    return {
      accepted: true,
      eventId,
      timestamp,
    };
  } catch (error) {
    reply.code(400);
    return {
      accepted: false,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Invalid event format',
    };
  }
});

// OpenAPI/Swagger stub endpoint
app.get('/openapi.json', async () => {
  return {
    openapi: '3.0.0',
    info: {
      title: 'Kanshi API',
      version: '0.1.0',
      description: 'Event ingestion and agent management API',
    },
    paths: {
      '/health': {
        get: {
          summary: 'Health check',
          responses: {
            '200': {
              description: 'Service is healthy',
            },
          },
        },
      },
      '/v1/agents': {
        get: {
          summary: 'List agents',
          responses: {
            '200': {
              description: 'List of agents',
            },
          },
        },
      },
      '/v1/events': {
        post: {
          summary: 'Ingest event',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    agentId: { type: 'string' },
                    eventType: { type: 'string' },
                    payload: { type: 'object' },
                  },
                  required: ['agentId', 'eventType'],
                },
              },
            },
          },
          responses: {
            '202': {
              description: 'Event accepted',
            },
          },
        },
      },
    },
  };
});

// Start server
const start = async (): Promise<void> => {
  try {
    const port = parseInt(process.env.PORT || '3000', 10);
    const host = process.env.HOST || '0.0.0.0';
    await app.listen({ port, host });
    logger.info('API server started', { port, host });
  } catch (err) {
    logger.error('Failed to start server', err instanceof Error ? err : new Error(String(err)));
    process.exit(1);
  }
};

export default app;
export { start };

if (import.meta.url === `file://${process.argv[1]}`) {
  await start();
}
