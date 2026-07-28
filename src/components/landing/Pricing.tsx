"use client";

/* ============================================================================
   ТАРИФЫ — порт pricing-блока landing.js на React-state.
   ЦЕНЫ СИНХРОНИЗИРОВАНЫ СО STRIPE LIVEMODE — НЕ МЕНЯТЬ:
   150/450/900 (мес), −6,7% квартал, −16,7% год, GA-strike 249/699/1349.
   ЁМКОСТИ синхронизированы с `subscription_plans` (тарифы v2, 28.07.2026):
   машины 50/200/500, водители ×2, прицепы ×1,5, места пользователей — безлимит.
   ============================================================================ */

import { useEffect, useState } from "react";
import { useLanding } from "./LandingProvider";
import { formatNum } from "@/lib/landing-i18n";
import { appSignupUrl, SALES_MAILTO } from "./urls";

type PeriodKey = "mo" | "q" | "y";
type TierKey = "starter" | "fleet" | "business";

/* ЦИФРЫ СИНХРОНИЗИРОВАНЫ СО STRIPE LIVEMODE — НЕ МЕНЯТЬ. */
const PRICING: Record<PeriodKey, Record<TierKey, number>> = {
  mo: { starter: 150, fleet: 450, business: 900 },
  q: { starter: 140, fleet: 420, business: 840 },
  y: { starter: 125, fleet: 375, business: 750 },
};
/* Ёмкости — тарифы v2 (28.07.2026), сверено с `subscription_plans` на проде. */
const TRUCKS: Record<TierKey, number> = { starter: 50, fleet: 200, business: 500 };
/* Business Plus: дефолт плана `enterprise`; сверх — персональный оверрайд по договору. */
const PLUS_CAPS = { trucks: 1000, drivers: 2000, trailers: 1500 } as const;
/* Пакет расширения `capacity_pack_50`: 225 €/мес, максимум 5 пакетов. */
const PACK = { price: 225, trucks: 100, drivers: 200, trailers: 150, max: 5 } as const;
const GA: Record<TierKey, number> = { starter: 249, fleet: 699, business: 1349 };

/* «≈ 2,25 €» — до двух знаков, хвостовые нули убираются, разделитель по локали.
   Одного знака не хватает: 450/200 = 2,25 округлялось в 2,3 и расходилось
   с ценовым якорем секции. Разделитель: en — точка, остальные 11 локалей — запятая. */
function perTruckTxt(amt: number, trucks: number, dec: string): string {
  const per = Math.round((amt / trucks) * 100) / 100;
  return per
    .toFixed(2)
    .replace(/0+$/, "")
    .replace(/\.$/, "")
    .replace(".", dec);
}

/* «≈ 4,5 €» → число + уменьшенный знак валюты вплотную (локале-агностично:
   во всех 12 локалях € стоит в хвосте после пробела) */
function renderAnchorBig(text: string) {
  const m = text.match(/^(.*?)\s*€\s*$/);
  if (!m) return text;
  return (
    <>
      {m[1]}
      <span className="ca-cur">€</span>
    </>
  );
}

