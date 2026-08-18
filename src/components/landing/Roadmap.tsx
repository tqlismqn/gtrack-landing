"use client";

/* ============================================================================
   ДОРОЖНАЯ КАРТА — три горизонта: «Работает сейчас» · «В работе» · «Дальше».
   Три, а не четыре итерации приложения: итерация смешивает выпущенное
   с планами внутри одной колонки, и перенос «как есть» воспроизвёл бы ровно
   ту неправду, ради которой карта переезжает на лендинг.
   Никаких календарных дат — их не было ни в одном источнике.
   Состав пунктов — src/lib/roadmap-content.ts, тексты — словарь.
   ============================================================================ */

import { ROADMAP, type RoadmapItem } from "@/lib/roadmap-content";
import type { LandingDict } from "@/lib/landing-i18n";
import { useLanding } from "./LandingProvider";

/* Один горизонт = колонка. `pill` красит статус теми же цветами, что секция
   модулей главной: зелёный — выпущено, янтарный — в работе, серый — план. */
function Horizon({
  title,
  tone,
  items,
  d,
  delay,
}: {
  title: string;
  tone: "green" | "amber" | "zinc";
  items: readonly RoadmapItem[];
  d: LandingDict;
  delay: number;
}) {
  return (
    <div className="rm-col">
      <div className="mods-col-head reveal" data-delay={delay}>
        <span className={`pill ${tone}`}>
          <span className={`pdot ${tone}`}></span>
          {title}
        </span>
      </div>
      <div className="mod-list">
        {items.map((item, i) => (
          <div
            key={item.icon}
            className={`mod${tone === "green" ? "" : " soon"} reveal`}
            data-delay={delay + (i + 1) * 60}
          >
            <svg className="mic">
              <use href={`#${item.icon}`} />
            </svg>
            <span className="grow">
              <b>{item.title(d)}</b>
              <span className="desc">{item.desc(d)}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Roadmap() {
  const { d } = useLanding();
  const r = d.roadmap;
  return (
    <section className="sect rm" id="roadmap" data-screen-label="Дорожная карта">
      <div className="wrap">
        <span className="overline">{d.nav.roadmap}</span>
        {/* Единственный H1 этой страницы. Он про карту, а не про продукт:
            заголовок первого экрана главной сюда не копируется — два H1
            об одном и том же на одном сайте конкурируют между собой. */}
        <h1 className="rm-h1 reveal">{r.h1}</h1>
        <p className="sect-sub reveal" data-delay="60">{r.lede}</p>
        <div className="rm-cols">
          <Horizon title={r.now} tone="green" items={ROADMAP.now} d={d} delay={0} />
          <Horizon title={r.wip} tone="amber" items={ROADMAP.wip} d={d} delay={80} />
          <Horizon title={r.next} tone="zinc" items={ROADMAP.next} d={d} delay={160} />
        </div>
      </div>
    </section>
  );
}
