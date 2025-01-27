import { serve } from '@hono/node-server';
import { config } from '@ouzx-me/config';

import v1, { apiRepl } from './v1';

serve({
  fetch: v1.fetch,
  port: config.port,
});

apiRepl(`http://localhost:${config.port}`);
