"use client";

/* ============================================================================
   ВИТРИНА «Одна заявка» (#product) — стоит на месте истории одного водителя.
   Решения владельца 03–04.10 (грилёж волны «Витрина модулей»):
     Q1 — история с движущейся картой снята целиком;
     Q2 — статичная сетка, все экраны видны сразу; единственное движение —
          мигающая точка «ждут ответа» и общее появление секции;
     Q3 — экраны: Telegram · планировщик · ротация · карточка машины; один
          выдуманный водитель проходит через все четыре.
   Экраны и подписи повторяют макеты, утверждённые 04.10 (design/showcase-2026-10-04
   в vault). Правдивость: всё нарисованное работает у клиента без трекера.
   Раскладка трёх кадров — в showcase.css; порядок в разметке = порядок шагов
   (1) → (2) → ↩ → (3) → (4), он же порядок чтения на телефоне. Карточка ответа
   рендерится дважды — под телефоном (≥ l) и под планировщиком (< l): колонка
   телефона на десктопе живёт своей высотой, и одним местом в разметке оба
   кадра не собрать; лишнюю копию прячет display: none.
   Доступность: макет — картинка (role="img") с именем экрана; что на ней происходит,
   говорит подпись figcaption. Бейдж шага с временем — украшение, от чтения скрыт,
   номер шага звучит один раз, в подписи.
   id="product" обязателен — на него ведёт «Продукт» в навигации.
   ============================================================================ */

import type { LandingDict } from "@/lib/landing-i18n";
import { REQUEST, ROTATION, VEHICLE, fill, fmtDM } from "@/lib/showcase-data";
import { useLanding } from "./LandingProvider";
import { AnswerCard, PlannerScreen, RotationScreen, TelegramScreen, VehicleScreen } from "./ShowcaseScreens";

type S = LandingDict["showcase"];

const ARROW_RIGHT = (
  <svg viewBox="0 0 20 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 6h17" /><path d="m13.5 1.5 4.5 4.5-4.5 4.5" />
  </svg>
);
const ARROW_LEFT = (
  <svg viewBox="0 0 20 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 6H2" /><path d="M6.5 1.5 2 6l4.5 4.5" />
  </svg>
);
const ARROW_DOWN = (
  <svg viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 1v17" /><path d="m1.5 13.5 4.5 4.5 4.5-4.5" />
  </svg>
);

/** Стрелка между панелями в одноколоночном кадре. */
function Down() {
  return <div className="vconn" aria-hidden="true">{ARROW_DOWN}</div>;
}

function Caption({ n, title, body }: { n: string; title: string; body?: string }) {
  return (
    <figcaption className="cap">
      <span className="cap-h"><span className="step-n">{n}</span><span>{title}</span></span>
      {body && <span className="cap-b">{body}</span>}
    </figcaption>
  );
}

function Answer({ s, screen }: { s: S; screen: string }) {
  return (
    <figure className="ph-ans reveal">
      <span className="step" aria-hidden="true"><span className="step-n">↩</span><span>{REQUEST.answeredTime}</span></span>
      <AnswerCard s={s} label={screen} />
      <Caption n="↩" title={s.cAns} />
    </figure>
  );
}

export function Showcase() {
  const { d } = useLanding();
  const s = d.showcase;
  const t = d.strip;
  return (
    <section className="loop sect" id="product" data-screen-label="Одна заявка">
      <div className="wrap">
        <header>
          <span className="overline">{s.overline}</span>
          <h2 className="h2 reveal">{s.h2}</h2>
          <p className="sect-sub reveal" data-delay="60">{s.sub}</p>
          <p className="legend reveal" data-delay="100">
            {s.legend}{" "}
            <span className="thread" data-t="marek">{s.marek}</span>
            {" · "}
            <span className="thread" data-t="gt114">{VEHICLE.name}</span>
            {" · "}
            <span className="thread" data-t="dates">{fmtDM(REQUEST.from)}–{fmtDM(REQUEST.to)}</span>
          </p>
        </header>

        <div className="bento-wrap">
          <div className="loop-grid" aria-hidden="true"></div>
          <div className="bento">
            <div className="bx-phone">
              <figure className="ph-main reveal">
                <span className="step" aria-hidden="true"><span className="step-n">1</span><span>{REQUEST.createdTime}</span></span>
                <TelegramScreen s={s} label={t.s1} />
                <Caption n="1" title={s.c1h} body={s.c1p} />
              </figure>
              <Answer s={s} screen={t.s1} />
            </div>

            <Down />

            <div className="bx-side">
              <figure className="bx-plan reveal" data-delay="60">
                <span className="step" aria-hidden="true"><span className="step-n">2</span><span>{REQUEST.answeredTime}</span></span>
                <span className="conn c12" aria-hidden="true">{ARROW_RIGHT}</span>
                <span className="conn c2r" aria-hidden="true">{ARROW_LEFT}</span>
                <PlannerScreen s={s} label={t.s2} />
                <Caption n="2" title={s.c2h} body={s.c2p} />
              </figure>
              <Down />
              <Answer s={s} screen={t.s1} />
            </div>

            <Down />

            <figure className="bx-rot reveal" data-delay="100">
              <span className="step solo" aria-hidden="true"><span className="step-n">3</span></span>
              <span className="conn down c23" aria-hidden="true">{ARROW_DOWN}</span>
              <RotationScreen s={s} label={t.s3} />
              <Caption n="3" title={s.c3h} body={fill(s.c3p, { n: ROTATION.horizonDays })} />
            </figure>

            <Down />

            <figure className="bx-veh reveal" data-delay="140">
              <span className="step solo" aria-hidden="true"><span className="step-n">4</span></span>
              <span className="conn c34" aria-hidden="true">{ARROW_RIGHT}</span>
              <VehicleScreen s={s} label={t.s4} />
              <Caption n="4" title={s.c4h} body={s.c4p} />
            </figure>
          </div>
        </div>

        <p className="loop-foot">{s.foot}</p>
      </div>
    </section>
  );
}
