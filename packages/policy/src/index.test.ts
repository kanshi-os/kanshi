import { describe, it, expect } from 'vitest';
import { evaluatePolicy, computeRiskScore, isEventAllowed } from './index';
import type { AgentEvent } from '@kanshi/types';

describe('policy', () => {
  const testEvent: AgentEvent = {
    agentId: 'agent-001',
    eventType: 'tool_call',
    payload: { tool: 'test' },
  };

  it('evaluates a policy against an event', () => {
    const result = evaluatePolicy(testEvent);
    expect(result).toBeDefined();
    expect(result.allowed).toBe(true);
    expect(result.decision).toBe('allow');
    expect(result.riskScore).toBeGreaterThanOrEqual(0);
    expect(result.riskScore).toBeLessThanOrEqual(100);
  });

  it('computes risk score for events', () => {
    const score = computeRiskScore(testEvent);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it('raises score for risky event types', () => {
    const fileWriteEvent: AgentEvent = {
      agentId: 'agent-001',
      eventType: 'file_write',
      payload: {},
    };
    const score = computeRiskScore(fileWriteEvent);
    expect(score).toBeGreaterThanOrEqual(30);
  });

  it('checks if event is allowed', () => {
    const allowed = isEventAllowed(testEvent);
    expect(typeof allowed).toBe('boolean');
  });
});
