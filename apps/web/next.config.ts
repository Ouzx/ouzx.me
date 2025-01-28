import type { NextConfig } from 'next';

import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

// eslint-disable-next-line turbo/no-undeclared-env-vars, node/no-process-env
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
