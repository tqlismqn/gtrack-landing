/* Путь рекламной страницы той же локали. Слаг английский во всех локалях, как у
   /demo и /roadmap. Живёт здесь, а не в landing-i18n.ts: тот файл — источник даты
   главной в content-dates.ts, и правка пути рекламной страницы заставила бы
   поднимать lastmod главной, которая не менялась. */
import type { Lang } from "../landing-i18n";

export function startPath(lang: Lang): string {
  return lang === "en" ? "/start" : `/${lang}/start`;
}
