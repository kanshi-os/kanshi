/**
 * Logger interface for structured logging.
 */
export interface ILogger {
  debug(message: string, meta?: Record<string, unknown>): void;
  info(message: string, meta?: Record<string, unknown>): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  error(message: string, error?: Error | Record<string, unknown>): void;
}

/**
 * Simple console-based logger implementation.
 */
class ConsoleLogger implements ILogger {
  private context: string;

  constructor(context: string = 'kanshi') {
    this.context = context;
  }

  private log(level: string, message: string, meta?: Record<string, unknown>): void {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      context: this.context,
      message,
      ...(meta && Object.keys(meta).length > 0 && { meta }),
    };
    console.log(JSON.stringify(logEntry));
  }

  debug(message: string, meta?: Record<string, unknown>): void {
    this.log('DEBUG', message, meta);
  }

  info(message: string, meta?: Record<string, unknown>): void {
    this.log('INFO', message, meta);
  }

  warn(message: string, meta?: Record<string, unknown>): void {
    this.log('WARN', message, meta);
  }

  error(message: string, error?: Error | Record<string, unknown>): void {
    const meta = error instanceof Error
      ? {
          errorMessage: error.message,
          errorStack: error.stack,
        }
      : error;
    this.log('ERROR', message, meta);
  }
}

/**
 * Creates a new logger instance.
 */
export function createLogger(context?: string): ILogger {
  return new ConsoleLogger(context);
}

export { ConsoleLogger };
