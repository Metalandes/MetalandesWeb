import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF primero (más liviano), luego WebP.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    // Fotos subidas desde el Studio: viven en la CDN de Sanity.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  // La sección se llama PQRS: quien escriba /pqrs llega a la página.
  async redirects() {
    return [{ source: "/pqrs", destination: "/pqr", permanent: true }];
  },
};

export default nextConfig;
