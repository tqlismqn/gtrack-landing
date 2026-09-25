/* ============================================================================
   Внешние URL лендинга.
   - Прототип вёл CTA на https://app.g-track.eu/signup — в приложении такого
     роута нет (есть /register), поэтому при порте поправлено.
   - Дорожная карта здесь больше не живёт: она стала страницей лендинга
     (/roadmap и /<locale>/roadmap), путь строит roadmapPath из landing-i18n.
     Карта приложения за авторизацией, и вести на неё публичную ссылку значило
     показывать посетителю форму входа вместо содержания.
   ============================================================================ */

export const APP_URL = "https://app.g-track.eu";
export const SIGNUP_URL = "https://app.g-track.eu/register";
export const SALES_MAILTO = "mailto:sales@g-track.eu";
export const SALES_EMAIL = "sales@g-track.eu";

/* Юридические страницы ведём на app-legal (app.g-track.eu/legal) — единый
   источник, обновляется централизованно (решение Thomas 06-15: не дублировать
   legal на лендинге; контент-ревизия — отдельный бэклог). Роуты /privacy и
   /terms лендинга редиректят сюда же (next.config). Язык сайта передаём
   параметром ?lng= — app-legal читает его и открывается на этой локали
   (deep-link, решение Thomas 06-15: «если сайт на русском — legal на русском»). */
export type LegalTab = "privacy" | "terms" | "dpa";

export function legalUrl(tab: LegalTab, lang: string): string {
  return `https://app.g-track.eu/legal?tab=${tab}&lng=${lang}`;
}

/* Тот же принцип, что legalUrl: язык сайта уезжает в приложение параметром
   ?lng= (решение Thomas 07-11: «форма логина/регистрации — на языке сайта»).
   Login/Register приложения читают его так же, как app-legal. */
export function appLoginUrl(lang: string): string {
  return `${APP_URL}/login?lng=${lang}`;
}
export function appSignupUrl(lang: string): string {
  return `${APP_URL}/register?lng=${lang}`;
}
