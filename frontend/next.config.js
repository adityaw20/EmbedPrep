/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Netlify
  output: 'export',
  distDir: 'dist',
  
  // Images must be unoptimized for static export
  images: {
    unoptimized: true,
  },
  
  // Trailing slash for cleaner URLs
  trailingSlash: true,
  
  // Disable eslint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable typescript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
