"use client";

/* ============================================================================
   TRUST — живые метрики. Финальные значения уже в разметке (SSR/no-JS);
   count-up анимируется MotionRoot по [data-target] / .cnum.
   TODO (из прототипа): подставить реальные цифры с прода перед запуском.
   ============================================================================ */

import { useLanding } from "./LandingProvider";
import { formatNum } from "@/lib/landing-i18n";

export function TrustStrip() {
  const { d } = useLanding();
  return (
    <section className="trust" data-screen-label="Метрики доверия">
      <div className="wrap trust-grid">
        <div className="metric reveal" data-target="1200">
          <div className="num"><span className="cnum">{formatNum(1200)}</span><span className="suffix">+</span></div>
          <div className="lbl">{d.trust.m1}</div>
        </div>
        <div className="metric reveal" data-delay="80" data-target="9600">
          <div className="num"><span className="cnum">{formatNum(9600)}</span><span className="suffix">+</span></div>
          <div className="lbl">{d.trust.m2}</div>
        </div>
        <div className="metric reveal" data-delay="160" data-target="12">
          <div className="num"><span className="cnum">12</span></div>
          <div className="lbl">{d.trust.m3}</div>
        </div>
      </div>
    </section>
  );
}
