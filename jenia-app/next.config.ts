import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/n8n/:path*",
        destination: "https://fedemaso.app.n8n.cloud/webhook/:path*",
      },
      {
        source: "/api/n8n-test/:path*",
        destination: "https://fedemaso.app.n8n.cloud/webhook-test/:path*",
      },
    ];
  },
};

export default nextConfig;
