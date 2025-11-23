import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/portfolioR",
  assetPrefix: "/portfolioR/",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
