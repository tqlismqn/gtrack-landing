/* ============================================================================
   Витрина «Одна заявка»: арифметика макетов (src/lib/showcase-data.ts).
   Ожидания вписаны литералами, посчитанными вручную по календарю октября 2026
   и по макетам волны (канва 04.10.2026): тест не считает тем же способом, что
   код, иначе он не смог бы с кодом не согласиться.
   ============================================================================ */

import { describe, expect, it } from "vitest";
import {
  AWAY_BY_DAY, BOARD_ROWS, CROPS, DRIVER_PHONE, FLEET, NEEDS_DECISION, PENDING_REQUESTS, REQUEST, ROTATION,
  ROTATION_ROWS, TODAY, VEHICLE, WINDOW_DAYS,
  awayPct, awayTone, barBox, daysBetween, daysLeft, fill, fmtDM, fmtDMY, fmtKm, nowLine, requestDays, ringOffset,
  splitAt, windowDay,
  RING_C,
} from "../src/lib/showcase-data";
import { LANDING_DICT, LOCALES } from "../src/lib/landing-i18n";

const row = (id: string) => BOARD_ROWS.find((r) => r.id === id)!;
/** «до ДД.ММ» строки; у рейса и «свободен» даты нет */
const until = (id: string) => { const r = row(id); return r.status === "sick" || r.status === "vac" ? r.until : null; };

describe("парк и плитки", () => {
  it("плитки дают «Все»: 9 + 49 + 8 + 0 = 66", () => {
    expect(FLEET.free + FLEET.onTrip + FLEET.away + FLEET.other).toBe(66);
    expect(FLEET.all).toBe(66);
  });

  it("«Отпуск и больничный» 8 = 12 % парка, и это же число стоит в шапке понедельника", () => {
    expect(awayPct(FLEET.away)).toBe(12);
    expect(AWAY_BY_DAY[1]).toBe(8);
  });

  it("заявок в ожидании столько же, сколько пунктирных полос на доске, — одна", () => {
    expect(BOARD_ROWS.flatMap((r) => r.bars).filter((b) => b.kind === "req")).toHaveLength(1);
    expect(PENDING_REQUESTS).toBe(1);
  });

  it("в очереди решений десять — это же число покажет окно Центра решений во втором выкате", () => {
    expect(NEEDS_DECISION).toBe(10);
  });
});

describe("окно доски 04–18.10.2026", () => {
  it("15 дней: с воскресенья 4-го по воскресенье 18-го", () => {
    expect(WINDOW_DAYS).toBe(15);
    expect(windowDay(0)).toEqual({ iso: "2026-10-04", day: 4, weekday: 0 });
    expect(windowDay(14)).toEqual({ iso: "2026-10-18", day: 18, weekday: 0 });
  });

  it("сегодня — понедельник 05.10, второй день окна", () => {
    expect(TODAY).toBe("2026-10-05");
    expect(windowDay(1)).toEqual({ iso: "2026-10-05", day: 5, weekday: 1 });
  });

  it("выходные окна: 4, 10, 11, 17, 18", () => {
    const weekend = Array.from({ length: 15 }, (_, i) => windowDay(i))
      .filter((d) => d.weekday === 0 || d.weekday === 6)
      .map((d) => d.day);
    expect(weekend).toEqual([4, 10, 11, 17, 18]);
  });

  it("проценты шапки по дням", () => {
    expect(AWAY_BY_DAY).toHaveLength(15);
    expect(AWAY_BY_DAY.map(awayPct)).toEqual([14, 12, 9, 9, 8, 8, 11, 11, 11, 11, 11, 9, 9, 8, 8]);
  });

  it("цвет полосы: янтарный выше 9,9 % (0,66 лимита 15 %), иначе зелёный", () => {
    expect(AWAY_BY_DAY.map(awayTone)).toEqual([
      "warn", "warn", "ok", "ok", "ok", "ok", "warn", "warn", "warn", "warn", "warn", "ok", "ok", "ok", "ok",
    ]);
  });

  it("линия «сейчас» (08:12 понедельника) на трёх кадрах", () => {
    expect(nowLine("l")).toBe(0.0893);
    expect(nowLine("m")).toBe(0.0425);
    expect(nowLine("s")).toBe(0.0486);
  });
});

