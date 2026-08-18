/* ============================================================================
   Шов №2 из interfaces.md: шаг истории вычисляется из ЧИСЛА прогресса —
   проверяется без DOM.

   Ожидания взяты из спецификации, а не из кода: «четыре шага» (истории 19–20)
   даёт границы 0,25 · 0,5 · 0,75 — они вписаны литералами. Тест НЕ считает
   границу тем же способом, что реализация (`floor(p · 4)`), иначе он не мог бы
   с ней не согласиться: он перечисляет точки и ждёт названные числа.
   ============================================================================ */

import { describe, expect, it } from "vitest";
import {
  JOURNEY_LEG_COUNT,
  JOURNEY_STEP_COUNT,
  journeyArrived,
  journeyLegIndex,
  journeyStepAt,
  journeyTravelAt,
  quantizeJourneyProgress,
} from "../src/lib/journey";

describe("journeyStepAt — номер шага из прогресса сцены", () => {
  /* прогресс → ожидаемый индекс шага (0-based). Границы включаются в
     СЛЕДУЮЩИЙ шаг: 0,25 — это уже второй шаг, а не конец первого. */
  const CASES: Array<[number, number]> = [
    [0, 0],
    [0.1, 0],
    [0.2499, 0],
    [0.25, 1],
    [0.3, 1],
    [0.4999, 1],
    [0.5, 2],
    [0.7499, 2],
    [0.75, 3],
    [0.9, 3],
    [1, 3],
  ];

  for (const [progress, expected] of CASES) {
    it(`прогресс ${progress} → шаг ${expected + 1}`, () => {
      expect(journeyStepAt(progress)).toBe(expected);
    });
  }

  /* Прогресс приходит из измерения DOM: у него бывает выход за диапазон
     (инерционный скролл, bounce на macOS) и бывает NaN (высота трека 0 в
     момент пересчёта режима). Ни то, ни другое не должно давать шаг вне 0..3 —
     иначе классы .active снимутся со всех кадров и сцена станет пустой. */
  it("за пределами диапазона зажимается в первый и последний шаг", () => {
    expect(journeyStepAt(-0.4)).toBe(0);
    expect(journeyStepAt(1.7)).toBe(3);
  });

  it("нечисло даёт первый шаг, а не пустую сцену", () => {
    expect(journeyStepAt(Number.NaN)).toBe(0);
    expect(journeyStepAt(Number.POSITIVE_INFINITY)).toBe(3);
  });
});

describe("journeyTravelAt — доля пройденного маршрута", () => {
  /* Критерий приёмки: «на каждом из 4 шагов машина стоит на своём участке».
     Участков в маршруте Прага → Мюнхен → Лион → Барселона три, шагов четыре,
     значит машина едет первые три шага и к началу четвёртого уже прибыла.
     Отсюда ожидания: на границе k-го шага пройдено ровно k/3 маршрута —
     то есть машина стоит В ГОРОДЕ, а не посреди участка. Числа ниже —
     эти самые k/3, выписанные вручную, а не пересчёт формулы кода. */
  it("на границах шагов машина стоит в городах маршрута", () => {
    expect(journeyTravelAt(0)).toBeCloseTo(0, 6);
    expect(journeyTravelAt(0.25)).toBeCloseTo(0.333333, 5);
    expect(journeyTravelAt(0.5)).toBeCloseTo(0.666667, 5);
    expect(journeyTravelAt(0.75)).toBeCloseTo(1, 6);
  });

  it("середина шага — середина его участка", () => {
    /* половина первого шага (0,125) = половина первого участка = 1/6 маршрута */
    expect(journeyTravelAt(0.125)).toBeCloseTo(0.166667, 5);
    /* половина третьего шага (0,625) = 5/6 маршрута */
    expect(journeyTravelAt(0.625)).toBeCloseTo(0.833333, 5);
  });

  it("четвёртый шаг машину не двигает: рейс уже завершён", () => {
    expect(journeyTravelAt(0.8)).toBe(1);
    expect(journeyTravelAt(1)).toBe(1);
    expect(journeyTravelAt(1.6)).toBe(1);
  });

  it("отрицательный прогресс и нечисло держат машину в начальной точке", () => {
    expect(journeyTravelAt(-0.3)).toBe(0);
    expect(journeyTravelAt(Number.NaN)).toBe(0);
  });
});

