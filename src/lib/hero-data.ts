/* ============================================================================
   Hero — данные трёх сцен: «мир» (дата, время), шаги цикла и их длительности,
   машины сцены B с телематикой. Чистый модуль без DOM и без локального часового
   пояса: время макета — строка «YYYY-MM-DDTHH:mm», разбор только через Date.UTC,
   поэтому тест даёт то же в любом TZ Node. Импорты — только относительные
   (vitest не знает алиас `@/`).

   Мир — как был у hero: неделя 24, пн 08.06 – пт 12.06.2026, «сегодня» — ср 10.06,
   «сейчас» — 15:04 (после «82 км/ч · 14:52»).
   ============================================================================ */

import { daysBetween, fill } from "./showcase-data";
import type { LandingDict } from "./landing-i18n";

export const HERO_TODAY = "2026-06-10";
export const HERO_NOW = "2026-06-10T15:04";

export type HeroScene = "a" | "b" | "c";
export interface HeroStep {
  scene: HeroScene;
  id: string;
  dur: number;
}

/* Длительности (мс) не короче CSS-анимаций: курсор едет 900, щелчок с рябью 550,
   миникарточка 1900+360, раскрытие полосы 800 — тест держит эти минимумы. */
export const HERO_STEPS: readonly HeroStep[] = [
  /* A — заявка водителя → доска → решение → Telegram (11 900) */
  { scene: "a", id: "a0", dur: 1000 },
  { scene: "a", id: "a1", dur: 1400 },
  { scene: "a", id: "a2", dur: 1400 },
  { scene: "a", id: "a3", dur: 1000 },
  { scene: "a", id: "a4", dur: 650 },
  { scene: "a", id: "a5", dur: 1000 },
  { scene: "a", id: "a6", dur: 650 },
  { scene: "a", id: "a7", dur: 1800 },
  { scene: "a", id: "a8", dur: 1800 },
  { scene: "a", id: "a9", dur: 1200 },
  /* B — доска «по машинам» с фактами телематики (6 500) */
  { scene: "b", id: "b0", dur: 1400 },
  { scene: "b", id: "b1", dur: 1300 },
  { scene: "b", id: "b2", dur: 1300 },
  { scene: "b", id: "b3", dur: 1300 },
  { scene: "b", id: "b4", dur: 1200 },
  /* C — срок документа: сводка на почте → скан → срок в системе (9 650) */
  { scene: "c", id: "c0", dur: 600 },
  { scene: "c", id: "c1", dur: 1800 },
  { scene: "c", id: "c2", dur: 1000 },
  { scene: "c", id: "c3", dur: 650 },
  { scene: "c", id: "c4", dur: 2600 },
  { scene: "c", id: "c5", dur: 1800 },
  { scene: "c", id: "c6", dur: 1200 },
];

/* Статичный кадр (reduced-motion, без JS): заявка пришла и ждёт решения — пунктир,
   а не «одобрено само». */
export const HERO_STATIC: HeroStep = HERO_STEPS.find((s) => s.id === "a2")!;

export function heroCycleMs(): number {
  return HERO_STEPS.reduce((sum, s) => sum + s.dur, 0);
}

/** Начало и конец каждой сцены на оси цикла (мс). */
export function sceneSpans(): Record<HeroScene, { start: number; end: number }> {
  const spans = {
    a: { start: 0, end: 0 },
    b: { start: 0, end: 0 },
    c: { start: 0, end: 0 },
  };
  let t = 0;
  for (const sc of ["a", "b", "c"] as const) {
    spans[sc].start = t;
    for (const s of HERO_STEPS) if (s.scene === sc) t += s.dur;
    spans[sc].end = t;
  }
  return spans;
}

/* ---- машины сцены B ---------------------------------------------------------- */

export type FactKind = "moving" | "stopped" | "stale" | "none";
export interface HeroTruck {
  plate: string;
  driver: "kratochvil" | "savchenko" | "novak" | "berzins";
  kind: FactKind;
  speedKmh?: number;
  /** «YYYY-MM-DDTHH:mm», локальное время макета; null — трекер не подключён. */
  positionAt: string | null;
  /** Проценты полосы на доске hero; у Савченко — статичная {56,43} вместо нынешней appear {42,56} (план, Задача 6). */
  bars: readonly { left: number; width: number }[];
}

/* Дорожка — пн 00:00 … пт 24:00, по 20 % на день: ср 14:52 = 52,4 %, «сейчас» 15:04 = 52,6 %.
   Первый рейс Кратохвила кончается в ср 16:48 (54 %), а не в ср 04:48 (44 %, как было у
   прежнего hero): иначе «82 км/ч · 14:52» и пилюля «В рейсе» сцен A и C лежали бы в
   разрыве плана — в приложении это «движение без плана» Центра решений (ревью r0, 11.10). */
export const HERO_TRUCKS: readonly HeroTruck[] = [
  { plate: "3SK 7702", driver: "kratochvil", kind: "moving", speedKmh: 82, positionAt: "2026-06-10T14:52", bars: [{ left: 0, width: 54 }, { left: 56, width: 43 }] },
  { plate: "3QR 6671", driver: "savchenko", kind: "stopped", positionAt: "2026-06-10T13:40", bars: [{ left: 56, width: 43 }] },
  { plate: "5KL 3311", driver: "novak", kind: "stale", positionAt: "2026-06-07T09:15", bars: [{ left: 0, width: 28 }] },
  /* трекер не подключён — строки факта нет */
  { plate: "8AL 2104", driver: "berzins", kind: "none", positionAt: null, bars: [{ left: 44, width: 55 }] },
];

function parseLocal(s: string): number {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(s);
  if (!m) throw new Error(`hero-data: ожидалось YYYY-MM-DDTHH:mm, получено «${s}»`);
  return Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]);
}

/** «HH:mm» в тот же день, иначе «dd.MM HH:mm» — как telematicsFact.ts приложения. */
export function factWhen(positionAt: string, today: string): string {
  const [date, time] = positionAt.split("T");
  if (date === today) return time;
  const [, mm, dd] = date.split("-");
  return `${dd}.${mm} ${time}`;
}

/** Сколько суток нет данных: целые сутки, но не меньше одних. */
export function staleDays(positionAt: string, now: string): number {
  const hours = (parseLocal(now) - parseLocal(positionAt)) / 3_600_000;
  return Math.max(1, Math.floor(hours / 24));
}

/** Текст факта машины на языке словаря; null — строки факта нет. */
export function factText(t: HeroTruck, s: LandingDict["showcase"]): string | null {
  switch (t.kind) {
    case "moving":
      return fill(s.telMoving, { speed: t.speedKmh ?? 0 });
    case "stopped":
      return s.telStopped;
    case "stale":
      /* «нет данных N сут» считается от последней позиции: без неё stale не
         бывает (инвариант — в тесте). Подставить «сейчас» значило бы молча
         показать «1 сут» вместо ошибки в данных. */
      if (t.positionAt === null) throw new Error(`hero-data: stale без positionAt у ${t.plate}`);
      return fill(s.telStale, { n: staleDays(t.positionAt, HERO_NOW) });
    default:
      return null;
  }
}

/* ---- сроки ------------------------------------------------------------------- */

export const VISA_EXPIRY = "2026-07-12";

/** Календарные дни до срока — как доска и письма приложения (differenceInCalendarDays). */
export function heroDaysLeft(iso: string): number {
  return daysBetween(HERO_TODAY, iso);
}

/** Отпуск Новака на доске: чт–пт, как нынешняя полоса. */
export const NOVAK_LEAVE = { left: 62, width: 37 } as const;
