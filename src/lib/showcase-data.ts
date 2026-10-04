/* ============================================================================
   Витрина «Одна заявка» — ВСЕ числа и даты четырёх макетов живут здесь.
   Компоненты и словари не знают ни одной цифры: счётчики, проценты, даты и
   геометрия полос выводятся из этого модуля, а `test/showcase.test.ts` сверяет
   арифметику литералами (суммы плиток, проценты шапки, «дн. осталось» = дата −
   сегодня, отпуск сб → вс, геометрия полос на трёх кадрах доски).
   Данные выдуманные: ни одного имени, номера или машины клиента.
   Источник состава: спека 2026-10-04-landing-showcase-wave-design.md §2,
   концепт C §3.2. Имена — в словаре (`showcase.*`), здесь только id.
   ============================================================================ */

/** «Сегодня» макетов: понедельник 05.10.2026, 08:12 на доске. */
export const TODAY = "2026-10-05";
/** Доля суток, прошедшая к 08:12 (8,2 / 24 ≈ 0,34) — положение линии «сейчас». */
const NOW_FRACTION = 0.34;

/** Парк глазами планировщика: «Все» = свободны + в рейсе + отпуск и больничный + прочее. */
export const FLEET = { all: 66, free: 9, onTrip: 49, away: 8, other: 0 } as const;

/** Лимит отсутствий приложения (companies.settings.max_leave_percent, по умолчанию 0,15). */
const ABSENCE_LIMIT = 0.15;
/** Полоса шапки зелёная до 0,66 лимита, янтарная до лимита (PlanningMatrix). */
const ABSENCE_GREEN_SHARE = 0.66;

/** Окно доски: 15 дней, вс 04.10 … вс 18.10. Индекс дня = смещение от 04.10. */
export const WINDOW_START = "2026-10-04";
export const WINDOW_DAYS = 15;

/** Сколько водителей из 66 отсутствует в каждый день окна (отпуск + больничный;
    заявка в ожидании не считается — она ещё не назначение). */
export const AWAY_BY_DAY = [9, 8, 6, 6, 5, 5, 7, 7, 7, 7, 7, 6, 6, 5, 5] as const;

/** Заявка Марека: отпуск сб 10.10 → вс 18.10, подана в 07:40, решена в 08:12. */
export const REQUEST = {
  from: "2026-10-10",
  to: "2026-10-18",
  createdDate: "2026-10-05",
  createdTime: "07:40",
  answeredTime: "08:12",
} as const;

/** Телефон в карточке мини-приложения. Заведомо ничей: префиксы 74–76 в чешском
    плане нумерации — «Rezerva pro veřejné mobilní sítě», операторам не выделены
    (příloha č. 1 k vyhlášce č. 117/2007 Sb., znění od 01.01.2024, сверено 04.10.2026).
    Мини-приложение печатает номер без пробелов. Менять — только после той же сверки. */
export const DRIVER_PHONE = "+420750000217";

/** Плитка «Заявка в ожидании» и чип «Требуют решения» (тот же счётчик покажет Центр решений). */
export const PENDING_REQUESTS = 1;
export const NEEDS_DECISION = 10;

/* ---- доска: три кадра одного и того же плана ------------------------------- */

/** Кадр доски: первый день (индекс окна) и число дней. l — десктоп, m — планшет, s — телефон. */
export const CROPS = {
  l: { start: 0, days: 15 },
  m: { start: 1, days: 8 },
  s: { start: 1, days: 7 },
} as const;
export type CropId = keyof typeof CROPS;

export type BarKind = "trip" | "vac" | "sick" | "req";
export interface Bar {
  kind: BarKind;
  /** первый день полосы, индекс окна; отрицательный — началась до окна */
  from: number;
  /** день ПОСЛЕ последнего; больше WINDOW_DAYS — уходит за окно */
  to: number;
  truck?: string;
  trailer?: string;
}

