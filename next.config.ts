import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yciprniwhgktibczuyql.supabase.co",
      },
    ],
  },
};

export default nextConfig;