export function Pricing() {
  const { d, lang } = useLanding();
  const p = d.pricing;
  /* десятичный разделитель: en — точка, остальные 11 локалей — запятая */
  const dec = lang === "en" ? "." : ",";
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
    if (period === "q") return `${formatNum(amt * 3)} € ${p.billedQ}`;
    return `${formatNum(amt * 12)} € ${p.billedY}`;
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
      /* [водители, прицепы] — машины берутся из TRUCKS, места пользователей безлимитны */
      caps: [string, string];
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
        <div className="tier-price"><span className="amt">{amt}</span><span className="cur">€</span><span className="per">{p.perMonth}</span></div>
        <div className="tier-ga">{p.afterLaunch} <s>{GA[key]} €</s></div>
        <div className="tier-billed">{billedTxt(amt)}</div>
        <div className="tier-cta">
          <a className={`btn${opts.anchor ? " accent" : ""}`} href={appSignupUrl(lang)}>{p.choose} {tierName[key]}</a>
        </div>
        <div className="tier-lock"><svg className="ic"><use href="#i-lock" /></svg>{opts.lock}</div>
        <div className="tier-caps">
          <div className="cap-row"><svg className="ic"><use href="#i-truck" /></svg><span className="cap-val">{p.upTo} {TRUCKS[key]}</span> {p.capTrucks}</div>
          <div className="cap-row"><svg className="ic"><use href="#i-users" /></svg><span className="cap-val">{opts.caps[0]}</span> {p.capDrivers}</div>
          <div className="cap-row"><svg className="ic"><use href="#i-trailer" /></svg><span className="cap-val">{opts.caps[1]}</span> {p.capTrailers}</div>
          <div className="cap-row"><svg className="ic"><use href="#i-infinity" /></svg><span className="cap-val">{p.plusUnlim}</span> {p.capSeats}</div>
        </div>
        <div className="tier-pertruck">≈ {perTruckTxt(amt, TRUCKS[key], dec)} € {p.perTruck}</div>
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
          {renderTier("starter", { lock: p.lock12, caps: ["100", "75"] })}
          {renderTier("fleet", { delay: 60, anchor: true, lock: p.lock24, caps: ["400", "300"] })}
          {renderTier("business", { delay: 120, lock: p.lock24, caps: [formatNum(1000), "750"] })}

          <div className="tier reveal" data-tier="plus" data-delay="180">
            <div className="tier-name">Business Plus</div>
            <div className="tier-blurb">{p.plusBlurb}</div>
            <div className="tier-price custom"><span className="amt">{p.plusPrice}</span></div>
            <div className="tier-ga">{p.plusGa}</div>
            <div className="tier-billed">{p.plusBilled}</div>
            <div className="tier-cta"><a className="btn" href={SALES_MAILTO}>{p.plusCta}</a></div>
            <div className="tier-lock"><svg className="ic"><use href="#i-lock" /></svg>{p.lockContract}</div>
            <div className="tier-caps">
              <div className="cap-row"><svg className="ic"><use href="#i-truck" /></svg><span className="cap-val">{formatNum(PLUS_CAPS.trucks)}+</span> {p.plusTrucks}</div>
              <div className="cap-row"><svg className="ic"><use href="#i-users" /></svg><span className="cap-val">{formatNum(PLUS_CAPS.drivers)}</span> {p.capDrivers}</div>
              <div className="cap-row"><svg className="ic"><use href="#i-trailer" /></svg><span className="cap-val">{formatNum(PLUS_CAPS.trailers)}</span> {p.capTrailers}</div>
              <div className="cap-row"><svg className="ic"><use href="#i-infinity" /></svg><span className="cap-val">{p.plusUnlim}</span> {p.capSeats}</div>
              <div className="cap-row"><svg className="ic"><use href="#i-shield" /></svg><span className="cap-val">{p.plusSla}</span> {p.plusSlaSuffix}</div>
            </div>
            <div className="tier-pertruck">&nbsp;</div>
          </div>
        </div>

        <p className="pricing-note reveal">
          <b>{p.packLead}</b> +{PACK.trucks} {p.capTrucks} · +{PACK.drivers} {p.capDrivers} ·{" "}
          +{PACK.trailers} {p.capTrailers} — {PACK.price} €{p.perMonth}, {p.packMax}
        </p>

        <div className="cost-anchor reveal" data-delay="60">
          <div className="ca-num">
            <span className="overline">{p.anchorOverline}</span>
            <div className="ca-big">{renderAnchorBig(p.anchorBig)}</div>
            <div className="ca-unit">{p.anchorUnit}</div>
          </div>
          <p className="ca-arg">{p.anchorArg}</p>
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