export type DriverId = "marek" | "oleg" | "andrzej" | "mihai" | "lukas" | "juris";
export type FlagId = "cz" | "ua" | "pl" | "ro" | "lv";
/** Статус водителя в пилюле. У отсутствия дата обязательна: «· до ДД.ММ» — последний его день,
    и тип не даёт нарисовать пилюлю отпуска без даты. */
export type BoardStatus =
  | { status: "trip" | "free" }
  | { status: "sick" | "vac"; until: string };

export type BoardRow = BoardStatus & {
  id: DriverId;
  num: string;
  flag: FlagId;
  /** готовность водителя, % — достижимые значения слотовой модели: 0 / 33 / 67 / 100 */
  ready: number;
  /** число документов с истекающим сроком — янтарный чип «⚠ N» */
  docWarn?: number;
  bars: readonly Bar[];
  /** место строки на кадре m (Марек последним — окно заявки открывается под его строкой); null — строки нет */
  orderM: number | null;
  /** есть ли строка на кадре s */
  onS: boolean;
};

const BEFORE = -1;
const BEYOND = 99;

export const BOARD_ROWS: readonly BoardRow[] = [
  {
    id: "marek", num: "0217", flag: "cz", ready: 100, status: "trip",
    bars: [
      { kind: "trip", from: 0, to: 6, truck: "GT-114", trailer: "T-208" },
      { kind: "req", from: 6, to: 15 },
    ],
    orderM: 4, onS: true,
  },
  {
    id: "oleg", num: "0142", flag: "ua", ready: 100, status: "trip",
    bars: [{ kind: "trip", from: BEFORE, to: BEYOND, truck: "GT-127", trailer: "T-215" }],
    orderM: 1, onS: true,
  },
  {
    id: "andrzej", num: "0203", flag: "pl", ready: 67, status: "sick", until: "2026-10-14",
    bars: [{ kind: "sick", from: BEFORE, to: 11 }],
    orderM: 3, onS: false,
  },
  {
    id: "mihai", num: "0156", flag: "ro", ready: 100, status: "free",
    bars: [{ kind: "trip", from: 2, to: BEYOND, truck: "GT-109", trailer: "T-221" }],
    orderM: 2, onS: true,
  },
  {
    id: "lukas", num: "0188", flag: "cz", ready: 100, status: "vac", until: "2026-10-07", docWarn: 1,
    bars: [
      { kind: "vac", from: BEFORE, to: 4 },
      { kind: "trip", from: 4, to: BEYOND, truck: "GT-131" },
    ],
    orderM: null, onS: false,
  },
];

/* ---- ротация: карточка «Возвращаются» -------------------------------------- */

export const ROTATION = {
  horizonDays: 14,
  /** всего возвращаются за горизонт: 3 строки недели 05–11.10 (не нарисованы) + 3 недели 12–18.10 */
  returning: 6,
  ready: 4,
  toPrepare: 2,
  week: { from: "2026-10-12", to: "2026-10-18", returning: 3 },
} as const;

/** Готова ли прежняя машина к возвращению водителя: свободна и в срок · занята другим ·
    у неё кончается документ (код и дата обязательны — пилюля печатает оба). */
export type RotationReadiness =
  | { readiness: "ready" }
  | { readiness: "busy"; busyBy: DriverId }
  | { readiness: "doc"; docCode: InspectionCode; docUntil: string };

export type RotationRow = RotationReadiness & {
  id: DriverId;
  num: string;
  flag: FlagId;
  ready: number;
  absence: "sick" | "vac";
  returnDate: string;
  truck: string;
};

