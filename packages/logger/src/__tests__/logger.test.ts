import { Writable } from 'node:stream';
import { describe, expect, it } from 'vitest';

import { createLogger } from '../index';
import { withComponent, withContext } from '../utils';

describe('logger', () => {
  describe('basic Configuration', () => {
    it('should create logger with default config', () => {
      const logger = createLogger({ enabled: true });
      expect(logger).toBeDefined();
      expect(logger.level).toBe('info');
    });

    it('should respect custom log level', () => {
      const logger = createLogger({ level: 'debug', enabled: true });
      expect(logger.level).toBe('debug');
    });

    it('should properly redact sensitive information', () => {
      let output = '';

      // Create a custom writable stream to capture the output
      const testStream = new Writable({
        write(chunk, _encoding, callback) {
          output += chunk.toString();
          callback();
        },
      });

      const logger = createLogger({
        enabled: true,
        prettyPrint: false, // Disable pretty print for easier testing
        stream: testStream,
      });

      logger.info({ password: 'secret123' }, 'test message');

      // Use setImmediate to ensure the write has completed
      setImmediate(() => {
        const parsedOutput = JSON.parse(output);
        expect(parsedOutput.password).toBe('[Redacted]');
        expect(output).not.toContain('secret123');
      });
    });
  });

  describe('logger utils', () => {
    describe('withContext', () => {
      it('should add context to log messages', () => {
        let output = '';
        const testStream = new Writable({
          write(chunk, _encoding, callback) {
            output += chunk.toString();
            callback();
          },
        });

        const logger = createLogger({
          enabled: true,
          prettyPrint: false,
          stream: testStream,
        });

        const context = { requestId: '123', userId: '456' };
        const loggerWithContext = withContext(logger, context);

        loggerWithContext.info('test message');

        setImmediate(() => {
          const parsedOutput = JSON.parse(output);
          expect(parsedOutput.requestId).toBe('123');
          expect(parsedOutput.userId).toBe('456');
          expect(parsedOutput.msg).toBe('test message');
        });
      });

      it('should merge multiple contexts', () => {
        let output = '';
        const testStream = new Writable({
          write(chunk, _encoding, callback) {
            output += chunk.toString();
            callback();
          },
        });

        const logger = createLogger({
          enabled: true,
          prettyPrint: false,
          stream: testStream,
        });

        const firstContext = { requestId: '123' };
        const secondContext = { sessionId: '456' };

        const loggerWithContext = withContext(
          withContext(logger, firstContext),
          secondContext,
        );

        loggerWithContext.info('test message');

        setImmediate(() => {
          const parsedOutput = JSON.parse(output);
          expect(parsedOutput.requestId).toBe('123');
          expect(parsedOutput.sessionId).toBe('456');
          expect(parsedOutput.msg).toBe('test message');
        });
      });
    });

    describe('withComponent', () => {
      it('should add component to log messages', () => {
        let output = '';
        const testStream = new Writable({
          write(chunk, _encoding, callback) {
            output += chunk.toString();
            callback();
          },
        });

        const logger = createLogger({
          enabled: true,
          prettyPrint: false,
          stream: testStream,
        });

        const loggerWithComponent = withComponent(logger, 'api');

        loggerWithComponent.info('test message');

        setImmediate(() => {
          const parsedOutput = JSON.parse(output);
          expect(parsedOutput.component).toBe('api');
          expect(parsedOutput.msg).toBe('test message');
        });
      });

      it('should work with context and component together', () => {
        let output = '';
        const testStream = new Writable({
          write(chunk, _encoding, callback) {
            output += chunk.toString();
            callback();
          },
        });

        const logger = createLogger({
          enabled: true,
          prettyPrint: false,
          stream: testStream,
        });

        const loggerWithBoth = withContext(
          withComponent(logger, 'api'),
          { requestId: '123' },
        );

        loggerWithBoth.info('test message');

        setImmediate(() => {
          const parsedOutput = JSON.parse(output);
          expect(parsedOutput.component).toBe('api');
          expect(parsedOutput.requestId).toBe('123');
          expect(parsedOutput.msg).toBe('test message');
        });
      });

      it('should preserve log level of parent logger', () => {
        const logger = createLogger({
          enabled: true,
          level: 'debug',
        });

        const loggerWithComponent = withComponent(logger, 'api');
        expect(loggerWithComponent.level).toBe('debug');
      });
    });
  });
});
