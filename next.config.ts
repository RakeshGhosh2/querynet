

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true, 
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },

//     serverExternalPackages: ["node-appwrite"], 
  
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, 
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ["node-appwrite"],
  
  // Ensure proper handling of client-side routing
  trailingSlash: false,
  
  // Add redirect configuration
  async redirects() {
    return []
  },
  
  // Add rewrite configuration for better SPA behavior
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: []
    }
  },
  
  // Ensure proper headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
};

export default nextConfig;