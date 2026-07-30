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

   Проверено на проде 30.07: страница не обращается ни к одному внешнему origin,
   кроме собственных — шрифты self-hosted через next/font. Поэтому всё внешнее
   ниже — ровно то, что добавляет аналитика.

   ⚠️ Домены CookieScript кроме cdn.* помечены как ПРЕДПОЛОЖЕНИЕ: у вендора есть
   отдельный хост записи согласий, фактическое имя нужно снять во вкладке Network
   ДО перевода в enforcing, иначе журнал согласий молча перестанет писаться.
   Wildcard *.cookie-script.com на время Report-Only это закрывает.
============================================================================ */
const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://cdn.cookie-script.com https://*.cookie-script.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.googletagmanager.com https://*.googletagmanager.com https://*.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://cdn.cookie-script.com https://*.cookie-script.com",
  "frame-src https://www.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  /* upgrade-insecure-requests сюда НЕ добавлять: в report-only политике браузер
     её игнорирует и пишет ошибку в консоль каждому посетителю (проверено
     локально 30.07). Директива уезжает в тот же PR, что и перевод в enforcing. */
].join("; ");

const nextConfig: NextConfig = {
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
