"use client";

/* ============================================================================
   БОЛЬ «Как это выглядит сегодня» — коллаж Excel/чат/папка, рассыпающийся
   по скроллу (--decay двигает MotionRoot), сквозь хаос проступает порядок.
   Fly-cells: ячейки Excel «перелетают» в чипы G-Track.
   ============================================================================ */

import type { CSSProperties } from "react";
import { useLanding } from "./LandingProvider";

type FlyStyle = CSSProperties & {
  "--fx"?: string;
  "--fy"?: string;
  "--fr"?: string;
};

export function Pain() {
  const { d } = useLanding();
  const p = d.pain;
  return (
    <section className="pain sect" data-screen-label="Как это выглядит сегодня">
      <div className="wrap pain-grid">
        <div className="pain-collage" aria-label={p.collageAria}>
          <div className="pain-card pc-excel">
            <div className="pc-head"><span className="pcdot"></span>{p.excelTitle}</div>
            <table className="xls">
              <tbody>
                <tr><th>{p.xlsHdrDriver}</th><th>{p.xlsHdrVisa}</th><th>{p.xlsHdrA1}</th><th>{p.xlsHdrNote}</th></tr>
                <tr><td>{p.xlsR1n}</td><td className="x-warn x-note">{p.xlsR1v}</td><td>{p.xlsR1a}</td><td>{p.xlsR1note}</td></tr>
                <tr><td>{p.xlsR2n}</td><td className="x-bad">{p.xlsR2v}</td><td>{p.xlsR2a}</td><td className="x-note">{p.xlsR2note}</td></tr>
                <tr><td>{p.xlsR3n}</td><td>{p.xlsR3v}</td><td>{p.xlsR3a}</td><td>{p.xlsR3note}</td></tr>
                <tr><td>{p.xlsR4n}</td><td className="x-warn">{p.xlsR4v}</td><td className="x-bad">{p.xlsR4a}</td><td>{p.xlsR4note}</td></tr>
              </tbody>
            </table>
          </div>
          <div className="pain-card pc-chat">
            <div className="pc-head"><span className="pcdot"></span>{p.chatTitle}</div>
            <div className="chat-body">
              <div className="msg me">{p.chat1}<time>09:14</time></div>
              <div className="msg">{p.chat2}<time>09:31</time></div>
              <div className="msg">{p.chat3}<time>09:32</time></div>
              <div className="msg me">{p.chat4}<time>09:40</time></div>
            </div>
          </div>
          <div className="pain-card pc-folder">
            <div className="pc-head"><span className="pcdot"></span>{p.folderTitle}</div>
            <div className="folder-body">
              <div className="folder-tab"><svg className="ic"><use href="#i-folder" /></svg>{p.folder1}</div>
              <div className="folder-tab"><svg className="ic"><use href="#i-folder" /></svg>{p.folder2}</div>
              <div className="folder-tab"><svg className="ic"><use href="#i-folder" /></svg>{p.folder3}</div>
            </div>
          </div>
          <div className="pain-order">
            <div className="order-row">
              <span className="avatar">{d.names.savchenkoAv}</span>
              <span className="grow">
                <span className="dname" style={{ fontSize: 14 }}>{p.orderName}</span>
                <span className="order-chips" style={{ marginTop: 5 }}>
                  <span className="dchip ok">VIS</span><span className="dchip ok">A1</span><span className="dchip ok">DL</span><span className="dchip ok">TCH</span><span className="dchip ok">MED</span><span className="dchip ok">C95</span>
                </span>
              </span>
              <span className="ppill ok"><span className="d"></span><span>{d.mock.ready}</span>&nbsp;98%</span>
            </div>
          </div>
          {/* ячейки Excel «перелетают» в чипы G-Track (driven by --decay) */}
          <div className="fly-cell" style={{ left: 104, top: 84, "--fx": "22px", "--fy": "138px", "--fr": "-7deg" } as FlyStyle} aria-hidden="true"><span className="ff">{p.xlsR1v}</span><span className="ft dchip ok">VIS</span></div>
          <div className="fly-cell" style={{ left: 102, top: 112, "--fx": "66px", "--fy": "112px", "--fr": "6deg" } as FlyStyle} aria-hidden="true"><span className="ff">{p.xlsR2v}</span><span className="ft dchip ok">A1</span></div>
          <div className="fly-cell" style={{ left: 146, top: 168, "--fx": "96px", "--fy": "60px", "--fr": "-5deg" } as FlyStyle} aria-hidden="true"><span className="ff">{p.xlsR4v}</span><span className="ft dchip ok">MED</span></div>
          <div className="fly-cell" style={{ left: 224, top: 168, "--fx": "30px", "--fy": "60px", "--fr": "8deg" } as FlyStyle} aria-hidden="true"><span className="ff">{p.xlsR4a}</span><span className="ft dchip ok">C95</span></div>
        </div>
        <div>
          <span className="overline">{p.overline}</span>
          <h2 className="h2 reveal">{p.h2}</h2>
          <p className="sect-sub reveal" data-delay="60">{p.sub}</p>
          <div className="pain-facts">
            <div className="fact reveal" data-delay="100"><span className="fnum">01</span>
              <p>{p.fact1a}<b>{p.fact1b}</b>{p.fact1c}</p></div>
            {/* TODO (из прототипа): уточнить сумму штрафа по целевым странам (DE/FR) */}
            <div className="fact reveal" data-delay="160"><span className="fnum">02</span>
              <p>{p.fact2a}<span className="accent-bad">{p.fact2b}</span>{p.fact2c}</p></div>
            <div className="fact reveal" data-delay="220"><span className="fnum">03</span>
              <p>{p.fact3a}<b>{p.fact3b}</b>{p.fact3c}</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
