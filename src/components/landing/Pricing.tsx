"use client";

/* ============================================================================
   ТАРИФЫ — порт pricing-блока landing.js на React-state.
   ЦИФРЫ СИНХРОНИЗИРОВАНЫ СО STRIPE LIVEMODE — НЕ МЕНЯТЬ:
   150/450/900 (мес), −6,7% квартал, −16,7% год, GA-strike 249/699/1349,
   ёмкости 25/100/250 машин.
   ============================================================================ */

import { useEffect, useState } from "react";
import { useLanding } from "./LandingProvider";
import { formatNum } from "@/lib/landing-i18n";
import { SIGNUP_URL, SALES_MAILTO } from "./urls";

type PeriodKey = "mo" | "q" | "y";
type TierKey = "starter" | "fleet" | "business";

/* ЦИФРЫ СИНХРОНИЗИРОВАНЫ СО STRIPE LIVEMODE — НЕ МЕНЯТЬ. */
const PRICING: Record<PeriodKey, Record<TierKey, number>> = {
  mo: { starter: 150, fleet: 450, business: 900 },
  q: { starter: 140, fleet: 420, business: 840 },
  y: { starter: 125, fleet: 375, business: 750 },
};
const TRUCKS: Record<TierKey, number> = { starter: 25, fleet: 100, business: 250 };
const GA: Record<TierKey, number> = { starter: 249, fleet: 699, business: 1349 };

function perTruckTxt(amt: number, trucks: number): string {
  const per = amt / trucks;
  return (Math.round(per * 10) / 10).toFixed(1).replace(/\.0$/, "");
}

