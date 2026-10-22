import type { MetadataRoute } from "next";
/* Импорты относительные, не @/: sitemap вызывает тест (test/legal-pages.test.ts),
   а vitest здесь без конфига и алиаса @/ не знает. */
import {
  impressumPath,
  LOCALES,
  localePath,
  roadmapPath,
} from "../lib/landing-i18n";
import { SITE_ORIGIN } from "../lib/landing-metadata";
import { CONTENT_UPDATED_AT } from "../lib/content-dates";

/* hreflang-связка одной страницы во всех локалях. Связки главной и карты
   раздельные: смешивать их нельзя — hreflang заявляет «то же содержание
   на другом языке», а карта и главная это разное содержание. */
function languagesFor(
  path: (lang: (typeof LOCALES)[number]) => string,
  xDefault: string,
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${SITE_ORIGIN}${path(l)}`;
  }
  /* x-default обязан совпадать с тем, что отдаётся в <head>: при расхождении
     сигналов Google выбирает страницу для безъязыковых запросов сам */
  languages["x-default"] = xDefault;
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  /* lastModified — дата последнего изменения страницы из content-dates.ts,
     не дата сборки: сборку нельзя выдавать за изменение каждой страницы. */

  const homeLanguages = languagesFor(localePath, SITE_ORIGIN);
  const landingPages: MetadataRoute.Sitemap = LOCALES.map((l) => ({
    url: `${SITE_ORIGIN}${localePath(l)}`,
    lastModified: CONTENT_UPDATED_AT.home,
    changeFrequency: "monthly",
    priority: l === "en" ? 1 : 0.8,
    alternates: { languages: homeLanguages },
  }));

  /* Дорожная карта — 12 собственных URL со своей связкой hreflang.
     Приоритет ниже главной: это вторая по важности страница сайта, но точка
     входа всё равно главная. */
  const roadmapLanguages = languagesFor(
    roadmapPath,
    `${SITE_ORIGIN}${roadmapPath("en")}`,
  );
  const roadmapPages: MetadataRoute.Sitemap = LOCALES.map((l) => ({
    url: `${SITE_ORIGIN}${roadmapPath(l)}`,
    lastModified: CONTENT_UPDATED_AT.roadmap,
    changeFrequency: "monthly",
    priority: l === "en" ? 0.9 : 0.7,
    alternates: { languages: roadmapLanguages },
  }));

  /* Impressum — 12 URL со своей связкой hreflang. Приоритет низкий и правка
     раз в год: страницу ищут по названию фирмы, а не по продукту. */
  const impressumLanguages = languagesFor(
    impressumPath,
    `${SITE_ORIGIN}${impressumPath("en")}`,
  );
  const impressumPages: MetadataRoute.Sitemap = LOCALES.map((l) => ({
    url: `${SITE_ORIGIN}${impressumPath(l)}`,
    lastModified: CONTENT_UPDATED_AT.impressum,
    changeFrequency: "yearly",
    priority: 0.3,
    alternates: { languages: impressumLanguages },
  }));

  /* /privacy и /terms больше не страницы лендинга — редиректят на app-legal
     (app.g-track.eu/legal), поэтому из sitemap лендинга исключены. */
  return [...landingPages, ...roadmapPages, ...impressumPages];
}
