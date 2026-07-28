/* ============================================================================
   OG-картинка 1200×630, одна на локаль. Генерируется на билде через next/og.

   Зачем: до 29.07 на лендинге не было ни og:image, ни twitter:image, при этом
   twitter:card был объявлен как summary_large_image — любой шер в LinkedIn,
   Telegram, WhatsApp и превью ссылки в объявлениях отдавали голую текстовую
   карточку. Для платного трафика это прямая потеря кликабельности.

   Шрифт вендорится в репозиторий (src/assets/fonts/Onest.ttf) намеренно:
   генерация не должна зависеть от сети на билде. Satori не умеет woff2,
   поэтому лежит ttf.
   ============================================================================ */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { LANDING_DICT, type Lang } from "./landing-i18n";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/* process.cwd() на билде = корень проекта, путь стабилен и в Vercel */
const fontData = readFileSync(
  join(process.cwd(), "src/assets/fonts/Onest.ttf"),
);

/* Токены лендинга: тёмная издательская тема, монохромный хром + акцент sky. */
const INK = "#EDEDEF";
const DIM = "#8A8A93";
const ACCENT = "#38BDF8";

export function renderOgImage(locale: Lang): ImageResponse {
  const d = LANDING_DICT[locale];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090B",
          backgroundImage:
            "radial-gradient(1000px 520px at 78% -12%, rgba(56,189,248,0.20), rgba(9,9,11,0) 70%)",
          padding: "64px 72px",
          fontFamily: "Onest",
        }}
      >
        {/* шапка: значок GT + бренд */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 60,
              height: 60,
              borderRadius: 14,
              background: ACCENT,
              color: "#04222F",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            GT
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 600,
              color: INK,
              letterSpacing: "-0.02em",
            }}
          >
            G-Track
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: 6,
              paddingTop: 6,
              fontSize: 17,
              color: DIM,
              letterSpacing: "0.14em",
            }}
          >
            TMS
          </div>
        </div>

        {/* заголовок = слоган героя, тот же голос, что на первом экране */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 68,
              lineHeight: 1.08,
              fontWeight: 700,
              color: INK,
              letterSpacing: "-0.035em",
              maxWidth: 980,
            }}
          >
            {d.hero.h1}
            <span style={{ color: DIM, marginLeft: 16 }}>{d.hero.h1dim}</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 27,
              color: DIM,
              letterSpacing: "-0.01em",
              maxWidth: 900,
            }}
          >
            {d.hero.kicker}
          </div>
        </div>

        {/* подвал: домен + три факта, которые не устаревают */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #27272A",
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex", fontSize: 25, color: ACCENT }}>
            g-track.eu
          </div>
          {/* те же три факта, что в полосе доверия на странице — с числами,
              иначе подпись читается как обрывок («days of demo») */}
          <div style={{ display: "flex", gap: 26, fontSize: 21, color: DIM }}>
            <div style={{ display: "flex" }}>
              <span style={{ color: INK, marginRight: 7 }}>16</span>
              {d.trust.m1}
            </div>
            <div style={{ display: "flex", color: "#3F3F46" }}>·</div>
            <div style={{ display: "flex" }}>
              <span style={{ color: INK, marginRight: 7 }}>30</span>
              {d.trust.m2}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [{ name: "Onest", data: fontData, style: "normal", weight: 600 }],
    },
  );
}
