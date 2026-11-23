/* Метаданные /{lang}/start — рекламная страница: noindex, follow, canonical на
   себя, без hreflang и вне sitemap (тот же шаблон, что у demoMetadata). Трафик
   сюда приходит из платной рекламы, поиску страница не нужна, а хвосты ?utm_… и
   fbclid canonical на себя в копии не превращает. Вне landing-metadata.ts — по
   той же причине, что startPath (см. path.ts). */
import type { Metadata } from "next";
import type { Lang } from "../landing-i18n";
import { SITE_ORIGIN } from "../landing-metadata";
import { START_DICT } from "./index";
import { startPath } from "./path";

export function startMetadata(locale: Lang): Metadata {
  const p = START_DICT[locale];
  const url = `${SITE_ORIGIN}${startPath(locale)}`;
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
    },
    twitter: {
      card: "summary_large_image",
      title: p.metaTitle,
      description: p.metaDescription,
    },
  };
}
