"use client";

/* ============================================================================
   «ВСЯ ЕВРОПА НА ОДНОЙ ДОСКЕ» — порт карты из fx.js: маршруты строятся
   декларативно (геометрия — детерминированная, как buildMap), draw по входу
   во вьюпорт, через 3.1с collapse в euro-board, settled-гард, сброс при
   полном выходе из вьюпорта.
   ============================================================================ */

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { useLanding } from "./LandingProvider";

const CITIES: Record<string, [number, number]> = {
  MAD: [148, 398], BCN: [232, 372], PAR: [248, 274], LON: [256, 142],
  AMS: [292, 222], HAM: [336, 198], BER: [374, 228], PRG: [412, 264],
  MUC: [372, 296], MIL: [382, 330], ROM: [428, 398], VIE: [452, 296],
  WAW: [474, 228], BUD: [482, 312], RIG: [522, 176], VIL: [542, 214],
  KYI: [652, 240], BUC: [596, 330],
};
const ROUTES: Array<[string, string]> = [
  ["PRG", "PAR"], ["WAW", "PAR"], ["RIG", "AMS"], ["VIL", "BER"], ["PRG", "MIL"],
  ["PRG", "BCN"], ["BER", "PAR"], ["WAW", "MUC"], ["KYI", "WAW"], ["BUC", "VIE"],
  ["BUD", "HAM"], ["PRG", "ROM"], ["RIG", "MUC"], ["VIL", "AMS"], ["MAD", "PAR"],
  ["MIL", "VIE"], ["PRG", "HAM"], ["BCN", "MIL"], ["KYI", "PRG"], ["BUC", "BUD"],
];

/* геометрия маршрутов — 1:1 формулы buildMap() из fx.js */
const ROUTE_GEOMETRY = ROUTES.map((pair, i) => {
  const a = CITIES[pair[0]];
  const b = CITIES[pair[1]];
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const bow = Math.min(34, len * 0.18) * (i % 2 ? 1 : -1);
  const cx = mx - (dy / len) * bow;
  const cy = my + (dx / len) * bow;
  return {
    d: "M " + a[0] + " " + a[1] + " Q " + cx + " " + cy + " " + b[0] + " " + b[1],
    cls: i % 3 === 2 ? "vio" : "sky",
    delay: i * 90,
  };
});
const CITY_LIST = Object.keys(CITIES).map((key, k) => ({
  key,
  c: CITIES[key],
  delay: k * 160,
}));

