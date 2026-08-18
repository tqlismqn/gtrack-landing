"use client";

/* ============================================================================
   «ВСЯ ЕВРОПА НА ОДНОЙ ДОСКЕ» — порт карты из fx.js: маршруты строятся
   декларативно (геометрия — детерминированная, как buildMap), draw по входу
   во вьюпорт, через 3.1с collapse в euro-board, settled-гард, сброс при
   полном выходе из вьюпорта.
   ============================================================================ */

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { journeyLegIndex } from "@/lib/journey";
import { useLanding } from "./LandingProvider";
import { EUROPE_LAND } from "./europe-land-path";

/* координаты городов — пиксели той же проекции, что и контур EUROPE_LAND
   (Natural Earth equirectangular, viewBox 860×560), поэтому города стоят
   географически верно на силуэте.

   Проекция линейна по градусам, формула восстановлена из самих координат
   и сходится на MAD / LON / KYI / RIG / MIL с точностью до пикселя:
       x = 288.6 + 12.858 · долгота(°E)
       y = 422   − 20.02  · широта(°N)
   Новый город добавлять ТОЛЬКО по ней — иначе точка встанет мимо силуэта.
   Лион (45.76 N, 4.835 E) = [351, 315]: посчитан, но НЕ добавлен — до таска 06
   у него нет вызывающего. Роль «третьей точки маршрута» здесь исполняет MIL. */
const CITIES: Record<string, [number, number]> = {
  MAD: [241, 422], BCN: [316, 402], PAR: [319, 253], LON: [287, 200],
  AMS: [352, 183], HAM: [417, 159], BER: [461, 180], PRG: [474, 228],
  MUC: [437, 267], MIL: [407, 321], ROM: [449, 392], VIE: [499, 266],
  WAW: [559, 185], BUD: [533, 280], RIG: [599, 91], VIL: [614, 136],
  KYI: [681, 221], BUC: [624, 341],
};
const ROUTES: Array<[string, string]> = [
  ["PRG", "PAR"], ["WAW", "PAR"], ["RIG", "AMS"], ["VIL", "BER"], ["PRG", "MIL"],
  ["PRG", "BCN"], ["BER", "PAR"], ["WAW", "MUC"], ["KYI", "WAW"], ["BUC", "VIE"],
  ["BUD", "HAM"], ["PRG", "ROM"], ["RIG", "MUC"], ["VIL", "AMS"], ["MAD", "PAR"],
  ["MIL", "VIE"], ["PRG", "HAM"], ["BCN", "MIL"], ["KYI", "PRG"], ["BUC", "BUD"],
];

/* геометрия маршрутов — 1:1 формулы buildMap() из fx.js */
const ROUTE_GEOMETRY = ROUTES.map((pair, i) => {
  const a = CITIES[pair[0]];
  const b = CITIES[pair[1]];
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const bow = Math.min(34, len * 0.18) * (i % 2 ? 1 : -1);
  const cx = mx - (dy / len) * bow;
  const cy = my + (dx / len) * bow;
  return {
    d: "M " + a[0] + " " + a[1] + " Q " + cx + " " + cy + " " + b[0] + " " + b[1],
    cls: i % 3 === 2 ? "vio" : "sky",
    delay: i * 90,
  };
});
/* маршрут истории водителя: Прага → Мюнхен → Милан → Барселона → Мадрид.
   Только эти узлы остаются на узкой ступени — остальные гасит CSS
   (`.city:not(.city-story)`), чтобы 18 точек не сливались в пыль. */
const STORY_CITIES = new Set(["PRG", "MUC", "MIL", "BCN", "MAD"]);

const CITY_LIST = Object.keys(CITIES).map((key, k) => ({
  key,
  c: CITIES[key],
  delay: k * 160,
  story: STORY_CITIES.has(key),
}));

/* Лион — единственный город маршрута истории, которого нет в CITIES, и он
   добавлен ИМЕННО ЗДЕСЬ, а не туда: в ROUTES у него нет ни одной линии, поэтому
   на полной карте секции он стал бы одинокой точкой, а измеренный критерий
   истории 29 («18 городов на 670 px не сливаются») перестал бы описывать то,
   что нарисовано. Координата посчитана по проекции, записанной выше:
   45,76 N / 4,835 E → x = 288,6 + 12,858 · 4,835 = 351, y = 422 − 20,02 · 45,76 = 315. */
const JOURNEY_CITIES: Record<string, [number, number]> = { ...CITIES, LYO: [351, 315] };

/** Участок маршрута истории: прямая между двумя городами. Прямая, а не дуга
 *  как у фоновых линий: по ней считается положение машины, и точка обязана
 *  лежать ровно на нарисованном штрихе. */
interface JourneyLeg {
  a: [number, number];
  b: [number, number];
  len: number;
  d: string;
}

