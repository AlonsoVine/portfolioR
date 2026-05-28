import type { MetadataRoute } from "next";

const SITE_URL = "https://alonsovine.github.io/portfolioR";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
