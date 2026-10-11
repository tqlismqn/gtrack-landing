import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import {
  BERZINS_SICK,
  HERO_NOW,
  HERO_STATIC,
  HERO_STEPS,
  HERO_TODAY,
  HERO_TRUCKS,
  NOVAK_LEAVE,
  VISA_EXPIRY,
  factText,
  factWhen,
  heroCycleMs,
  heroDaysLeft,
  sceneSpans,
  staleDays,
} from "../src/lib/hero-data";
import { LANDING_DICT, LOCALES } from "../src/lib/landing-i18n";

const FX_CSS = readFileSync(new URL("../src/styles/landing/fx.css", import.meta.url), "utf8");
const SCENES_CSS = readFileSync(new URL("../src/styles/landing/hero-scenes.css", import.meta.url), "utf8");

function cssMinimums(fx: string, scenes: string) {
  const num = (re: RegExp, src: string, what: string): number => {
    const hit = src.match(re);
    if (!hit) throw new Error(`hero.test: не нашёл ${what} в CSS — селектор переименован?`);
    return Number(hit[1]);
  };
  const cursor = num(/\.gcursor \{[^}]*?transition: transform (\d+)ms/, fx, ".gcursor transform");
  const ripple = num(/\.gcursor \.ripple \{ animation: gc-ripple (\d+)ms/, fx, "gc-ripple");
  const press = num(/\.gcursor svg\.ptr \{ animation: gc-click (\d+)ms/, fx, "gc-click");
  const row = num(/\.mc-row \{[^}]*?transition: opacity (\d+)ms/, fx, ".mc-row opacity");
  const delays = [...fx.matchAll(/\[data-phase="c4"\] \.mc-row:nth-child\(\d\) \{ transition-delay: (\d+)ms/g)].map((h) => Number(h[1]));
  if (delays.length === 0) throw new Error("hero.test: нет задержек .mc-row на c4 в fx.css");
  const reveal = num(/\[data-phase="a2"\][^{]*\.hs-leave \.tripbar\.req \{[^}]*?transition: clip-path (\d+)ms/, scenes, "clip-path a2");
  return { cursor, click: Math.max(ripple, press), minicard: Math.max(...delays) + row, reveal };
}

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

  /* Минимумы читаются из CSS, а не литералами: удлинили анимацию в CSS — шаг цикла, который
     её обрезает, краснит тест. Регулярки якорятся по селектору; не нашлось — тест падает. */
  it("минимумы из CSS", () => {
    const dur = (id: string) => HERO_STEPS.find((s) => s.id === id)!.dur;
    const m = cssMinimums(FX_CSS, SCENES_CSS);
    /* разбор сверен с CSS на 11.10 (fx.css: курсор, рябь, .mc-row; hero-scenes.css: clip-path) —
       правишь длительность в CSS, правишь и эту строку */
    expect(m).toEqual({ cursor: 900, click: 550, minicard: 2260, reveal: 800 });
    for (const id of ["a3", "a5", "c2"]) expect(dur(id), id).toBeGreaterThanOrEqual(m.cursor);
    for (const id of ["a4", "a6", "c3"]) expect(dur(id), id).toBeGreaterThanOrEqual(m.click);
    expect(dur("c4")).toBeGreaterThanOrEqual(m.minicard);
    expect(dur("a2")).toBeGreaterThanOrEqual(m.reveal);
    for (const sc of ["a", "b", "c"] as const) {
      expect(sceneSpans()[sc].end - sceneSpans()[sc].start).toBeGreaterThanOrEqual(6000);
    }
    /* негативный контроль: курсор 900 → 1200 мс в CSS — шаг a3 (1000) его уже обрезает */
    const slow = cssMinimums(FX_CSS.replace(/(\.gcursor \{[^}]*?transition: transform )900ms/, (_, p: string) => `${p}1200ms`), SCENES_CSS);
    expect(slow.cursor).toBe(1200);
    expect(dur("a3")).toBeLessThan(slow.cursor);
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

  /* Пилюля «Больничный» у Берзиньша говорит о сегодня: «сейчас» (ср 15:04 = 52,56 %, разбор выше)
     лежит внутри его больничного и вне его рейса, а рейс начинается не раньше конца больничного —
     иначе доска сцен A и C рисует больного водителя в рейсе. Прежние {0,30} и {44,55} давали
     обратное: больничный кончался во вт 12:00 (30 %), рейс шёл со ср 04:48 (44 %). */
  it("Берзиньш: «сейчас» — внутри больничного и вне рейса", () => {
    const berzins = HERO_TRUCKS.find((t) => t.driver === "berzins")!;
    const inBar = (b: { left: number; width: number }, pct: number) => b.left <= pct && pct <= b.left + b.width;
    expect(inBar(BERZINS_SICK, 52.56)).toBe(true);
    expect(berzins.bars.length).toBeGreaterThan(0);
    expect(berzins.bars.some((b) => inBar(b, 52.56))).toBe(false);
    for (const b of berzins.bars) expect(b.left).toBeGreaterThanOrEqual(BERZINS_SICK.left + BERZINS_SICK.width);
  });

  /* Пилюля «Активен» у Новака и Савченко (сцены A и C) говорит о сегодня: «сейчас» (ср 15:04 = 52,56 %,
     разбор выше) вне их рейсов и вне отпуска. Савченко: единственная полоса {56,43} — со ср 19:12,
     56 > 52,56, «сейчас» до неё. Новак: рейс {0,28} кончается во вт 09:36 (28 %), отпуск {62,37} —
     с чт 02:24 (62 %), оба не содержат 52,56. Прежняя appear-полоса Савченко {42,56} (42…98) его
     содержала — «Активен» спорил бы с рейсом. */
  it("«Активен» — сейчас (52,56 %) вне рейсов и отпуска", () => {
    const inBar = (b: { left: number; width: number }, pct: number) => b.left <= pct && pct <= b.left + b.width;
    for (const driver of ["novak", "savchenko"] as const) {
      const truck = HERO_TRUCKS.find((t) => t.driver === driver)!;
      expect(truck.bars.length, driver).toBeGreaterThan(0);
      expect(truck.bars.some((b) => inBar(b, 52.56)), driver).toBe(false);
    }
    expect(inBar(NOVAK_LEAVE, 52.56)).toBe(false);
    expect(NOVAK_LEAVE.left).toBeGreaterThan(52.56);
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

  /* На странице 32 и 12.07 — литералы словарей ×12 (формы числа согласованы с 32, подстановкой их
     не заменить); VISA_EXPIRY их не подставляет, а сверяет здесь. Сменили срок — краснеют все 12. */
  it.each(LOCALES)("%s: дни и дата визы в словаре совпадают с VISA_EXPIRY", (l) => {
    const m = LANDING_DICT[l].mock;
    const [, mm, dd] = VISA_EXPIRY.split("-");
    const days = new RegExp(`(?<!\\d)${heroDaysLeft(VISA_EXPIRY)}(?!\\d)`);
    expect(m.chipVisaWarn).toMatch(days);
    expect(m.toastWarnD).toMatch(days);
    expect(m.toastWarnT).toContain(`${dd}.${mm}`);
  });
});
