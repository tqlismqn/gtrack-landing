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
   Сам цикл и замер целей живут в useHeroCycle.ts (с 12.10: ту же доску показывает /demo).
   ============================================================================ */

import { useRef } from "react";
import { HERO_STATIC } from "@/lib/hero-data";
import { SceneA, SceneB, SceneC } from "./HeroScenes";
import { useLanding } from "./LandingProvider";
import { useHeroCycle } from "./useHeroCycle";
import { appSignupUrl } from "./urls";

/* Неразрывный пробел — кодом символа: невидимый литерал U+00A0 в исходнике в диффе неотличим
   от пробела, и правка «нормализовать пробелы» молча вернула бы замеры ниже (ревью r0, 11.10);
   escape-последовательность в кавычках декодируют инструменты правки — тот же литерал. */
const NBSP = String.fromCharCode(0xa0);

/** Тире ведущей части фразы не начинает строку: пробел перед ним склеен. Замер r0 11.10:
    без склейки «—» открывал строку серой части в 67 случаях из 216 (12 локалей × 6 ширин ×
    3 фразы), в том числе в каноническом en на 1280/1440; со склейкой — 0. Цена: где
    «слово —» не влезает в строку, фраза получает строку больше — es 768 фраза C 3 вместо 2
    (+46,3 px). en 1280/1440 фраза A так же получала 5 строк вместо 4 (H1 и .hero +70,7 px,
    пустая строка под H1 в сценах B и C). Числа — для прежнего набора фраз (до 12.10);
    новые фразы перемерены тем же замером, итог — в ADR 0013.
    Словари не трогаем — hero-copy.test держит в них обычный пробел перед тире. */
const lead = (s: string) => s.replace(/ —$/, NBSP + "—");

export function Hero() {
  const { d, lang } = useLanding();
  const heroRef = useRef<HTMLElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  useHeroCycle(heroRef, boardRef);

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
