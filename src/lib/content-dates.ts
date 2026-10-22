/* ============================================================================
   Дата последнего значимого изменения страницы — для <lastmod> в sitemap.

   Зачем (ревью SEO 22.10.2026, решение MARKETING Г174): Google не обходил /cs
   с 28.09 и показывал в выдаче старый текст «od 50 vozidel», а IndexNow из PR #37
   Google не читает (в indexnow.org/searchengines.json его нет). Google берёт
   <lastmod>, только если он «consistently and verifiably accurate»
   (developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap,
   сверено 22.10.2026) — поэтому дата сборки не годится, её и убрал PR #27.

   Одна дата на вид страницы во всех 12 локалях: правка одной локали без
   остальных — дефект (CLAUDE.md), тексты меняются разом.

   Правило: меняешь тексты, цены, числа макетов или разметку страницы — подними
   её дату здесь в том же PR, датой слияния (дата коммита слияния = день выкатки).
   Сторож — test/sitemap-lastmod.test.ts: дата не старше последнего коммита
   в файлах CONTENT_SOURCES (допуск 3 дня — PR сливают позже, чем собирают).
   Строки d.roadmap лежат в общих словарях, которые сторож относит к главной:
   правишь их — подними roadmap сам. Линия «Сейчас» на /roadmap сдвигается
   каждой сборкой — это не изменение страницы.
   ============================================================================ */

export type ContentPage = "home" | "roadmap" | "impressum";

export const CONTENT_UPDATED_AT: Record<ContentPage, string> = {
  /* WebSite.alternateName в JSON-LD (Г174); тексты — 18.10, PR #37 (meta, окна FAQ ×12) */
  home: "2026-10-22",
  /* ворота 1, PR #33: строки d.roadmap ×12; состав Ганта (roadmap-content.ts) — 03.10 */
  roadmap: "2026-10-12",
  /* PR #34: из Impressum ×12 убрано имя директора (Г40) */
  impressum: "2026-10-13",
};

/* Файлы, из которых складывается страница, — пути от корня репозитория. */
export const CONTENT_SOURCES: Record<ContentPage, readonly string[]> = {
  home: [
    "src/lib/landing-i18n.ts",
    "src/lib/landing-locales",
    "src/lib/landing-metadata.ts",
    "src/lib/hero-data.ts",
    "src/lib/showcase-data.ts",
    /* TRACKS кормят секцию «Работает сейчас» и featureList разметки */
    "src/lib/roadmap-content.ts",
    "src/lib/organization-jsonld.ts",
    "src/components/landing/JsonLd.tsx",
    "src/components/landing/Pricing.tsx",
  ],
  roadmap: ["src/lib/roadmap-content.ts"],
  impressum: ["src/lib/legal-pages", "src/lib/company.ts"],
};
