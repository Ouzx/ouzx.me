import { config } from '@ouzx-me/config';
import { logger } from '@ouzx-me/logger';

import { createApi } from './lib/create-api';

const v1 = createApi();

v1.get('/', (c) => {
  return c.json({
    message: 'Welcome to ouzx.me API',
    version: '1.0.0',
  });
});

v1.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

export function apiRepl(url: string) {
  logger.info(`Current environment: ${config.env}`);
  logger.info(`V1 API Server is running on ${url}`);
  logger.info('Press Ctrl+C to stop');
}

export default v1;
