"use client";

/* ============================================================================
   ДОРОЖНАЯ КАРТА — презентационный Гант по направлениям (решение владельца 25.09).
   Семь строк-направлений на общей оси времени: сплошная полоса — работает,
   полосатая — в работе, пунктир — в планах. Прошлое — по настоящим датам
   выпусков, «Сейчас» — дата сборки, «Дальше» — без дат.
   Геометрия приходит готовой из buildRoadmapModel (сервер, при пререндере);
   здесь только разметка и тексты словаря.
   ============================================================================ */

import type { CSSProperties } from "react";
import type { RoadmapModel, RoadmapSegment } from "@/lib/roadmap-content";
import { RELEASES_SINCE_LAUNCH_FLOOR } from "@/lib/roadmap-content";
import type { LandingDict } from "@/lib/landing-i18n";
import { useLanding } from "./LandingProvider";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

const TONE = { done: "green", wip: "amber", plan: "zinc" } as const;

/** подпись статуса для скринридера: полосы — чистая графика */
function phaseLabel(r: LandingDict["roadmap"], s: RoadmapSegment) {
  return s.phase === "done" ? r.now : s.phase === "wip" ? r.wip : r.next;
}

export function Roadmap({ model }: { model: RoadmapModel }) {
  const { d } = useLanding();
  const r = d.roadmap;
  return (
    <section className="sect rm" id="roadmap" data-screen-label="Дорожная карта">
      <div className="wrap">
        <span className="overline">{d.nav.roadmap}</span>
        {/* Единственный H1 этой страницы — про карту, а не про продукт. */}
        <h1 className="rm-h1 reveal">{r.h1}</h1>
        <p className="sect-sub rm-lede reveal" data-delay="60">
          <span className="rm-live">
            <span className="rm-live-dot" aria-hidden="true"></span>
            {r.releases.replace("{n}", String(RELEASES_SINCE_LAUNCH_FLOOR))}
          </span>{" "}
          {r.lede}
        </p>

        <div className="rm-legend reveal" data-delay="100" aria-hidden="true">
          {(["done", "wip", "plan"] as const).map((p) => (
            <span key={p} className="rm-key">
              <span className={`rm-swatch ${p}`}></span>
              {p === "done" ? r.now : p === "wip" ? r.wip : r.next}
            </span>
          ))}
        </div>

        <div className="rm-gantt reveal" data-delay="140" style={{ "--now": `${model.now}%` } as Vars} role="list" aria-label={r.aria}>
          {/* ось: месяцы прошлого, «Сейчас», зона «Дальше» */}
          <div className="rm-row rm-axis" aria-hidden="true">
            <div className="rm-label"></div>
            <div className="rm-lane">
              {model.months.map((m) => (
                <span key={m.x} className="rm-month" style={{ left: `${m.x}%`, width: `${m.width}%` }}>{m.label}</span>
              ))}
              <span className="rm-launch" style={{ left: `${model.launchX}%` }}>{r.launch}</span>
              <span className="rm-nowmark">{r.nowMark}</span>
              <span className="rm-future">{r.next}</span>
            </div>
          </div>

          {model.tracks.map((t, i) => {
            const tr = r.tracks[t.id];
            return (
              <div key={t.id} className="rm-row" role="listitem" style={{ "--i": i } as Vars}>
                <div className="rm-label">
                  <svg className="mic" aria-hidden="true"><use href={`#${t.icon}`} /></svg>
                  <span className="grow">
                    <b>{tr.t}</b>
                    <span className="desc">{tr.d}</span>
                    {t.ms.length > 0 && (
                      <span className="rm-ms-list">
                        {t.ms.map((m) => (
                          <span key={m.id} className="rm-ms-chip"><span className="v">{m.version}</span>{r.ms[m.id]}</span>
                        ))}
                      </span>
                    )}
                    <span className="sr-only">
                      {" — "}{t.segments.map((s) => phaseLabel(r, s)).filter((v, k, a) => a.indexOf(v) === k).join(", ")}
                    </span>
                  </span>
                </div>
                <div className="rm-lane" aria-hidden="true">
                  {t.segments.map((s, k) => (
                    <span
                      key={k}
                      className={`rm-bar ${s.phase}${s.fromPast ? " from-past" : ""}`}
                      data-tone={TONE[s.phase]}
                      style={{ left: `${s.left}%`, width: `${s.width}%` }}
                    ></span>
                  ))}
                  {t.ms.map((m) => (
                    <span key={m.id} className="rm-diamond" style={{ left: `${m.x}%` }} title={`${m.version} · ${r.ms[m.id]}`}></span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
