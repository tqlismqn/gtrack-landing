"use client";

/* ============================================================================
   VID «Для этого рынка» — ночная трасса (CSS-постер: дорога, фары, зерно).
   TODO (из прототипа): прод-ролик фур на европейских трассах —
   добавить src + poster (muted, lazy), тогда .vid-video opacity → 1.
   ============================================================================ */

import { useLanding } from "./LandingProvider";

export function VideoSection() {
  const { d } = useLanding();
  return (
    <section className="vid" data-screen-label="Для этого рынка">
      <div className="vid-media" aria-hidden="true">
        <video className="vid-video" muted loop playsInline preload="none"></video>
        <div className="vid-road"></div>
        <div className="vid-beam bm1"></div>
        <div className="vid-beam bm2"></div>
        <div className="vid-streak s1"></div>
        <div className="vid-streak s2"></div>
        <div className="vid-streak s3"></div>
        <div className="vid-grain"></div>
      </div>
      <div className="vid-mask" aria-hidden="true"></div>
      <span className="vid-tag">{d.vid.tag}</span>
      <div className="wrap vid-content">
        <span className="overline">{d.vid.overline}</span>
        <h2 className="reveal" style={{ marginTop: 14 }}>{d.vid.h2}</h2>
        <p className="sect-sub reveal" data-delay="60">{d.vid.sub}</p>
        <div className="vid-chips reveal" data-delay="120">
          <span className="pill sky"><span className="pdot sky"></span>{d.vid.chip1}</span>
          <span className="pill sky"><span className="pdot sky"></span>{d.vid.chip2}</span>
          <span className="pill sky"><span className="pdot sky"></span>{d.vid.chip3}</span>
          <span className="pill sky"><span className="pdot sky"></span>{d.vid.chip4}</span>
          <span className="pill sky"><span className="pdot sky"></span>{d.vid.chip5}</span>
          <span className="pill zinc"><span className="pdot zinc"></span>{d.vid.chip6}</span>
        </div>
      </div>
    </section>
  );
}
