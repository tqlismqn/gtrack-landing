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
