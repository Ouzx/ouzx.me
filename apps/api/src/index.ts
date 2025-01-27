import { serve } from '@hono/node-server';
import { logger } from '@ouzx-me/logger';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

app.use('*', cors());

app.get('/', (c) => {
  return c.json({
    message: 'Welcome to ouzx.me API',
    version: '1.0.0',
  });
});

app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// eslint-disable-next-line turbo/no-undeclared-env-vars, node/no-process-env
const port = process.env.PORT || 3001;

logger.info(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port: Number(port),
});
