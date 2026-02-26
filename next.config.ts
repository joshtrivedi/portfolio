import type { NextConfig } from 'next';

const BASE_PATH = '/portfolio';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
  images: { unoptimized: true },
  turbopack: {},
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
};

export default nextConfig;
