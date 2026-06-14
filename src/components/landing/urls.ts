/* ============================================================================
   Внешние URL лендинга.
   - Прототип вёл CTA на https://app.g-track.eu/signup — в приложении такого
     роута нет (есть /register), поэтому при порте поправлено.
   - Roadmap в прототипе вёл на локальный «G-Track Roadmap.html»; в проде
     ведём на /roadmap приложения (роут существует, но за авторизацией —
     открытый вопрос для владельца).
   ============================================================================ */

export const APP_URL = "https://app.g-track.eu";
export const SIGNUP_URL = "https://app.g-track.eu/register";
export const ROADMAP_URL = "https://app.g-track.eu/roadmap";
export const SALES_MAILTO = "mailto:sales@g-track.eu";
export const SALES_EMAIL = "sales@g-track.eu";

/* Юридические страницы ведём на app-legal (app.g-track.eu/legal) — единый
   источник, обновляется централизованно (решение Thomas 06-15: не дублировать
   legal на лендинге; контент-ревизия — отдельный бэклог). Роуты /privacy и
   /terms лендинга редиректят сюда же (next.config). */
export const LEGAL_PRIVACY_URL = "https://app.g-track.eu/legal?tab=privacy";
export const LEGAL_TERMS_URL = "https://app.g-track.eu/legal?tab=terms";
export const LEGAL_DPA_URL = "https://app.g-track.eu/legal?tab=dpa";
