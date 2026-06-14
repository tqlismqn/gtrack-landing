import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* /privacy и /terms лендинга теперь редиректят на app-legal (единый источник
     юридического контента; решение Thomas 06-15). Старые URL сохранены ради
     внешних ссылок и Google OAuth verification — 307 temporary, чтобы оставаться
     обратимым (legal-структура может меняться в будущем бэклоге). */
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
