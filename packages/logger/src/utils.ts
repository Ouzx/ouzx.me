import type { Logger } from 'pino';

/**
 * Add context to the logger
 * @param {Logger} logger - The logger instance
 * @param {Record<string, unknown>} context - The context to add
 * @returns {Logger} The logger instance with the context
 * @example
 * const logger = createLogger();
 * const loggerWithContext = withContext(logger, { requestId: '123' });
 * loggerWithContext.info('Hello, world!');
 * // Output: { requestId: '123', msg: 'Hello, world!' }
 */
export function withContext<T extends Logger>(logger: T, context: Record<string, unknown>): Logger {
  return logger.child(context);
}

/**
 * Add component to the logger
 * @param {Logger} logger - The logger instance
 * @param {string} component - The component name
 * @returns {Logger} The logger instance with the component
 * @example
 * const logger = createLogger();
 * const loggerWithComponent = withComponent(logger, 'api');
 * loggerWithComponent.info('Hello, world!');
 * // Output: { component: 'api', msg: 'Hello, world!' }
 */
export function withComponent<T extends Logger>(logger: T, component: string): Logger {
  return logger.child({ component });
}
