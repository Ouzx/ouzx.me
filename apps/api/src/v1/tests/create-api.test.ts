// TODO: Remove this file after initializing the project
import { Hono } from 'hono';
import { testClient } from 'hono/testing';
import { expect, it } from 'vitest';

it('api Test', async () => {
  const app = new Hono().get('/search', c =>
    c.json({ hello: 'world' }));
  const res = await testClient(app).search.$get();

  expect(await res.json()).toEqual({ hello: 'world' });
});
