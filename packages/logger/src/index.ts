import pino from 'pino';
import pretty from 'pino-pretty';

// TODO: Update here, use @ouzx-me/config
// eslint-disable-next-line turbo/no-undeclared-env-vars, node/no-process-env
const env = process.env.NODE_ENV;
const prod = env === 'production';
const test = env === 'test';

const stream = pretty({
  colorize: true,
  translateTime: 'SYS:standard',
});

const logger = pino(
  {
    level: prod ? 'info' : 'debug',
    enabled: !test,
  },
  prod ? undefined : stream,
);

export { logger };