describe("заявка Марека", () => {
  it("с субботы по воскресенье, 9 дней", () => {
    expect(new Date("2026-10-10T12:00:00Z").getUTCDay()).toBe(6);
    expect(new Date("2026-10-18T12:00:00Z").getUTCDay()).toBe(0);
    expect(REQUEST.from).toBe("2026-10-10");
    expect(REQUEST.to).toBe("2026-10-18");
    expect(requestDays()).toBe(9);
  });

  it("подана сегодня", () => {
    expect(REQUEST.createdDate).toBe(TODAY);
  });

  it("пунктир начинается в день начала отпуска и идёт до конца окна", () => {
    const req = row("marek").bars[1];
    expect(req.kind).toBe("req");
    expect(windowDay(req.from).iso).toBe("2026-10-10");
    expect(windowDay(req.to - 1).iso).toBe("2026-10-18");
  });

  it("форматы дат окна заявки", () => {
    expect(fmtDMY(REQUEST.from)).toBe("10.10.2026");
    expect(fmtDMY(REQUEST.to)).toBe("18.10.2026");
    expect(fmtDM(REQUEST.to)).toBe("18.10");
  });
});

describe("строки доски", () => {
  it("готовность водителя — только достижимые значения 0 / 33 / 67 / 100", () => {
    for (const r of BOARD_ROWS) expect([0, 33, 67, 100]).toContain(r.ready);
    for (const r of ROTATION_ROWS) expect([0, 33, 67, 100]).toContain(r.ready);
  });

  it("«до ДД.ММ» в пилюле совпадает с концом полосы отсутствия", () => {
    expect(until("andrzej")).toBe("2026-10-14");
    expect(windowDay(row("andrzej").bars[0].to - 1).iso).toBe("2026-10-14");
    expect(until("lukas")).toBe("2026-10-07");
    expect(windowDay(row("lukas").bars[0].to - 1).iso).toBe("2026-10-07");
    expect(until("marek")).toBeNull();
    expect(until("mihai")).toBeNull();
  });

  it("рейс Михая начинается 06.10 — сегодня он свободен", () => {
    expect(row("mihai").status).toBe("free");
    expect(windowDay(row("mihai").bars[0].from).iso).toBe("2026-10-06");
  });

  it("кадр m: Олег, Михай, Анджей, Марек; кадр s: Марек, Олег, Михай", () => {
    const m = BOARD_ROWS.filter((r) => r.orderM !== null).sort((a, b) => a.orderM! - b.orderM!).map((r) => r.id);
    expect(m).toEqual(["oleg", "mihai", "andrzej", "marek"]);
    expect(BOARD_ROWS.filter((r) => r.onS).map((r) => r.id)).toEqual(["marek", "oleg", "mihai"]);
  });

  it("кольцо: 100 % — полная дуга, 67 % — недобор 32,14 из 97,39", () => {
    expect(ringOffset(100, RING_C.driver)).toBe("0");
    expect(ringOffset(67, RING_C.driver)).toBe("32.14");
    expect(ringOffset(100, RING_C.vehicle)).toBe("0");
  });
});

