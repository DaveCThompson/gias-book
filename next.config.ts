/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  output: 'export',
  basePath: '/gia-t-books',
  images: {
    unoptimized: true,
    // FIX: Updated from deprecated 'domains' to 'remotePatterns'
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;