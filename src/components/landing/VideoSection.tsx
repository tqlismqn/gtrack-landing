"use client";

/* ============================================================================
   VID «Для этого рынка» — дрон-ролик фур на трассе (Mixkit, free commercial,
   муте/loop, веб-оптимизирован). Тёмная маска слева держит читаемость текста.

   Загрузка ролика (2,4 МиБ) ленивая и гейтится ДВУМЯ условиями сразу: секция
   подошла к вьюпорту на PRELOAD_MARGIN И движение разрешено (motion-ok —
   prefers-reduced-motion плюс тумблер движения на сайте). Пока оба не сошлись,
   в разметке нет <source>, а preload держится на "none" — сеть не трогает
   trucks.mp4 вообще. Гейт по motion-ok стоит именно на ЗАГРУЗКЕ, а не только
   на воспроизведении: иначе человек с выключенным движением качал бы 2,4 МиБ
   ролика, который ему никогда не проиграют.

   Совпали — вставляем источник и поднимаем preload до "auto": упреждение должно
   быть выражено явно, а не держаться на том, что Chromium и так качает при
   load() вопреки preload="none".

   Воспроизведение вдобавок требует, чтобы секция была в поле зрения: ушла —
   пауза, ресурсы не жгутся. Постер держит кадр до первого декодированного
   и остаётся, если ролик не загрузился.
   ============================================================================ */

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useInViewport } from "@/hooks/useInViewport";
import { useLanding } from "./LandingProvider";

/** Запас на упреждение: качать начинаем за экран с лишним до появления секции,
 *  чтобы к моменту, когда её видно, кадр уже шёл. */
const PRELOAD_MARGIN = "600px 0px";

/* Режим движения как внешний источник: владеет им MotionRoot — класс на <html>
   плюс событие о смене. Подписка вынесена из компонента, чтобы не пересоздавалась. */
const subscribeMotion = (onChange: () => void) => {
  window.addEventListener("gt-motion-applied", onChange);
  return () => window.removeEventListener("gt-motion-applied", onChange);
};
const readMotionOk = () => document.documentElement.classList.contains("motion-ok");
const readMotionOkOnServer = () => false;

export function VideoSection() {
  const { d } = useLanding();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const nearViewport = useInViewport(sectionRef, { rootMargin: PRELOAD_MARGIN });
  const isVisible = useInViewport(sectionRef);

  // Разрешено ли движение. Снимок читается прямо из класса на <html>, поэтому
  // режим, объявленный MotionRoot до нашего монтирования, не теряется.
  const motionOk = useSyncExternalStore(subscribeMotion, readMotionOk, readMotionOkOnServer);

  // Защёлка: взводится, когда близко И движение разрешено; обратно не гаснет,
  // чтобы повторный проход мимо секции не перекачивал ролик заново.
  const [loadArmed, setLoadArmed] = useState(false);
  if (!loadArmed && nearViewport && motionOk) setLoadArmed(true);

  // Источник только что появился в разметке — просим браузер выбрать ресурс.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !loadArmed) return;
    v.load();
  }, [loadArmed]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (loadArmed && isVisible && motionOk) {
      const p = v.play();
      if (p) p.catch(() => {});
    } else {
      v.pause();
    }
  }, [loadArmed, isVisible, motionOk]);

  return (
    <section className="vid" id="market" data-screen-label="Для этого рынка" ref={sectionRef}>
      <div className="vid-media" aria-hidden="true">
        <video
          ref={videoRef}
          className="vid-video"
          muted
          loop
          playsInline
          preload={loadArmed ? "auto" : "none"}
          poster="/video/trucks-poster.jpg"
        >
          {loadArmed ? <source src="/video/trucks.mp4" type="video/mp4" /> : null}
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