export const ROTATION_ROWS: readonly RotationRow[] = [
  { id: "andrzej", num: "0203", flag: "pl", ready: 67, absence: "sick", returnDate: "2026-10-14", truck: "GT-122", readiness: "ready" },
  { id: "juris", num: "0171", flag: "lv", ready: 100, absence: "vac", returnDate: "2026-10-16", truck: "GT-109", readiness: "busy", busyBy: "mihai" },
  { id: "marek", num: "0217", flag: "cz", ready: 100, absence: "vac", returnDate: "2026-10-18", truck: "GT-114", readiness: "doc", docCode: "STK", docUntil: "2026-10-14" },
];

/* ---- карточка машины GT-114 ------------------------------------------------- */

export type DocTone = "ok" | "warn";
/** Документы группы «Осмотр»: только у них есть строка с названием в словаре витрины. */
export type InspectionCode = "STK" | "CAL" | "TDL";
export interface VehicleDoc {
  code: InspectionCode;
  until: string;
  tone: DocTone;
}

export const VEHICLE = {
  name: "GT-114",
  trailer: "T-208",
  flag: "cz" as FlagId,
  make: "DAF",
  model: "XF 480",
  year: 2021,
  /* код края R чешским краям не присвоен — такого номера в стандартной серии нет */
  plate: "5RB 1234",
  odometerKm: 486548,
  /** готовность машины, % — достижимые значения: 0 / 25 / 50 / 75 / 100 (4 обязательных документа) */
  ready: 100,
  /** полоса чипов документов; истекающий считается действующим, поэтому кольцо 100 % */
  chips: [
    { code: "RC", tone: "ok" }, { code: "COC", tone: "ok" }, { code: "STK", tone: "warn" },
    { code: "CAL", tone: "ok" }, { code: "TDL", tone: "ok" }, { code: "ADR", tone: "ok" },
    { code: "INS", tone: "ok" }, { code: "CMT", tone: "ok" }, { code: "LIC", tone: "ok" },
    { code: "LRM", tone: "ok" },
  ] as ReadonlyArray<{ code: string; tone: DocTone }>,
  /** группа «Осмотр» вкладки «Документы» */
  inspection: [
    { code: "STK", until: "2026-10-14", tone: "warn" },
    { code: "CAL", until: "2027-04-30", tone: "ok" },
    { code: "TDL", until: "2026-12-02", tone: "ok" },
  ] as readonly VehicleDoc[],
} as const;

/* ---- производные: считает модуль, сверяет тест ------------------------------ */

const DAY_MS = 86_400_000;

