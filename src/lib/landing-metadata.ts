/* ============================================================================
   Метаданные лендинга per-locale: title/description из словаря +
   canonical/hreflang. Канонический хост — www.g-track.eu (g-track.eu
   редиректит 308 на www).
   ============================================================================ */

import type { Metadata } from "next";
import {
  demoPath,
  impressumPath,
  LANDING_DICT,
  LOCALES,
  localePath,
  roadmapPath,
  socialPrivacyPath,
  type Lang,
} from "./landing-i18n";
import { IMPRESSUM, SOCIAL_NOTICE } from "./legal-pages";
import { DEMO_DICT } from "./demo-page";

export const SITE_ORIGIN = "https://www.g-track.eu";

/* WebSite.alternateName (Г174, 22.10): Google показывает в выдаче имя сайта «g-track.eu»,
   а не «G-Track» — имя не уникально (g-tracking.com, gtrack.ai, g-track.co.za и GPS-приложения
   GTrack). Справка Google (site-names, сверено 22.10.2026): запасные имена — по убыванию
   предпочтения, домен — последним и строчными. «G-Track TMS» — как в шапке (знак + бейдж TMS, Г50)
   и в applicationSubCategory. На позицию в выдаче не влияет — только на подпись сайта. */
export const SITE_ALTERNATE_NAMES = ["G-Track TMS", "g-track.eu"] as const;

/* Общая часть метаданных обоих root-layout'ов. Раньше лежала в app/layout.tsx;
   после разделения на route-группы её нужно объявить в каждой группе. */
export function baseMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_ORIGIN),
    /* без «driver tracking» (02.10): G-Track не следит за водителями и не показывает
       машины на карте — слово обещало то, чего в продукте нет */
    keywords: [
      "TMS",
      "transport management",
      "fleet management",
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

/* Метаданные Impressum. Страница индексируется (robots из baseMetadata не
   перебиваем): реквизиты оператора обязаны находиться, в том числе по ссылке
   со страниц Facebook и Instagram. Своя связка hreflang ×12, x-default —
   английская /impressum, байт-в-байт как в sitemap.ts. */
export function impressumMetadata(locale: Lang): Metadata {
  const p = IMPRESSUM[locale];
  const url = `${SITE_ORIGIN}${impressumPath(locale)}`;
  const title = `${p.title} — G-Track`;
  return {
    title,
    description: p.metaDescription,
    alternates: {
      canonical: url,
      languages: hreflangAlternates(
        impressumPath,
        `${SITE_ORIGIN}${impressumPath("en")}`,
      ),
    },
    openGraph: {
      title,
      description: p.metaDescription,
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
      title,
      description: p.metaDescription,
    },
  };
}

/* Метаданные уведомления о соцсетях. noindex, follow: страницу открывают по
   ссылке со страницы Facebook, из био Instagram и из подвала, в поиске ей
   делать нечего; follow — чтобы ссылки на Privacy и документы Meta не
   обрывались для робота. В sitemap её нет, поэтому и связки hreflang нет —
   у неиндексируемой страницы она ничего не значит; canonical на себя
   оставлен, чтобы хвосты ?utm_… не плодили копий. OG — для превью ссылки,
   которой делятся в тех же Facebook и Instagram. */
export function socialPrivacyMetadata(locale: Lang): Metadata {
  const p = SOCIAL_NOTICE[locale];
  const url = `${SITE_ORIGIN}${socialPrivacyPath(locale)}`;
  const title = `${p.title} — G-Track`;
  return {
    title,
    description: p.metaDescription,
    robots: { index: false, follow: true },
    alternates: { canonical: url },
    openGraph: {
      title,
      description: p.metaDescription,
      url,
      siteName: "G-Track",
      type: "website",
      locale: OG_LOCALE[locale],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: p.metaDescription,
    },
  };
}

/* Страница заявки /{lang}/demo (ворота 2) — тот же шаблон, что у уведомления
   о соцсетях: noindex, follow, canonical на себя, без hreflang и вне sitemap.
   Индексацию и ссылки на неё включают ворота 5.5 — после публикации юр-пакета
   (форма заявки должна быть описана в Политике раньше, чем её найдут). */
export function demoMetadata(locale: Lang): Metadata {
  const p = DEMO_DICT[locale];
  const url = `${SITE_ORIGIN}${demoPath(locale)}`;
  return {
    title: p.metaTitle,
    description: p.metaDescription,
    robots: { index: false, follow: true },
    alternates: { canonical: url },
    openGraph: {
      title: p.metaTitle,
      description: p.metaDescription,
      url,
      siteName: "G-Track",
      type: "website",
      locale: OG_LOCALE[locale],
    },
    twitter: {
      card: "summary_large_image",
      title: p.metaTitle,
      description: p.metaDescription,
    },
  };
}
