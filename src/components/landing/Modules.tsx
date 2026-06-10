"use client";

/* ============================================================================
   МОДУЛИ И ГОРИЗОНТ — две колонки «Готово / Скоро».
   ============================================================================ */

import { useLanding } from "./LandingProvider";
import { ROADMAP_URL } from "./urls";

export function Modules() {
  const { d } = useLanding();
  const m = d.modules;
  return (
    <section className="sect" id="modules" data-screen-label="Модули и горизонт">
      <div className="wrap">
        <span className="overline">{m.overline}</span>
        <h2 className="h2 reveal">{m.h2}</h2>
        <div className="mods-cols">
          <div>
            <div className="mods-col-head reveal"><span className="pill green"><span className="pdot green"></span>{m.ready}</span></div>
            <div className="mod-list">
              <div className="mod reveal"><svg className="mic"><use href="#i-users" /></svg><span className="grow"><b>{m.m1}</b><span className="desc">{m.m1d}</span></span></div>
              <div className="mod reveal" data-delay="60"><svg className="mic"><use href="#i-file" /></svg><span className="grow"><b>{m.m2}</b><span className="desc">{m.m2d}</span></span></div>
              <div className="mod reveal" data-delay="120"><svg className="mic"><use href="#i-board" /></svg><span className="grow"><b>{m.m3}</b><span className="desc">{m.m3d}</span></span></div>
              <div className="mod reveal" data-delay="180"><svg className="mic"><use href="#i-truck" /></svg><span className="grow"><b>{m.m4}</b><span className="desc">{m.m4d}</span></span></div>
            </div>
          </div>
          <div>
            <div className="mods-col-head reveal"><span className="pill amber"><span className="pdot amber"></span>{m.soon}</span></div>
            <div className="mod-list">
              <div className="mod soon reveal"><svg className="mic"><use href="#i-package" /></svg><span className="grow"><b>{m.m5}</b><span className="desc">{m.m5d}</span></span></div>
              <div className="mod soon reveal" data-delay="60"><svg className="mic"><use href="#i-receipt" /></svg><span className="grow"><b>{m.m6}</b><span className="desc">{m.m6d}</span></span></div>
              <div className="mod soon reveal" data-delay="120"><svg className="mic"><use href="#i-chart" /></svg><span className="grow"><b>{m.m7}</b><span className="desc">{m.m7d}</span></span></div>
              <div className="mod soon reveal" data-delay="180"><svg className="mic"><use href="#i-send" /></svg><span className="grow"><b>{m.m8}</b><span className="desc">{m.m8d}</span></span></div>
            </div>
          </div>
        </div>
        <div className="mods-cta reveal">
          <a className="link-arrow" href={ROADMAP_URL}>{m.cta} <span className="arr">→</span></a>
        </div>
      </div>
    </section>
  );
}