function utc(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

/** Целых дней от `fromIso` до `toIso` (может быть отрицательным). */
export function daysBetween(fromIso: string, toIso: string): number {
  return Math.round((utc(toIso) - utc(fromIso)) / DAY_MS);
}

/** Сколько дней осталось до срока документа — как считает карточка приложения:
    `differenceInDays(parseISO(expiry), new Date())` (VehicleDocRow.tsx) отбрасывает неполные сутки.
    В 08:12 понедельника до полуночи 14.10 — 8 полных суток и 15 часов, приложение печатает 8.
    Календарная разница (9) на экране приложения в этот день недостижима. */
export function daysLeft(iso: string): number {
  return Math.floor(daysBetween(TODAY, iso) - NOW_FRACTION);
}

/** Длительность заявки в днях, оба конца включительно. */
export function requestDays(): number {
  return daysBetween(REQUEST.from, REQUEST.to) + 1;
}

/** День окна по индексу: число месяца и день недели (0 = вс … 6 = сб). */
export function windowDay(index: number): { iso: string; day: number; weekday: number } {
  const t = new Date(utc(WINDOW_START) + index * DAY_MS);
  const iso = t.toISOString().slice(0, 10);
  return { iso, day: t.getUTCDate(), weekday: t.getUTCDay() };
}

/** Процент отсутствующих от парка, как печатает приложение: целое, обычное округление. */
export function awayPct(count: number): number {
  return Math.round((count / FLEET.all) * 100);
}

/** Цвет полосы отсутствий в шапке дня: янтарный выше 0,66 лимита. Красного (выше лимита) в окне нет. */
export function awayTone(count: number): "ok" | "warn" {
  return count / FLEET.all > ABSENCE_LIMIT * ABSENCE_GREEN_SHARE ? "warn" : "ok";
}

/** Положение линии «сейчас» — доля ширины дорожки кадра. */
export function nowLine(crop: CropId): number {
  const c = CROPS[crop];
  const todayIndex = daysBetween(WINDOW_START, TODAY);
  return +((todayIndex - c.start + NOW_FRACTION) / c.days).toFixed(4);
}

/** dd.MM */
export function fmtDM(iso: string): string {
  const [, m, d] = iso.split("-");
  return `${d}.${m}`;
}

/** dd.MM.yyyy */
export function fmtDMY(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

/* Геометрия полосы на кадре. Между соседними полосами — зазор: по 0,4 % дорожки
   с каждой стороны на кадрах l и m, по 2 px на телефоне. Край, совпавший с краем
   кадра, зазора не получает; на телефоне полоса, уходящая за правый край кадра,
   выезжает на 10 px за дорожку — окно планировщика там режет её своим краем. */
const GAP_PCT = 0.4;
const GAP_PX = 2;
const OVERRUN_PX = 10;

function pct(n: number): string {
  return `${+n.toFixed(2)}%`;
}

export interface BarBox {
  left: string;
  width: string;
}

/** Полоса в координатах кадра; null — полоса в кадр не попадает. */
export function barBox(bar: Bar, crop: CropId): BarBox | null {
  const c = CROPS[crop];
  const end = c.start + c.days;
  const from = Math.max(bar.from, c.start);
  const to = Math.min(bar.to, end);
  if (to <= from) return null;
  const leftPct = ((from - c.start) / c.days) * 100;
  const rightPct = ((to - c.start) / c.days) * 100;
  const gapLeft = from > c.start;
  const gapRight = to < end;
  if (crop !== "s") {
    const l = leftPct + (gapLeft ? GAP_PCT : 0);
    const r = rightPct - (gapRight ? GAP_PCT : 0);
    return { left: pct(l), width: pct(r - l) };
  }
  const leftPx = gapLeft ? GAP_PX : 0;
  const rightPx = gapRight ? -GAP_PX : bar.to > end ? OVERRUN_PX : 0;
  const deltaPx = rightPx - leftPx;
  const span = pct(rightPct - leftPct);
  return {
    left: leftPx ? `calc(${pct(leftPct)} + ${leftPx}px)` : pct(leftPct),
    width: deltaPx === 0 ? span : `calc(${span} ${deltaPx > 0 ? "+" : "-"} ${Math.abs(deltaPx)}px)`,
  };
}

/** Подстановка в шаблон словаря: «{n} дн. осталось» + { n: 9 } → «9 дн. осталось».
    Имя без значения остаётся как есть — потерянную подстановку видно глазом и тестом. */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, key: string) => (key in vars ? String(vars[key]) : m));
}

/** Шаблон, разрезанный по одной подстановке: текст до и после неё (значение рисует разметка). */
export function splitAt(template: string, key: string): [string, string] {
  const token = `{${key}}`;
  const i = template.indexOf(token);
  return i < 0 ? [template, ""] : [template.slice(0, i), template.slice(i + token.length)];
}

/** Пробег, как его печатает карточка машины приложения: разряды пробелом, «km» латиницей. */
export function fmtKm(km: number): string {
  return `${km.toLocaleString("en-US").replace(/,/g, " ")} km`;
}

/** Длина дуги кольца готовности водителя (r = 15,5) и машины (r = 16,5). */
export const RING_C = { driver: 97.39, vehicle: 103.67 } as const;

/** Смещение штриха кольца для процента готовности. */
export function ringOffset(pctReady: number, c: number): string {
  return (c * (1 - pctReady / 100)).toFixed(2).replace(/\.?0+$/, "") || "0";
}
