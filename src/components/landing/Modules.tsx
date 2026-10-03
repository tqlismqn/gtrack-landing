"use client";

/* ============================================================================
   РАБОТАЕТ СЕЙЧАС — что уже работает у клиентов (решение владельца 02.10).
   Не список модулей и не колонка «Скоро»: карточка на каждое направление
   дорожной карты, у которого есть since, с вехами-чипами — те же чипы, что
   на /roadmap. Состав берётся из TRACKS (roadmap-content.ts) через trackGroups,
   своего списка здесь нет: иначе главная и /roadmap разойдутся в том, что уже
   работает. Будущее — одна приглушённая строка и ссылка на всю карту.
   ============================================================================ */

import { roadmapPath } from "@/lib/landing-i18n";
import { TRACKS, trackGroups, type TrackId } from "@/lib/roadmap-content";
import { useLanding } from "./LandingProvider";

/* Широкая карточка на l: у планирования три вехи — им нужна строка в две колонки,
   а ряды сетки выходят 1+2 / 1+1+1 без дыр (сетка — в story.css, «4.7»). */
const WIDE: TrackId = "planning";

/* TRACKS — константа, группы считаются один раз на модуль, а не на рендер */
const GROUPS = trackGroups();
const SHIPPED = TRACKS.filter((t) => GROUPS.shipped.includes(t.id));

/* Якорь карточки направления. На него ведут чипы полосы под первым экраном
   (TrustStrip, решение владельца 03.10) — формат id живёт в одном месте, иначе
   чип и карточка разойдутся молча: битый якорь не видят ни tsc, ни линтер. */
export const moduleAnchor = (id: TrackId): string => `mod-${id}`;

/* Есть ли у направления карточка на главной: карточка рождается только у тех,
   у кого в TRACKS есть since. Чип ссылается сюда, чтобы не вести в пустоту. */
export const hasModuleCard = (id: TrackId): boolean => GROUPS.shipped.includes(id);

export function Modules() {
  const { d, lang } = useLanding();
  const m = d.modules;
  const r = d.roadmap;
  /* во французском перед двоеточием стоит неразрывный пробел */
  const colon = lang === "fr" ? "\u00A0:" : ":";
  const titles = (ids: readonly TrackId[]) => ids.map((id) => r.tracks[id].t).join(" · ");

  return (
    <section className="sect" id="modules" data-screen-label="Работает сейчас">
      <div className="wrap">
        <span className="overline">{r.now}</span>
        <h2 className="h2 reveal">{m.h2}</h2>

        <ul className="mods-grid">
          {SHIPPED.map((t, i) => (
            <li key={t.id} id={moduleAnchor(t.id)} className={`mod reveal${t.id === WIDE ? " wide" : ""}`} data-delay={i * 60}>
              <span className="mod-head" aria-hidden="true">
                <span className="mod-ic"><svg className="mic"><use href={`#${t.icon}`} /></svg></span>
                <span className="mod-live"></span>
              </span>
              <h3 className="mod-t">{r.tracks[t.id].t}</h3>
              <p className="desc">{r.tracks[t.id].d}</p>
              {t.ms && t.ms.length > 0 && (
                <span className="rm-ms-list">
                  {t.ms.map((ms) => (
                    <span key={ms.id} className="rm-ms-chip"><span className="v">{ms.version}</span>{r.ms[ms.id]}</span>
                  ))}
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className="mods-foot reveal">
          <p className="mods-later">
            <span className="mods-later-part">
              <span className="rm-swatch wip" aria-hidden="true"></span>
              <span><span className="mods-later-k">{r.wip}{colon}</span> {titles(GROUPS.wipOnly)}</span>
            </span>
            <span className="mods-later-part">
              <span className="rm-swatch plan" aria-hidden="true"></span>
              <span><span className="mods-later-k">{r.next}{colon}</span> {titles(GROUPS.nextOnly)}</span>
            </span>
          </p>
          <a className="link-arrow" href={roadmapPath(lang)}>{m.cta} <span className="arr" aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  );
}
