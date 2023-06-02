/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['p4.music.126.net', 'cdn.vitae3.me']
  },
  experimental: {
    appDir: true
    // runtime: 'experimental-edge',
    // turbo: true,
    // serverComponentsExternalPackages: ['@prisma/client'] // prisma support
  }
};

module.exports = nextConfig;
