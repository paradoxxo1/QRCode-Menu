import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  experimental: {
    serverActions: {
      // Product photo uploads go through a Server Action and are validated
      // (and rejected if needed) at 5MB in src/lib/upload.ts — this must be
      // at least that big, plus room for multipart/form-data overhead.
      bodySizeLimit: "6mb",
    },
  },
};

export default nextConfig;
