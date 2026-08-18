"use client";

/* ============================================================================
   SCROLLYTELLING «История одного водителя» — порт scrolly-половины scrolly.js.
   Пин-сцена 400vh при html.motion-ok И включённом флаге --pin-enabled
   (ширина ≥ l И высота ≥ vh-pin — объявлен в globals.css). Фоллбэк-раскадровка
   (4 кадра вертикально с подписями) — на узких И на низких экранах, а также
   при reduced-motion; всё это через CSS. Числа порогов в этом файле нет
   намеренно: было бы второе объявление шкалы, которое разъедется с CSS.
   Прогресс/active-классы обновляет window.__gtScrolly из scroll-цикла
   MotionRoot — он же дёргает его на resize, поэтому поворот экрана
   пересчитывает режим сам, без второго слушателя.
   ============================================================================ */

import { useEffect, useRef, useState } from "react";
import { useInViewport } from "@/hooks/useInViewport";
import {
  JOURNEY_LEG_COUNT,
  JOURNEY_ROUTE,
  journeyArrived,
  journeyLegIndex,
  journeyStepAt,
  journeyTravelAt,
  publishJourneyProgress,
  useJourneyStep,
} from "@/lib/journey";
import { EuropeMap } from "./Europe";
import { useLanding } from "./LandingProvider";
import { Ring } from "./Ring";

/* Мини-карта маршрута внутри сцены: тот же SVG-компонент карты Европы в режиме
   `inline`. Отдельный компонент, а не кусок Scrolly, ровно по одной причине:
   useJourneyStep() перерисовывает подписчика, и перерисовываться должна карта
   с машиной, а не вся сцена с четырьмя карточками мокапов.
   Прогресс сюда приходит из общего цикла скролла (MotionRoot → Scrolly →
   journey), своего слушателя здесь нет. */
/** Запас на упреждение фона — тот же приём, что у видеосекции. */
const BG_PRELOAD_MARGIN = "600px 0px";

/* Пилюля текущего участка. Своя подписка на journey — и это НЕ второй слушатель
   скролла: useJourneyStep() читает снимок из useSyncExternalStore, а событие
   аналитики уходит из publishJourneyProgress (один раз на шаг за загрузку),
   а не из хука, поэтому число подписчиков на счётчики не влияет (R24i).

   Пилюль в разметке ДВЕ, и это не дубль-опечатка: в раскадровке колонка шагов
   скрыта целиком (`html.motion-ok .scrolly-steps { display: none }`), поэтому
   подпись там обязана стоять рядом с коробкой карты; в пиннутой сцене карта
   уезжает в фон, и подпись обязана остаться в потоке под шагами (R09.1).
   Видимость каждой развязана в `story.css`: показана всегда ровно одна. */
function JourneyLegPill() {
  const { d } = useLanding();
  const s = d.scrolly;
  const { index } = useJourneyStep();
  /* Участок считает journeyLegIndex — одна функция и здесь, и в подсветке `.jleg`
     внутри карты. Двух выражений быть не должно: они разъезжались молча, и
     подпись могла называть один участок, пока подсвечен другой. */
  const legIndex = journeyLegIndex(index, JOURNEY_LEG_COUNT);
  /* На последнем шаге машина уже в конечной точке — подпись называет прибытие,
     а не участок в пути: иначе на шаге 4 читалось «Лион → Барселона» при
     машине, стоящей в Барселоне. Правило живёт в journey рядом с участками,
     здесь только вызов. Текст — из словаря, во всех 12 локалях; коды городов
     остаются только на самой карте. */
  const arrived = journeyArrived(index);
  const legLabel = arrived ? s.arrived : [s.leg1, s.leg2, s.leg3][legIndex];
  return (
    <span className={`pill ${arrived ? "green" : "sky"} journey-leg`}>
      <span className={`pdot ${arrived ? "green" : "sky"}`}></span>
      {legLabel}
    </span>
  );
}

