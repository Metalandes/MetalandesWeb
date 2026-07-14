import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF primero (más liviano), luego WebP.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
