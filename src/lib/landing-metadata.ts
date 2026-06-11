/* ============================================================================
   Метаданные лендинга per-locale: title/description из словаря +
   canonical/hreflang. Канонический хост — www.g-track.eu (g-track.eu
   редиректит 308 на www).
   ============================================================================ */

import type { Metadata } from "next";
import { LANDING_DICT, LOCALES, localePath, type Lang } from "./landing-i18n";

export const SITE_ORIGIN = "https://www.g-track.eu";

/* hreflang-карта: x-default → корень (en) */
function hreflangAlternates(): NonNullable<Metadata["alternates"]>["languages"] {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${SITE_ORIGIN}${localePath(l)}`;
  }
  languages["x-default"] = SITE_ORIGIN;
  return languages;
}

export function landingMetadata(locale: Lang): Metadata {
  const d = LANDING_DICT[locale];
  return {
    title: d.meta.title,
    description: d.meta.description,
    alternates: {
      canonical: `${SITE_ORIGIN}${localePath(locale)}`,
      languages: hreflangAlternates(),
    },
    openGraph: {
      title: d.meta.title,
      description: d.meta.description,
      url: `${SITE_ORIGIN}${localePath(locale)}`,
      siteName: "G-Track",
      type: "website",
      locale: locale,
    },
    twitter: {
      card: "summary_large_image",
      title: d.meta.title,
      description: d.meta.description,
    },
  };
}
