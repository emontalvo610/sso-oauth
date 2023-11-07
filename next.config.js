// eslint-disable-next-line import/no-extraneous-dependencies
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  output: 'standalone',
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  reactStrictMode: false,
  compress: true,
  experimental: {
    webpackBuildWorker: true
  }
});

module.exports = nextConfig;
