const withTM = require('next-transpile-modules')(['kinto-web-sdk']);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withTM(nextConfig);