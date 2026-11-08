import type { NextConfig } from "next";

const basePath = process.env.NODE_ENV === "production" ? "/portfolioR" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true },
  // Un package-lock.json vacío en la carpeta padre confunde la detección del workspace.
  turbopack: { root: process.cwd() },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