function JourneyMap() {
  const { index, progress } = useJourneyStep();
  const boxRef = useRef<HTMLDivElement>(null);

  /* Ленивый фон: готовый useInViewport, своего наблюдателя не заводим.
     Защёлка монотонная — фон, раз показавшись, не гаснет при уходе из вида.
     Гейт по motion-ok здесь НЕ ставим, в отличие от видеосекции: там 2,4 МиБ
     ролика, который при выключенном движении не проиграют, а здесь статичная
     картинка ~40 КиБ, и человеку с reduced-motion она видна ровно так же.
     Без IntersectionObserver ответ навсегда false — сцена просто идёт без фона. */
  const nearViewport = useInViewport(boxRef, { rootMargin: BG_PRELOAD_MARGIN });
  const [bgArmed, setBgArmed] = useState(false);
  if (!bgArmed && nearViewport) setBgArmed(true);

  return (
    <div className={`journey-map${bgArmed ? " journey-map--bg" : ""}`} ref={boxRef}>
      <EuropeMap
        variant="inline"
        route={JOURNEY_ROUTE}
        active={index}
        travelled={journeyTravelAt(progress)}
      />
      <JourneyLegPill />
    </div>
  );
}

export function Scrolly() {
  const { d } = useLanding();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const section = sectionRef.current;
    if (!section) return;
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

    const track = section.querySelector<HTMLElement>(".scrolly-track");
    const steps = Array.from(section.querySelectorAll<HTMLElement>(".sstep"));
    const frames = Array.from(
      section.querySelectorAll<HTMLElement>(".scrolly-scene .frame"),
    );
    const fill = section.querySelector<HTMLElement>(".scrolly-progress .fill");
    let lastStep = -1;

    /* Мост высотной шкалы: включён ли пин, решает CSS-флаг --pin-enabled.
       Числа порога в JS нет — при сдвиге шкалы обе половины едут вместе.

       Флаг перечитывается ТОЛЬКО в resize-ветке (см. onResize ниже), и это
       не микрооптимизация. getComputedStyle — форсированный пересчёт стилей,
       в цикле скролла он стоит кадров. Кэшировать его по ключу
       `innerWidth×innerHeight` НЕЛЬЗЯ, хотя ключ и выглядит герметичным:
       в мобильных браузерах со сворачивающейся адресной строкой innerHeight
       меняется прямо во время скролла, ключ протухает сам собой, и чтение
       молча возвращается внутрь скролл-цикла — туда, откуда его убирали.
       Правило нарушил бы не программист, а адресная строка. Поэтому
       scrollyUpdate() читает готовый boolean и позвать getComputedStyle
       физически не может. */
    let pinEnabled = false;
    function readPinEnabled() {
      pinEnabled =
        getComputedStyle(root).getPropertyValue("--pin-enabled").trim() === "1";
    }

    function clearActive() {
      if (lastStep === -1) return;
      lastStep = -1;
      steps.forEach((s) => s.classList.remove("active"));
      frames.forEach((f) => f.classList.remove("active"));
    }

    function scrollyUpdate() {
      if (!track || !root.classList.contains("motion-ok")) return;
      /* пин выключен (узко или низко) — идёт вертикальная раскадровка,
         прогресс считать не по чему.
         Классы .active снимаем не ради видимого эффекта: сегодня раскадровка
         сама задаёт кадрам position/opacity/transform, а шаги и прогресс гасит
         display:none, так что забытый класс не виден. Причина в специфичности —
         `html.motion-ok .frame.active` перебивает раскадровочное
         `html.motion-ok .frame`, и первая же правка opacity или transform
         в раскадровке немедленно всплывёт поверх неё застрявшим классом.
         Сброс lastStep заодно даёт честный пересчёт при возврате в пин. */
      if (!pinEnabled) {
        clearActive();
        /* раскадровка: прогресса нет, маршрут стоит в начальной точке */
        publishJourneyProgress(0);
        return;
      }
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      if (total <= 0) return;
      const p = clamp(-rect.top / total, 0, 1);
      if (fill) fill.style.transform = "scaleX(" + p.toFixed(4) + ")";
      /* единственный источник прогресса для маршрута: считаем здесь, внутри
         общего цикла, и отдаём в journey. Квантование и решение «перерисовывать
         ли карту» — внутри journey, поэтому цикл скролла остаётся дешёвым. */
      publishJourneyProgress(p);
      const idx = journeyStepAt(p);
      if (idx !== lastStep) {
        lastStep = idx;
        steps.forEach((s, i) => s.classList.toggle("active", i === idx));
        frames.forEach((f, i) => f.classList.toggle("active", i === idx));
      }
    }
    window.__gtScrolly = scrollyUpdate;

    function syncScrolly() {
      if (root.classList.contains("motion-ok")) {
        lastStep = -1;
        scrollyUpdate();
      } else {
        steps.forEach((s) => s.classList.remove("active"));
        frames.forEach((f) => f.classList.remove("active"));
        /* движение выключено: маршрут показан статично от начальной точки */
        publishJourneyProgress(0);
      }
    }

    /* Единственная точка чтения флага. MotionRoot на resize дёргает
       __gtScrolly сам, но порядок слушателей одного события не гарантирован:
       если его обработчик отработает первым, он посчитает по устаревшему
       флагу — поэтому здесь и перечитываем, и сразу пересчитываем.
       Слушателя СКРОЛЛА не заводим: цикл скролла по-прежнему один, в MotionRoot. */
    function onResize() {
      readPinEnabled();
      scrollyUpdate();
    }

    const onApplied = () => syncScrolly();
    window.addEventListener("gt-motion-applied", onApplied);
    window.addEventListener("resize", onResize);
    readPinEnabled();
    syncScrolly();

    return () => {
      window.removeEventListener("gt-motion-applied", onApplied);
      window.removeEventListener("resize", onResize);
      if (window.__gtScrolly === scrollyUpdate) delete window.__gtScrolly;
    };
  }, []);

  const s = d.scrolly;
  const m = d.mock;

  return (
    <section className="scrolly" id="product" data-screen-label="История одного водителя" ref={sectionRef}>
      {/* атмосфера секции: те же дрейфующие кляксы, что в hero, но медленнее и тише */}
      <div className="scrolly-atmo" aria-hidden="true">
        <span className="sblob s1"></span>
        <span className="sblob s2"></span>
      </div>
      <div className="scrolly-track">
        <div className="scrolly-stage">
          <div className="wrap">
            <div className="scrolly-head">
              <span className="overline">{s.overline}</span>
              <h2 className="h2">{s.h2}</h2>
            </div>
            <div className="scrolly-grid">
              <div className="scrolly-steps">
                {/* Подпись участка в потоке колонки шагов: в пиннутой сцене карта
                    становится полем на фоне, и без этой строки смысл «какой
                    участок идёт сейчас» уехал бы в декорацию (R09.1). Обёртка,
                    а не пилюля напрямую: видимость переключается на контейнере,
                    и `display` самой пилюли (`inline-flex` из `.pill`)
                    восстанавливать не приходится.
                    🔴 НАД шагами, а не под ними, и это замеренное решение, а не
                    вкусовое: под шагами пилюля встаёт ровно в точку прибытия
                    маршрута (Барселона — левый низ кадра), и на 1024×768 силуэт
                    машины на 4-м шаге слипался с ней в ~7 px. Над шагами обе
                    конечные точки маршрута далеко: Прага уходит в правый верх,
                    Барселона остаётся ниже колонки. */}
                <p className="journey-caption"><JourneyLegPill /></p>
                <article className="sstep" data-step="1">
                  <span className="snum">01</span>
                  <h3>{s.s1h}</h3>
                  <p>{s.s1p}</p>
                </article>
                <article className="sstep" data-step="2">
                  <span className="snum">02</span>
                  <h3>{s.s2h}</h3>
                  <p>{s.s2p}</p>
                </article>
                <article className="sstep" data-step="3">
                  <span className="snum">03</span>
                  <h3>{s.s3h}</h3>
                  <p>{s.s3p}</p>
                </article>
                <article className="sstep" data-step="4">
                  <span className="snum">04</span>
                  <h3>{s.s4h}</h3>
                  <p>{s.s4p}</p>
                </article>
              </div>

              <JourneyMap />

              <div className="scrolly-scene">
                {/* Кадр 1: карточка водителя */}
                <figure className="frame" data-frame="1">
                  <figcaption><span className="snum">01</span><b>{s.cap1b}</b>{s.cap1}</figcaption>
                  <div className="scene-card">
                    <div className="dc-head">
                      <span className="avatar lg">{d.names.savchenkoAv}</span>
                      <div className="dc-id">
                        <div className="dc-eyebrow"><span>DT-092</span><span className="regpill">{m.nonEU}</span></div>
                        <div className="dc-name">{d.names.savchenkoFull} <span className="flag ua"></span></div>
                        <div className="dc-pills"><span className="ppill ok md"><span className="d"></span><span>{m.stActive}</span></span></div>
                      </div>
                      <div className="dc-stats">
                        <div className="dc-stat"><span className="dc-l">{m.docs}</span><span className="dc-v">11<span className="dim">/13</span></span></div>
                        <div className="dc-stat"><span className="dc-l">{m.urgent}</span><span className="dc-v"><span className="up">1 ▲</span><span className="down">0 ▼</span></span></div>
                      </div>
                    </div>
                    <div className="dc-tabs">
                      <span className="dc-tab active">{m.tabOverview}</span>
                      <span className="dc-tab">{m.tabDocs}</span>
                      <span className="dc-tab">{m.tabComments}</span>
                      <span className="dc-tab">{m.tabHistory}</span>
                    </div>
                    <div className="docrow">
                      <span className="dchip ok">CON</span><span className="dchip ok">LIC</span><span className="dchip ok">A1</span><span className="dchip miss">DEC</span><span className="dchip ok">INS</span><span className="dchip ok">PAS</span><span className="dchip warn">{m.chipVisaWarn}</span><span className="dchip ok">DL</span><span className="dchip ok">ADR</span><span className="dchip ok">TCH</span><span className="dchip ok">C95</span><span className="dchip ok">MED</span><span className="dchip ok">PSI</span>
                    </div>
                    <span className="scursor" style={{ left: "50%", top: "55%" }} aria-hidden="true"><svg viewBox="0 0 24 24"><use href="#i-cursor" /></svg></span>
                    <div className="dc-confid">
                      <div className="dc-confid-h"><svg className="tic"><use href="#i-lock" /></svg><span>{m.confid}</span></div>
                      <div className="iban-row"><span className="k">IBAN</span><span className="v">CZ•• •••• •••• ••14 ····</span><svg className="tic"><use href="#i-eye" /></svg></div>
                      <p className="dc-note">{m.confNote}</p>
                    </div>
                  </div>
                </figure>

                {/* Кадр 2: пробег до ТО — участок Мюнхен → Лион.
                    Одометр приходит с борта (телематика), поэтому у строки
                    пробега стоит метка источника, а не «распознано». */}
                <figure className="frame" data-frame="2">
                  <figcaption><span className="snum">02</span><b>{s.cap2b}</b>{s.cap2}</figcaption>
                  <div className="scene-card">
                    <div className="scene-label">{m.svcTitle}</div>
                    <div className="scene-driver">
                      <span className="avatar">{d.names.savchenkoAv}</span>
                      <span className="who"><span className="nm">3QR 6671</span><span className="id">{d.names.savchenko} · DT-092</span></span>
                      <span className="dchip warn" style={{ height: 22, fontSize: "10.5px", padding: "0 8px" }}>{m.chipSvc}</span>
                    </div>
                    <div className="ai-rows">
                      <div className="ai-row"><span className="k">{m.svcOdo}</span><span className="v">412 640 km</span><span className="rectag">{m.svcSource}</span></div>
                      <div className="ai-row"><span className="k">{m.svcNext}</span><span className="v">4 200 km</span></div>
                      <div className="ai-row"><span className="k">{m.svcInterval}</span><span className="v">120 000 km</span></div>
                    </div>
                    <span className="scursor" style={{ left: "18%", top: "58%" }} aria-hidden="true"><svg viewBox="0 0 24 24"><use href="#i-cursor" /></svg></span>
                    <div className="scene-docs" style={{ alignItems: "center" }}>
                      <span className="ppill ok md"><span className="d"></span><span>{m.svcPlanned}</span></span>
                      <span style={{ flex: 1 }}></span>
                      <Ring pct={96} big cap={m.svcCap} />
                    </div>
                  </div>
                </figure>

                {/* Кадр 3: выгрузка — конец участка Лион → Барселона */}
                <figure className="frame" data-frame="3">
                  <figcaption><span className="snum">03</span><b>{s.cap3b}</b>{s.cap3}</figcaption>
                  <div className="scene-card">
                    <div className="scene-label">{m.unloadTitle}</div>
                    <div className="scene-driver">
                      <span className="avatar">{d.names.savchenkoAv}</span>
                      <span className="who"><span className="nm">{d.names.savchenkoFull}</span><span className="id">3QR 6671 · BCN</span></span>
                      <span className="dchip ok" style={{ height: 22, fontSize: "10.5px", padding: "0 8px" }}>{m.unloadDocV}</span>
                    </div>
                    <div className="scene-alert ok">
                      <svg className="tic"><use href="#i-check" /></svg>
                      <div><b>{m.unloadOk}</b><span>{m.unloadNote}</span></div>
                    </div>
                    <div className="ai-rows">
                      <div className="ai-row"><span className="k">{m.unloadWhere}</span><span className="v" style={{ fontFamily: "var(--font-sans)" }}>{m.unloadPlace}</span></div>
                      <div className="ai-row"><span className="k">{m.unloadWhen}</span><span className="v">14:20 CET</span></div>
                    </div>
                    <div className="tg-push">
                      <span className="tgic"><svg fill="currentColor" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z" /></svg></span>
                      <div><b>{m.tgBot}</b><span>{m.tgUnload}</span><time>{m.tgTimeUnload}</time></div>
                    </div>
                    <span className="scursor" style={{ left: "84%", top: "46%" }} aria-hidden="true"><svg viewBox="0 0 24 24"><use href="#i-cursor" /></svg></span>
                  </div>
                </figure>

                {/* Кадр 4: доска + история */}
                <figure className="frame" data-frame="4">
                  <figcaption><span className="snum">04</span><b>{s.cap4b}</b>{s.cap4}</figcaption>
                  <div className="scene-card">
                    <div className="scene-label">{m.week25}</div>
                    {/* сводка по завершённому рейсу: собрана из существующих
                        чипов карточки, а не из новых плашек */}
                    <div className="scene-sum">
                      <span className="ppill ok md"><span className="d"></span><span>{m.sumOnTime}</span></span>
                      <span className="dchip ok">2 340 km · {m.sumKm}</span>
                      <span className="dchip ok">13/13 · {m.sumDocs}</span>
                    </div>
                    <div className="scene-board">
                      <div className="board-head">
                        <span className="bh">{m.colDriver}</span><span className="bh">{m.w1}</span><span className="bh">{m.w2}</span><span className="bh">{m.w3}</span><span className="bh">{m.w4}</span><span className="bh">{m.w5}</span>
                      </div>
                      <div className="board-row">
                        <div className="cellbg"><i></i><i></i><i></i><i></i><i></i><i></i></div>
                        <div className="drv">
                          <span className="avatar">{d.names.savchenkoAv}</span>
                          <span className="dmeta">
                            <span className="dname-row"><span className="dname">{d.names.savchenko}</span><span className="flag ua"></span></span>
                            <span className="dtags"><span className="ppill trip"><span className="d"></span><span>{m.stTrip}</span><span className="spz">3QR 6671</span></span></span>
                          </span>
                        </div>
                        <div className="lane"><div className="tripbar" style={{ left: "2%", width: "76%" }}><svg className="tic"><use href="#i-truck" /></svg><span className="bartext">3QR 6671</span><span className="ocount">⊕ 1</span></div></div>
                      </div>
                      <div className="board-row">
                        <div className="cellbg"><i></i><i></i><i></i><i></i><i></i><i></i></div>
                        <div className="drv">
                          <span className="avatar">{d.names.kratochvilAv}</span>
                          <span className="dmeta">
                            <span className="dname-row"><span className="dname">{d.names.kratochvil}</span><span className="flag cz"></span></span>
                            <span className="dtags"><span className="ppill ok"><span className="d"></span><span>{m.stActive}</span></span></span>
                          </span>
                        </div>
                        <div className="lane"><div className="tripbar" style={{ left: "40%", width: "58%" }}><svg className="tic"><use href="#i-truck" /></svg><span className="bartext">3SK 7702</span><span className="ocount">⊕ 2</span></div></div>
                      </div>
                    </div>
                    <div className="dc-hist">
                      <div className="dc-confid-h"><svg className="tic"><use href="#i-clock" /></svg><span>{m.tabHistory}</span></div>
                      <div className="audit-row"><span className="ts">{m.histTs1}</span><span className="ev">{m.hist1}</span><span className="by">{m.histBy1}</span></div>
                      <div className="audit-row"><span className="ts">{m.histTs2}</span><span className="ev">{m.hist2}</span><span className="by">{m.histBy2}</span></div>
                    </div>
                  </div>
                </figure>
              </div>
            </div>
            <p className="scrolly-outro reveal"><b>{s.outroB}</b>{s.outro}</p>
            <div className="scrolly-progress" aria-hidden="true"><div className="fill"></div></div>
            {/* Выход из пиннед-сцены: без него историю нельзя проскочить — страница
                держит экран, пока не прокрутишь все четыре шага. Обычный якорь,
                плавность даёт нативный scroll-behavior, ноль JS. */}
            <a className="scrolly-skip" href="#market">
              {s.skip}
              <svg className="ic" aria-hidden="true"><use href="#i-arrow-down" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