describe("геометрия полос", () => {
  const box = (id: string, i: number, crop: "l" | "m" | "s") => barBox(row(id).bars[i], crop);

  it("кадр l, 15 дней", () => {
    expect(box("marek", 0, "l")).toEqual({ left: "0%", width: "39.6%" });
    expect(box("marek", 1, "l")).toEqual({ left: "40.4%", width: "59.6%" });
    expect(box("oleg", 0, "l")).toEqual({ left: "0%", width: "100%" });
    expect(box("andrzej", 0, "l")).toEqual({ left: "0%", width: "72.93%" });
    expect(box("mihai", 0, "l")).toEqual({ left: "13.73%", width: "86.27%" });
    expect(box("lukas", 0, "l")).toEqual({ left: "0%", width: "26.27%" });
    expect(box("lukas", 1, "l")).toEqual({ left: "27.07%", width: "72.93%" });
  });

  it("кадр m, 8 дней 05–12.10", () => {
    expect(box("marek", 0, "m")).toEqual({ left: "0%", width: "62.1%" });
    expect(box("marek", 1, "m")).toEqual({ left: "62.9%", width: "37.1%" });
    expect(box("oleg", 0, "m")).toEqual({ left: "0%", width: "100%" });
    expect(box("andrzej", 0, "m")).toEqual({ left: "0%", width: "100%" });
    expect(box("mihai", 0, "m")).toEqual({ left: "12.9%", width: "87.1%" });
  });

  it("у каждой строки каждого кадра все её полосы попадают в кадр", () => {
    for (const r of BOARD_ROWS) {
      const crops = (["l", "m", "s"] as const).filter((c) => c === "l" || (c === "m" ? r.orderM !== null : r.onS));
      for (const c of crops) for (const b of r.bars) expect(barBox(b, c), `${r.id} ${b.kind} ${c}`).not.toBeNull();
    }
  });

  it("полоса вне кадра — null, а не нулевая ширина", () => {
    expect(barBox({ kind: "trip", from: 12, to: 15 }, "m")).toBeNull();
    expect(barBox({ kind: "trip", from: 9, to: 15 }, "s")).toBeNull();
    expect(CROPS.m).toEqual({ start: 1, days: 8 });
    expect(CROPS.s).toEqual({ start: 1, days: 7 });
  });

  it("кадр s, 7 дней 05–11.10: зазор 2 px, уходящая полоса выезжает на 10 px", () => {
    expect(box("marek", 0, "s")).toEqual({ left: "0%", width: "calc(71.43% - 2px)" });
    expect(box("marek", 1, "s")).toEqual({ left: "calc(71.43% + 2px)", width: "calc(28.57% + 8px)" });
    expect(box("oleg", 0, "s")).toEqual({ left: "0%", width: "calc(100% + 10px)" });
    expect(box("mihai", 0, "s")).toEqual({ left: "calc(14.29% + 2px)", width: "calc(85.71% + 8px)" });
  });
});

describe("ротация", () => {
  it("возвращаются 6 = готовы 4 + подготовить 2", () => {
    expect(ROTATION.ready + ROTATION.toPrepare).toBe(6);
    expect(ROTATION.returning).toBe(6);
  });

  it("в неделе 12–18.10 три строки, и столько же нарисовано", () => {
    expect(ROTATION.week.returning).toBe(3);
    expect(ROTATION_ROWS).toHaveLength(3);
    for (const r of ROTATION_ROWS) {
      expect(r.returnDate >= ROTATION.week.from && r.returnDate <= ROTATION.week.to).toBe(true);
    }
  });

  it("«Подготовить 2» — это строки не «Машина готова»", () => {
    expect(ROTATION_ROWS.filter((r) => r.readiness !== "ready")).toHaveLength(2);
  });

  it("все возвращения — внутри горизонта 14 дней (ротация считает календарными днями)", () => {
    expect(ROTATION.horizonDays).toBe(14);
    expect(ROTATION_ROWS.map((r) => daysBetween(TODAY, r.returnDate))).toEqual([9, 11, 13]);
  });

  it("Марек возвращается в последний день заявки, а STK его машины кончается раньше", () => {
    const marek = ROTATION_ROWS.find((r) => r.id === "marek")!;
    expect(marek.returnDate).toBe("2026-10-18");
    expect(marek.truck).toBe("GT-114");
    expect(marek).toMatchObject({ readiness: "doc", docCode: "STK", docUntil: "2026-10-14" });
    expect(VEHICLE.inspection.find((d) => d.code === "STK")!.until).toBe("2026-10-14");
  });

  it("машину Юриса занимает Михай — та же GT-109, что на его полосе рейса", () => {
    const juris = ROTATION_ROWS.find((r) => r.id === "juris")!;
    expect(juris).toMatchObject({ readiness: "busy", busyBy: "mihai" });
    expect(juris.truck).toBe("GT-109");
    expect(row("mihai").bars[0].truck).toBe("GT-109");
  });

  it("возврат Анджея = конец его больничного на доске", () => {
    expect(ROTATION_ROWS[0].returnDate).toBe("2026-10-14");
    expect(until("andrzej")).toBe("2026-10-14");
  });
});

