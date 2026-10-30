/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['react'],
  },
};

export default nextConfig;
