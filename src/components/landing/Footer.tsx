"use client";

/* ============================================================================
   FOOTER — Privacy/Terms ведут на реальные роуты /privacy и /terms
   (в прототипе были заглушки href="#").
   ============================================================================ */

import Link from "next/link";
import { useLanding } from "./LandingProvider";
import { ROADMAP_URL, SALES_MAILTO, SALES_EMAIL } from "./urls";

export function Footer() {
  const { d } = useLanding();
  return (
    <footer className="footer" data-screen-label="Footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-left">
            <a className="logo" href="#top"><span className="logo-mark">GT</span>G-Track</a>
            <a className="footer-mail" href={SALES_MAILTO}>{SALES_EMAIL}</a>
          </div>
          <nav className="footer-links">
            <Link href="/privacy">{d.footer.privacy}</Link>
            <Link href="/terms">{d.footer.terms}</Link>
            <a href={ROADMAP_URL}>{d.footer.roadmap}</a>
          </nav>
        </div>
        <div className="footer-trust">
          <span>{d.footer.trust1}</span><span>{d.footer.trust2}</span><span>{d.footer.trust3}</span>
        </div>
      </div>
    </footer>
  );
}