describe("карточка машины", () => {
  it("это машина Марека с доски", () => {
    expect(VEHICLE.name).toBe("GT-114");
    expect(row("marek").bars[0].truck).toBe("GT-114");
    expect(row("marek").bars[0].trailer).toBe("T-208");
    expect(VEHICLE.trailer).toBe("T-208");
  });

  it("готовность машины — достижимое значение 0 / 25 / 50 / 75 / 100", () => {
    expect([0, 25, 50, 75, 100]).toContain(VEHICLE.ready);
  });

  /* Числа сняты с date-fns самого приложения (gtrack-tms), 04.10.2026:
     differenceInDays(parseISO(срок), new Date(2026, 9, 5, 8, 12)) → 8 / 206 / 57.
     Приложение отбрасывает неполные сутки, поэтому это на день меньше календарной разницы. */
  it("сроки — как в карточке приложения: STK 8, калибровка 206, выгрузка 57 полных суток", () => {
    expect(VEHICLE.inspection.map((d) => [d.code, d.until, daysLeft(d.until)])).toEqual([
      ["STK", "2026-10-14", 8],
      ["CAL", "2027-04-30", 206],
      ["TDL", "2026-12-02", 57],
    ]);
  });

  it("завтрашний срок — «0 дней»: до полуночи меньше суток", () => {
    expect(daysLeft("2026-10-06")).toBe(0);
    expect(daysLeft("2026-10-07")).toBe(1);
  });

  it("десять чипов документов, янтарный один — STK, и он же янтарный в списке", () => {
    expect(VEHICLE.chips.map((c) => c.code)).toEqual(["RC", "COC", "STK", "CAL", "TDL", "ADR", "INS", "CMT", "LIC", "LRM"]);
    expect(VEHICLE.chips.filter((c) => c.tone === "warn").map((c) => c.code)).toEqual(["STK"]);
    expect(VEHICLE.inspection.filter((d) => d.tone === "warn").map((d) => d.code)).toEqual(["STK"]);
  });
});

describe("подстановки", () => {
  it("fill подставляет значения и оставляет неизвестное имя как есть", () => {
    expect(fill("{n} дн. осталось", { n: 8 })).toBe("8 дн. осталось");
    expect(fill("{status} · до {date}", { status: "Отпуск", date: "07.10" })).toBe("Отпуск · до 07.10");
    expect(fill("{doc} до {date}", { doc: "STK" })).toBe("STK до {date}");
  });

  it("splitAt режет шаблон вокруг одной подстановки", () => {
    expect(splitAt("возврат {date}", "date")).toEqual(["возврат ", ""]);
    expect(splitAt("{d}, {wd}", "wd")).toEqual(["{d}, ", ""]);
    expect(splitAt("без подстановки", "date")).toEqual(["без подстановки", ""]);
  });

  it("пробег — как в карточке машины приложения: разряды пробелом, km латиницей", () => {
    expect(fmtKm(VEHICLE.odometerKm)).toBe("486 548 km");
  });

  it("телефон водителя — из резерва 74–76, который операторам не выделен", () => {
    expect(DRIVER_PHONE).toMatch(/^\+4207[456]\d{7}$/);
    expect(DRIVER_PHONE).toBe("+420750000217");
  });
});

