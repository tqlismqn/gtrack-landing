"use client";

/* ============================================================================
   Цикл сцен доски первого экрана (A/B/C, шаги HERO_STEPS) — вынесен из Hero.tsx
   12.10 (Г41), чтобы ту же доску показывала страница заявки /demo. Код перенесён
   как был: хозяин (`hostRef`) получает data-hs сцены — на главной это <section
   class="hero"> (по нему же переключаются фразы H1 и подписи), на /demo — обёртка
   доски с классом hero; доска (`boardRef`) получает data-phase шага. Замер целей
   курсора, пауза вне экрана и режим движения (MotionRoot) — без изменений.
   ============================================================================ */

import { useEffect, useRef, useSyncExternalStore, type RefObject } from "react";
import { useInViewport } from "@/hooks/useInViewport";
import { HERO_STATIC, HERO_STEPS } from "@/lib/hero-data";

const STATIC_IDX = HERO_STEPS.indexOf(HERO_STATIC);

/* Режим движения как внешний источник — тот же рецепт, что VideoSection.tsx:
   владеет им MotionRoot (класс на <html> + событие о смене). */
const subscribeMotion = (onChange: () => void) => {
  window.addEventListener("gt-motion-applied", onChange);
  return () => window.removeEventListener("gt-motion-applied", onChange);
};
const readMotionOk = () => document.documentElement.classList.contains("motion-ok");
const readMotionOkOnServer = () => false;

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

/** Прямоугольник элемента в координатах слоя. Доска на ≥ l наклонена 3D-трансформом
    и раздувает getBoundingClientRect на ~1,5 % — делим на масштаб самого слоя
    (layout-ширина / видимая), чтобы цели курсора не уезжали к правому краю. */
function boxIn(layer: HTMLElement, el: Element | null) {
  if (!el) return null;
  const lr = layer.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  if (!lr.width || !lr.height || !r.width) return null;
  const sx = layer.offsetWidth / lr.width;
  const sy = layer.offsetHeight / lr.height;
  return { x: (r.left - lr.left) * sx, y: (r.top - lr.top) * sy, w: r.width * sx, h: r.height * sy };
}

/** Цели курсора, окно заявки и миникарточка — по реальной раскладке слоя.
    Скрытый слой (visibility: hidden) раскладку сохраняет, поэтому мерить можно любой. */
function measureLayer(layer: HTMLElement) {
  /* сначала все чтения, потом записи: запись переменной перед чтением прямоугольника
     заставляет браузер пересчитать раскладку ещё раз (ревью r0, 11.10) */
  const W = layer.offsetWidth;
  const H = layer.offsetHeight;
  if (!W || !H) return;
  const set = (k: string, v: number) => layer.style.setProperty(k, v.toFixed(1) + "px");
  /* курсор приходит из правого нижнего угла слоя и не выходит за доску */
  const setOrigin = () => {
    set("--cx0", W - 40);
    set("--cy0", H - 30);
  };
  const scene = layer.dataset.hs;
  if (scene === "a") {
    const bar = boxIn(layer, layer.querySelector(".hs-leave .tripbar.req"));
    setOrigin();
    if (!bar) return;
    set("--cx", bar.x + bar.w * 0.45);
    set("--cy", bar.y + bar.h * 0.7);
    /* окно заявки — под полосой Новака; кнопку «Одобрить» меряем уже после того,
       как окно встало на место: это единственное чтение после записи, и оно нужно */
    set("--py", bar.y + bar.h + 6);
    const ok = boxIn(layer, layer.querySelector(".hs-pop .pbtn.primary"));
    if (!ok) return;
    set("--cx2", ok.x + ok.w * 0.55);
    set("--cy2", ok.y + ok.h * 0.7);
  } else if (scene === "c") {
    const chip = boxIn(layer, layer.querySelector(".swap.visa"));
    const card = layer.querySelector<HTMLElement>(".minicard");
    const mh = card?.offsetHeight ?? 0;
    const mw = card?.offsetWidth ?? 0;
    setOrigin();
    if (!chip) return;
    const cy = chip.y + chip.h * 0.85;
    set("--cx", chip.x + chip.w * 0.7);
    set("--cy", cy);
    /* миникарточка — под чипом, не выходя за борт; если до низа доски ей не
       хватает высоты — над чипом. Замер 11.10: под чипом она выходила за низ доски
       на 28 px (ru, 1440) … 57 px (de, 320/390) и ложилась на подпись — так было
       и в прежнем цикле. Правая граница — по настоящей ширине карточки (fx.css:
       min(272px, слой − 20)): с литералом 272 на 320 граница W − 286 уходила в минус,
       и карточка вылезала за правый край слоя на 8 px (замер r2 11.10); max(10, …) —
       левый край не уходит за борт, даже если карточка шире слоя */
    set("--mx", clamp(chip.x - 20, 10, Math.max(10, W - mw - 10)));
    set("--my", cy + 16 + mh <= H - 8 ? cy + 16 : Math.max(8, chip.y - mh - 8));
  }
}

function measureAll(board: HTMLElement) {
  board.querySelectorAll<HTMLElement>(".hs-layer").forEach(measureLayer);
}

export function useHeroCycle(hostRef: RefObject<HTMLElement | null>, boardRef: RefObject<HTMLDivElement | null>) {
  /* индекс текущего шага: переживает паузу вне экрана, сбрасывается на HERO_STATIC при остановке */
  const stepRef = useRef(STATIC_IDX);
  const inView = useInViewport(hostRef, { rootMargin: "0px" });
  const motionOk = useSyncExternalStore(subscribeMotion, readMotionOk, readMotionOkOnServer);

  /* замер целей: сразу, после загрузки шрифтов (ширины имён и чипов) и на resize —
     не чаще кадра: перетаскивание окна шлёт resize пачкой, а замер трёх слоёв — это
     несколько принудительных раскладок */
  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    let alive = true;
    let raf = 0;
    const remeasure = () => {
      if (alive) measureAll(board);
    };
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(remeasure);
    };
    remeasure();
    if ("fonts" in document) document.fonts.ready.then(remeasure);
    window.addEventListener("resize", onResize);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
    /* ссылки — стабильные объекты: в зависимостях ради правила хуков, перезапуска не дают */
  }, [boardRef]);

  useEffect(() => {
    const hero = hostRef.current;
    const board = boardRef.current;
    if (!hero || !board) return;
    const show = (i: number) => {
      hero.setAttribute("data-hs", HERO_STEPS[i].scene);
      board.setAttribute("data-phase", HERO_STEPS[i].id);
    };
    if (!motionOk) {
      /* движения нет — статичный кадр a2, следующий старт снова с него */
      stepRef.current = STATIC_IDX;
      show(STATIC_IDX);
      return;
    }
    if (!inView) return; /* пауза: кадр остаётся, шаг продолжится с того же места */

    let timer = 0;
    const run = () => {
      const i = stepRef.current;
      const step = HERO_STEPS[i];
      show(i);
      /* первый шаг сцены — перемерить её слой: раскладка могла сдвинуться за прошлый проход */
      if (i === 0 || HERO_STEPS[i - 1].scene !== step.scene) {
        const layer = board.querySelector<HTMLElement>(`.hs-layer[data-hs="${step.scene}"]`);
        if (layer) measureLayer(layer);
      }
      timer = window.setTimeout(() => {
        stepRef.current = (i + 1) % HERO_STEPS.length;
        run();
      }, step.dur);
    };
    run();
    return () => window.clearTimeout(timer);
  }, [motionOk, inView, hostRef, boardRef]);

}
