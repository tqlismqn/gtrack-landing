"use client";

/* ============================================================================
   Доска первого экрана на странице заявки /demo (Г41, владелец 12.10: «похоже на
   наш интерфейс, узнаваемое»). Те же три сцены (A отпуск из Telegram, B кто едет —
   кто стоит, C срок визы), тот же цикл useHeroCycle и тот же CSS, что на главной.
   Обёртка несёт класс hero — по нему hero-scenes.css переключает слои и подписи
   (.hero[data-hs=…]); отступы и обрезку секции главной снимает .hero.demo-hero
   (demo.css). Колонка объявляет тот же именованный контейнер hero-board-col, что
   колонка доски на главной: наклон и поля доски решаются так же, по её ширине.
   ============================================================================ */

import { useRef } from "react";
import { HERO_STATIC } from "@/lib/hero-data";
import { SceneA, SceneB, SceneC } from "./HeroScenes";
import { useLanding } from "./LandingProvider";
import { useHeroCycle } from "./useHeroCycle";

const NBSP = String.fromCharCode(0xa0);

export function DemoBoard() {
  const { d } = useLanding();
  const hostRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  useHeroCycle(hostRef, boardRef);

  return (
    <div className="hero demo-hero" data-hs={HERO_STATIC.scene} ref={hostRef}>
      <div className="demo-hero-col">
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
        {/* подписи сцен — как на главной: B обязана нести формулировку Г16 о трекере */}
        <p className="board-caption hs-caps">
          <span className="hs-cap" data-hs="a">{NBSP}</span>{" "}
          <span className="hs-cap" data-hs="b">{d.hero.trackerCaption}</span>{" "}
          <span className="hs-cap" data-hs="c">{d.hero.boardCaption}</span>
        </p>
      </div>
    </div>
  );
}
