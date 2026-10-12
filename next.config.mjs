/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['react'],
  },
};

export default nextConfig;
