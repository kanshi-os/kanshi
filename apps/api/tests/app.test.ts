import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import app from './index';

describe('API', () => {
  beforeAll(async () => {
    // Wait for server startup if needed
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /health', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/health',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ ok: true });
  });

  it('GET /v1/agents', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/v1/agents',
    });

    expect(response.statusCode).toBe(200);
    const body = response.json() as { agents: unknown[] };
    expect(Array.isArray(body.agents)).toBe(true);
  });

  it('POST /v1/events with valid payload', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/v1/events',
      payload: {
        agentId: 'agent-001',
        eventType: 'tool_call',
        payload: { tool: 'test' },
      },
    });

    expect(response.statusCode).toBe(200);
    const body = response.json() as { accepted: boolean };
    expect(body.accepted).toBe(true);
  });

  it('POST /v1/events with invalid payload', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/v1/events',
      payload: {
        agentId: '', // Empty agent ID should fail validation
      },
    });

    expect(response.statusCode).toBe(400);
  });

  it('GET /openapi.json', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/openapi.json',
    });

    expect(response.statusCode).toBe(200);
    const body = response.json() as { openapi: string };
    expect(body.openapi).toBeDefined();
  });
});
