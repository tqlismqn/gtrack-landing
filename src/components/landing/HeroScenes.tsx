/* ============================================================================
   Сцены первого экрана — три слоя `.pwin.hs-layer` в одной ячейке сетки доски
   (`Hero.tsx`), видимый слой выбирает `data-hs` секции:
     A — водитель просит отпуск в Telegram → пунктир на доске ждёт решения →
         диспетчер одобряет → ответ водителю в Telegram;
     B — доска «по машинам»: у машин с подключённым трекером рядом с планом
         строка факта — едет, стоит или данных нет (как в планировщике приложения);
     C — виза с истекающим сроком: сводка на почте → скан → срок в системе.
   Мир сцен — `hero-data.ts` (неделя 24, «сегодня» ср 10.06, «сейчас» 15:04):
   октябрьский мир витрины (`showcase-data.ts`) сюда не попадает, поэтому от
   мини-приложения в сцене A взяты только кнопка, плитки и карточка ответа —
   без приветствия, имени, телефона, смены, тягача и дат.
   React здесь только раскладывает; шаги цикла рисует CSS по `data-phase`
   доски (`hero-scenes.css`, `hero.css`, `fx.css`). Все слои — картинка
   (`role="img"` на доске), управляющие элементы нарисованы <span>-ами.
   ============================================================================ */

import type { ReactNode } from "react";
import type { LandingDict } from "@/lib/landing-i18n";
import { BERZINS_SICK, HERO_TODAY, HERO_TRUCKS, NOVAK_LEAVE, factText, factWhen, type HeroTruck } from "@/lib/hero-data";
import type { Bar } from "@/lib/showcase-data";
import { Ring } from "./Ring";
import { BoardBar } from "./ShowcaseScreens";

type D = LandingDict;
type Box = { left: number; width: number };
type DriverId = HeroTruck["driver"];

const box = (b: Box) => ({ left: `${b.left}%`, width: `${b.width}%` });
const truckOf = (driver: DriverId) => HERO_TRUCKS.find((t) => t.driver === driver)!;
/* Полоса доски первого экрана не живёт в окне дней витрины: from/to нужны только типу
   `Bar` (по ним витрина считает свои три кадра), геометрию даёт `box` в процентах дорожки. */
const tripBar = (label: string): Bar => ({ kind: "trip", from: 0, to: 0, truck: label });
const REQ: Bar = { kind: "req", from: 0, to: 0 };
const VAC: Bar = { kind: "vac", from: 0, to: 0 };

function Cells() {
  return <div className="cellbg"><i></i><i></i><i></i><i></i><i></i><i></i></div>;
}

/** Окно планировщика: заголовок и плитки — одни на все три сцены, числа не меняются. */
function Chrome({ d }: { d: D }) {
  return (
    <>
      <div className="pwin-bar">
        <span className="pwin-title">
          <svg className="ic" aria-hidden="true"><use href="#i-board" /></svg>
          <span>{d.mock.planning}</span>
        </span>
        <span className="spacer"></span>
        <span className="pwin-week">{d.mock.week24}</span>
      </div>
      <div className="pwin-kpis">
        <div className="kpi"><span className="kv blue">14</span><span className="kl">{d.mock.kpiTrip}</span></div>
        <div className="kpi"><span className="kv amber">3</span><span className="kl">{d.mock.kpiVac}</span></div>
        <div className="kpi"><span className="kv green">2</span><span className="kl">{d.mock.kpiFree}</span></div>
      </div>
    </>
  );
}

function Head({ d, first }: { d: D; first: string }) {
  return (
    <div className="board-head">
      <span className="bh">{first}</span><span className="bh">{d.mock.d1}</span><span className="bh">{d.mock.d2}</span><span className="bh today">{d.mock.d3}</span><span className="bh">{d.mock.d4}</span><span className="bh">{d.mock.d5}</span>
    </div>
  );
}

/** Строка водителя (сцены A и C): аватар, имя, флаг, пилюли и кольцо «к рейсу». */
function DriverRow({ d, id, flag, tags, ring = 100, children }: {
  d: D; id: DriverId; flag: string; tags: ReactNode; ring?: number; children: ReactNode;
}) {
  return (
    <div className="board-row">
      <Cells />
      <div className="drv">
        <span className="avatar">{d.names[`${id}Av`]}</span>
        <span className="dmeta">
          <span className="dname-row"><span className="dname">{d.names[id]}</span><span className={`flag ${flag}`}></span></span>
          <span className="dtags">{tags}</span>
        </span>
        <Ring pct={ring} mid={ring < 80} cap={d.mock.ready} />
      </div>
      {children}
    </div>
  );
}

function trips(d: D, driver: DriverId) {
  const t = truckOf(driver);
  return t.bars.map((b) => <BoardBar key={`${b.left}-${b.width}`} bar={tripBar(t.plate)} s={d.showcase} own={false} box={box(b)} />);
}