describe("quantizeJourneyProgress — квант не перебрасывает точку через границу шага", () => {
  /* Несущее утверждение реализации: публикация округляет прогресс ВНИЗ до
     1/TICKS, и это не имеет права изменить номер шага. Утверждение проверяется
     здесь, а не комментарием: при TICKS, не кратном числу шагов, оба теста
     ниже краснеют (мутация «32 → 30» проверена — падают четыре проверки). */
  it("границы шагов остаются точными числами после квантования", () => {
    for (let step = 0; step < JOURNEY_STEP_COUNT; step++) {
      const boundary = step / JOURNEY_STEP_COUNT; /* 0 · 0,25 · 0,5 · 0,75 */
      expect(quantizeJourneyProgress(boundary)).toBe(boundary);
    }
  });

  it("на всём проходе сцены шаг до и после квантования один и тот же", () => {
    const mismatched: number[] = [];
    for (let i = 0; i <= 1000; i++) {
      const p = i / 1000;
      if (journeyStepAt(quantizeJourneyProgress(p)) !== journeyStepAt(p)) mismatched.push(p);
    }
    expect(mismatched).toEqual([]);
  });

  it("квантование зажимает диапазон и не отдаёт нечисло", () => {
    expect(quantizeJourneyProgress(-1)).toBe(0);
    expect(quantizeJourneyProgress(2)).toBe(1);
    expect(quantizeJourneyProgress(Number.NaN)).toBe(0);
  });
});

describe("journeyLegIndex — участок из номера шага", () => {
  /* Одна функция на два вызывающих: подпись под картой и подсветка `.jleg`.
     Ожидания выписаны из маршрута: участков три, шагов четыре, поэтому
     четвёртый шаг остаётся на третьем участке. */
  it("шаги 1–3 берут свои участки, шаг 4 остаётся на последнем", () => {
    expect(journeyLegIndex(0, JOURNEY_LEG_COUNT)).toBe(0);
    expect(journeyLegIndex(1, JOURNEY_LEG_COUNT)).toBe(1);
    expect(journeyLegIndex(2, JOURNEY_LEG_COUNT)).toBe(2);
    expect(journeyLegIndex(3, JOURNEY_LEG_COUNT)).toBe(2);
  });

  it("пустой маршрут даёт −1, отрицательный шаг — первый участок", () => {
    expect(journeyLegIndex(2, 0)).toBe(-1);
    expect(journeyLegIndex(-5, JOURNEY_LEG_COUNT)).toBe(0);
  });
});

describe("journeyArrived — прибыла ли машина", () => {
  /* Прибытие — производная от номера шага, как и участок: на последнем шаге
     маршрут пройден целиком. Ожидания выписаны из маршрута (шагов четыре,
     участков три), а не пересчитаны формулой кода. */
  it("в пути на шагах 1–3, прибыла на шаге 4", () => {
    expect(journeyArrived(0)).toBe(false);
    expect(journeyArrived(1)).toBe(false);
    expect(journeyArrived(JOURNEY_LEG_COUNT - 1)).toBe(false);
    expect(journeyArrived(JOURNEY_STEP_COUNT - 1)).toBe(true);
  });

  it("шаг за пределами сцены считается прибытием, нечисло — нет", () => {
    expect(journeyArrived(JOURNEY_STEP_COUNT + 2)).toBe(true);
    expect(journeyArrived(-1)).toBe(false);
    expect(journeyArrived(Number.NaN)).toBe(false);
  });
});
