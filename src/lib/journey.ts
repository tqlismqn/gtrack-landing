/* ============================================================================
   JOURNEY — прогресс истории одного водителя.

   Владеет: четырьмя шагами, участками маршрута и текущим шагом.
   Прячет: подписку на общий цикл скролла, троттлинг и поведение при
   reduced-motion.

   Слушателя скролла здесь НЕТ и быть не может. Цикл скролла на лендинге один —
   MotionRoot; прогресс пиннед-сцены считает Scrolly внутри этого цикла и
   отдаёт сюда через publishJourneyProgress(). При reduced-motion (или когда пин
   выключен по ширине/высоте) прогресса просто нет: снимок остаётся нулевым,
   сцена и маршрут стоят статично, и это ровно то поведение, которое требует
   история 25.

   ТРОТТЛИНГ. Публикация квантует прогресс до 1/32 сцены. Причина не в
   экономии на арифметике, а в React: подписчик useJourneyStep() — компонент,
   и без квантования он перерисовывался бы на КАЖДОМ кадре скролла. 32 деления
   кратны четырём шагам (8 на шаг), поэтому округление вниз никогда не
   перебрасывает точку через границу шага: квантованный прогресс и шаг всегда
   согласованы, потому что шаг считается из уже квантованного числа.
   ============================================================================ */

import { useSyncExternalStore } from "react";

/** Шагов в истории — четыре: столько же карточек в сцене и подписей в раскадровке. */
export const JOURNEY_STEP_COUNT = 4;

/** Маршрут истории: Прага → Мюнхен → Лион → Барселона. Города — ключи карты
 *  (`Europe.tsx` знает их координаты; геометрия — не наше дело). */
export const JOURNEY_ROUTE = ["PRG", "MUC", "LYO", "BCN"] as const;

/** Участков на единицу меньше, чем городов: три. Четвёртый шаг — уже прибытие,
 *  машина стоит в конце последнего участка, пока сцена показывает сводку. */
export const JOURNEY_LEG_COUNT = JOURNEY_ROUTE.length - 1;

/** Снимок прогресса истории. */
export interface JourneyStep {
  /** Номер шага, 0…3. */
  index: number;
  /** Прогресс сцены, 0…1, квантованный до 1/32. */
  progress: number;
}

/**
 * Номер шага из числа прогресса. Чистая функция — шов №2 для теста.
 * Границы шагов включаются в следующий шаг: 0,25 — это уже второй шаг.
 * NaN даёт первый шаг, а не пустую сцену; выход за диапазон зажимается.
 */
export function journeyStepAt(progress: number): number {
  if (Number.isNaN(progress)) return 0;
  const raw = Math.floor(progress * JOURNEY_STEP_COUNT);
  return Math.max(0, Math.min(JOURNEY_STEP_COUNT - 1, raw));
}

/**
 * Доля пройденного маршрута, 0…1, из числа прогресса сцены. Чистая функция.
 *
 * Участков три, шагов четыре, поэтому машина едет первые ТРИ шага
 * (прогресс 0…0,75) и к началу четвёртого уже стоит в конечной точке:
 * на четвёртом шаге сцена показывает сводку по завершённому рейсу.
 * Значит travel(0,25) = 1/3 — конец первого участка, ровно там, где
 * начинается второй шаг.
 */
export function journeyTravelAt(progress: number): number {
  if (Number.isNaN(progress)) return 0;
  const travelShare = JOURNEY_LEG_COUNT / JOURNEY_STEP_COUNT;
  return Math.max(0, Math.min(1, progress / travelShare));
}

/**
 * Номер участка, который считается текущим для шага. Участков на один меньше,
 * чем шагов, поэтому последний шаг остаётся на последнем участке — машина уже
 * стоит в его конце.
 *
 * Функция одна на весь проект намеренно: раньше это же выражение стояло
 * отдельно в подписи под картой и отдельно в подсветке `.jleg`, и две копии
 * могли молча разойтись — подпись про один участок, подсвечен другой.
 */
