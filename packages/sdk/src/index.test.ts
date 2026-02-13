import { describe, it, expect } from 'vitest';
import { KanshiClient } from './index';

describe('KanshiClient', () => {
  it('creates a client instance', () => {
    const client = new KanshiClient({
      apiKey: 'test-key',
      baseUrl: 'http://localhost:3000',
    });
    expect(client).toBeDefined();
  });

  it('accepts custom timeout', () => {
    const client = new KanshiClient({
      apiKey: 'test-key',
      baseUrl: 'http://localhost:3000',
      timeout: 5000,
    });
    expect(client).toBeDefined();
  });
});