export function Europe() {
  const { d } = useLanding();
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const stage = stageRef.current;
    if (!stage) return;
    const motionOk = () => root.classList.contains("motion-ok");

    let euroState = 0; /* 0 idle · 1 drawing · 2 collapsed */
    let collapseTimer: number | null = null;
    let settleTimer: number | null = null;
    let disposed = false;

    function euroCheck() {
      if (!stage || !motionOk()) return;
      const r = stage.getBoundingClientRect();
      const vh = window.innerHeight;
      if (euroState === 0 && r.top < vh * 0.72 && r.bottom > 0) {
        euroState = 1;
        stage.classList.add("draw");
        collapseTimer = window.setTimeout(() => {
          if (motionOk() && !disposed) {
            stage.classList.add("collapsed");
            euroState = 2;
            settleTimer = window.setTimeout(() => {
              if (!disposed) stage.classList.add("settled");
            }, 950);
          }
        }, 3100);
      }
      /* полный выход из вьюпорта — сброс, чтобы сцену можно было пересмотреть */
      if (euroState === 2 && (r.bottom < -vh * 0.5 || r.top > vh * 1.5)) {
        stage.classList.remove("draw", "collapsed", "settled");
        euroState = 0;
      }
    }
    function euroReset() {
      if (collapseTimer) { clearTimeout(collapseTimer); collapseTimer = null; }
      if (settleTimer) { clearTimeout(settleTimer); settleTimer = null; }
      stage?.classList.remove("draw", "collapsed", "settled");
      euroState = 0;
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.setTimeout(() => {
        ticking = false;
        if (!disposed) euroCheck();
      }, 120);
    };
    const onApplied = (e: Event) => {
      const ok = (e as CustomEvent<{ ok: boolean }>).detail?.ok;
      if (ok) euroCheck();
      else euroReset();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("gt-motion-applied", onApplied);
    if (motionOk()) euroCheck();

    return () => {
      disposed = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("gt-motion-applied", onApplied);
      if (collapseTimer) clearTimeout(collapseTimer);
      if (settleTimer) clearTimeout(settleTimer);
    };
  }, []);

  return (
    <section className="euro sect" id="europe" data-screen-label="Вся Европа на одной доске">
      <div className="wrap">
        <div className="euro-head">
          <span className="overline">{d.europe.overline}</span>
          <h2 className="h2 reveal">{d.europe.h2}</h2>
          <p className="sect-sub reveal" data-delay="60">{d.europe.sub}</p>
        </div>
        <div className="euro-stage" ref={stageRef}>
          <svg className="euro-map" viewBox="0 0 860 560" role="img" aria-label={d.europe.mapAria}>
            <path className="land" d="M 95 470 L 60 430 L 70 380 L 110 350 L 150 340 L 160 300 L 200 270 L 230 250 L 250 230 L 290 210 L 330 200 L 360 180 L 400 190 L 430 210 L 480 200 L 520 180 L 560 160 L 600 170 L 640 200 L 680 240 L 700 290 L 660 320 L 620 330 L 580 360 L 540 400 L 500 430 L 470 410 L 450 370 L 420 340 L 435 390 L 445 430 L 425 445 L 405 405 L 390 360 L 370 330 L 330 320 L 300 340 L 260 360 L 200 380 L 150 420 L 120 460 Z" />
            <path className="land" d="M 230 130 L 250 90 L 270 60 L 290 90 L 285 130 L 265 170 L 240 175 Z" />
            <path className="land" d="M 360 160 L 380 110 L 410 60 L 440 40 L 460 80 L 445 130 L 420 160 L 390 175 Z" />
            <g>
              {ROUTE_GEOMETRY.map((r, i) => (
                <path
                  key={i}
                  className={`route ${r.cls}`}
                  d={r.d}
                  pathLength={1}
                  style={{ "--rd": `${r.delay}ms` } as CSSProperties}
                />
              ))}
            </g>
            <g>
              {CITY_LIST.map((city) => (
                <g key={city.key}>
                  <circle
                    className="halo"
                    cx={city.c[0]}
                    cy={city.c[1]}
                    r={5}
                    style={{ "--nd": `${city.delay}ms` } as CSSProperties}
                  />
                  <circle className="node" cx={city.c[0]} cy={city.c[1]} r={2.4} />
                </g>
              ))}
            </g>
          </svg>
          <div className="euro-board">
            <div className="pwin">
              <div className="pwin-bar">
                <span className="pwin-title"><svg className="ic"><use href="#i-board" /></svg><span>{d.mock.planning}</span></span>
                <span className="spacer"></span>
                <span className="pwin-week">{d.mock.week24}</span>
              </div>
              <div className="scene-board" style={{ padding: "4px 10px 8px" }}>
                <div className="board-row">
                  <div className="cellbg"><i></i><i></i><i></i><i></i><i></i><i></i></div>
                  <div className="drv">
                    <span className="avatar">{d.names.savchenkoAv}</span>
                    <span className="dmeta">
                      <span className="dname-row"><span className="dname">{d.names.savchenko}</span><span className="flag ua"></span></span>
                      <span className="dtags"><span className="ppill trip"><span className="d"></span><span>{d.mock.stTrip}</span></span></span>
                    </span>
                  </div>
                  <div className="lane"><div className="tripbar" style={{ left: "4%", width: "60%" }}><svg className="tic"><use href="#i-truck" /></svg>3QR 6671<span className="ocount">⊕ 1</span></div></div>
                </div>
                <div className="board-row">
                  <div className="cellbg"><i></i><i></i><i></i><i></i><i></i><i></i></div>
                  <div className="drv">
                    <span className="avatar">{d.names.kratochvilAv}</span>
                    <span className="dmeta">
                      <span className="dname-row"><span className="dname">{d.names.kratochvil}</span><span className="flag cz"></span></span>
                      <span className="dtags"><span className="ppill trip"><span className="d"></span><span>{d.mock.stTrip}</span></span></span>
                    </span>
                  </div>
                  <div className="lane"><div className="tripbar" style={{ left: "34%", width: "62%" }}><svg className="tic"><use href="#i-truck" /></svg>3SK 7702<span className="ocount">⊕ 2</span></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="euro-caption reveal"><b>{d.europe.captionB}</b>{d.europe.caption}</p>
      </div>
    </section>
  );
}
