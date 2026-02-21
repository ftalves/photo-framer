/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/instaready',
  output: 'export',
  images: { unoptimized: true },
  distDir: process.env.BUILD_DIR || '.next',
};

module.exports = nextConfig;
