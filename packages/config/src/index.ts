import { configSchema, Environment, Location } from './schema';

// eslint-disable-next-line node/no-process-env
const configVals = configSchema.parse(process.env);

export const config = {
  env: configVals.NODE_ENV,
  port: configVals.PORT,
  location: configVals.LOCATION,
} as const;

export type Config = typeof config;
export { Environment, Location };
