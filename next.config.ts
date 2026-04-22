import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Placeholder local images devuelven 404 en build: se usa unoptimized para desarrollo
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