function buildJourneyLegs(route: readonly string[]): JourneyLeg[] {
  const pts = route.map((key) => JOURNEY_CITIES[key]).filter(Boolean);
  const legs: JourneyLeg[] = [];
  for (let i = 0; i + 1 < pts.length; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    legs.push({
      a,
      b,
      len: Math.hypot(b[0] - a[0], b[1] - a[1]),
      d: `M ${a[0]} ${a[1]} L ${b[0]} ${b[1]}`,
    });
  }
  return legs;
}

/** Точка на ломаной по доле пройденного (0…1) плюс знак направления по x:
 *  силуэт машины разворачивается по ходу движения, а не едет задом. */
function pointOnLegs(legs: JourneyLeg[], travelled: number) {
  const total = legs.reduce((sum, leg) => sum + leg.len, 0);
  const target = Math.max(0, Math.min(1, travelled)) * total;
  let acc = 0;
  for (let i = 0; i < legs.length; i++) {
    const leg = legs[i];
    const isLast = i === legs.length - 1;
    if (target <= acc + leg.len || isLast) {
      const k = leg.len ? Math.max(0, Math.min(1, (target - acc) / leg.len)) : 0;
      return {
        x: leg.a[0] + (leg.b[0] - leg.a[0]) * k,
        y: leg.a[1] + (leg.b[1] - leg.a[1]) * k,
        westbound: leg.b[0] < leg.a[0],
      };
    }
    acc += leg.len;
  }
  return { x: 0, y: 0, westbound: false };
}

/* `full` — карта секции «Вся Европа на одной доске».
   `inline` — компактная карта внутри ожившей сцены; здесь сделан только
   переключатель и сокращённый набор узлов, остальное достраивает таск 06. */
export type EuropeMapVariant = "full" | "inline";

/** Кадр мини-карты: запад и центр Европы, где лежит маршрут истории.
 *  Считано по координатам маршрута (x 316…474, y 228…402) плюс запас, и взято
 *  ровно 2:1 — при `width: 100%` высота блока получается из соотношения сторон
 *  viewBox, и мини-карта не съедает низ пиннед-сцены на 1024×768. */
const INLINE_VIEW_BOX = "165 200 460 230";
const FULL_VIEW_BOX = "0 0 860 560";

export interface EuropeMapProps {
  variant?: EuropeMapVariant;
  /** Города маршрута истории по ключам. Задан — рисуется ломаная маршрута,
   *  узлы маршрута и машина; узлы вне маршрута в режиме `inline` не рисуются. */
  route?: readonly string[];
  /** Номер текущего шага истории: подсвечивается участок с этим номером
   *  (последний, если шагов больше, чем участков — машина уже прибыла). */
  active?: number;
  /** Доля пройденного маршрута, 0…1. Определяет положение машины. */
  travelled?: number;
}

