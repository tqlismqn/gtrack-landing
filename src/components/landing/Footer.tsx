"use client";

/* ============================================================================
   FOOTER — двухколоночный: бренд + tagline, секции «Правовое» и «Безопасность
   данных» (trust-сигналы подписаны группой), нижняя строка © + языки.
   Правовые ссылки ведут на app-legal (app.g-track.eu/legal?tab=…) — единый
   источник (Privacy / Terms / DPA), решение Thomas 06-15: не дублируем legal.
   ============================================================================ */

import { useLanding } from "./LandingProvider";
import {
  SALES_MAILTO,
  SALES_EMAIL,
  LEGAL_PRIVACY_URL,
  LEGAL_TERMS_URL,
  LEGAL_DPA_URL,
} from "./urls";

export function Footer() {
  const { d } = useLanding();
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
              <a href={LEGAL_PRIVACY_URL}>{d.footer.privacy}</a>
              <a href={LEGAL_TERMS_URL}>{d.footer.terms}</a>
              <a href={LEGAL_DPA_URL}>{d.footer.dpa}</a>
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
          <span>{d.footer.langs}</span>
        </div>
      </div>
    </footer>
  );
}
