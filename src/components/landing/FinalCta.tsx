"use client";

/* ============================================================================
   ФИНАЛЬНЫЙ CTA — атмосфера снизу + founding-сообщение.
   ============================================================================ */

import { useLanding } from "./LandingProvider";
import { SIGNUP_URL, SALES_MAILTO, SALES_EMAIL } from "./urls";

export function FinalCta() {
  const { d } = useLanding();
  return (
    <section className="final" data-screen-label="Финальный CTA">
      <div className="atmo" aria-hidden="true">
        <div className="blob b1" style={{ top: "auto", bottom: "-30vw" }}></div>
        <div className="blob b2" style={{ top: "auto", bottom: "-12vw" }}></div>
        <div
          className="grid-layer"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 64% at 50% 100%, #000, transparent 74%)",
            maskImage:
              "radial-gradient(ellipse 80% 64% at 50% 100%, #000, transparent 74%)",
          }}
        ></div>
        <div className="fade"></div>
      </div>
      <div className="wrap final-inner">
        <span className="overline">{d.final.overline}</span>
        <h2 className="reveal" style={{ marginTop: 14 }}>{d.final.h2}</h2>
        <div className="final-ctas reveal" data-delay="80">
          <a className="btn accent" href={SIGNUP_URL}>{d.final.ctaTrial}</a>
          <a className="btn ghost" href="#pricing">{d.final.ctaPricing}</a>
        </div>
        <p className="final-migrate reveal" data-delay="140">
          {d.final.migrate}<a href={SALES_MAILTO}>{SALES_EMAIL}</a>
        </p>
      </div>
    </section>
  );
}