export function EuropeMap({ variant = "full", route, active = 0, travelled = 0 }: EuropeMapProps) {
  const { d } = useLanding();
  const legs = route ? buildJourneyLegs(route) : [];
  const routeCities = route
    ? route.map((key) => ({ key, c: JOURNEY_CITIES[key] })).filter((city) => city.c)
    : [];
  const cities =
    variant === "inline"
      ? route
        ? []
        : CITY_LIST.filter((c) => c.story)
      : CITY_LIST;
  /* Тот же journeyLegIndex, что и у подписи под картой: правило «какой участок
     считается текущим для шага» живёт в journey в одном экземпляре. */
  const activeLeg = journeyLegIndex(active, legs.length);
  const truck = legs.length ? pointOnLegs(legs, travelled) : null;

  return (
    <svg
      className={`euro-map euro-map--${variant}`}
      viewBox={variant === "inline" ? INLINE_VIEW_BOX : FULL_VIEW_BOX}
      /* 🔴 `slice` — SVG-аналог `background-size: cover`, и он поставлен БЕЗ
         условия намеренно: в блочном варианте мини-карты `<svg>` сайзится
         `width: 100%` + `height: auto`, то есть её собственное соотношение
         сторон РАВНО соотношению viewBox (460:230), а при равных пропорциях
         `slice` и `meet` дают побитово один и тот же кадр. Отсюда важное
         следствие: полем пиннутой сцены та же самая карта становится ОДНОЙ
         строкой CSS (`height: 100%` вместо `auto` — см. `story.css`), без
         второго экземпляра и без нового пропа. Второй экземпляр стоил бы
         46 КБ контура суши в разметке, новый проп — лишней опции в шве.
         Поэтому здесь ничего не ветвится: кроп один, кадрирует его CSS. */
      preserveAspectRatio={variant === "inline" ? "xMidYMid slice" : undefined}
      role="img"
      aria-label={variant === "inline" ? d.scrolly.mapAria : d.europe.mapAria}
    >
      <path className="land" d={EUROPE_LAND} />
      <g>
        {ROUTE_GEOMETRY.map((r, i) => (
          <path
            key={i}
            className={`route ${r.cls}`}
            d={r.d}
            pathLength={1}
            style={{ "--rd": `${r.delay}ms` } as CSSProperties}
          />
        ))}
      </g>
      <g>
        {/* 🔴 РАЗМЕР УЗЛА МЕНЯЕТСЯ НЕ ЗДЕСЬ. Атрибуты `r` ниже — только фоллбэк
            для браузера без геометрических свойств CSS. Источник правды —
            `--map-node-r` / `--map-halo-r` в блоке карты (styles/landing/fx.css):
            геометрическое свойство перебивает презентационный атрибут, поэтому
            правка этих чисел в разметке НЕ даст видимого эффекта. */}
        {cities.map((city) => (
          <g key={city.key} className={city.story ? "city city-story" : "city"} data-city={city.key}>
            <circle
              className="halo"
              cx={city.c[0]}
              cy={city.c[1]}
              r={5}
              style={{ "--nd": `${city.delay}ms` } as CSSProperties}
            />
            <circle className="node" cx={city.c[0]} cy={city.c[1]} r={2.4} />
          </g>
        ))}
      </g>
      {/* Маршрут истории. Рисуется только когда вызывающий передал `route`:
          у полной карты секции его нет и появляться не должно. */}
      {legs.length > 0 && truck ? (
        <g className="jroute">
          {/* Ореол активного участка. Отдельный узел, а НЕ тень/обводка на
              самом `.jleg`: пульс обязан идти по `opacity` (требование R09.4 —
              только transform и opacity), а линия при этом обязана оставаться
              на полной непрозрачности. Один элемент двумя значениями opacity
              одновременно не бывает — отсюда второй путь.
              Рисуется ДО `.jleg`: в SVG порядок покраски = порядок в дереве,
              и ореол обязан лежать под линией.
              Базовое правило в `story.css` гасит его целиком (`fill: none;
              stroke: none`) — раскадровка на узких не меняется ни на пиксель;
              краски он получает только внутри медиазапроса ступени `l` + `vh-pin`. */}
          {legs.map((leg, i) => (
            <path
              key={`halo-${i}`}
              className={`jhalo${i === activeLeg ? " active" : ""}`}
              data-leg={i + 1}
              d={leg.d}
            />
          ))}
          {legs.map((leg, i) => (
            <path
              key={i}
              className={`jleg${i === activeLeg ? " active" : ""}`}
              data-leg={i + 1}
              d={leg.d}
            />
          ))}
          {/* Концы активного участка помечаются классом. Причина замерена:
              на шагах 2 и 3 сама линия участка почти целиком закрыта — карточкой
              сцены и скримом колонки шагов, — и чистыми у неё остаются только
              окрестности двух своих городов. Подсветка узла и кода города
              ставит акцент ровно туда, где линию видно.
              Номер участка → индексы городов: участок i соединяет route[i]
              и route[i+1]; `activeLeg` уже посчитан единственным местом вывода
              (`journeyLegIndex`), второго выражения здесь не заводим. */}
          {routeCities.map((city, ci) => (
            <g
              key={city.key}
              className={`jcity${ci === activeLeg || ci === activeLeg + 1 ? " active" : ""}`}
              data-city={city.key}
            >
              <circle className="jnode" cx={city.c[0]} cy={city.c[1]} r={4} />
              <text className="jlabel" x={city.c[0]} y={city.c[1] - 14}>
                {city.key}
              </text>
            </g>
          ))}
          {/* Машина: только transform, поэтому переход между шагами едет
              на композиторе. Силуэт развёрнут по ходу — маршрут идёт на запад. */}
          <g
            className="jtruck"
            style={{
              transform: `translate(${truck.x.toFixed(1)}px, ${truck.y.toFixed(1)}px)${
                truck.westbound ? " scale(-1, 1)" : ""
              }`,
            }}
          >
            {/* Внутренняя обёртка нужна только под масштаб. У `.jtruck` уже стоит
                инлайновый `transform` (перенос + разворот по ходу), и он не
                перебивается из CSS — а полем сцены карта увеличена втрое, где
                силуэт 30×15 единиц viewBox вырастает до 117 CSS-px и занимает
                пятую часть маршрута. Масштаб живёт здесь, в отдельном узле:
                правило `.jtruck-fit` в `story.css` задаёт его ТОЛЬКО в поле
                (`transform-box: fill-box` + `transform-origin: center` — тот же
                приём, что у `.node` / `.halo` в `fx.css`, иначе точка отсчёта
                уехала бы в центр viewBox). Без правила это пустой `<g>`:
                блочный вариант мини-карты не меняется ни на пиксель. */}
            <g className="jtruck-fit">
              <use href="#i-trucksil" x={-15} y={-8} width={30} height={15} />
            </g>
          </g>
        </g>
      ) : null}
    </svg>
  );
}

