"use client";

/* ============================================================================
   HERO — атмосфера + три сцены «как говорят в конторе» (ворота 1, задача 6):
   A — отпуск из Telegram на доску, B — кто едет, кто стоит рядом с планом,
   C — сроки документов заранее (сцены — HeroScenes.tsx, шаги — hero-data.ts).
   ОДНА смысловая правка порта прототипа осталась: hero-sub — статичный текст
   «G-Track — …» без морфящегося .wm (морф остался только в Nav-лого).

   H1 — три фразы в одной ячейке сетки: видна фраза текущей сцены, остальные
   только прозрачны (opacity: 0) — высота H1 = самой длинной фразе без JS,
   весь текст доступен поиску и скринридеру; aria-live нет (объявлял бы
   смену каждые 6–12 с). Доска — три слоя в одной ячейке, подпись — три
   наложенные строки: смена сцены не двигает страницу.

   Цикл — одна цепочка setTimeout по HERO_STEPS: пишет section.dataset.hs и
   board.dataset.phase напрямую, без перерисовки React; кадры рисует CSS.
   SSR, reduced-motion и остановка = HERO_STATIC (a2: заявка пришла и ждёт
   решения — пунктир, а не «одобрено само»). Первый проход стартует с a2,
   без скачка от SSR-кадра, следующие — с a0. Вне экрана цикл стоит
   (useInViewport), режим движения — только motion-ok / gt-motion-applied
   (MotionRoot); своего matchMedia здесь нет.
   ============================================================================ */

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useInViewport } from "@/hooks/useInViewport";
import { HERO_STATIC, HERO_STEPS } from "@/lib/hero-data";
import { SceneA, SceneB, SceneC } from "./HeroScenes";
import { useLanding } from "./LandingProvider";
import { appSignupUrl } from "./urls";

const STATIC_IDX = HERO_STEPS.indexOf(HERO_STATIC);

/* Неразрывный пробел — кодом символа: невидимый литерал U+00A0 в исходнике в диффе неотличим
   от пробела, и правка «нормализовать пробелы» молча вернула бы замеры ниже (ревью r0, 11.10);
   escape-последовательность в кавычках декодируют инструменты правки — тот же литерал. */
const NBSP = String.fromCharCode(0xa0);

/** Тире ведущей части фразы не начинает строку: пробел перед ним склеен. Замер r0 11.10:
    без склейки «—» открывал строку серой части в 67 случаях из 216 (12 локалей × 6 ширин ×
    3 фразы), в том числе в каноническом en на 1280/1440; со склейкой — 0. Цена: где
    «слово —» не влезает в строку, фраза получает строку больше — en 1280/1440 фраза A
    5 строк вместо 4 (H1 и .hero +70,7 px), es 768 фраза C 3 вместо 2 (+46,3 px).
    Словари не трогаем — hero-copy.test держит в них обычный пробел перед тире. */
const lead = (s: string) => s.replace(/ —$/, NBSP + "—");

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
    const mh = layer.querySelector<HTMLElement>(".minicard")?.offsetHeight ?? 0;
    setOrigin();
    if (!chip) return;
    const cy = chip.y + chip.h * 0.85;
    set("--cx", chip.x + chip.w * 0.7);
    set("--cy", cy);
    /* миникарточка (272 px) — под чипом, не выходя за борт; если до низа доски ей не
       хватает высоты — над чипом. Замер 11.10: под чипом она выходила за низ доски
       на 28 px (ru, 1440) … 57 px (de, 320/390) и ложилась на подпись — так было
       и в прежнем цикле */
    set("--mx", clamp(chip.x - 20, 10, W - 286));
    set("--my", cy + 16 + mh <= H - 8 ? cy + 16 : Math.max(8, chip.y - mh - 8));
  }
}

function measureAll(board: HTMLElement) {
  board.querySelectorAll<HTMLElement>(".hs-layer").forEach(measureLayer);
}

export function Hero() {
  const { d, lang } = useLanding();
  const heroRef = useRef<HTMLElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  /* индекс текущего шага: переживает паузу вне экрана, сбрасывается на HERO_STATIC при остановке */
  const stepRef = useRef(STATIC_IDX);
  const inView = useInViewport(heroRef, { rootMargin: "0px" });
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
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
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
  }, [motionOk, inView]);

  return (
    <section className="hero" data-screen-label="Hero" id="hero" data-hs={HERO_STATIC.scene} ref={heroRef}>
      <div className="atmo" aria-hidden="true">
        <div className="blob b1"></div><div className="blob b2"></div><div className="blob b3"></div>
        <div className="grid-layer"></div>
        <div className="fade"></div>
      </div>
      <div className="wrap hero-grid">
        <div>
          <div className="hero-kicker reveal">
            {/* пробелы ВНУТРИ сегмента склеены неразрывными: и пробел ПЕРЕД «·» тоже — строка рвётся только после «·».
                Замер 02.10: на 390 последнее слово («сервис», «Wartung») уезжало одно на вторую
                строку во всех 12 локалях, на 320 es начинал строку с разделителя */}
            <span className="overline">{d.hero.kicker.split(" · ").map((s) => s.replaceAll(" ", NBSP)).join(NBSP + "· ")}</span>
          </div>
          {/* три фразы — одна ячейка сетки (hero-scenes.css); пробелы между ними держат textContent читаемым */}
          <h1 id="hero-h1" className="reveal hs-h1" data-delay="60">
            <span className="hs-ph" data-hs="a">{lead(d.hero.phA)} <span className="dim">{d.hero.phAdim}</span></span>{" "}
            <span className="hs-ph" data-hs="b">{lead(d.hero.phB)} <span className="dim">{d.hero.phBdim}</span></span>{" "}
            <span className="hs-ph" data-hs="c">{lead(d.hero.phC)} <span className="dim">{d.hero.phCdim}</span></span>
          </h1>
          <p className="hero-sub reveal" data-delay="120">
            G-Track{d.hero.sub}
          </p>
          <div className="hero-ctas reveal" data-delay="180">
            <a className="btn accent" href={appSignupUrl(lang)}>{d.hero.ctaTrial}</a>
            <a className="btn ghost" href="#pricing">{d.hero.ctaPricing}</a>
          </div>
          <div className="hero-micro reveal" data-delay="240">
            <span>{d.hero.micro1}</span><span className="mdot"></span>
            <span>{d.hero.micro2}</span><span className="mdot"></span>
            <span>{d.hero.micro3}</span>
          </div>
        </div>

        <div className="reveal" data-delay="200">
          {/* сцена: три слоя .pwin в одной ячейке; наклон и позиция держатся на .hero-board (hero.css) */}
          <div
            className="hero-board hs-stage"
            ref={boardRef}
            data-phase={HERO_STATIC.id}
            role="img"
            aria-label={d.hero.boardAria}
          >
            <SceneA d={d} />
            <SceneB d={d} />
            <SceneC d={d} />
          </div>
          {/* подпись: A — пустая строка (неразрывный пробел держит высоту), B — трекер, C — скан.
              Пробелы между строками — ради textContent (скринридер, поиск): без них «…к G-TrackЗагружаете…»;
              в гриде пробельный текст элементом не становится и раскладку не трогает */}
          <p className="board-caption hs-caps">
            <span className="hs-cap" data-hs="a">{NBSP}</span>{" "}
            <span className="hs-cap" data-hs="b">{d.hero.trackerCaption}</span>{" "}
            <span className="hs-cap" data-hs="c">{d.hero.boardCaption}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
