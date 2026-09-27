/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cybertrip.uz', 'cybertrip.onrender.com'],
  },
  async rewrites() {
    const apiTarget = process.env.NEXT_PUBLIC_API_URL || 'https://cybertrip.onrender.com/api';
    return [
      {
        source: '/api/:path*',
        destination: `${apiTarget}/:path*`,
      },
    ];
  },
};

export default nextConfig;
