/* ============================================================================
   Аналитика лендинга: идентификаторы, Consent Mode v2 и маркетинговые метки.

   ПОЧЕМУ КОНСТАНТЫ, А НЕ ENV: и GTM-контейнер, и ID баннера CookieScript видны
   в исходнике страницы любому посетителю — это не секреты, а публичные
   идентификаторы. Держать их в NEXT_PUBLIC_*-переменных значит добавить
   зависимость от настроек Vercel, которую нельзя проверить из репозитория:
   незаданная переменная не ломает сборку, а молча выключает аналитику на
   проде. В проекте до сих пор нет ни одного process.env, и вводить его ради
   двух публичных строк — плохая сделка.

   Порядок загрузки (см. layout-shared.tsx) обязателен и хрупкий:
     1. consent default (этот файл, инлайн в <head>)
     2. скрипт CookieScript — читает уже выставленные дефолты
     3. GTM — стартует после того, как CMP определил состояние согласия
   Меняя порядок, вы получаете либо аналитику без согласия (нарушение
   ePrivacy в EU), либо CMP, который не видит дефолтов и не умеет их обновить.
   ============================================================================ */

/** Контейнер GTM `g-track.eu`. Один на оба хоста: www (лендинг) и app. */
export const GTM_ID = "GTM-5GBZF2X8";

/** Баннер CookieScript «G-Track — www + app», домен корневой (поддомены покрыты). */
export const COOKIESCRIPT_ID = "937e5d0f1a21b6e59c233c20c3f109ee";

export const COOKIESCRIPT_SRC = `https://cdn.cookie-script.com/s/${COOKIESCRIPT_ID}.js`;

/* ----------------------------------------------------------------------------
   Consent Mode v2, режим advanced.

   Всё, кроме security_storage, стартует в denied: до явного согласия Google-тег
   отправляет только cookieless-пинги без идентификаторов. `wait_for_update: 500`
   даёт CMP полсекунды выставить фактическое состояние, иначе первый page_view
   уйдёт с дефолтами даже у вернувшегося посетителя, который согласие уже давал.

   `ads_data_redaction: true` — на время denied вырезает из рекламных запросов
   идентификаторы клика; снимается автоматически при granted для ad_storage.

   ВНИМАНИЕ: у Google-тега в GTM НЕ ставить «Require additional consent →
   analytics_storage». Тег читает analytics_storage сам; ручной гейт отключит
   advanced-режим вместе с cookieless-пингами, и это не будет видно ни в одном
   отчёте. Additional consent — только для Ads-тегов и сторонних пикселей
   (Meta не понимает Consent Mode, у неё свой fbq('consent', …)).
---------------------------------------------------------------------------- */
export const CONSENT_DEFAULT_SCRIPT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'denied',personalization_storage:'denied',security_storage:'granted',wait_for_update:500});gtag('set','ads_data_redaction',true);`;

/* ----------------------------------------------------------------------------
   Маркетинговые метки.

   Лендинг и приложение — разные origin (www.g-track.eu → app.g-track.eu), поэтому
   источник визита нужно донести до регистрации явно. GA4 склеит сессию сам через
   cross-domain linker, но только при выданном согласии; метки же нужны и для
   собственной атрибуции внутри приложения.

   FIRST-TOUCH: сохранённый набор НЕ перезаписывается. Посетитель, пришедший из
   рекламы и вернувшийся позже напрямую, должен остаться атрибуцирован рекламе —
   last-touch тут занижал бы вклад платных каналов ровно на величину возвратов.
---------------------------------------------------------------------------- */
export const MARKETING_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "gclid",
  "gclsrc",
  "fbclid",
  "msclkid",
] as const;

export const MARKETING_STORAGE_KEY = "gt-landing-attribution";

/** Хост приложения — цель, к ссылкам на которую дописываются метки. */
export const APP_HOST = "app.g-track.eu";

/**
 * Пути приложения, к которым метки дописываются. Именно белый список, а не «все
 * ссылки на APP_HOST»: на тот же хост ведут юридические страницы (`/legal`),
 * и gclid в URL политики конфиденциальности — мусор, который посетитель потом
 * скопирует и куда-нибудь пришлёт. Проверено 30.07: без этого списка метки
 * прилипали к ссылке на privacy.
 */
export const ATTRIBUTION_TARGET_PATHS = [
  "/register",
  "/login",
  "/roadmap",
] as const;

/** Начинается ли путь с одной из целей атрибуции. */
export function isAttributionTarget(pathname: string): boolean {
  return ATTRIBUTION_TARGET_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

/**
 * Дописывает сохранённые метки к URL. Чистая функция: никакого `window`, потому
 * что вызывается и из серверных компонентов. Существующие параметры (`lng`)
 * сохраняются, уже присутствующие метки не перетираются.
 */
export function withMarketingParams(
  url: string,
  params: Readonly<Record<string, string>>,
): string {
  const keys = Object.keys(params);
  if (keys.length === 0) return url;

  const [base, hash = ""] = url.split("#");
  const [path, query = ""] = base.split("?");
  const search = new URLSearchParams(query);

  for (const key of keys) {
    const value = params[key];
    if (value && !search.has(key)) search.set(key, value);
  }

  const qs = search.toString();
  return `${path}${qs ? `?${qs}` : ""}${hash ? `#${hash}` : ""}`;
}
