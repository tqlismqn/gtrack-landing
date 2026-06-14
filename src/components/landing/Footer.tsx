"use client";

/* ============================================================================
   FOOTER — двухколоночный редизайн: бренд + tagline, секции «Правовое» и
   «Безопасность данных» (trust-сигналы подписаны группой — больше не выглядят
   кнопками), нижняя строка © + языки. Privacy/Terms ведут на /privacy и
   /terms. Ссылка Roadmap убрана (она есть в шапке).
   ============================================================================ */

import Link from "next/link";
import { useLanding } from "./LandingProvider";
import { SALES_MAILTO, SALES_EMAIL } from "./urls";

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
              <Link href="/privacy">{d.footer.privacy}</Link>
              <Link href="/terms">{d.footer.terms}</Link>
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
