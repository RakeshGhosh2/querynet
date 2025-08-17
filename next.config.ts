

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, 
  },
  typescript: {
    ignoreBuildErrors: true,
  },

    serverExternalPackages: ["node-appwrite"], 
  
};

export default nextConfig;
