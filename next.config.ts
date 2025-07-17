import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["media.s-bol.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
