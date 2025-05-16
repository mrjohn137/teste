import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      fallback: [
        {
          source: '/results/:path*',
          destination: `https://servicebus2.caixa.gov.br/portaldeloterias/api/:path*`,
        },
      ],
    }
  },
};

export default nextConfig;
