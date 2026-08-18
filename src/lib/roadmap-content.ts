/* ============================================================================
   Содержание дорожной карты: три горизонта и порядок пунктов внутри каждого.
   Владеет ТОЛЬКО составом и порядком — тексты живут в словаре, иконки в спрайте
   LandingIcons. Компонент страницы про состав ничего не знает и рисует то,
   что здесь перечислено.

   ВНИМАНИЕ: пункты ниже — КАРКАС (таск 01). Это временная выборка из уже
   переведённых ключей секции модулей: она даёт живой текст на всех 12 языках,
   не заводя ни одного нового значения, которое всё равно будет переписано.
   Настоящее содержание карты приносит таск 02 — он заменяет массивы целиком
   и заводит собственные ключи словаря.
   ============================================================================ */

import type { LandingDict } from "./landing-i18n";

export interface RoadmapItem {
  /** ключ спрайта LandingIcons без решётки, например "i-users" */
  icon: string;
  /* Заголовок и описание берутся селектором, а не строковым путём: путь
     в строке типы не проверяют, и опечатка в ключе доезжает до прода. */
  title: (d: LandingDict) => string;
  desc: (d: LandingDict) => string;
}

export interface RoadmapHorizons {
  now: readonly RoadmapItem[];
  wip: readonly RoadmapItem[];
  next: readonly RoadmapItem[];
}

export const ROADMAP: RoadmapHorizons = {
  now: [
    { icon: "i-users", title: (d) => d.modules.m1, desc: (d) => d.modules.m1d },
    { icon: "i-file", title: (d) => d.modules.m2, desc: (d) => d.modules.m2d },
    { icon: "i-board", title: (d) => d.modules.m3, desc: (d) => d.modules.m3d },
  ],
  wip: [
    { icon: "i-truck", title: (d) => d.modules.m4, desc: (d) => d.modules.m4d },
    { icon: "i-package", title: (d) => d.modules.m5, desc: (d) => d.modules.m5d },
  ],
  next: [
    { icon: "i-receipt", title: (d) => d.modules.m6, desc: (d) => d.modules.m6d },
    { icon: "i-chart", title: (d) => d.modules.m7, desc: (d) => d.modules.m7d },
  ],
};