export function Pricing() {
  const { d } = useLanding();
  const p = d.pricing;
  const [period, setPeriod] = useState<PeriodKey>("mo");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("gt-landing-period");
    } catch {
      /* ignore */
    }
    /* осознанный паттерн: восстановление сохранённого периода после
       hydration (SSR-дефолт mo, без mismatch) — как в landing.js */
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved === "mo" || saved === "q" || saved === "y") setPeriod(saved);
  }, []);

  const choose = (key: PeriodKey) => {
    setPeriod(key);
    try {
      localStorage.setItem("gt-landing-period", key);
    } catch {
      /* ignore */
    }
  };

  const billedTxt = (amt: number): string => {
    if (period === "mo") return p.billedMo;
    if (period === "q") return `€${formatNum(amt * 3)} ${p.billedQ}`;
    return `€${formatNum(amt * 12)} ${p.billedY}`;
  };

  const tierName: Record<TierKey, string> = {
    starter: "Starter",
    fleet: "Fleet",
    business: "Business",
  };
  const tierBlurb: Record<TierKey, string> = {
    starter: p.starterBlurb,
    fleet: p.fleetBlurb,
    business: p.businessBlurb,
  };

  const renderTier = (
    key: TierKey,
    opts: {
      delay?: number;
      anchor?: boolean;
      lock: string;
      /* [водители, прицепы, места диспетчеров] — машины берутся из TRUCKS */
      caps: [string, string, string];
    },
  ) => {
    const amt = PRICING[period][key];
    return (
      <div
        className={`tier${opts.anchor ? " anchor" : ""} reveal`}
        data-tier={key}
        {...(opts.delay ? { "data-delay": String(opts.delay) } : {})}
      >
        {opts.anchor && <div className="tier-flag">{p.fleetFlag}</div>}
        <div className="tier-name">{tierName[key]}</div>
        <div className="tier-blurb">{tierBlurb[key]}</div>
        <div className="tier-price"><span className="cur">€</span><span className="amt">{amt}</span><span className="per">{p.perMonth}</span></div>
        <div className="tier-ga">{p.afterLaunch} <s>€{GA[key]}</s></div>
        <div className="tier-billed">{billedTxt(amt)}</div>
        <div className="tier-cta">
          <a className={`btn${opts.anchor ? " accent" : ""}`} href={SIGNUP_URL}>{p.choose} {tierName[key]}</a>
        </div>
        <div className="tier-lock"><svg className="ic"><use href="#i-lock" /></svg>{opts.lock}</div>
        <div className="tier-caps">
          <div className="cap-row"><svg className="ic"><use href="#i-truck" /></svg><span className="cap-val">{p.upTo} {TRUCKS[key]}</span> {p.capTrucks}</div>
          <div className="cap-row"><svg className="ic"><use href="#i-users" /></svg><span className="cap-val">{opts.caps[0]}</span> {p.capDrivers}</div>
          <div className="cap-row"><svg className="ic"><use href="#i-trailer" /></svg><span className="cap-val">{opts.caps[1]}</span> {p.capTrailers}</div>
          <div className="cap-row"><svg className="ic"><use href="#i-user" /></svg><span className="cap-val">{opts.caps[2]}</span> {p.capSeats}</div>
        </div>
        <div className="tier-pertruck">≈ €{perTruckTxt(amt, TRUCKS[key])} {p.perTruck}</div>
      </div>
    );
  };

  return (
    <section className="pricing sect" id="pricing" data-screen-label="Тарифы">
      <div className="wrap">
        <div className="pricing-head">
          <span className="overline">{p.overline}</span>
          <h2 className="h2 reveal">{p.h2}</h2>
          <p className="sect-sub reveal" data-delay="60">
            {p.sub}
            <b style={{ color: "var(--text-1)" }}>{p.subB}</b>
          </p>
          <div className="period-toggle reveal" data-delay="120" role="group" aria-label={p.periodAria}>
            <button className="period-btn" type="button" aria-pressed={period === "mo"} onClick={() => choose("mo")}>{p.perMo}</button>
            <button className="period-btn" type="button" aria-pressed={period === "q"} onClick={() => choose("q")}>{p.perQ} <span className="disc">{p.discQ}</span></button>
            <button className="period-btn" type="button" aria-pressed={period === "y"} onClick={() => choose("y")}>{p.perY} <span className="disc">{p.discY}</span></button>
          </div>
        </div>

        <div className="tiers">
          {renderTier("starter", { lock: p.lock12, caps: ["50", "35", "5"] })}
          {renderTier("fleet", { delay: 60, anchor: true, lock: p.lock24, caps: ["200", "130", "15"] })}
          {renderTier("business", { delay: 120, lock: p.lock24, caps: ["500", "320", "40"] })}

          <div className="tier reveal" data-tier="plus" data-delay="180">
            <div className="tier-name">Business Plus</div>
            <div className="tier-blurb">{p.plusBlurb}</div>
            <div className="tier-price custom"><span className="amt">{p.plusPrice}</span></div>
            <div className="tier-ga">{p.plusGa}</div>
            <div className="tier-billed">{p.plusBilled}</div>
            <div className="tier-cta"><a className="btn" href={SALES_MAILTO}>{p.plusCta}</a></div>
            <div className="tier-lock"><svg className="ic"><use href="#i-lock" /></svg>{p.lockContract}</div>
            <div className="tier-caps">
              <div className="cap-row"><svg className="ic"><use href="#i-truck" /></svg><span className="cap-val">250+</span> {p.plusTrucks}</div>
              <div className="cap-row"><svg className="ic"><use href="#i-infinity" /></svg><span className="cap-val">{p.plusUnlim}</span> {p.plusUnlimSuffix}</div>
              <div className="cap-row"><svg className="ic"><use href="#i-user" /></svg><span className="cap-val">{p.plusCustom}</span> {p.plusSeats}</div>
              <div className="cap-row"><svg className="ic"><use href="#i-shield" /></svg><span className="cap-val">{p.plusSla}</span> {p.plusSlaSuffix}</div>
            </div>
            <div className="tier-pertruck">&nbsp;</div>
          </div>
        </div>

        <div className="founding-strip reveal">
          <svg className="tic"><use href="#i-lock" /></svg>
          <p><b>{p.foundingB}</b>{p.founding}</p>
        </div>
        <p className="pricing-note reveal">{p.noteA}<b>{p.noteB}</b>{p.noteC}</p>
      </div>
    </section>
  );
}
