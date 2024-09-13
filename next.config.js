/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  experimental: {
    appDir: true, // Enable the app directory feature
  },
  pageExtensions: ['ts', 'tsx'], // Add support for TypeScript pages
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src'); // Create an alias for the src directory
    return config;
  },
};

module.exports = nextConfig;
