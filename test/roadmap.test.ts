/* ============================================================================
   Модель Ганта дорожной карты (buildRoadmapModel).
   Ожидания вписаны литералами, посчитанными вручную: ось 01.05.2026 → 25.09.2026
   = 147 дней на 68 % ширины дорожки, x(дата) = дни / 147 × 68, округление до сотых.
   Тест не считает тем же способом, что код, иначе он не смог бы с кодом не согласиться.
   ============================================================================ */

import { describe, expect, it } from "vitest";
import { buildRoadmapModel, PAST_SHARE, trackGroups, TRACKS } from "../src/lib/roadmap-content";
import { LANDING_DICT, LOCALES } from "../src/lib/landing-i18n";

const NOW = new Date("2026-09-25T12:00:00Z");
const m = buildRoadmapModel("en", NOW);
const track = (id: string) => m.tracks.find((t) => t.id === id)!;

describe("ось", () => {
  it("«Сейчас» стоит на границе прошлого и будущего", () => {
    expect(PAST_SHARE).toBe(68);
    expect(m.now).toBe(68);
  });

  it("запуск 1.0 (16.05) = 15/147 × 68", () => {
    expect(m.launchX).toBe(6.94);
  });

  it("пять месяцев с мая по сентябрь, подписи без точки", () => {
    expect(m.months.map((x) => x.label)).toEqual(["May", "Jun", "Jul", "Aug", "Sep"]);
    expect(m.months.map((x) => x.x)).toEqual([0, 14.34, 28.22, 42.56, 56.9]);
    expect(m.months.map((x) => x.width)).toEqual([14.34, 13.88, 14.34, 14.34, 11.1]);
  });

  it("день берётся по UTC: поздний вечер по Праге — тот же день, ранняя ночь — вчерашний", () => {
    expect(buildRoadmapModel("en", new Date("2026-09-25T23:30:00+02:00"))).toEqual(m);
    const earlier = buildRoadmapModel("en", new Date("2026-09-26T00:30:00+02:00")); // 25.09 22:30 UTC
    expect(earlier).toEqual(m);
  });

  it("русские месяцы — без завершающей точки", () => {
    const ru = buildRoadmapModel("ru", NOW);
    expect(ru.months).toHaveLength(5);
    ru.months.forEach((x) => expect(x.label.endsWith(".")).toBe(false));
  });
});

