import { execSync } from "node:child_process";
import type { NextConfig } from "next";

function buildSha() {
  try {
    return execSync("git rev-parse --short HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return "";
  }
}

// Vacío en el dominio propio; BASE_PATH="/portfolioR" reconstruye la versión de GitHub Pages.
const basePath = process.env.BASE_PATH ?? "";

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
    NEXT_PUBLIC_BUILD_SHA: buildSha(),
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString(),
  },
};

export default nextConfig;