export function journeyLegIndex(step: number, legCount: number): number {
  if (legCount <= 0) return -1;
  if (Number.isNaN(step)) return 0;
  return Math.max(0, Math.min(legCount - 1, Math.floor(step)));
}

/**
 * Прибыла ли машина: на последнем шаге маршрут уже пройден целиком, и сцена
 * показывает сводку по закрытому рейсу, а не участок в пути.
 *
 * Живёт здесь, а не на месте вызова, по той же причине, что и journeyLegIndex:
 * это производная от номера шага, то есть правило маршрута. Посчитанная в
 * компоненте, она разъезжается с участками при первой же смене их числа —
 * подпись сказала бы «в пути», пока машина стоит в конечной точке.
 */
export function journeyArrived(step: number): boolean {
  if (Number.isNaN(step)) return false;
  return step >= JOURNEY_STEP_COUNT - 1;
}

/* ---------------------------------------------------------------------------
   Хранилище снимка. Внешний источник для useSyncExternalStore: пишет Scrolly
   из цикла MotionRoot, читают компоненты сцены.
--------------------------------------------------------------------------- */

/** Делений прогресса на всю сцену; кратно числу шагов — см. заголовок файла
 *  и тест «квант не перебрасывает точку через границу шага». */
const TICKS = 32;

/**
 * Квантование прогресса — троттлинг публикации, вынесенный в чистую функцию,
 * потому что на нём держится несущее утверждение файла: округление вниз до
 * 1/TICKS не имеет права перебросить точку через границу шага. Это свойство
 * проверяется тестом, а не комментарием: при TICKS, не кратном числу шагов,
 * тест краснеет.
 */
export function quantizeJourneyProgress(progress: number): number {
  const clamped = Number.isNaN(progress) ? 0 : Math.max(0, Math.min(1, progress));
  return Math.floor(clamped * TICKS) / TICKS;
}

/** Исходный (и серверный) снимок: сцена не начата. Объект один и тот же —
 *  useSyncExternalStore сравнивает снимки по Object.is. */
const IDLE: JourneyStep = { index: 0, progress: 0 };

let snapshot: JourneyStep = IDLE;
const listeners = new Set<() => void>();

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

const readSnapshot = () => snapshot;
const readSnapshotOnServer = () => IDLE;

/**
 * Отдать прогресс сцены (0…1). Зовётся из scroll-цикла MotionRoot через
 * Scrolly; своего слушателя не заводит. Публикация происходит только когда
 * квантованное значение действительно изменилось.
 */
export function publishJourneyProgress(progress: number): void {
  const quantized = quantizeJourneyProgress(progress);
  if (quantized === snapshot.progress) return;
  snapshot =
    quantized === 0 ? IDLE : { index: journeyStepAt(quantized), progress: quantized };
  reportJourneyStep(snapshot.index);
  for (const listener of listeners) listener();
}

/** Текущий шаг истории и доля прогресса. Без DOM-измерений: только чтение снимка. */
export function useJourneyStep(): JourneyStep {
  return useSyncExternalStore(subscribe, readSnapshot, readSnapshotOnServer);
}

/* ---------------------------------------------------------------------------
   Аналитика: существующий GTM, новых счётчиков не заводим.

   dataLayer создаёт инлайн-скрипт согласия (см. lib/analytics.ts) ДО загрузки
   GTM, поэтому массив здесь всегда есть; необязательность — на случай, когда
   баннер согласия заблокирован расширением. Событие уходит по одному разу на
   шаг за загрузку страницы: нужна доля дошедших до 4-го шага, а не число
   проездов туда-обратно.
--------------------------------------------------------------------------- */

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const reported = new Set<number>();

function reportJourneyStep(index: number): void {
  if (typeof window === "undefined" || reported.has(index)) return;
  reported.add(index);
  window.dataLayer?.push({
    event: "journey_step",
    journey_step: index + 1,
    journey_step_total: JOURNEY_STEP_COUNT,
  });
}
