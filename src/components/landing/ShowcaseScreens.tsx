/* ============================================================================
   Экраны витрины «Одна заявка» — пять макетов, нарисованных кодом:
   мини-приложение Telegram, ответ в «Моих заявках», планировщик, ротация,
   карточка машины. Строки внутри макетов — дословно из словарей приложения
   и мини-приложения (ключи showcase.* каждой локали), числа и даты — из
   src/lib/showcase-data.ts. Кнопки макетов — не кнопки: это картинка экрана,
   поэтому корень каждого макета несёт role="img", а управляющие элементы
   нарисованы <span>-ами и в порядок табуляции не попадают.
   `.thread` — сквозное значение (водитель, машина, даты, срок STK): одно и то
   же на всех экранах, наведение подсвечивает его везде (showcase.css).
   ============================================================================ */

import type { CSSProperties, ReactNode } from "react";
import type { LandingDict } from "@/lib/landing-i18n";
import {
  AWAY_BY_DAY, BOARD_ROWS, CROPS, DRIVER_PHONE, FLEET, NEEDS_DECISION, PENDING_REQUESTS, REQUEST,
  RING_C, ROTATION, ROTATION_ROWS, TODAY, VEHICLE, WINDOW_DAYS, WINDOW_START,
  awayPct, awayTone, barBox, daysBetween, daysLeft, fill, fmtDM, fmtDMY, fmtKm, nowLine, requestDays, ringOffset,
  splitAt, windowDay,
  type Bar, type BoardRow, type CropId, type InspectionCode, type RotationRow,
} from "@/lib/showcase-data";

type S = LandingDict["showcase"];
type ThreadId = "marek" | "gt114" | "dates" | "stk";

function T({ t, children }: { t: ThreadId; children: ReactNode }) {
  return <span className="thread" data-t={t}>{children}</span>;
}

function Icon({ id, className }: { id: string; className?: string }) {
  return <svg className={className} aria-hidden="true"><use href={`#${id}`} /></svg>;
}

/** Аватар в кольце готовности: дуга по проценту, янтарная ниже 80 % (порог приложения). */
function AvRing({ pct, initials }: { pct: number; initials: string }) {
  return (
    <span className={`avring${pct < 80 ? " mid" : ""}`}>
      <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle className="track" cx="18" cy="18" r="15.5" strokeWidth="2.5" />
        <circle
          className="val" cx="18" cy="18" r="15.5" strokeWidth="2.5" strokeLinecap="round"
          strokeDasharray={RING_C.driver} strokeDashoffset={ringOffset(pct, RING_C.driver)}
        />
      </svg>
      <span className="avatar">{initials}</span>
    </span>
  );
}

const REQ_YEAR = REQUEST.to.slice(0, 4);
const dayOf = (iso: string) => Number(iso.slice(8, 10));

/* ---- (1) мини-приложение Telegram: хаб, над ним лист «Что нужно?» ----------- */
export function TelegramScreen({ s, label }: { s: S; label: string }) {
  return (
    <div className="tgphone" role="img" aria-label={label}>
      <div className="tg-hub">
        <div className="tg-top"><span className="tg-mark">GT</span><span className="tg-app">G-Track Driver</span></div>
        <div className="tg-greet">
          <div><span className="tg-hi">{s.tgGreet}</span><span className="tg-first">{s.marekFirst}</span></div>
          <span className="tg-date">{s.tgDate}</span>
        </div>
        <div className="tg-dcard">
          <div className="tg-drow">
            <span className="tg-av">{s.marekAv}</span>
            <div className="tg-who">
              <span className="tg-name"><T t="marek">{s.marekTg}</T></span>
              <span className="tg-tel">{DRIVER_PHONE} · <span className={`flag ${VEHICLE.flag}`}></span></span>
            </div>
          </div>
          <div className="tg-status"><span className="tg-pill"><Icon id="i-truck" />{s.tgOnShift}</span></div>
          <div className="tg-chips">
            <span className="tg-chip"><Icon id="i-truck" />{s.tgTruck} <T t="gt114">{VEHICLE.name}</T></span>
            <span className="tg-chip">{s.tgTrailer} {VEHICLE.trailer}</span>
          </div>
        </div>
        <span className="tg-cta">+ {s.tgCta}</span>
      </div>
      <div className="tg-sheet">
        <div className="tg-handle"></div>
        <p className="tg-sheet-t">{s.tgSheet}</p>
        <div className="tg-tiles">
          <span className="tg-tile on"><span className="tg-ico vac"><Icon id="i-plane" /></span>{s.tgVac}</span>
          <span className="tg-tile"><span className="tg-ico sick"><Icon id="i-stethoscope" /></span>{s.tgSick}</span>
          <span className="tg-tile"><span className="tg-ico other"><Icon id="i-chat" /></span>{s.tgOther}</span>
        </div>
        <span className="tg-cancel">{s.tgCancel}</span>
      </div>
    </div>
  );
}

