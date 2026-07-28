import { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/landing-metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
      /* канонический хост — www; non-www отдаёт 308, лишний хоп для краулера */
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: SITE_ORIGIN,
  };
}