describe("русские строки макетов, собранные из данных", () => {
  const s = LANDING_DICT.ru.showcase;

  it("планировщик", () => {
    expect(fill(s.kpiAwaySub, { pct: awayPct(FLEET.away) })).toBe("12% парка");
    expect(fill(s.stUntil, { status: s.stSick, date: fmtDM(until("andrzej")!) })).toBe("Больничный · до 14.10");
    expect(fill(s.stUntil, { status: s.stVac, date: fmtDM(until("lukas")!) })).toBe("Отпуск · до 07.10");
    expect(fill(s.popDays, { n: requestDays() })).toBe("9 дн.");
    expect(fill(s.barUntil, { date: fmtDM(REQUEST.to) })).toBe("до 18.10");
    expect(fill(s.dayFmt, { wd: s.wd[windowDay(0).weekday], d: windowDay(0).day })).toBe("Вс, 4");
    expect(fill(s.dayFmt, { wd: s.wd[windowDay(6).weekday], d: windowDay(6).day })).toBe("Сб, 10");
  });

  it("ротация", () => {
    expect(fill(s.rotHorizon, { n: ROTATION.horizonDays })).toBe("за 14 дн");
    expect(fill(s.rotPrepare, { n: ROTATION.toPrepare })).toBe("Подготовить 2");
    expect(fill(s.rotWeek, { range: "12–18.10" })).toBe("Неделя 12–18.10");
    expect(fill(s.rotWeekCount, { n: ROTATION.week.returning })).toBe("возвращаются 3");
    expect(fill(s.rotReturn, { date: fmtDM(ROTATION_ROWS[2].returnDate) })).toBe("возврат 18.10");
    expect(fill(s.rotBusy, { name: s.mihai })).toBe("Занята: Русу Михай");
    expect(fill(s.rotDoc, { doc: "STK", date: "14.10" })).toBe("STK до 14.10");
  });

  it("карточка машины", () => {
    expect(fill(s.daysLeft, { n: daysLeft("2026-10-14") })).toBe("8 дн. осталось");
    expect(fill(s.daysCal, { n: daysLeft("2027-04-30") })).toBe("206 дн.");
    expect(fill(s.daysTdl, { n: daysLeft("2026-12-02") })).toBe("57 дн.");
  });
});

