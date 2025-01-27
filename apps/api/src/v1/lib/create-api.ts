import { Hono } from 'hono';
import { cors } from 'hono/cors';

/**
 * Create a new API instance.
 * @returns {Hono} - The API instance.
 */
export function createApi(): Hono {
  const app = new Hono();

  app.use('*', cors());

  return app;
}
