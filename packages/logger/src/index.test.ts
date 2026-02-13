import { describe, it, expect } from 'vitest';
import { createLogger } from './index';

describe('logger', () => {
  it('creates a logger instance', () => {
    const logger = createLogger('test');
    expect(logger).toBeDefined();
    expect(logger.info).toBeDefined();
    expect(logger.error).toBeDefined();
  });

  it('logs messages with metadata', () => {
    const logger = createLogger('test');
    expect(() => {
      logger.info('test message', { key: 'value' });
      logger.error('error message');
      logger.warn('warning', { code: 123 });
      logger.debug('debug', { enabled: true });
    }).not.toThrow();
  });
});