const pill = (tone: string, label: string, spz?: string) => (
  <span className={`ppill ${tone}`}><span className="d"></span><span>{label}</span>{spz ? <span className="spz">{spz}</span> : null}</span>
);

/* Строки, общие для A и C. У Новака отпуск с завтра (чт–пт), сегодня он «Активен» —
   во всех сценах одна пилюля; полосу отпуска сцена дорисовывает своей дорожкой. */
const rowKratochvil = (d: D) => (
  <DriverRow d={d} id="kratochvil" flag="cz" tags={pill("trip", d.mock.stTrip, truckOf("kratochvil").plate)}>
    <div className="lane">{trips(d, "kratochvil")}</div>
  </DriverRow>
);
const rowBerzins = (d: D) => (
  <DriverRow d={d} id="berzins" flag="lv" ring={67} tags={pill("warn", d.mock.sick)}>
    <div className="lane">
      <div className="tripbar sick" style={box(BERZINS_SICK)}><span className="bartext">{d.mock.sick}</span></div>
      {trips(d, "berzins")}
    </div>
  </DriverRow>
);

/* ---- A — отпуск из Telegram на доску ------------------------------------------ */
/* Новак — второй строкой: телефон мини-приложения стоит в левом нижнем углу доски и
   на a0–a2 / a8–a9 закрывает колонку водителя двух нижних строк; строка с заявкой
   должна оставаться видна целиком. */
export function SceneA({ d }: { d: D }) {
  const s = d.showcase;
  return (
    <div className="pwin hs-layer" data-hs="a">
      <Chrome d={d} />
      <div className="board">
        <Head d={d} first={d.mock.colDriver} />
        {rowKratochvil(d)}
        <DriverRow d={d} id="novak" flag="pl" tags={pill("ok", d.mock.stActive)}>
          {/* заявка (пунктир, «⏳ Отпуск») и одобренный отпуск (сплошная, «Отпуск») — одна геометрия,
              смена кросс-фейдом на a7 */}
          <div className="lane hs-leave">
            {trips(d, "novak")}
            <BoardBar bar={REQ} s={s} own={false} box={box(NOVAK_LEAVE)} />
            <BoardBar bar={VAC} s={s} own={false} box={box(NOVAK_LEAVE)} />
          </div>
        </DriverRow>
        <DriverRow d={d} id="savchenko" flag="ua" tags={pill("ok", d.mock.stActive)}>
          <div className="lane">{trips(d, "savchenko")}</div>
        </DriverRow>
        {rowBerzins(d)}
      </div>

      {/* окно заявки у полосы — верх ставит замер (--py), как в приложении: кто, состояние, решение */}
      <div className="pop hs-pop" aria-hidden="true">
        <div className="pop-t"><span className="d"></span>{s.popTitle}</div>
        <div className="pop-who">{d.names.novak}</div>
        <div className="pop-state"><span className="d"></span>{s.popAwaiting}</div>
        <div className="pop-actions"><span className="pbtn ghost-bad">{s.popReject}</span><span className="pbtn primary">{s.popApprove}</span></div>
      </div>

      {/* телефон водителя: три вида в одной ячейке — кнопка (a0), плитки (a1–a2), ответ (a8–a9) */}
      <div className="hs-phone" aria-hidden="true">
        <div className="hs-pv hs-pv-cta"><span className="tg-cta">+ {s.tgCta}</span></div>
        <div className="tg-tiles hs-pv hs-pv-tiles">
          <span className="tg-tile on"><span className="tg-ico vac"><svg aria-hidden="true"><use href="#i-plane" /></svg></span>{s.tgVac}</span>
          <span className="tg-tile"><span className="tg-ico sick"><svg aria-hidden="true"><use href="#i-stethoscope" /></svg></span>{s.tgSick}</span>
          <span className="tg-tile"><span className="tg-ico other"><svg aria-hidden="true"><use href="#i-chat" /></svg></span>{s.tgOther}</span>
        </div>
        <div className="tgcard hs-pv hs-pv-card">
          <p className="tgcard-h">{s.tgReqs}</p>
          <div className="req">
            <span className="req-ic"><svg aria-hidden="true"><use href="#i-plane" /></svg></span>
            <div className="req-body">
              <div className="req-l1"><span className="req-t">{s.tgReqVac}</span><span className="req-st">✓ {s.tgApproved}</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="btoast ok" aria-hidden="true">
        <svg className="tic"><use href="#i-check" /></svg>
        <div><b>{d.hero.toastNotified}</b></div>
      </div>
      <span className="gcursor" aria-hidden="true">
        <svg className="ptr" viewBox="0 0 24 24"><use href="#i-cursor" /></svg>
        <span className="ripple"></span>
      </span>
    </div>
  );
}

