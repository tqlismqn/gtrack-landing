import type { NextConfig } from "next";

/* ============================================================================
   Content-Security-Policy, пока РЕЖИМ ОТЧЁТА (Report-Only): браузер не блокирует
   ничего, только пишет нарушения. Перевод в enforcing — отдельным PR, после того
   как неделя реального трафика покажет, что список доменов полон.

   БЕЗ NONCE — сознательно. Nonce требует уникального значения на запрос, то есть
   динамического рендера: 21 статический маршрут перестал бы кешироваться на CDN.
   И это всё равно не купило бы защиты: GTM по своей природе исполняет
   произвольный код через Custom HTML tag, а к нонсу у него доступ есть.

   'unsafe-inline' в script-src покрывает инлайны, которые уже на странице:
   bootstrap-чанки Next (их 20+), применение темы, JSON-LD и наш consent default.

   Проверено на проде 30.07: страница не обращалась ни к одному внешнему origin,
   кроме собственных — шрифты self-hosted через next/font. 11.10 добавлено: Meta
   Pixel и Google Ads (теги грузит GTM v6/v7: connect.facebook.net, beacon на
   facebook.com, googleadservices / doubleclick / googlesyndication) и приём заявок
   формы /demo — fetch на функцию Supabase, ровно один хост проекта, без
   *.supabase.co. Всё остальное внешнее ниже — по-прежнему аналитика и согласие.
   Список взят из контейнера, снимка gtag и таблицы Google «CSP для тегов»
   (Google Ads ставит пиксели на www.google.<домен страны> — перечислены страны
   рекламы: cz sk pl lt lv de it fr). www.facebook.com нужен и в frame-src, и в
   form-action: когда GET-адрес события длиннее 2048 символов, fbevents.js шлёт его
   POST-формой на https://www.facebook.com/tr/ в скрытый iframe (модуль
   signalsFBEventsSendFormPOST; в Chrome beacon на этом пути не пробуется). Без
   form-action в enforcing такие события молча пропадут (ревью ветки ворот 1, 11.10).
   gtm.js просит 'unsafe-eval' — осознанно не даём (сторож — csp.test.ts).
   Report-Only пишет нарушения только в консоль посетителя,
   отчётов на сервер нет: недостающее покажет прогон Playwright / Tag Assistant.

   ⚠️ Домены CookieScript кроме cdn.* помечены как ПРЕДПОЛОЖЕНИЕ: у вендора есть
   отдельный хост записи согласий, фактическое имя нужно снять во вкладке Network
   ДО перевода в enforcing, иначе журнал согласий молча перестанет писаться.
   Wildcard *.cookie-script.com на время Report-Only это закрывает.
============================================================================ */
export const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.googleadservices.com https://www.google.com https://connect.facebook.net https://cdn.cookie-script.com https://*.cookie-script.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.googletagmanager.com https://*.googletagmanager.com https://*.google-analytics.com https://www.facebook.com https://www.google.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://*.doubleclick.net https://pagead2.googlesyndication.com https://www.google.cz https://www.google.sk https://www.google.pl https://www.google.lt https://www.google.lv https://www.google.de https://www.google.it https://www.google.fr",
  "font-src 'self' data:",
  "connect-src 'self' https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://cdn.cookie-script.com https://*.cookie-script.com https://connect.facebook.net https://www.facebook.com https://www.google.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://*.doubleclick.net https://pagead2.googlesyndication.com https://adservice.google.com https://www.google.cz https://www.google.sk https://www.google.pl https://www.google.lt https://www.google.lv https://www.google.de https://www.google.it https://www.google.fr https://qawvvbjmfimpyilaqsrj.supabase.co",
  "frame-src https://www.googletagmanager.com https://td.doubleclick.net https://www.googleadservices.com https://www.facebook.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://www.facebook.com",
  "frame-ancestors 'none'",
  /* upgrade-insecure-requests сюда НЕ добавлять: в report-only политике браузер
     её игнорирует и пишет ошибку в консоль каждому посетителю (проверено
     локально 30.07). Директива уезжает в тот же PR, что и перевод в enforcing. */
].join("; ");

const nextConfig: NextConfig = {
  /* Кеш Turbopack для `next build` выключен. С Next 16.3 он включён по умолчанию
     (`.next/cache/turbopack`), а Vercel восстанавливает `.next/cache` от прошлого
     деплоя. Превью ворот 1 (12.10, c99919b, «Restored build cache…», компиляция 7,9 с)
     собралось с правками старых CSS-файлов, но без двух новых из `@import` в
     `styles/landing/index.css` — `hero-scenes.css` и `legal.css`: hero и юр-страницы
     без стилей. Локально с тем же кешем не воспроизвелось. Сборка без кеша дольше
     на десятки секунд; страховка от повтора — `scripts/check-css-imports.mjs`
     после `next build` (package.json). */
  experimental: {
    turbopackFileSystemCacheForBuild: false,
  },
  /* /privacy и /terms лендинга теперь редиректят на app-legal (единый источник
     юридического контента; решение Thomas 06-15). Старые URL сохранены ради
     внешних ссылок и Google OAuth verification — 307 temporary, чтобы оставаться
     обратимым (legal-структура может меняться в будущем бэклоге). */
  /* Заголовки безопасности. До 29.07 лендинг не отдавал ни одного, кроме
     дефолтного вершелевского HSTS (без includeSubDomains и preload).

     CSP приехала с Б5 в Report-Only — обоснование режима и списка доменов
     см. над константой CSP_REPORT_ONLY. */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy-Report-Only",
            value: CSP_REPORT_ONLY,
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      /* /en → корень, метки (query) Next переносит сам. ДВА правила: одно
         `/en/:path*` для голого /en даёт `location: ?utm…` — петлю. */
      { source: "/en", destination: "/", permanent: false },
      { source: "/en/:path+", destination: "/:path+", permanent: false },
      {
        source: "/privacy",
        destination: "https://app.g-track.eu/legal?tab=privacy",
        permanent: false,
      },
      {
        source: "/terms",
        destination: "https://app.g-track.eu/legal?tab=terms",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
