import type { MetadataRoute } from "next";
import { LOCALES, localePath } from "@/lib/landing-i18n";
import { SITE_ORIGIN } from "@/lib/landing-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  /* hreflang-связка всех языковых версий лендинга */
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${SITE_ORIGIN}${localePath(l)}`;
  }

  const landingPages: MetadataRoute.Sitemap = LOCALES.map((l) => ({
    url: `${SITE_ORIGIN}${localePath(l)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: l === "en" ? 1 : 0.8,
    alternates: { languages },
  }));

  return [
    ...landingPages,
    {
      url: `${SITE_ORIGIN}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_ORIGIN}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
