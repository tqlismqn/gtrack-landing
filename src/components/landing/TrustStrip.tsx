"use client";

/* ============================================================================
   TRUST — полоса под первым экраном: широта продукта рядом чипов-ссылок.
   Решения владельца:
     28.07 — «полоса = продуктовые факты»: не лого-стена и не клиентские метрики.
             Число водителей/документов клиента сюда НЕ возвращать без его
             письменного согласия: до 28.07.2026 здесь висели цифры прототипа.
     03.10 — «широта продукта, не три числа»: 16 · 30 · 50+ рассказывали про один
             модуль водителей, а в продукте уже планирование, Центр решений,
             ротация, транспорт, ремонт, телематика, Telegram и 12 языков.
             Ряд статичный: без бегущей строки и без count-up — все девять
             фактов видны сразу, анимировать нечего.
   Каждый чип ведёт к своей карточке «Работает сейчас» (Modules.tsx, якорь
   moduleAnchor), «12 языков» — к секции языков. Факты сверены с приложением
   на проде 2.4.5 (03.10); источники чисел: 16 типов документов —
   gtrack-tms/src/config/documentTypes.ts, горизонт ротации 14 дней / месяц /
   3 месяца — gtrack-tms/src/components/planning/balance/BalancePage.tsx.
   «Ремонт и ТО» несёт плашку «В работе» (d.roadmap.wip, слово карты): модуль
   на проде с 1.19, но владелец называет его первыми шагами, а направление
   «Транспорт и сервис» на /roadmap ещё в работе.
   «50+» с главной ушло совсем — оно на /roadmap, куда ведут ссылки в шапке,
   под «Работает сейчас» и в подвале. MotionRoot count-up на странице больше
   не нужен ([data-target] нет), его код оставлен общим и пустой список терпит.
   ============================================================================ */

import type { LandingDict } from "@/lib/landing-i18n";
import { TRACKS, type TrackId } from "@/lib/roadmap-content";
import { useLanding } from "./LandingProvider";
import { LANGUAGES_SECTION_ID } from "./Languages";
import { hasModuleCard, moduleAnchor } from "./Modules";

type ChipKey = Exclude<keyof LandingDict["trust"], "aria">;

interface CapChip {
  key: ChipKey;
  /** направление, к карточке которого ведёт чип; без него — к секции языков */
  track?: TrackId;
  /** своя иконка; без неё — иконка направления из TRACKS, та же, что на карточке и на /roadmap */
  icon?: string;
  /** плашка «В работе»: модуль на проде, направление ещё строится */
  wip?: boolean;
}

/* Порядок — порядок карточек «Работает сейчас»: чип и его цель идут в одну сторону.
   Своих иконок у Центра решений, ротации, ремонта и языков в TRACKS нет — взяты
   ближайшие из спрайта (i-wrench добавлен для ремонта: остальные ничего не говорили). */
const CHIPS: readonly CapChip[] = [
  { key: "c1", track: "drivers" },
  { key: "c2", track: "planning" },
  { key: "c3", track: "planning", icon: "i-check" },
  { key: "c4", track: "planning", icon: "i-clock" },
  { key: "c5", track: "fleet" },
  { key: "c6", track: "fleet", icon: "i-wrench", wip: true },
  { key: "c7", track: "telematics" },
  { key: "c8", track: "telegram" },
  { key: "c9", icon: "i-chat" },
];

function chipIcon(c: CapChip): string {
  return c.icon ?? TRACKS.find((t) => t.id === c.track)?.icon ?? "i-check";
}

/* Карточка есть только у направления с since в TRACKS. Потеряет его — чип поведёт
   в начало секции, а не на несуществующий якорь (битую ссылку не видит ни tsc, ни линтер). */
function chipHref(c: CapChip): string {
  if (!c.track) return `#${LANGUAGES_SECTION_ID}`;
  return hasModuleCard(c.track) ? `#${moduleAnchor(c.track)}` : "#modules";
}

/* «Направление · уточнение» — одна строка словаря, делится только для вида:
   направление голосом ссылки, уточнение тише, ниже m — своей строкой плитки (разделитель
   там прячет CSS, hero.css). Текст и порядок не меняются: textContent чипа = строка словаря.
   Нет разделителя (c3, c6, c9 или перевод без « · ») — строка целиком. */
const SEP = " · ";
function splitLabel(s: string): [string, string | null] {
  const i = s.indexOf(SEP);
  return i < 0 ? [s, null] : [s.slice(0, i), s.slice(i + SEP.length)];
}

export function TrustStrip() {
  const { d } = useLanding();
  const t = d.trust;
  return (
    <section className="trust" data-screen-label="Широта продукта">
      <nav className="wrap" aria-label={t.aria}>
        <ul className="cap-chips reveal">
          {CHIPS.map((c) => {
            /* строки нет в словаре локали (перевод отстал от ru/en) — чип не рисуем:
               без этого splitLabel падал на undefined и 10 локалей отдавали 500
               (замер 03.10 в дев-сервере, пока landing-locales ещё на m1…m3) */
            const label: string | undefined = t[c.key];
            if (!label) return null;
            const [head, tail] = splitLabel(label);
            return (
              <li key={c.key}>
                <a className="cap-chip" href={chipHref(c)}>
                  <svg className="mic" aria-hidden="true"><use href={`#${chipIcon(c)}`} /></svg>
                  {/* плашка внутри текстового пролёта, а не соседним флекс-элементом:
                      на узком чипе она переносится вместе со словами, не сжимая их */}
                  <span className="cap-t">
                    {head}
                    {tail && <span className="cap-q"><span className="cap-sep">{SEP}</span>{tail}</span>}
                    {c.wip && (
                      <>
                        {" "}
                        <span className="pill amber"><span className="pdot amber"></span>{d.roadmap.wip}</span>
                      </>
                    )}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
}