/* ---- ↩ ответ водителю: карточка заявки из «Моих заявок» мини-приложения ----- */
export function AnswerCard({ s, label }: { s: S; label: string }) {
  /* мини-приложение печатает месяц именительным падежом: «10 Октябрь — 18 Октябрь 2026» */
  return (
    <div className="tgcard" role="img" aria-label={label}>
      <p className="tgcard-h">{s.tgReqs}</p>
      <div className="req">
        <span className="req-ic"><Icon id="i-plane" /></span>
        <div className="req-body">
          <div className="req-l1"><span className="req-t">{s.tgReqVac}</span><span className="req-st">✓ {s.tgApproved}</span></div>
          <p className="req-range">
            <T t="dates">{dayOf(REQUEST.from)} {s.tgMonth} — {dayOf(REQUEST.to)} {s.tgMonth} {REQ_YEAR}</T>
          </p>
          <p className="req-meta">
            {requestDays()} {s.tgDays} · {s.tgSubmitted} {dayOf(REQUEST.createdDate)} {s.tgMonth} {REQ_YEAR}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---- (2) планировщик -------------------------------------------------------- */

/** Самый узкий кадр, в который попадает день окна: s ⊂ m ⊂ l. */
function cropOf(index: number): CropId {
  const inCrop = (c: CropId) => index >= CROPS[c].start && index < CROPS[c].start + CROPS[c].days;
  return inCrop("s") ? "s" : inCrop("m") ? "m" : "l";
}

const DAYS = Array.from({ length: WINDOW_DAYS }, (_, i) => {
  const d = windowDay(i);
  return { ...d, crop: cropOf(i), weekend: d.weekday === 0 || d.weekday === 6, today: d.iso === TODAY, away: AWAY_BY_DAY[i] };
});

/** Геометрия полосы на трёх кадрах. Полосы, не попавшей в кадр, на нём нет (`--d*: none`):
    нулевая ширина оставила бы от неё огрызок из отступов и рамки. */
function barStyle(bar: Bar): CSSProperties {
  const vars: Record<string, string> = {};
  for (const crop of ["l", "m", "s"] as const) {
    const box = barBox(bar, crop);
    if (box) {
      vars[`--l${crop}`] = box.left;
      vars[`--w${crop}`] = box.width;
    } else {
      vars[`--d${crop}`] = "none";
    }
  }
  return vars as CSSProperties;
}

const BAR_CLASS: Record<Bar["kind"], string> = { trip: "", vac: " vac", sick: " sick", req: " vac req" };

function BoardBar({ bar, s, own }: { bar: Bar; s: S; own: boolean }) {
  const text =
    bar.kind === "trip" ? (
      <>{own ? <T t="gt114">{bar.truck}</T> : bar.truck}{bar.trailer ? ` │ ${bar.trailer}` : ""}</>
    ) : bar.kind === "vac" ? s.stVac : bar.kind === "sick" ? s.stSick : s.barPending;
  return (
    <div className={`tripbar${BAR_CLASS[bar.kind]}`} style={barStyle(bar)}>
      {bar.kind === "trip" && <Icon id="i-truck" className="tic" />}
      <span className="bartext">{text}</span>
    </div>
  );
}

function statusPill(r: BoardRow, s: S): { tone: string; label: string } {
  switch (r.status) {
    case "trip": return { tone: "trip", label: s.stTrip };
    case "free": return { tone: "ok", label: s.stFree };
    case "sick": return { tone: "bad", label: fill(s.stUntil, { status: s.stSick, date: fmtDM(r.until) }) };
    case "vac": return { tone: "warn", label: fill(s.stUntil, { status: s.stVac, date: fmtDM(r.until) }) };
  }
}

/** Окно заявки. Рисуется дважды: в сетке строк доски (≥ m) и карточкой под доской (< m). */
function LeavePopover({ s, flat }: { s: S; flat?: boolean }) {
  return (
    <div className={`pop${flat ? " flat" : ""}`}>
      <div className="pop-t"><span className="d"></span>{s.popTitle}</div>
      <div className="pop-who"><T t="marek">{s.marek}</T> <span className="pop-num">#{BOARD_ROWS[0].num}</span></div>
      <div className="pop-f">
        <span className="pop-k">{s.popPeriod}</span>
        <span className="pop-v mono">
          <T t="dates">{fmtDMY(REQUEST.from)} – {fmtDMY(REQUEST.to)}</T> ({fill(s.popDays, { n: requestDays() })})
        </span>
      </div>
      <div className="pop-f"><span className="pop-k">{s.popReason}</span><span className="pop-v">{s.popReasonV}</span></div>
      <div className="pop-f pop-hist">
        <span className="pop-k">{s.popHistory}</span>
        <span className="pop-v">{s.popCreated} {fmtDMY(REQUEST.createdDate)} {REQUEST.createdTime}</span>
        <span className="pop-v pop-state"><span className="d"></span>{s.popAwaiting}</span>
      </div>
      <div className="pop-actions"><span className="pbtn ghost-bad">{s.popReject}</span><span className="pbtn primary">{s.popApprove}</span></div>
    </div>
  );
}

function BoardRowView({ r, s, index }: { r: BoardRow; s: S; index: number }) {
  const own = r.id === "marek";
  const pill = statusPill(r, s);
  const [untilPre, untilPost] = splitAt(s.barUntil, "date");
  return (
    <div
      className="board-row"
      data-s={r.onS ? "1" : "0"}
      data-m={r.orderM === null ? "0" : "1"}
      style={{ "--om": r.orderM ?? 1, "--rl": index + 1 } as CSSProperties}
    >
      <div className="drv">
        <AvRing pct={r.ready} initials={s[`${r.id}Av` as const]} />
        <span className="dmeta">
          <span className="dname-row">
            <span className="dname">{own ? <T t="marek">{s[r.id]}</T> : s[r.id]}</span>
            <span className={`flag ${r.flag}`}></span>
            {r.docWarn ? <span className="dchip warn"><Icon id="i-alert" />{r.docWarn}</span> : null}
          </span>
          <span className="dtags">
            <span className="dnum">#{r.num}</span>
            <span className={`ppill ${pill.tone}`}><span className="d"></span><span>{pill.label}</span></span>
          </span>
        </span>
      </div>
      <div className="lane">
        {r.bars.map((bar) => <BoardBar key={`${bar.kind}-${bar.from}`} bar={bar} s={s} own={own} />)}
        {own && (
          <>
            <span className="req-tail">→ <T t="dates">{fmtDM(REQUEST.to)}</T></span>
            <span className="bar-until">{untilPre}{fmtDM(REQUEST.to)}{untilPost}</span>
          </>
        )}
      </div>
    </div>
  );
}

function rangeLabel(s: S, crop: CropId): string {
  const first = windowDay(CROPS[crop].start);
  const last = windowDay(CROPS[crop].start + CROPS[crop].days - 1);
  return `${first.day} ${s.plMonth} – ${last.day} ${s.plMonth} ${last.iso.slice(0, 4)}`;
}

export function PlannerScreen({ s, label }: { s: S; label: string }) {
  /* окно заявки в сетке строк: линия колонки дня начала отпуска (кадр l) и ряд под последней строкой (кадр m) */
  const boardVars = {
    "--now-l": nowLine("l"), "--now-m": nowLine("m"), "--now-s": nowLine("s"),
    "--pop-col": daysBetween(WINDOW_START, REQUEST.from) + 2,
    "--pop-row-m": BOARD_ROWS.filter((r) => r.orderM !== null).length + 1,
  } as CSSProperties;
  return (
    <div className="pwin clip" role="img" aria-label={label}>
      <div className="pwin-bar">
        <span className="pwin-title"><Icon id="i-board" className="ic" /><span>{s.plTitle}</span></span>
        <span className="spacer"></span>
        <span className="pwin-week wk-l">{rangeLabel(s, "l")}</span>
        <span className="pwin-week wk-m">{rangeLabel(s, "m")}</span>
      </div>
      <div className="pwin-kpis">
        <div className="kpi app hide-m">
          <span className="kh">{s.kpiAway}</span>
          <span className="kv amber">{FLEET.away}</span>
          <span className="kf"><span className="d"></span>{fill(s.kpiAwaySub, { pct: awayPct(FLEET.away) })}</span>
        </div>
        <div className="kpi app">
          <span className="kh">{s.kpiPending}</span>
          <span className="kv red">{PENDING_REQUESTS}</span>
          <span className="kf"><span className="d bad pulse"></span>{s.kpiPendingSub}</span>
        </div>
        <div className="need-row">
          <span className="needchip"><span className="d"></span>{s.needs}<span className="n">{NEEDS_DECISION}</span></span>
        </div>
      </div>
      <div className="board sc" style={boardVars}>
        <div className="board-head">
          <span className="bh"></span>
          {DAYS.map((d) => (
            <span key={d.iso} className={`bh${d.weekend ? " we" : ""}${d.today ? " today" : ""}`} data-crop={d.crop}>
              <span className="bh-l">{fill(s.dayFmt, { wd: s.wd[d.weekday], d: d.day })}</span>
              <span className="bh-p">{awayPct(d.away)}%</span>
              <span className="bh-bars"><i className={`bh-bar ${awayTone(d.away)}`} style={{ height: awayPct(d.away) }}></i></span>
            </span>
          ))}
        </div>
        <div className="board-rows">
          <div className="colbg" aria-hidden="true">
            <i></i>
            {DAYS.map((d) => <i key={d.iso} className={d.weekend ? "we" : undefined} data-crop={d.crop}></i>)}
          </div>
          {BOARD_ROWS.map((r, i) => <BoardRowView key={r.id} r={r} s={s} index={i} />)}
          <LeavePopover s={s} />
          <span className="todayline" aria-hidden="true"></span>
        </div>
      </div>
      <LeavePopover s={s} flat />
    </div>
  );
}

/* ---- (3) ротация: карточка-список «Возвращаются» ----------------------------- */

function ReadinessPill({ r, s }: { r: RotationRow; s: S }) {
  if (r.readiness === "ready") return <span className="rpill ok">{s.rotReady}</span>;
  if (r.readiness === "busy") return <span className="rpill trip">{fill(s.rotBusy, { name: s[r.busyBy] })}</span>;
  return (
    <span className="rpill violet">
      <T t="stk">{fill(s.rotDoc, { doc: r.docCode, date: fmtDM(r.docUntil) })}</T>
    </span>
  );
}

function RotationRowView({ r, s }: { r: RotationRow; s: S }) {
  const own = r.id === "marek";
  const [retPre, retPost] = splitAt(s.rotReturn, "date");
  const date = fmtDM(r.returnDate);
  return (
    <div className="rot-row">
      <AvRing pct={r.ready} initials={s[`${r.id}Av` as const]} />
      <div className="rot-body">
        <div className="rot-l1">
          <span className="dname">{own ? <T t="marek">{s[r.id]}</T> : s[r.id]}</span>
          <span className={`flag ${r.flag}`}></span>
          <span className="dnum">{r.num}</span>
        </div>
        <div className="rot-l2">
          {r.absence === "sick"
            ? <span className="rpill bad"><Icon id="i-stethoscope" />{s.rotSick}</span>
            : <span className="rpill warn"><Icon id="i-plane" />{s.rotVac}</span>}
          <span className="rpill zinc mono">{retPre}{own ? <T t="dates">{date}</T> : date}{retPost}</span>
        </div>
        <div className="rot-l3">
          <span className="rpill trip">
            <Icon id="i-truck" />
            {own ? <b className="thread" data-t="gt114">{r.truck}</b> : <b>{r.truck}</b>} {s.rotPrev}
          </span>
          <ReadinessPill r={r} s={s} />
        </div>
      </div>
    </div>
  );
}

export function RotationScreen({ s, label }: { s: S; label: string }) {
  const { week } = ROTATION;
  /* диапазон недели приложение собирает строкой: «дд–дд.ММ» внутри одного месяца */
  const range = `${dayOf(week.from)}–${fmtDM(week.to)}`;
  return (
    <div className="pwin" role="img" aria-label={label}>
      <div className="pwin-bar">
        <span className="pwin-title"><Icon id="i-rotate" className="ic" /><span>{s.rotTitle}</span></span>
      </div>
      <div className="rot">
        <div className="rot-head">
          <span className="rot-h"><span className="rot-t">{s.rotReturning}</span><span className="rot-c">{ROTATION.returning}</span></span>
          <span className="rpill zinc">{fill(s.rotPrepare, { n: ROTATION.toPrepare })}</span>
        </div>
        <p className="rot-note">{fill(s.rotHorizon, { n: ROTATION.horizonDays })}</p>
        <p className="rot-week">{fill(s.rotWeek, { range })} · {fill(s.rotWeekCount, { n: week.returning })}</p>
        {ROTATION_ROWS.map((r) => <RotationRowView key={r.id} r={r} s={s} />)}
      </div>
    </div>
  );
}

/* ---- (4) карточка машины: шапка и группа «Осмотр» вкладки «Документы» -------- */

const DOC_NAME: Record<InspectionCode, "docStk" | "docCal" | "docTdl"> = { STK: "docStk", CAL: "docCal", TDL: "docTdl" };
/* шаблон срока — свой у каждой строки: форма слова «дней» зависит от числа, а оно у каждой своё */
const DOC_DAYS: Record<InspectionCode, "daysLeft" | "daysCal" | "daysTdl"> = { STK: "daysLeft", CAL: "daysCal", TDL: "daysTdl" };

export function VehicleScreen({ s, label }: { s: S; label: string }) {
  return (
    <div className="pwin" role="img" aria-label={label}>
      <div className="pwin-bar">
        <span className="pwin-title"><Icon id="i-truck" className="ic" /><span>{s.vehTitle}</span></span>
      </div>
      <div className="veh">
        <div className="veh-head">
          <span className="veh-ring">
            <svg className="arc" viewBox="0 0 36 36" fill="none" aria-hidden="true">
              <circle className="track" cx="18" cy="18" r="16.5" strokeWidth="2" />
              <circle
                className="val" cx="18" cy="18" r="16.5" strokeWidth="2" strokeLinecap="round"
                strokeDasharray={RING_C.vehicle} strokeDashoffset={ringOffset(VEHICLE.ready, RING_C.vehicle)}
              />
            </svg>
            <span className="veh-av"><Icon id="i-truck" /></span>
          </span>
          <div className="veh-id">
            <span className="veh-type">{s.vehType}</span>
            <span className="veh-name"><T t="gt114">{VEHICLE.name}</T><span className={`flag ${VEHICLE.flag}`}></span></span>
            <span className="veh-spec">{VEHICLE.make} · {VEHICLE.model} · {VEHICLE.year} · {s.vehFuel} · {VEHICLE.plate}</span>
            <span className="veh-pills">
              <span className="rpill trip"><Icon id="i-truck" />{s.vehOnTrip} · <T t="marek">{s.marek}</T></span>
              <span className="rpill zinc mono">{fmtKm(VEHICLE.odometerKm)}</span>
            </span>
          </div>
        </div>
        <div className="veh-chips">
          {VEHICLE.chips.map((c) => <span key={c.code} className={`dchip ${c.tone}`}>{c.code}</span>)}
        </div>
        <div className="veh-tabs">
          <span className="veh-tab">{s.vehTabOverview}</span>
          <span className="veh-tab active">{s.vehTabDocs}</span>
          <span className="veh-tab">{s.vehTabService}</span>
        </div>
        <p className="veh-grp">{s.vehGroup}</p>
        <div className="doclist">
          {VEHICLE.inspection.map((doc) => {
            const date = fmtDMY(doc.until);
            const left = daysLeft(doc.until);
            return (
              <div key={doc.code} className="docline">
                <span className={`dchip ${doc.tone}`}>{doc.code}</span>
                <span className="docline-n">{s[DOC_NAME[doc.code]]}</span>
                <span className="docline-d">{doc.tone === "warn" ? <T t="stk">{date}</T> : date}</span>
                <span className={`docline-s ${doc.tone}`}>
                  <span className="d"></span>{fill(s[DOC_DAYS[doc.code]], { n: left })}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
