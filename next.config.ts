import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* /privacy и /terms лендинга теперь редиректят на app-legal (единый источник
     юридического контента; решение Thomas 06-15). Старые URL сохранены ради
     внешних ссылок и Google OAuth verification — 307 temporary, чтобы оставаться
     обратимым (legal-структура может меняться в будущем бэклоге). */
  /* Заголовки безопасности. До 29.07 лендинг не отдавал ни одного, кроме
     дефолтного вершелевского HSTS (без includeSubDomains и preload).

     Content-Security-Policy сюда НАМЕРЕННО не добавлен: на странице есть
     инлайн-скрипт применения темы, а следующим батчем приезжают GTM и пиксели.
     Ставить CSP до того, как известен итоговый список доменов тегов, — значит
     либо сломать аналитику, либо сразу написать 'unsafe-inline' и обесценить
     саму защиту. CSP идёт вместе с Б5, сначала в Report-Only. */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
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
