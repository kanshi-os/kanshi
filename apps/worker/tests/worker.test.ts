import { describe, it, expect } from 'vitest';
import { processEvent } from './index';
import type { AgentEvent } from '@kanshi/types';

describe('Worker', () => {
  const testEvent: AgentEvent = {
    id: 'evt-test-123',
    agentId: 'agent-001',
    eventType: 'tool_call',
    payload: { tool: 'test' },
  };

  it('processes an event', () => {
    const result = processEvent(testEvent);

    expect(result).toBeDefined();
    expect(result.decision).toBeDefined();
    expect(result.riskScore).toBeGreaterThanOrEqual(0);
    expect(result.riskScore).toBeLessThanOrEqual(100);
  });

  it('handles events with different types', () => {
    const fileWriteEvent: AgentEvent = {
      agentId: 'agent-001',
      eventType: 'file_write',
      payload: { path: '/tmp/test.txt' },
    };

    const result = processEvent(fileWriteEvent);
    expect(result.riskScore).toBeGreaterThanOrEqual(0);
  });

  it('returns a decision', () => {
    const result = processEvent(testEvent);
    expect(['allow', 'deny', 'review']).toContain(result.decision);
  });
});