/* ---- B — кто едет, кто стоит: доска «по машинам» -------------------------------- */
/* Строка факта — как VehicleResourceLabel.tsx приложения: иконка Radio, текст в тоне
   (едет — зелёный, стоит / нет данных — серый) и моно-хвост «· когда». У машины без
   подключённого трекера строки факта нет. Числа не тикают: это снимок, а не поток.
   Время видно на любой ширине: без него «82 км/ч» читается как живая лента. Ниже m оно
   встаёт своей строкой, и разделитель «·» — отдельным пролётом, чтобы его снять
   (hero-scenes.css). */
function VehicleRow({ d, t, r }: { d: D; t: HeroTruck; r: number }) {
  const fact = factText(t, d.showcase);
  return (
    <div className="board-row hs-vrow" data-r={r}>
      <Cells />
      <div className="drv">
        <span className="avatar hs-truckav"><svg aria-hidden="true"><use href="#i-truck" /></svg></span>
        <span className="dmeta">
          <span className="dname-row"><span className="dname hs-plate">{t.plate}</span></span>
          {fact !== null && (
            <span className={`hs-fact ${t.kind}`}>
              <svg className="hs-ric" aria-hidden="true"><use href="#i-radio" /></svg>
              <span className="hs-ftext">{fact}</span>
              {t.positionAt !== null && <span className="hs-when"><span className="hs-sep"> · </span>{factWhen(t.positionAt, HERO_TODAY)}</span>}
            </span>
          )}
        </span>
      </div>
      <div className="lane">
        {t.bars.map((b) => <BoardBar key={`${b.left}-${b.width}`} bar={tripBar(d.names[t.driver])} s={d.showcase} own={false} box={box(b)} />)}
      </div>
    </div>
  );
}

export function SceneB({ d }: { d: D }) {
  return (
    <div className="pwin hs-layer" data-hs="b">
      <Chrome d={d} />
      <div className="board">
        <Head d={d} first={d.hero.colVehicle} />
        {HERO_TRUCKS.map((t, i) => <VehicleRow key={t.plate} d={d} t={t} r={i + 1} />)}
      </div>
    </div>
  );
}

/* ---- C — сроки не в голове: виза Савченко ---------------------------------------- */
/* Прежняя доска первого экрана без фазы «в рейс»: полоса рейса Савченко стоит с первого
   кадра, пилюля «Активен» не меняется — рейс назначает диспетчер, сам он не появляется
   (12-hero-three-phrases-judged.txt, сцена C, NOT). Распознавание — только у документа
   водителя: у документов машин его в приложении нет. */
export function SceneC({ d }: { d: D }) {
  return (
    <div className="pwin hs-layer" data-hs="c">
      <Chrome d={d} />
      <div className="board">
        <Head d={d} first={d.mock.colDriver} />
        {rowKratochvil(d)}
        <DriverRow
          d={d} id="savchenko" flag="ua"
          tags={<>
            {pill("ok", d.mock.stActive)}
            <span className="swap visa">
              <span className="base dchip warn visa-warn">{d.mock.chipVisaWarn}</span>
              <span className="alt dchip ok">{d.mock.chipVisaOk}</span>
            </span>
          </>}
        >
          <div className="lane">{trips(d, "savchenko")}</div>
        </DriverRow>
        <DriverRow d={d} id="novak" flag="pl" tags={pill("ok", d.mock.stActive)}>
          <div className="lane">
            {trips(d, "novak")}
            <BoardBar bar={VAC} s={d.showcase} own={false} box={box(NOVAK_LEAVE)} />
          </div>
        </DriverRow>
        {rowBerzins(d)}
      </div>

      <div className="btoast warn" aria-hidden="true">
        <svg className="tic"><use href="#i-alert" /></svg>
        <div><b>{d.mock.toastWarnT}</b><span>{d.mock.toastWarnD}</span></div>
      </div>
      <span className="gcursor" aria-hidden="true">
        <svg className="ptr" viewBox="0 0 24 24"><use href="#i-cursor" /></svg>
        <span className="ripple"></span>
      </span>
      <div className="minicard" aria-hidden="true">
        <div className="mc-h"><span>{d.mock.mcH}</span></div>
        <div className="mc-row"><svg className="tic"><use href="#i-upload" /></svg><div><span>{d.mock.mc1}</span><span className="mono-sub">visa_savchenko_2028.pdf · 10:12</span></div></div>
        <div className="mc-row rec"><svg className="tic"><use href="#i-zap" /></svg><div><span>{d.mock.mc2}</span><span className="mono-sub">{d.mock.mcSub2}</span></div></div>
        <div className="mc-row ok"><svg className="tic"><use href="#i-check" /></svg><div><span>{d.mock.mc3}</span></div></div>
      </div>
    </div>
  );
}
