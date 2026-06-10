"use client";

/* ============================================================================
   «12 ЯЗЫКОВ» — пилюля «В рейсе» на цикле по 12 локалям прода
   (порт TRIP12-блока mock-i18n.js). Цикл гейтится motion-ok; в статике
   пилюля показывает текущую локаль сайта. Как и в прототипе, пилюля
   обновляется императивно (textContent/classList) — React-разметка задаёт
   только начальное состояние (RU, как в HTML прототипа).
   ============================================================================ */

import { useEffect, useRef } from "react";
import { TRIP12 } from "@/lib/landing-i18n";
import { useLanding } from "./LandingProvider";

function localeIdx(lang: string): number {
  const want = lang.toUpperCase();
  const i = TRIP12.findIndex((p) => p[0] === want);
  return i >= 0 ? i : 0;
}

export function Languages() {
  const { d, lang } = useLanding();
  const pillRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const codesRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<string>("ru");
  const syncRef = useRef<() => void>(() => {});

  useEffect(() => {
    const pillEl = pillRef.current;
    let langTimer: number | null = null;
    let swapT: number | null = null;
    let idx = 0;

    function renderLangDemo(i: number, animate: boolean) {
      const txt = textRef.current;
      const codes = codesRef.current;
      if (!txt || !codes) return;
      const apply = () => {
        txt.textContent = TRIP12[i][1];
        Array.prototype.forEach.call(codes.children, (c: Element, j: number) => {
          c.classList.toggle("active", j === i);
        });
      };
      if (animate) {
        const pill = pillRef.current;
        if (pill) pill.classList.add("swap-out");
        swapT = window.setTimeout(() => {
          apply();
          if (pill) pill.classList.remove("swap-out");
        }, 220);
      } else apply();
    }
    function syncLangDemoToLocale() {
      if (langTimer) return; /* цикл сам дойдёт */
      idx = localeIdx(langRef.current);
      renderLangDemo(idx, false);
    }
    syncRef.current = syncLangDemoToLocale;

    function startLangCycle() {
      if (langTimer) return;
      langTimer = window.setInterval(() => {
        idx = (idx + 1) % TRIP12.length;
        renderLangDemo(idx, true);
      }, 2000);
    }
    function stopLangCycle() {
      if (langTimer) {
        clearInterval(langTimer);
        langTimer = null;
      }
      syncLangDemoToLocale();
    }
    const onApplied = (e: Event) => {
      const ok = (e as CustomEvent<{ ok: boolean }>).detail?.ok;
      if (ok) startLangCycle();
      else stopLangCycle();
    };
    window.addEventListener("gt-motion-applied", onApplied);
    if (document.documentElement.classList.contains("motion-ok")) startLangCycle();
    else renderLangDemo(idx, false);

    return () => {
      window.removeEventListener("gt-motion-applied", onApplied);
      if (langTimer) clearInterval(langTimer);
      if (swapT) clearTimeout(swapT);
      pillEl?.classList.remove("swap-out");
    };
  }, []);

  /* смена локали сайта при остановленном цикле — пилюля следует локали */
  useEffect(() => {
    langRef.current = lang;
    syncRef.current();
  }, [lang]);

  return (
    <section className="langs sect-tight" id="languages" data-screen-label="12 языков">
      <div className="wrap langs-grid">
        <div>
          <span className="overline">{d.langs.overline}</span>
          <h2 className="h2 reveal">{d.langs.h2}</h2>
          <p className="sect-sub reveal" data-delay="60">{d.langs.sub}</p>
        </div>
        <div className="langs-demo reveal" data-delay="120">
          <div className="lang-pill-stage">
            <span className="ppill trip md lang-pill" ref={pillRef}>
              <span className="d"></span>
              <span ref={textRef}>{TRIP12[0][1]}</span>
              <span className="spz">3QR 6671</span>
            </span>
          </div>
          <div className="lang-codes" ref={codesRef}>
            {TRIP12.map((pair, i) => (
              <span key={pair[0]} className={`lcode${i === 0 ? " active" : ""}`}>
                {pair[0]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