describe("словари витрины, 12 локалей", () => {
  const tokens = (v: string) => (v.match(/\{\w+\}/g) ?? []).sort().join(" ");
  const ru = LANDING_DICT.ru;

  it("локалей двенадцать", () => {
    expect(LOCALES).toHaveLength(12);
  });

  it.each(LOCALES)("%s: ни одной пустой строки, семь дней недели", (lang) => {
    const { strip, showcase } = LANDING_DICT[lang];
    for (const [k, v] of Object.entries(strip)) expect(v, `strip.${k}`).not.toBe("");
    for (const [k, v] of Object.entries(showcase)) {
      if (k === "wd") continue;
      expect(typeof v, `showcase.${k}`).toBe("string");
      expect(v, `showcase.${k}`).not.toBe("");
    }
    expect(showcase.wd).toHaveLength(7);
    for (const w of showcase.wd) expect(w.length).toBeLessThanOrEqual(3);
  });

  it.each(LOCALES)("%s: подстановки те же, что в русском словаре", (lang) => {
    const { showcase } = LANDING_DICT[lang];
    for (const [k, v] of Object.entries(ru.showcase)) {
      if (typeof v !== "string") continue;
      const other = showcase[k as keyof typeof showcase];
      expect(tokens(other as string), `showcase.${k}`).toBe(tokens(v));
    }
  });

  /* Приложение 2.5.0 по умолчанию печатает «Фамилия Имя» (`DEFAULT_DRIVER_NAME_ORDER = 'last_first'`),
     а инициалы в кружке всегда собирает как «имя + фамилия» — от порядка имени они не зависят. */
  it.each(LOCALES)("%s: имя записано «Фамилия Имя», инициалы и приветствие взяты из него", (lang) => {
    const s = LANDING_DICT[lang].showcase;
    const initials = (full: string) => {
      const [last, first] = full.split(" ");
      return `${first[0]}${last[0]}`.toUpperCase();
    };
    expect(s.marek.endsWith(` ${s.marekFirst}`)).toBe(true);
    for (const id of ["marek", "oleg", "andrzej", "mihai", "lukas", "juris"] as const) {
      expect(s[id].split(" "), id).toHaveLength(2);
      expect(s[`${id}Av` as const], id).toBe(initials(s[id]));
    }
  });

  /* Плитка Telegram — это мини-приложение, а оно печатает «Имя Фамилия» (`Hub.tsx`: `[first, last]`):
     порядок имени компании действует только в приложении. */
  it.each(LOCALES)("%s: в плитке Telegram водитель записан «Имя Фамилия»", (lang) => {
    const s = LANDING_DICT[lang].showcase;
    expect(s.marekTg).toBe(s.marek.split(" ").reverse().join(" "));
    expect(s.marekTg.startsWith(`${s.marekFirst} `)).toBe(true);
  });

  it("ru: один водитель, два написания — «Гаек Марек» в приложении и «Марек Гаек» в Telegram", () => {
    expect(LANDING_DICT.ru.showcase.marek).toBe("Гаек Марек");
    expect(LANDING_DICT.ru.showcase.marekTg).toBe("Марек Гаек");
  });

  /* «Искусственный интеллект» сокращением каждого языка. Границы слова — по буквам Юникода:
     `\b` в JS знает только ASCII и кириллическое «ИИ» не поймал бы никогда. */
  const AI_WORD: Record<string, string> = {
    ru: "ИИ", uk: "ШІ", en: "AI", de: "KI", fr: "IA", es: "IA", it: "IA", ro: "IA", pl: "SI", cs: "UI", lt: "DI", lv: "MI",
  };
  const aiPattern = (lang: string) => new RegExp(`(?<![\\p{L}])(?:AI|${AI_WORD[lang]})(?![\\p{L}])`, "u");

  it("сторож слова «AI» умеет краснеть — в том числе на кириллице", () => {
    expect("это ИИ тут").toMatch(aiPattern("ru"));
    expect("план від ШІ").toMatch(aiPattern("uk"));
    expect("Made by AI.").toMatch(aiPattern("en"));
    expect("KI-Planung").toMatch(aiPattern("de"));
    expect("РОССИИ и ИИСУС").not.toMatch(aiPattern("ru"));
    expect("Di 6.").not.toMatch(aiPattern("lt"));
  });

  it.each(LOCALES)("%s: слово «AI» в полосе и витрине не встречается", (lang) => {
    const { strip, showcase } = LANDING_DICT[lang];
    const all = [...Object.values(strip), ...Object.values(showcase).flat()].join(" \n ");
    expect(all).not.toMatch(aiPattern(lang));
  });

  /* Дата в шапке телефона — строка словаря (так её печатает Intl в каждой локали), а «сегодня» —
     в showcase-data. Связывает их этот тест: сдвинешь TODAY — шапка обязана сдвинуться следом. */
  it.each(LOCALES)("%s: дата в шапке телефона — это «сегодня» макета", (lang) => {
    const { tgDate } = LANDING_DICT[lang].showcase;
    const [year, , day] = TODAY.split("-");
    expect(tgDate).toMatch(new RegExp(`(?<!\\d)${Number(day)}(?!\\d)`));
    expect(tgDate).toContain(year);
  });
});

describe("один месяц и один год на все даты макета", () => {
  /* словарь несёт ОДНО название месяца (tgMonth, plMonth), разметка подставляет его ко всем датам */
  it("окно доски, заявка и её подача — октябрь 2026", () => {
    const dates = [windowDay(0).iso, windowDay(14).iso, REQUEST.from, REQUEST.to, REQUEST.createdDate, TODAY];
    expect(dates.map((d) => d.slice(0, 7))).toEqual(Array(6).fill("2026-10"));
  });
});
