/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/uploads/:path*', // Match the uploads folder
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate, max-age=0', // Disable caching for uploads folder
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml', // Define the sitemap route
        destination: '/api/sitemap', // Point it to the dynamic API
      },
    ];
  },
};

export default nextConfig;
