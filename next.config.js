/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.vitae3.me']
  },
  experimental: {
    appDir: true
    // runtime: 'experimental-edge',
    // turbo: true,
    // serverComponentsExternalPackages: ['@prisma/client'] // prisma support
  }
};

module.exports = nextConfig;
