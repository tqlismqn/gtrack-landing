/* ============================================================================
   Метаданные лендинга per-locale: title/description из словаря +
   canonical/hreflang. Канонический хост — www.g-track.eu (g-track.eu
   редиректит 308 на www).
   ============================================================================ */

import type { Metadata } from "next";
import { LANDING_DICT, LOCALES, localePath, type Lang } from "./landing-i18n";

export const SITE_ORIGIN = "https://www.g-track.eu";

/* Общая часть метаданных обоих root-layout'ов. Раньше лежала в app/layout.tsx;
   после разделения на route-группы её нужно объявить в каждой группе. */
export function baseMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_ORIGIN),
    keywords: [
      "TMS",
      "transport management",
      "fleet management",
      "driver tracking",
      "logistics",
      "EU compliance",
      "G-Track",
    ],
    authors: [{ name: "G-Track" }],
    robots: { index: true, follow: true },
  };
}

/* hreflang-карта: x-default → корень (en) */
function hreflangAlternates(): NonNullable<Metadata["alternates"]>["languages"] {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${SITE_ORIGIN}${localePath(l)}`;
  }
  languages["x-default"] = SITE_ORIGIN;
  return languages;
}

/* Open Graph требует формат language_TERRITORY: значения вида "de" Facebook и
   LinkedIn молча игнорируют. Территории выбраны по основному рынку локали. */
const OG_LOCALE: Record<Lang, string> = {
  en: "en_GB",
  ru: "ru_RU",
  de: "de_DE",
  fr: "fr_FR",
  cs: "cs_CZ",
  pl: "pl_PL",
  it: "it_IT",
  lv: "lv_LV",
  lt: "lt_LT",
  uk: "uk_UA",
  es: "es_ES",
  ro: "ro_RO",
};

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
      locale: OG_LOCALE[locale],
      /* без alternate Meta не знает, что у страницы есть версии на других языках */
      alternateLocale: LOCALES.filter((l) => l !== locale).map(
        (l) => OG_LOCALE[l],
      ),
    },
    twitter: {
      card: "summary_large_image",
      title: d.meta.title,
      description: d.meta.description,
    },
  };
}
