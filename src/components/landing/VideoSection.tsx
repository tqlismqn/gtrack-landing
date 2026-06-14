"use client";

/* ============================================================================
   VID «Для этого рынка» — дрон-ролик фур на трассе (Mixkit, free commercial,
   муте/loop, веб-оптимизирован). Воспроизведение гейтится motion-ok (уважает
   prefers-reduced-motion и тумблер темы сайта); при выключенном motion —
   статичный poster. Тёмная маска слева держит читаемость текста.
   ============================================================================ */

import { useEffect, useRef } from "react";
import { useLanding } from "./LandingProvider";

export function VideoSection() {
  const { d } = useLanding();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const motionOk = () => document.documentElement.classList.contains("motion-ok");
    const apply = () => {
      if (motionOk()) {
        const p = v.play();
        if (p) p.catch(() => {});
      } else {
        v.pause();
      }
    };
    apply();
    const onMotion = () => apply();
    window.addEventListener("gt-motion-applied", onMotion);
    return () => window.removeEventListener("gt-motion-applied", onMotion);
  }, []);

  return (
    <section className="vid" data-screen-label="Для этого рынка">
      <div className="vid-media" aria-hidden="true">
        <video
          ref={videoRef}
          className="vid-video"
          muted
          loop
          playsInline
          preload="metadata"
          poster="/video/trucks-poster.jpg"
        >
          <source src="/video/trucks.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="vid-mask" aria-hidden="true"></div>
      <div className="wrap vid-content">
        <span className="overline">{d.vid.overline}</span>
        <h2 className="reveal" style={{ marginTop: 14 }}>{d.vid.h2}</h2>
        <p className="sect-sub reveal" data-delay="60">{d.vid.sub}</p>
        <div className="vid-chips reveal" data-delay="120">
          <span className="pill sky"><span className="pdot sky"></span>{d.vid.chip2}</span>
          <span className="pill sky"><span className="pdot sky"></span>{d.vid.chip3}</span>
          <span className="pill sky"><span className="pdot sky"></span>{d.vid.chip4}</span>
          {/* тахограф: карта-документ водителя хранится, но выгрузки данных DDD/CSV пока нет → amber «скоро» */}
          <span className="pill amber"><span className="pdot amber"></span>{d.vid.chip5} · {d.modules.soon}</span>
          {/* каботаж — ещё не реализован (нужен модуль «Заказы»): amber + «скоро», не sky */}
          <span className="pill amber"><span className="pdot amber"></span>{d.vid.chip1} · {d.modules.soon}</span>
          <span className="pill zinc"><span className="pdot zinc"></span>{d.vid.chip6}</span>
        </div>
      </div>
    </section>
  );
}
