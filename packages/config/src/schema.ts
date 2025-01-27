import { z } from 'zod';

export enum Environment {
  DEV = 'development',
  PROD = 'production',
  TEST = 'test',
  DB_SESSION = 'db_session',
}

export enum Location {
  LOCAL = 'local',
  CLOUD = 'cloud',
}

export const configSchema = z.object({
  // ENV
  NODE_ENV: z.nativeEnum(Environment).default(Environment.DEV),
  PORT: z.coerce.number().default(5000),
  LOCATION: z.nativeEnum(Location).default(Location.CLOUD),
});