describe("направления", () => {
  it("девять строк в утверждённом порядке", () => {
    expect(m.tracks.map((t) => t.id)).toEqual(["drivers", "planning", "fleet", "telematics", "telegram", "reports", "companies", "finance", "integrations"]);
  });

  it("водители начались до оси — полоса от края, помечена «из прошлого»", () => {
    expect(track("drivers").segments[0]).toEqual({ phase: "done", left: 0, width: 68, fromPast: true });
  });

  it("транспорт с 28.07 (88 дней) и веха «Ремонт и ТО» 11.08 (102 дня)", () => {
    expect(track("fleet").segments[0]).toEqual({ phase: "done", left: 40.71, width: 27.29, fromPast: false });
    expect(track("fleet").ms).toEqual([{ id: "service", version: "1.19", x: 47.18 }]);
  });

  it("телематика с 14.08 (105 дней) — первая интеграция 1.20, дальше план", () => {
    expect(track("telematics").segments).toEqual([
      { phase: "done", left: 48.57, width: 19.43, fromPast: false },
      { phase: "plan", left: 71.2, width: 12.8, fromPast: false },
    ]);
    expect(track("telematics").ms).toEqual([{ id: "telematics", version: "1.20", x: 48.57 }]);
  });

  it("Telegram с 11.06 (41 день), мини-апп 14.06 (44 дня)", () => {
    expect(track("telegram").segments[0].left).toBe(18.97);
    expect(track("telegram").ms[0].x).toBe(20.35);
  });

  it("вехи планирования 2.0 / 2.1 / 2.2 — 03.09, 15.09, 20.09", () => {
    expect(track("planning").ms.map((x) => [x.version, x.x])).toEqual([["2.0", 57.82], ["2.1", 63.37], ["2.2", 65.69]]);
  });

  it("отчёты, связанные компании, заказы и интеграции ещё не работают — полосы готового нет", () => {
    for (const id of ["reports", "companies", "finance", "integrations"]) {
      expect(track(id).segments.some((s) => s.phase === "done")).toBe(false);
    }
    expect(track("reports").segments).toEqual([{ phase: "wip", left: 68, width: 14.08, fromPast: false }]);
    expect(track("integrations").segments).toEqual([{ phase: "plan", left: 85.28, width: 14.72, fromPast: false }]);
  });

  it("связанные компании — только «в планах»: зона «Дальше» 32 %, кусок 0,18…0,52 → 68 + 5,76 и 0,34 × 32", () => {
    expect(track("companies").icon).toBe("i-building");
    expect(track("companies").segments).toEqual([{ phase: "plan", left: 73.76, width: 10.88, fromPast: false }]);
    expect(track("companies").ms).toEqual([]);
  });

  it("инварианты: готовое упирается в «Сейчас», будущее — только правее, вехи — на готовом", () => {
    for (const t of m.tracks) {
      for (const s of t.segments) {
        if (s.phase === "done") expect(Math.round((s.left + s.width) * 100) / 100).toBe(68);
        else {
          expect(s.left).toBeGreaterThanOrEqual(68);
          expect(s.left + s.width).toBeLessThanOrEqual(100.001);
        }
      }
      const done = t.segments.find((s) => s.phase === "done");
      for (const x of t.ms) {
        expect(done).toBeDefined();
        expect(x.x).toBeGreaterThanOrEqual(done!.left);
        expect(x.x).toBeLessThanOrEqual(68);
      }
    }
    expect(TRACKS).toHaveLength(9);
  });
});

/* Секция «Работает сейчас» на главной: состав разобран вручную по TRACKS —
   since есть у пяти направлений, у отчётов только «в работе», у остальных трёх только «в планах». */
describe("статус направлений для главной (trackGroups)", () => {
  const g = trackGroups();

  it("работает сейчас — пять направлений, в порядке Ганта", () => {
    expect(g.shipped).toEqual(["drivers", "planning", "fleet", "telematics", "telegram"]);
  });

  it("только в работе — отчёты и уведомления", () => {
    expect(g.wipOnly).toEqual(["reports"]);
  });

  it("только в планах — связанные компании, заказы и финансы, карта и интеграции", () => {
    expect(g.nextOnly).toEqual(["companies", "finance", "integrations"]);
  });

  it("группы не пересекаются и вместе дают все девять направлений", () => {
    const all = [...g.shipped, ...g.wipOnly, ...g.nextOnly];
    expect(all).toHaveLength(9);
    expect(new Set(all).size).toBe(9);
  });
});

describe("тексты направлений во всех 12 локалях", () => {
  it("у каждой строки Ганта есть непустые t и d в каждом словаре", () => {
    expect(LOCALES).toHaveLength(12);
    for (const lang of LOCALES) {
      for (const t of TRACKS) {
        const tr = LANDING_DICT[lang].roadmap.tracks[t.id];
        expect(tr.t.trim(), `${lang}.${t.id}.t`).not.toBe("");
        expect(tr.d.trim(), `${lang}.${t.id}.d`).not.toBe("");
      }
    }
  });

  it("связанные компании: ru и en — утверждённые формулировки, остальные 10 — свой перевод, а не копия en", () => {
    expect(LANDING_DICT.ru.roadmap.tracks.companies.t).toBe("Связанные компании");
    expect(LANDING_DICT.en.roadmap.tracks.companies.t).toBe("Linked companies");
    for (const lang of LOCALES.filter((l) => l !== "en")) {
      expect(LANDING_DICT[lang].roadmap.tracks.companies.t, lang).not.toBe("Linked companies");
      expect(LANDING_DICT[lang].roadmap.tracks.companies.d, lang).not.toBe(LANDING_DICT.en.roadmap.tracks.companies.d);
    }
  });
});
