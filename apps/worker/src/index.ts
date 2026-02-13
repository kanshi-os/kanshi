import { createLogger } from '@kanshi/logger';
import { evaluatePolicy } from '@kanshi/policy';
import type { AgentEvent, PolicyResult } from '@kanshi/types';

const logger = createLogger('worker');

/**
 * Process an event and return a policy result.
 */
export function processEvent(event: AgentEvent): PolicyResult {
  logger.debug('Processing event', { eventId: event.id, agentId: event.agentId });

  try {
    const result = evaluatePolicy(event);
    logger.info('Event processed', { eventId: event.id, decision: result.decision });
    return result;
  } catch (error) {
    logger.error('Failed to process event', error instanceof Error ? error : new Error(String(error)));
    return {
      allowed: false,
      decision: 'deny',
      reason: 'Worker error',
      riskScore: 100,
      policies: [],
    };
  }
}

/**
 * Event processing queue (stub for BullMQ).
 * In production, this would be backed by Redis and BullMQ.
 */
class EventQueue {
  private queue: AgentEvent[] = [];

  async push(event: AgentEvent): Promise<void> {
    this.queue.push(event);
    logger.debug('Event added to queue', { queueLength: this.queue.length });
  }

  async process(): Promise<void> {
    while (this.queue.length > 0) {
      const event = this.queue.shift();
      if (event) {
        processEvent(event);
      }
    }
  }

  length(): number {
    return this.queue.length;
  }
}

// Global queue instance
const eventQueue = new EventQueue();

// Worker entry point
async function main(): Promise<void> {
  logger.info('Worker ready');

  // Simulate listening for events
  const interval = setInterval(async () => {
    if (eventQueue.length() > 0) {
      await eventQueue.process();
    }
  }, 5000);

  // Graceful shutdown
  process.on('SIGINT', () => {
    logger.info('Shutting down worker');
    clearInterval(interval);
    process.exit(0);
  });
}

export { eventQueue };

if (import.meta.url === `file://${process.argv[1]}`) {
  await main();
}
