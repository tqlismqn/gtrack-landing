"use client";

/* ============================================================================
   HERO — атмосфера + живой интерфейс G-Track (цикл «истекает → продлена →
   в рейсе»). Хореография фаз — порт hero-board-половины scrolly.js.
   ОДНА смысловая правка порта: hero-sub — статичный текст «G-Track — …»
   без морфящегося .wm (морф остался только в Nav-лого).
   ============================================================================ */

import { useEffect, useRef } from "react";
import { useLanding } from "./LandingProvider";
import { Ring } from "./Ring";
import { SIGNUP_URL } from "./urls";

const C = 97.39; /* 2π·15.5 */

/* Фазы: 0 rest → 1 alert → 2 cursor-in → 3 click → 4 minicard →
         5 resolve (чип зеленеет, кольцо 98) → 6 в рейс (бар+пилюля) → 7 hold */
const PHASES = [
  { id: 0, dur: 1500 },
  { id: 1, dur: 2300 },
  { id: 2, dur: 1400 },
  { id: 3, dur: 650 },
  { id: 4, dur: 4100 },
  { id: 5, dur: 2400 },
  { id: 6, dur: 3000 },
  { id: 7, dur: 2400 },
] as const;

export function Hero() {
  const { d } = useLanding();
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const board = boardRef.current;
    if (!board) return;
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

    const ring = board.querySelector<HTMLElement>(".ring[data-live]");
    const ringVal = ring ? ring.querySelector<SVGCircleElement>(".val") : null;
    const ringNum = ring ? ring.querySelector<HTMLElement>(".ring-num") : null;
    let disposed = false;

    function setRing(p: number, instant?: boolean) {
      if (!ringVal || !ring) return;
      if (instant) {
        const prev = ringVal.style.transition;
        ringVal.style.transition = "none";
        ringVal.style.strokeDashoffset = String(C * (1 - p / 100));
        void ringVal.getBoundingClientRect();
        ringVal.style.transition = prev || "";
      } else {
        ringVal.style.strokeDashoffset = String(C * (1 - p / 100));
      }
      ring.classList.toggle("mid", p < 95);
    }
    function countRing(from: number, to: number, dur: number) {
      if (!ringNum) return;
      let start: number | null = null;
      requestAnimationFrame(function step(ts: number) {
        if (disposed || !ringNum) return;
        if (start === null) start = ts;
        const p = clamp((ts - start) / dur, 0, 1);
        const e = 1 - Math.pow(1 - p, 3);
        ringNum.textContent = Math.round(from + (to - from) * e) + "%";
        if (p < 1) requestAnimationFrame(step);
      });
    }

    /* позиции курсора/миникарточки — по реальному чипу VIS */
    function measureCursor() {
      if (!board) return;
      const chip = board.querySelector(".swap.visa");
      if (!chip) return;
      const br = board.getBoundingClientRect();
      const cr = chip.getBoundingClientRect();
      if (!br.width || !cr.width) return;
      const cx = cr.left - br.left + cr.width * 0.7;
      const cy = cr.top - br.top + cr.height * 0.85;
      board.style.setProperty("--cx", cx.toFixed(1) + "px");
      board.style.setProperty("--cy", cy.toFixed(1) + "px");
      board.style.setProperty("--cx0", (br.width - 70).toFixed(1) + "px");
      board.style.setProperty("--cy0", (br.height + 24).toFixed(1) + "px");
      /* миникарточка — под чипом, не выходя за борт */
      const mx = clamp(cr.left - br.left - 20, 10, br.width - 286);
      const my = cy + 16;
      board.style.setProperty("--mx", mx.toFixed(1) + "px");
      board.style.setProperty("--my", my.toFixed(1) + "px");
    }

    let phaseIdx = 0;
    let phaseTimer: number | null = null;

    function applyPhase(idx: number) {
      phaseIdx = idx;
      const ph = PHASES[idx].id;
      board?.setAttribute("data-phase", String(ph));
      if (ph === 0) {
        measureCursor();
        setRing(86, true);
        if (ringNum) ringNum.textContent = "86%";
      }
      if (ph === 5) {
        setRing(98);
        countRing(86, 98, 900);
      }
      if (ph === 6 && ringNum) ringNum.textContent = "98%"; /* страховка при троттлинге rAF */
    }
    function loop() {
      if (!board) return;
      applyPhase(phaseIdx);
      phaseTimer = window.setTimeout(() => {
        phaseIdx = (phaseIdx + 1) % PHASES.length;
        loop();
      }, PHASES[phaseIdx].dur);
    }
    function stopLoop() {
      if (phaseTimer) {
        clearTimeout(phaseTimer);
        phaseTimer = null;
      }
      if (board) {
        board.setAttribute("data-phase", "7"); /* resolved end state */
        setRing(98, true);
        if (ringNum) ringNum.textContent = "98%";
      }
    }
    function syncBoard() {
      if (!board) return;
      if (root.classList.contains("motion-ok")) {
        if (!phaseTimer) {
          phaseIdx = 0;
          measureCursor();
          loop();
        }
      } else {
        stopLoop();
      }
    }

    const onApplied = () => syncBoard();
    window.addEventListener("resize", measureCursor);
    window.addEventListener("gt-motion-applied", onApplied);
    syncBoard();

    return () => {
      disposed = true;
      if (phaseTimer) clearTimeout(phaseTimer);
      window.removeEventListener("resize", measureCursor);
      window.removeEventListener("gt-motion-applied", onApplied);
    };
  }, []);

  return (
    <section className="hero" data-screen-label="Hero" id="hero">
      <div className="atmo" aria-hidden="true">
        <div className="blob b1"></div><div className="blob b2"></div><div className="blob b3"></div>
        <div className="grid-layer"></div>
        <div className="fade"></div>
      </div>
      <div className="wrap hero-grid">
        <div>
          <div className="hero-kicker reveal">
            <span className="overline">{d.hero.kicker}</span>
          </div>
          <h1 id="hero-h1" className="reveal" data-delay="60">
            {d.hero.h1} <span className="dim">{d.hero.h1dim}</span>
          </h1>
          <p className="hero-sub reveal" data-delay="120">
            G-Track{d.hero.sub}
          </p>
          <div className="hero-ctas reveal" data-delay="180">
            <a className="btn accent" href={SIGNUP_URL}>{d.hero.ctaTrial}</a>
            <a className="btn ghost" href="#pricing">{d.hero.ctaPricing}</a>
          </div>
          <div className="hero-micro reveal" data-delay="240">
            <span>{d.hero.micro1}</span><span className="mdot"></span>
            <span>{d.hero.micro2}</span><span className="mdot"></span>
            <span>{d.hero.micro3}</span>
          </div>
        </div>

        <div className="reveal" data-delay="200">
          {/* живой интерфейс G-Track: цикл «истекает → продлена → в рейсе» */}
          <div
            className="pwin hero-board"
            ref={boardRef}
            data-phase="7"
            role="img"
            aria-label={d.hero.boardAria}
          >
            <div className="pwin-bar">
              <span className="pwin-title">
                <svg className="ic"><use href="#i-board" /></svg>
                <span>{d.mock.planning}</span>
              </span>
              <span className="spacer"></span>
              <span className="pwin-week">{d.mock.week24}</span>
            </div>
            <div className="pwin-kpis">
              <div className="kpi"><span className="kv blue">14</span><span className="kl">{d.mock.kpiTrip}</span></div>
              <div className="kpi"><span className="kv amber">3</span><span className="kl">{d.mock.kpiVac}</span></div>
              <div className="kpi"><span className="kv rose">2</span><span className="kl">{d.mock.kpiNoVeh}</span></div>
            </div>
            <div className="board">
              <div className="board-head">
                <span className="bh">{d.mock.colDriver}</span><span className="bh">{d.mock.d1}</span><span className="bh">{d.mock.d2}</span><span className="bh today">{d.mock.d3}</span><span className="bh">{d.mock.d4}</span><span className="bh">{d.mock.d5}</span>
              </div>
              <div className="board-row">
                <div className="cellbg"><i></i><i></i><i></i><i></i><i></i><i></i></div>
                <div className="drv">
                  <span className="avatar">{d.names.kratochvilAv}</span>
                  <span className="dmeta">
                    <span className="dname-row"><span className="dname">{d.names.kratochvil}</span><span className="flag cz"></span></span>
                    <span className="dtags">
                      <span className="ppill trip"><span className="d"></span><span>{d.mock.stTrip}</span><span className="spz">3SK 7702</span></span>
                    </span>
                  </span>
                  <Ring pct={100} cap={d.mock.ready} />
                </div>
                <div className="lane">
                  <div className="tripbar" style={{ left: "0%", width: "44%" }}><svg className="tic"><use href="#i-truck" /></svg>3SK 7702<span className="ocount">⊕ 2</span></div>
                  <div className="tripbar" style={{ left: "56%", width: "43%" }}><svg className="tic"><use href="#i-truck" /></svg>3SK 7702<span className="ocount">⊕ 1</span></div>
                </div>
              </div>
              <div className="board-row">
                <div className="cellbg"><i></i><i></i><i></i><i></i><i></i><i></i></div>
                <div className="drv">
                  <span className="avatar">{d.names.savchenkoAv}</span>
                  <span className="dmeta">
                    <span className="dname-row"><span className="dname">{d.names.savchenko}</span><span className="flag ua"></span></span>
                    <span className="dtags">
                      <span className="swap status">
                        <span className="base ppill ok"><span className="d"></span><span>{d.mock.stActive}</span></span>
                        <span className="alt ppill trip"><span className="d"></span><span>{d.mock.stTrip}</span><span className="spz">3QR 6671</span></span>
                      </span>
                      <span className="swap visa">
                        <span className="base dchip warn visa-warn">{d.mock.chipVisaWarn}</span>
                        <span className="alt dchip ok">{d.mock.chipVisaOk}</span>
                      </span>
                    </span>
                  </span>
                  <Ring pct={98} live cap={d.mock.ready} />
                </div>
                <div className="lane">
                  <div className="tripbar appear" style={{ left: "42%", width: "56%" }}><svg className="tic"><use href="#i-truck" /></svg>3QR 6671<span className="ocount">⊕ 1</span></div>
                </div>
              </div>
              <div className="board-row">
                <div className="cellbg"><i></i><i></i><i></i><i></i><i></i><i></i></div>
                <div className="drv">
                  <span className="avatar">{d.names.novakAv}</span>
                  <span className="dmeta">
                    <span className="dname-row"><span className="dname">{d.names.novak}</span><span className="flag pl"></span></span>
                    <span className="dtags">
                      <span className="ppill warn"><span className="d"></span><span>{d.mock.kpiVac}</span></span>
                    </span>
                  </span>
                  <Ring pct={92} cap={d.mock.ready} />
                </div>
                <div className="lane">
                  <div className="tripbar" style={{ left: "0%", width: "28%" }}><svg className="tic"><use href="#i-truck" /></svg>5KL 3311<span className="ocount">⊕ 2</span></div>
                  <div className="tripbar vac" style={{ left: "62%", width: "37%" }}>{d.mock.vacUntil}</div>
                </div>
              </div>
              <div className="board-row">
                <div className="cellbg"><i></i><i></i><i></i><i></i><i></i><i></i></div>
                <div className="drv">
                  <span className="avatar">{d.names.berzinsAv}</span>
                  <span className="dmeta">
                    <span className="dname-row"><span className="dname">{d.names.berzins}</span><span className="flag lv"></span></span>
                    <span className="dtags">
                      <span className="ppill warn"><span className="d"></span><span>{d.mock.sick}</span></span>
                    </span>
                  </span>
                  <Ring pct={71} mid cap={d.mock.ready} />
                </div>
                <div className="lane">
                  <div className="tripbar sick" style={{ left: "0%", width: "30%" }}>{d.mock.sick}</div>
                  <div className="tripbar" style={{ left: "44%", width: "55%" }}><svg className="tic"><use href="#i-truck" /></svg>8AL 2104<span className="ocount">⊕ 3</span></div>
                </div>
              </div>
            </div>

            <div className="btoast warn" aria-hidden="true">
              <svg className="tic"><use href="#i-alert" /></svg>
              <div><b>{d.mock.toastWarnT}</b><span>{d.mock.toastWarnD}</span></div>
            </div>
            <span className="gcursor" aria-hidden="true">
              <svg className="ptr" viewBox="0 0 24 24"><use href="#i-cursor" /></svg>
              <span className="ripple"></span>
            </span>
            <div className="minicard" aria-hidden="true">
              <div className="mc-h"><span>{d.mock.mcH}</span></div>
              <div className="mc-row tg"><svg className="tic"><use href="#i-send" /></svg><div><span>{d.mock.mc1}</span><span className="mono-sub">visa_savchenko_2028.pdf · 07:58</span></div></div>
              <div className="mc-row rec"><svg className="tic"><use href="#i-zap" /></svg><div><span>{d.mock.mc2}</span><span className="mono-sub">{d.mock.mcSub2}</span></div></div>
              <div className="mc-row ok"><svg className="tic"><use href="#i-check" /></svg><div><span>{d.mock.mc3}</span></div></div>
            </div>
          </div>
          <p className="board-caption">{d.hero.boardCaption}</p>
        </div>
      </div>
    </section>
  );
}
