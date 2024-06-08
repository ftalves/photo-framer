/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: process.env.BUILD_DIR || '.next',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/photo-framer' : '/',
};

module.exports = nextConfig;
