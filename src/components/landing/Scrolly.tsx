"use client";

/* ============================================================================
   SCROLLYTELLING «История одного водителя» — порт scrolly-половины scrolly.js.
   Пин-сцена 400vh при html.motion-ok ≥980px; фоллбэк-раскадровка (4 кадра
   вертикально с подписями) — на <980px и при reduced-motion (через CSS).
   Прогресс/active-классы обновляет window.__gtScrolly из scroll-цикла
   MotionRoot.
   ============================================================================ */

import { useEffect, useRef } from "react";
import { useLanding } from "./LandingProvider";
import { Ring } from "./Ring";

export function Scrolly() {
  const { d } = useLanding();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const section = sectionRef.current;
    if (!section) return;
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

    const track = section.querySelector<HTMLElement>(".scrolly-track");
    const steps = Array.from(section.querySelectorAll<HTMLElement>(".sstep"));
    const frames = Array.from(
      section.querySelectorAll<HTMLElement>(".scrolly-scene .frame"),
    );
    const fill = section.querySelector<HTMLElement>(".scrolly-progress .fill");
    let lastStep = -1;

    function scrollyUpdate() {
      if (!track || !root.classList.contains("motion-ok")) return;
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      if (total <= 0) return;
      const p = clamp(-rect.top / total, 0, 1);
      if (fill) fill.style.transform = "scaleX(" + p.toFixed(4) + ")";
      const idx = clamp(Math.floor(p * 4), 0, 3);
      if (idx !== lastStep) {
        lastStep = idx;
        steps.forEach((s, i) => s.classList.toggle("active", i === idx));
        frames.forEach((f, i) => f.classList.toggle("active", i === idx));
      }
    }
    window.__gtScrolly = scrollyUpdate;

    function syncScrolly() {
      if (root.classList.contains("motion-ok")) {
        lastStep = -1;
        scrollyUpdate();
      } else {
        steps.forEach((s) => s.classList.remove("active"));
        frames.forEach((f) => f.classList.remove("active"));
      }
    }

    const onApplied = () => syncScrolly();
    window.addEventListener("gt-motion-applied", onApplied);
    syncScrolly();

    return () => {
      window.removeEventListener("gt-motion-applied", onApplied);
      if (window.__gtScrolly === scrollyUpdate) delete window.__gtScrolly;
    };
  }, []);

  const s = d.scrolly;
  const m = d.mock;

  return (
    <section className="scrolly" id="product" data-screen-label="История одного водителя" ref={sectionRef}>
      <div className="scrolly-track">
        <div className="scrolly-stage">
          <div className="wrap">
            <div className="scrolly-head">
              <span className="overline">{s.overline}</span>
              <h2 className="h2">{s.h2}</h2>
            </div>
            <div className="scrolly-grid">
              <div className="scrolly-steps">
                <article className="sstep" data-step="1">
                  <span className="snum">01</span>
                  <h3>{s.s1h}</h3>
                  <p>{s.s1p}</p>
                </article>
                <article className="sstep" data-step="2">
                  <span className="snum">02</span>
                  <h3>{s.s2h}</h3>
                  <p>{s.s2p}</p>
                </article>
                <article className="sstep" data-step="3">
                  <span className="snum">03</span>
                  <h3>{s.s3h}</h3>
                  <p>{s.s3p}</p>
                </article>
                <article className="sstep" data-step="4">
                  <span className="snum">04</span>
                  <h3>{s.s4h}</h3>
                  <p>{s.s4p}</p>
                </article>
              </div>

              <div className="scrolly-scene">
                {/* Кадр 1: карточка водителя */}
                <figure className="frame" data-frame="1">
                  <figcaption><span className="snum">01</span><b>{s.cap1b}</b>{s.cap1}</figcaption>
                  <div className="scene-card">
                    <div className="dc-head">
                      <span className="avatar lg">{d.names.savchenkoAv}</span>
                      <div className="dc-id">
                        <div className="dc-eyebrow"><span>DT-092</span><span className="regpill">{m.nonEU}</span></div>
                        <div className="dc-name">{d.names.savchenkoFull} <span className="flag ua"></span></div>
                        <div className="dc-pills"><span className="ppill ok md"><span className="d"></span><span>{m.stActive}</span></span></div>
                      </div>
                      <div className="dc-stats">
                        <div className="dc-stat"><span className="dc-l">{m.docs}</span><span className="dc-v">11<span className="dim">/13</span></span></div>
                        <div className="dc-stat"><span className="dc-l">{m.urgent}</span><span className="dc-v"><span className="up">1 ▲</span><span className="down">0 ▼</span></span></div>
                      </div>
                    </div>
                    <div className="dc-tabs">
                      <span className="dc-tab active">{m.tabOverview}</span>
                      <span className="dc-tab">{m.tabDocs}</span>
                      <span className="dc-tab">{m.tabComments}</span>
                      <span className="dc-tab">{m.tabHistory}</span>
                    </div>
                    <div className="docrow">
                      <span className="dchip ok">CON</span><span className="dchip ok">LIC</span><span className="dchip ok">A1</span><span className="dchip miss">DEC</span><span className="dchip ok">INS</span><span className="dchip ok">PAS</span><span className="dchip warn">{m.chipVisaWarn}</span><span className="dchip ok">DL</span><span className="dchip ok">ADR</span><span className="dchip ok">TCH</span><span className="dchip ok">C95</span><span className="dchip ok">MED</span><span className="dchip ok">PSI</span>
                    </div>
                    <span className="scursor" style={{ left: "50%", top: "55%" }} aria-hidden="true"><svg viewBox="0 0 24 24"><use href="#i-cursor" /></svg></span>
                    <div className="dc-confid">
                      <div className="dc-confid-h"><svg className="tic"><use href="#i-lock" /></svg><span>{m.confid}</span></div>
                      <div className="iban-row"><span className="k">IBAN</span><span className="v">CZ•• •••• •••• ••14 ····</span><svg className="tic"><use href="#i-eye" /></svg></div>
                      <p className="dc-note">{m.confNote}</p>
                    </div>
                  </div>
                </figure>

                {/* Кадр 2: напоминание */}
                <figure className="frame" data-frame="2">
                  <figcaption><span className="snum">02</span><b>{s.cap2b}</b>{s.cap2}</figcaption>
                  <div className="scene-card">
                    <div className="scene-label">{m.remindTitle}</div>
                    <div className="scene-driver">
                      <span className="avatar">{d.names.savchenkoAv}</span>
                      <span className="who"><span className="nm">{d.names.savchenkoFull}</span><span className="id">DT-092</span></span>
                      <span className="dchip warn" style={{ height: 22, fontSize: "10.5px", padding: "0 8px" }}>{m.chipVisaWarn}</span>
                    </div>
                    <div className="scene-alert">
                      <svg className="tic"><use href="#i-alert" /></svg>
                      <div><b>{m.remindT}</b><span>{m.remindD}</span></div>
                    </div>
                    <div className="tg-push">
                      <span className="tgic"><svg fill="currentColor" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z" /></svg></span>
                      <div><b>{m.tgBot}</b><span>{m.tgMsg}</span><time>{m.tgTime}</time></div>
                    </div>
                    <span className="scursor" style={{ left: "14%", top: "80%" }} aria-hidden="true"><svg viewBox="0 0 24 24"><use href="#i-cursor" /></svg></span>
                  </div>
                </figure>

                {/* Кадр 3: диалог «Добавить документ» */}
                <figure className="frame" data-frame="3">
                  <figcaption><span className="snum">03</span><b>{s.cap3b}</b>{s.cap3}</figcaption>
                  <div className="scene-card">
                    <div className="dlg-head"><span>{m.dlgTitle}</span><span className="dlg-x">✕</span></div>
                    <div className="dlg-quick">
                      <div className="dlg-quick-h"><svg className="tic"><use href="#i-zap" /></svg><span>{m.dlgQuick}</span></div>
                      <div className="scene-upload">
                        <svg className="tic"><use href="#i-upload" /></svg>visa_savchenko_2028.pdf
                        <svg className="tic okic"><use href="#i-check" /></svg>
                      </div>
                    </div>
                    <div className="ai-rows">
                      <div className="ai-row"><span className="k">{m.fldType}</span><span className="v" style={{ fontFamily: "var(--font-sans)" }}>{m.fldTypeV}</span><span className="rectag">{m.recognized}</span></div>
                      <div className="ai-row"><span className="k">{m.fldNum}</span><span className="v">CZ-4471920</span><span className="rectag">{m.recognized}</span></div>
                      <div className="ai-row"><span className="k">{m.fldUntil}</span><span className="v">03.08.2028</span><span className="rectag">{m.recognized}</span></div>
                    </div>
                    <span className="scursor" style={{ left: "86%", top: "42%" }} aria-hidden="true"><svg viewBox="0 0 24 24"><use href="#i-cursor" /></svg></span>
                    <div className="scene-docs" style={{ alignItems: "center" }}>
                      <span className="dchip ok">{m.chipVisaOk}</span>
                      <span style={{ flex: 1 }}></span>
                      <Ring pct={98} big cap={m.ready} />
                    </div>
                  </div>
                </figure>

                {/* Кадр 4: доска + история */}
                <figure className="frame" data-frame="4">
                  <figcaption><span className="snum">04</span><b>{s.cap4b}</b>{s.cap4}</figcaption>
                  <div className="scene-card">
                    <div className="scene-label">{m.week25}</div>
                    <div className="scene-board">
                      <div className="board-head">
                        <span className="bh">{m.colDriver}</span><span className="bh">{m.w1}</span><span className="bh">{m.w2}</span><span className="bh">{m.w3}</span><span className="bh">{m.w4}</span><span className="bh">{m.w5}</span>
                      </div>
                      <div className="board-row">
                        <div className="cellbg"><i></i><i></i><i></i><i></i><i></i><i></i></div>
                        <div className="drv">
                          <span className="avatar">{d.names.savchenkoAv}</span>
                          <span className="dmeta">
                            <span className="dname-row"><span className="dname">{d.names.savchenko}</span><span className="flag ua"></span></span>
                            <span className="dtags"><span className="ppill trip"><span className="d"></span><span>{m.stTrip}</span><span className="spz">3QR 6671</span></span></span>
                          </span>
                        </div>
                        <div className="lane"><div className="tripbar" style={{ left: "2%", width: "76%" }}><svg className="tic"><use href="#i-truck" /></svg>3QR 6671<span className="ocount">⊕ 1</span></div></div>
                      </div>
                      <div className="board-row">
                        <div className="cellbg"><i></i><i></i><i></i><i></i><i></i><i></i></div>
                        <div className="drv">
                          <span className="avatar">{d.names.kratochvilAv}</span>
                          <span className="dmeta">
                            <span className="dname-row"><span className="dname">{d.names.kratochvil}</span><span className="flag cz"></span></span>
                            <span className="dtags"><span className="ppill ok"><span className="d"></span><span>{m.stActive}</span></span></span>
                          </span>
                        </div>
                        <div className="lane"><div className="tripbar" style={{ left: "40%", width: "58%" }}><svg className="tic"><use href="#i-truck" /></svg>3SK 7702<span className="ocount">⊕ 2</span></div></div>
                      </div>
                    </div>
                    <div className="dc-hist">
                      <div className="dc-confid-h"><svg className="tic"><use href="#i-clock" /></svg><span>{m.tabHistory}</span></div>
                      <div className="audit-row"><span className="ts">{m.histTs1}</span><span className="ev">{m.hist1}</span><span className="by">{m.histBy1}</span></div>
                      <div className="audit-row"><span className="ts">{m.histTs2}</span><span className="ev">{m.hist2}</span><span className="by">{m.histBy2}</span></div>
                    </div>
                  </div>
                </figure>
              </div>
            </div>
            <p className="scrolly-outro reveal"><b>{s.outroB}</b>{s.outro}</p>
            <div className="scrolly-progress" aria-hidden="true"><div className="fill"></div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