export function Europe() {
  const { d } = useLanding();
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const stage = stageRef.current;
    if (!stage) return;
    const motionOk = () => root.classList.contains("motion-ok");

    let euroState = 0; /* 0 idle · 1 drawing · 2 collapsed */
    let collapseTimer: number | null = null;
    let settleTimer: number | null = null;
    let disposed = false;

    function euroCheck() {
      if (!stage || !motionOk()) return;
      const r = stage.getBoundingClientRect();
      const vh = window.innerHeight;
      if (euroState === 0 && r.top < vh * 0.72 && r.bottom > 0) {
        euroState = 1;
        stage.classList.add("draw");
        collapseTimer = window.setTimeout(() => {
          if (motionOk() && !disposed) {
            stage.classList.add("collapsed");
            euroState = 2;
            settleTimer = window.setTimeout(() => {
              if (!disposed) stage.classList.add("settled");
            }, 950);
          }
        }, 3100);
      }
      /* полный выход из вьюпорта — сброс, чтобы сцену можно было пересмотреть */
      if (euroState === 2 && (r.bottom < -vh * 0.5 || r.top > vh * 1.5)) {
        stage.classList.remove("draw", "collapsed", "settled");
        euroState = 0;
      }
    }
    function euroReset() {
      if (collapseTimer) { clearTimeout(collapseTimer); collapseTimer = null; }
      if (settleTimer) { clearTimeout(settleTimer); settleTimer = null; }
      stage?.classList.remove("draw", "collapsed", "settled");
      euroState = 0;
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.setTimeout(() => {
        ticking = false;
        if (!disposed) euroCheck();
      }, 120);
    };
    const onApplied = (e: Event) => {
      const ok = (e as CustomEvent<{ ok: boolean }>).detail?.ok;
      if (ok) euroCheck();
      else euroReset();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("gt-motion-applied", onApplied);
    if (motionOk()) euroCheck();

    return () => {
      disposed = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("gt-motion-applied", onApplied);
      if (collapseTimer) clearTimeout(collapseTimer);
      if (settleTimer) clearTimeout(settleTimer);
    };
  }, []);

  return (
    <section className="euro sect" id="europe" data-screen-label="Вся Европа на одной доске">
      <div className="wrap">
        <div className="euro-head">
          <span className="overline">{d.europe.overline}</span>
          <h2 className="h2 reveal">{d.europe.h2}</h2>
          <p className="sect-sub reveal" data-delay="60">{d.europe.sub}</p>
        </div>
        <div className="euro-stage" ref={stageRef}>
          <EuropeMap variant="full" />
          <div className="euro-board">
            <div className="pwin">
              <div className="pwin-bar">
                <span className="pwin-title"><svg className="ic"><use href="#i-board" /></svg><span>{d.mock.planning}</span></span>
                <span className="spacer"></span>
                <span className="pwin-week">{d.mock.week24}</span>
              </div>
              <div className="scene-board" style={{ padding: "4px 10px 8px" }}>
                <div className="board-row">
                  <div className="cellbg"><i></i><i></i><i></i><i></i><i></i><i></i></div>
                  <div className="drv">
                    <span className="avatar">{d.names.savchenkoAv}</span>
                    <span className="dmeta">
                      <span className="dname-row"><span className="dname">{d.names.savchenko}</span><span className="flag ua"></span></span>
                      <span className="dtags"><span className="ppill trip"><span className="d"></span><span>{d.mock.stTrip}</span></span></span>
                    </span>
                  </div>
                  <div className="lane"><div className="tripbar" style={{ left: "4%", width: "60%" }}><svg className="tic"><use href="#i-truck" /></svg><span className="bartext">3QR 6671</span><span className="ocount">⊕ 1</span></div></div>
                </div>
                <div className="board-row">
                  <div className="cellbg"><i></i><i></i><i></i><i></i><i></i><i></i></div>
                  <div className="drv">
                    <span className="avatar">{d.names.kratochvilAv}</span>
                    <span className="dmeta">
                      <span className="dname-row"><span className="dname">{d.names.kratochvil}</span><span className="flag cz"></span></span>
                      <span className="dtags"><span className="ppill trip"><span className="d"></span><span>{d.mock.stTrip}</span></span></span>
                    </span>
                  </div>
                  <div className="lane"><div className="tripbar" style={{ left: "34%", width: "62%" }}><svg className="tic"><use href="#i-truck" /></svg><span className="bartext">3SK 7702</span><span className="ocount">⊕ 2</span></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="euro-caption reveal"><b>{d.europe.captionB}</b>{d.europe.caption}</p>
      </div>
    </section>
  );
}
