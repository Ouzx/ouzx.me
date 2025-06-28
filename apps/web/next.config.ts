import type { NextConfig } from 'next';

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

const nextConfig: NextConfig = {
  transpilePackages: ['@ouzx-me/ui'],
};

export default nextConfig;

initOpenNextCloudflareForDev();
