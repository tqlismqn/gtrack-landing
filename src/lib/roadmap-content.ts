/* ============================================================================
   Дорожная карта — презентационный Гант по направлениям (решение владельца 25.09).
   Не список модулей: восемь крупных направлений, у каждого — что уже работает,
   что строим сейчас и что в планах. Для воронки продаж, а не для спецификации.

   Прошлое — настоящие даты выпусков приложения (gtrack-tms
   src/data/releaseNotes.ts на проде 2.4.2, `d2299072`): старт направления
   и вехи внутри него. Будущее — БЕЗ дат: владелец сроков не называл, зона
   «Дальше» делится только долями, чтобы показать порядок, а не календарь.

   Модель строится на СЕРВЕРЕ при сборке (buildRoadmapModel в RoadmapPage) и
   уходит в клиентский компонент готовыми процентами и подписями месяцев:
   `new Date()` и Intl в браузере дали бы другие числа и строки, чем при
   пререндере, и React поймал бы расхождение при гидратации.
   ============================================================================ */

import type { Lang, LandingDict } from "./landing-i18n";

export type TrackId = keyof LandingDict["roadmap"]["tracks"];
export type MilestoneId = keyof LandingDict["roadmap"]["ms"];
export type FuturePhase = "wip" | "plan";

interface TrackSpec {
  id: TrackId;
  icon: string;
  /** ISO-дата, с которой направление работает у клиентов; раньше начала оси — прижимается к краю */
  since?: string;
  /** вехи на полосе готового: версия приложения и дата выпуска */
  ms?: readonly { id: MilestoneId; version: string; date: string }[];
  /** куски зоны «Дальше» в долях её ширины (0…1), порядок важнее длины */
  future: readonly { phase: FuturePhase; from: number; to: number }[];
}

/** 1.0 — запуск у первого клиента (releaseNotes v1_0_0, 16.05.2026) */
export const LAUNCH = { version: "1.0", date: "2026-05-16" } as const;
/** ось начинается с месяца запуска: до него продукт жил только у нас */
export const AXIS_START = "2026-05-01";
/** доля ширины дорожки под прошлое; остальное — зона «Дальше» без дат */
export const PAST_SHARE = 68;
/** «50+ обновлений с запуска»: с 1.0 по 2.4.2 вышло 53 версии — формулировка остаётся правдой и дальше */
export const RELEASES_SINCE_LAUNCH_FLOOR = 50;

export const TRACKS: readonly TrackSpec[] = [
  {
    id: "drivers", icon: "i-users", since: "2025-09-01",
    future: [{ phase: "plan", from: 0.04, to: 0.42 }],
  },
  {
    id: "planning", icon: "i-board", since: "2026-03-01",
    ms: [
      { id: "autopilot", version: "2.0", date: "2026-09-03" },
      { id: "decisions", version: "2.1", date: "2026-09-15" },
      { id: "rotation", version: "2.2", date: "2026-09-20" },
    ],
    future: [{ phase: "wip", from: 0, to: 0.3 }],
  },
  {
    id: "fleet", icon: "i-truck", since: "2026-07-28",
    ms: [{ id: "service", version: "1.19", date: "2026-08-11" }],
    future: [{ phase: "wip", from: 0, to: 0.36 }],
  },
  {
    /* 1.20 (14.08) «Подключение телематики» — первая интеграция с системой мониторинга,
       проверена на живом парке. Имя провайдера на сайте не называем (решение владельца 25.09);
       «подключаем вашу» — обещание подключения, а не список готовых провайдеров. */
    id: "telematics", icon: "i-gauge", since: "2026-08-14",
    ms: [{ id: "telematics", version: "1.20", date: "2026-08-14" }],
    future: [{ phase: "plan", from: 0.1, to: 0.5 }],
  },
  {
    id: "telegram", icon: "i-send", since: "2026-06-11",
    ms: [{ id: "miniapp", version: "1.7", date: "2026-06-14" }],
    future: [{ phase: "plan", from: 0.22, to: 0.6 }],
  },
  {
    id: "reports", icon: "i-bell",
    future: [{ phase: "wip", from: 0, to: 0.44 }],
  },
  {
    id: "finance", icon: "i-receipt",
    future: [{ phase: "plan", from: 0.3, to: 0.78 }],
  },
  {
    id: "integrations", icon: "i-map",
    future: [{ phase: "plan", from: 0.54, to: 1 }],
  },
];

/* ---- модель для отрисовки ------------------------------------------------ */

export interface RoadmapSegment { phase: "done" | FuturePhase; left: number; width: number; fromPast: boolean }
export interface RoadmapMilestone { id: MilestoneId; version: string; x: number }
export interface RoadmapTrack { id: TrackId; icon: string; segments: RoadmapSegment[]; ms: RoadmapMilestone[] }
export interface RoadmapMonth { label: string; x: number; width: number }
export interface RoadmapModel {
  /** позиция «Сейчас» в процентах ширины дорожки */
  now: number;
  launchX: number;
  months: RoadmapMonth[];
  tracks: RoadmapTrack[];
}

const DAY = 86_400_000;
/** дата без времени → полночь UTC: локальный часовой пояс сборки не сдвигает день */
const utc = (iso: string) => Date.parse(`${iso}T00:00:00Z`);
const round = (n: number) => Math.round(n * 100) / 100;

export function buildRoadmapModel(locale: Lang, nowDate: Date): RoadmapModel {
  const start = utc(AXIS_START);
  const today = Date.UTC(nowDate.getUTCFullYear(), nowDate.getUTCMonth(), nowDate.getUTCDate());
  // страховка от сборки «в прошлом» (часы машины): ось не короче 30 дней
  const end = Math.max(today, start + 30 * DAY);
  const x = (t: number) => round(Math.min(Math.max((t - start) / (end - start), 0), 1) * PAST_SHARE);

  const fmt = new Intl.DateTimeFormat(locale, { month: "short", timeZone: "UTC" });
  const months: RoadmapMonth[] = [];
  for (let d = new Date(start); d.getTime() <= end; d.setUTCMonth(d.getUTCMonth() + 1)) {
    const next = Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1);
    const left = x(d.getTime());
    const width = round(x(Math.min(next, end)) - left);
    months.push({ label: fmt.format(d).replace(/\.$/, ""), x: left, width });
  }

  const tracks = TRACKS.map((t): RoadmapTrack => {
    const segments: RoadmapSegment[] = [];
    if (t.since) {
      const left = x(utc(t.since));
      segments.push({ phase: "done", left, width: round(PAST_SHARE - left), fromPast: utc(t.since) < start });
    }
    for (const f of t.future) {
      const futureW = 100 - PAST_SHARE;
      segments.push({ phase: f.phase, left: round(PAST_SHARE + f.from * futureW), width: round((f.to - f.from) * futureW), fromPast: false });
    }
    return { id: t.id, icon: t.icon, segments, ms: (t.ms ?? []).map((m) => ({ id: m.id, version: m.version, x: x(utc(m.date)) })) };
  });

  return { now: PAST_SHARE, launchX: x(utc(LAUNCH.date)), months, tracks };
}
