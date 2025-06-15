import pino, { type Logger } from 'pino';
import pretty from 'pino-pretty';

export type LoggerConfig = {
  level?: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
  enabled?: boolean;
  prettyPrint?: boolean;
  redactedKeys?: string[];
  customTimestamp?: boolean;
  stream?: pino.DestinationStream;
};

const defaultConfig: LoggerConfig = {
  level: 'info',
  enabled: true,
  prettyPrint: true,
  redactedKeys: ['password', 'token', 'secret'],
  customTimestamp: true,
};

/**
 * Create a logger instance
 * @param {Partial<LoggerConfig>} config - The configuration for the logger
 * @returns {Logger} The logger instance
 */
export function createLogger(config: Partial<LoggerConfig> = {}): Logger {
  const finalConfig = { ...defaultConfig, ...config };

  const stream = finalConfig.stream ?? (
    finalConfig.prettyPrint
      ? pretty({
          colorize: true,
          translateTime: finalConfig.customTimestamp ? 'SYS:standard' : false,
        })
      : undefined
  );

  return pino(
    {
      level: finalConfig.level,
      enabled: finalConfig.enabled,
      redact: finalConfig.redactedKeys,
    },
    stream,
  );
}

// Export a default logger instance
export const logger = createLogger();
