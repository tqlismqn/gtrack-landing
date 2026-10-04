"use client";

/* ============================================================================
   ПОЛОСА «было → стало» — стоит на месте секции «Статус-кво» и втрое ниже её.
   Решение владельца 04.10 (грилёж волны «Витрина модулей», Q7): коллаж
   Excel / чат / папка снят, остаются четыре пары — по одной на экран витрины
   ниже, с теми же номерами. Слева — как это делается без системы, справа —
   экран, который это закрывает; чип повторяет вид полосы возможностей.
   Движения нет, кроме общего появления секции (.reveal).
   ============================================================================ */

import { useLanding } from "./LandingProvider";

const PAIRS = [
  { was: "p1", screen: "s1", icon: "i-send" },
  { was: "p2", screen: "s2", icon: "i-board" },
  { was: "p3", screen: "s3", icon: "i-rotate" },
  { was: "p4", screen: "s4", icon: "i-truck" },
] as const;

export function BeforeAfter() {
  const { d } = useLanding();
  const t = d.strip;
  return (
    <section className="bstrip" data-screen-label="Было → стало" aria-label={t.aria}>
      <div className="wrap">
        <ol className="bs-grid">
          {PAIRS.map((p, i) => (
            <li key={p.was} className="bs-pair reveal" data-delay={i * 60}>
              <div className="bs-head"><span className="bs-num">{`0${i + 1}`}</span></div>
              <p className="bs-was">
                <span className="bs-lbl">{t.was}</span>
                <span className="bs-txt">{t[p.was]}</span>
              </p>
              <div className="bs-now">
                <svg aria-hidden="true"><use href="#i-arrow-right" /></svg>
                <span className="bs-screen">
                  <svg aria-hidden="true"><use href={`#${p.icon}`} /></svg>
                  {t[p.screen]}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
