/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 14+ - appDir is no longer experimental
  
  // Images: Using unoptimized for static export on Netlify
  // If using Netlify's Next.js plugin with SSR, you can remove 'unoptimized: true'
  images: {
    unoptimized: true,
    // Add your Netlify domain here after deployment (optional for external images)
    // domains: ['your-site-name.netlify.app'],
  },
  
  // Environment variables will be set in Netlify dashboard
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Trailing slash configuration (optional, but recommended for consistency)
  trailingSlash: false,
  
  // Disable eslint during build (optional, remove if you want strict checking)
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable typescript errors during build (optional, remove for strict checking)
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
