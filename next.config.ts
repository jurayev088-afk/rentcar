import type { NextConfig } from "next";

/** NEXT_PUBLIC_API_URL dan host (masalan Render) */
function apiImageHosts() {
  const raw = process.env.NEXT_PUBLIC_API_URL || "";
  try {
    const host = new URL(raw).hostname;
    if (!host || host === "localhost" || host === "127.0.0.1") return [];
    return [
      {
        protocol: "https" as const,
        hostname: host,
        pathname: "/**",
      },
    ];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "9000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.onrender.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "rentcar-backend-sljb.onrender.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.r2.dev",
        pathname: "/**",
      },
      ...apiImageHosts(),
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
