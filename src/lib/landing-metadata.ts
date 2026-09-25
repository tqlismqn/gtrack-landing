/* ============================================================================
   Метаданные лендинга per-locale: title/description из словаря +
   canonical/hreflang. Канонический хост — www.g-track.eu (g-track.eu
   редиректит 308 на www).
   ============================================================================ */

import type { Metadata } from "next";
import {
  LANDING_DICT,
  LOCALES,
  localePath,
  roadmapPath,
  type Lang,
} from "./landing-i18n";

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

/* hreflang-карта одной страницы во всех локалях: x-default → английская версия.
   Первый параметр — функция пути, а не готовый префикс: у карты путь строится
   иначе, чем у главной (en живёт на /roadmap, а не на /).
   x-default передаётся отдельной строкой, потому что у главной он исторически
   без завершающего слэша и обязан байт-в-байт совпадать со значением
   в sitemap.ts — при расхождении сигналов Google выбирает страницу сам. */
function hreflangAlternates(
  path: (lang: Lang) => string,
  xDefault: string,
): NonNullable<Metadata["alternates"]>["languages"] {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${SITE_ORIGIN}${path(l)}`;
  }
  languages["x-default"] = xDefault;
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
      languages: hreflangAlternates(localePath, SITE_ORIGIN),
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

/* Метаданные страницы дорожной карты. Своя пара title/description из
   d.roadmap.meta: без неё все 12 страниц карты наследуют title главной,
   и в выдаче они неотличимы от неё. */
export function roadmapMetadata(locale: Lang): Metadata {
  const d = LANDING_DICT[locale];
  const url = `${SITE_ORIGIN}${roadmapPath(locale)}`;
  return {
    title: d.roadmap.meta.title,
    description: d.roadmap.meta.description,
    alternates: {
      canonical: url,
      languages: hreflangAlternates(roadmapPath, `${SITE_ORIGIN}${roadmapPath("en")}`),
    },
    openGraph: {
      title: d.roadmap.meta.title,
      description: d.roadmap.meta.description,
      url,
      siteName: "G-Track",
      type: "website",
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map(
        (l) => OG_LOCALE[l],
      ),
    },
    twitter: {
      card: "summary_large_image",
      title: d.roadmap.meta.title,
      description: d.roadmap.meta.description,
    },
  };
}
