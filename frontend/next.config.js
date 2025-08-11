/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api',
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
};

module.exports = nextConfig;
