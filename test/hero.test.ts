import { describe, expect, it } from "vitest";
import {
  HERO_NOW,
  HERO_STATIC,
  HERO_STEPS,
  HERO_TODAY,
  HERO_TRUCKS,
  VISA_EXPIRY,
  factText,
  factWhen,
  heroCycleMs,
  heroDaysLeft,
  sceneSpans,
  staleDays,
} from "../src/lib/hero-data";
import { LANDING_DICT } from "../src/lib/landing-i18n";

describe("hero-data: цикл и сцены", () => {
  it("цикл и порядок сцен", () => {
    expect(heroCycleMs()).toBe(28050);
    expect(HERO_STEPS.map((s) => s.scene).join("")).toBe("aaaaaaaaaabbbbbccccccc");
    expect(sceneSpans()).toEqual({
      a: { start: 0, end: 11900 },
      b: { start: 11900, end: 18400 },
      c: { start: 18400, end: 28050 },
    });
    expect(HERO_STATIC.id).toBe("a2");
  });

  it("минимумы из CSS", () => {
    const dur = (id: string) => HERO_STEPS.find((s) => s.id === id)!.dur;
    for (const id of ["a3", "a5", "c2"]) expect(dur(id)).toBeGreaterThanOrEqual(900);
    for (const id of ["a4", "a6", "c3"]) expect(dur(id)).toBeGreaterThanOrEqual(550);
    expect(dur("c4")).toBeGreaterThanOrEqual(2260);
    expect(dur("a2")).toBeGreaterThanOrEqual(800);
    for (const sc of ["a", "b", "c"] as const) {
      expect(sceneSpans()[sc].end - sceneSpans()[sc].start).toBeGreaterThanOrEqual(6000);
    }
  });
});

describe("hero-data: телематика", () => {
  it("время факта — как telematicsFact.ts приложения", () => {
    expect(factWhen("2026-06-10T14:52", HERO_TODAY)).toBe("14:52");
    expect(factWhen("2026-06-07T09:15", HERO_TODAY)).toBe("07.06 09:15");
    expect(staleDays("2026-06-07T09:15", HERO_NOW)).toBe(3);
    expect(staleDays("2026-06-10T09:00", "2026-06-11T10:00")).toBe(1);
    /* 11 часов: floor даёт 0, пол max(1,…) — «1 сут», а не «0 сут» */
    expect(staleDays("2026-06-10T09:00", "2026-06-10T20:00")).toBe(1);
  });

  /* Вид факта согласован с данными: позиции нет ровно у «трекер не подключён»,
     а «нет данных» — ровно у той, чья позиция старше 24 часов от «сейчас».
     Время разбирается как UTC — то же в любом TZ Node. */
  it("инварианты машин: позиция ↔ none, возраст > 24 ч ↔ stale", () => {
    const at = (s: string) => Date.parse(`${s}:00Z`);
    for (const t of HERO_TRUCKS) {
      expect(t.positionAt === null, t.plate).toBe(t.kind === "none");
      if (t.positionAt !== null) {
        const ageMs = at(HERO_NOW) - at(t.positionAt);
        expect(ageMs > 24 * 60 * 60 * 1000, t.plate).toBe(t.kind === "stale");
      }
    }
    const stale = HERO_TRUCKS.find((t) => t.kind === "stale")!;
    expect(() =>
      factText({ ...stale, positionAt: null }, LANDING_DICT.ru.showcase),
    ).toThrow(/stale без positionAt/);
  });

  /* «Факт рядом с планом»: едущая машина в момент факта и в «сейчас» стоит внутри своего
     рейса — иначе сцена B рисует «движение без плана», а пилюля «В рейсе» сцен A и C
     спорит с полосами. Дорожка пн–пт, по 20 % на день; проценты разобраны вручную:
     ср 14:52 = 40 + 14,867 / 24 × 20 = 52,39; ср 15:04 = 40 + 15,067 / 24 × 20 = 52,56. */
  it("едущая машина — внутри рейса в момент факта и «сейчас»", () => {
    const moving = HERO_TRUCKS.find((t) => t.kind === "moving")!;
    const inTrip = (pct: number) => moving.bars.some((b) => b.left <= pct && pct <= b.left + b.width);
    expect(moving.positionAt).toBe("2026-06-10T14:52");
    expect(HERO_NOW).toBe("2026-06-10T15:04");
    expect(inTrip(52.39)).toBe(true);
    expect(inTrip(52.56)).toBe(true);
  });

  it("тексты фактов ru/uk/en/pl — литералы", () => {
    const [moving, stopped, stale, none] = HERO_TRUCKS;
    expect(factText(moving, LANDING_DICT.ru.showcase)).toBe("82 км/ч");
    expect(factText(moving, LANDING_DICT.uk.showcase)).toBe("82 км/год");
    expect(factText(moving, LANDING_DICT.en.showcase)).toBe("82 km/h");
    expect(factText(stopped, LANDING_DICT.ru.showcase)).toBe("На стоянке");
    expect(factText(stale, LANDING_DICT.ru.showcase)).toBe("нет данных 3 сут");
    expect(factText(stale, LANDING_DICT.pl.showcase)).toBe("brak danych 3 dni");
    expect(factText(none, LANDING_DICT.ru.showcase)).toBeNull();
  });
});

describe("hero-data: сроки", () => {
  it("виза: 32 календарных дня, как в нынешних строках", () => {
    expect(VISA_EXPIRY).toBe("2026-07-12");
    expect(heroDaysLeft(VISA_EXPIRY)).toBe(32);
    expect(LANDING_DICT.ru.mock.toastWarnT).toBe("Сводка на почте: виза истекает 12.07");
    expect(LANDING_DICT.ru.mock.chipVisaWarn).toBe("VIS · 32 дн");
  });
});
