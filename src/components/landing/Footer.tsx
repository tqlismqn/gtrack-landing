"use client";

/* ============================================================================
   FOOTER — двухколоночный: бренд + tagline, секции «Правовое» и «Безопасность
   данных» (trust-сигналы подписаны группой), нижняя строка © + языки.
   Правовые ссылки ведут на app-legal (app.g-track.eu/legal?tab=…) — единый
   источник (Privacy / Terms / DPA), решение Thomas 06-15: не дублируем legal.
   ============================================================================ */

import { useLanding } from "./LandingProvider";
import { SALES_MAILTO, SALES_EMAIL, legalUrl } from "./urls";

/* Чешский флаг — inline SVG (не emoji 🇨🇿: на Windows/Chrome emoji-флаг
   рендерится как буквы «CZ»). Скруглённые углы через clip-path. */
function CzFlag() {
  return (
    <svg className="footer-flag" width="18" height="12" viewBox="0 0 18 12" role="img" aria-label="Czechia">
      <title>Czechia</title>
      <defs>
        <clipPath id="cz-flag-round"><rect width="18" height="12" rx="2" /></clipPath>
      </defs>
      <g clipPath="url(#cz-flag-round)">
        <rect width="18" height="6" fill="#ffffff" />
        <rect y="6" width="18" height="6" fill="#d7141a" />
        <path d="M0 0 L9 6 L0 12 Z" fill="#11457e" />
      </g>
    </svg>
  );
}

export function Footer() {
  const { d, lang } = useLanding();
  return (
    <footer className="footer" data-screen-label="Footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="logo" href="#top">
              <span className="logo-mark">GT</span>G-Track
              <span className="logo-tms">TMS</span>
            </a>
            <p className="footer-tagline">{d.footer.tagline}</p>
            <a className="footer-mail" href={SALES_MAILTO}>{SALES_EMAIL}</a>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h3 className="footer-h">{d.footer.legalHeading}</h3>
              <a href={legalUrl("privacy", lang)}>{d.footer.privacy}</a>
              <a href={legalUrl("terms", lang)}>{d.footer.terms}</a>
              <a href={legalUrl("dpa", lang)}>{d.footer.dpa}</a>
            </div>
            <div className="footer-col">
              <h3 className="footer-h">{d.footer.securityHeading}</h3>
              <span>{d.footer.trust1}</span>
              <span>{d.footer.trust2}</span>
              <span>{d.footer.trust3}</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{d.footer.rights}</span>
          <span className="footer-madein">
            from <CzFlag /> with{" "}
            <span className="footer-heart" role="img" aria-label="love">{"❤︎"}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
