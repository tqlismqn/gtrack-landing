"use client";

/* ============================================================================
   Форма заявки на показ (ворота 2) — клиентский островок страницы /demo.
   - Отправка — fetch после preventDefault (form-action в CSP не трогаем),
     только заголовок Content-Type: ни ключа Supabase, ни Authorization.
   - Повторный клик во время отправки ничего не шлёт (флаг в ref: состояние
     React обновляется не мгновенно, второй клик успел бы уйти).
   - Ловушка для ботов — поле website вне экрана; время заполнения считаем с
     монтирования, сервер не засчитывает заявку быстрее 3 с.
   - generate_lead — только для засчитанной заявки (leadEvent), без личных полей.
   - Состояние формы нигде не сохраняется (сторож хранилищ analytics.test.ts):
     при сбое сети значения остаются в полях, и человек может нажать ещё раз.
   ============================================================================ */

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  COUNTRY_CODES,
  DEFAULT_COUNTRY,
  DEMO_ENDPOINT,
  FLEET_BUCKETS,
  buildDemoPayload,
  leadEvent,
  type DemoResponse,
  type FleetBucket,
} from "@/lib/demo-form";
import type { DemoDict } from "@/lib/demo-page";
import { LANG_NAMES, LOCALES, type Lang } from "@/lib/landing-i18n";

type Status = "idle" | "sending" | "done" | "error";

export function DemoForm({ locale, t, privacyHref }: { locale: Lang; t: DemoDict; privacyHref: string }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState(DEFAULT_COUNTRY[locale]);
  const [fleet, setFleet] = useState<FleetBucket | "">("");
  const [replyLang, setReplyLang] = useState<Lang>(locale);
  const [newsletter, setNewsletter] = useState(false);
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");
  const [badFields, setBadFields] = useState<string[]>([]);
  const startedAt = useRef(0);
  const sending = useRef(false);

  useEffect(() => {
    startedAt.current = performance.now();
  }, []);

  /* названия стран — на языке страницы; «Другая» всегда последней */
  const countries = useMemo(() => {
    const names = new Intl.DisplayNames([locale], { type: "region" });
    return COUNTRY_CODES.filter((c) => c !== "ZZ")
      .map((code) => ({ code, label: names.of(code) ?? code }))
      .sort((a, b) => a.label.localeCompare(b.label, locale))
      .concat({ code: "ZZ", label: t.fields.countryOther });
  }, [locale, t.fields.countryOther]);

  const invalid = (field: string) => badFields.includes(field);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending.current || fleet === "") return;
    sending.current = true;
    setStatus("sending");
    setErrorText("");
    setBadFields([]);
    const payload = buildDemoPayload(
      { name, company, email, phone, country, fleet_bucket: fleet, lang: replyLang, newsletter, hp },
      window.location.search,
      performance.now() - startedAt.current,
      t.fields.newsletter,
    );
    try {
      const res = await fetch(DEMO_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as DemoResponse;
      if (res.status === 400 && !json.ok) {
        setBadFields(json.fields ?? []);
        setErrorText(t.errors.invalid);
        setStatus("error");
        return;
      }
      if (!res.ok || !json.ok) throw new Error(`status ${res.status}`);
      const event = leadEvent(json, fleet, locale);
      if (event) {
        window.dataLayer = window.dataLayer ?? [];
        window.dataLayer.push(event);
      }
      setStatus("done");
    } catch {
      setErrorText(t.errors.network);
      setStatus("error");
    } finally {
      sending.current = false;
    }
  }

  if (status === "done") {
    return (
      <div className="demo-card demo-done" role="status">
        <h2 className="demo-done-title">{t.success.title}</h2>
        <p>{t.success.text}</p>
      </div>
    );
  }

  return (
    <form className="demo-card demo-form" onSubmit={onSubmit} aria-busy={status === "sending"}>
      <div className="demo-field">
        <label htmlFor="demo-name">{t.fields.name}</label>
        <input id="demo-name" name="name" required maxLength={100} autoComplete="name"
          value={name} onChange={(e) => setName(e.target.value)} aria-invalid={invalid("name") || undefined} />
      </div>
      <div className="demo-field">
        <label htmlFor="demo-company">{t.fields.company}</label>
        <input id="demo-company" name="company" required maxLength={150} autoComplete="organization"
          value={company} onChange={(e) => setCompany(e.target.value)} aria-invalid={invalid("company") || undefined} />
      </div>
      <div className="demo-field">
        <label htmlFor="demo-email">{t.fields.email}</label>
        <input id="demo-email" name="email" type="email" required maxLength={254} autoComplete="email"
          value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={invalid("email") || undefined} />
      </div>
      <div className="demo-field">
        <label htmlFor="demo-phone">{t.fields.phone}</label>
        <input id="demo-phone" name="phone" type="tel" maxLength={40} autoComplete="tel" aria-describedby="demo-phone-hint"
          value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={invalid("phone") || undefined} />
        <p id="demo-phone-hint" className="demo-hint">{t.fields.phoneHint}</p>
      </div>
      <div className="demo-field">
        <label htmlFor="demo-country">{t.fields.country}</label>
        <select id="demo-country" name="country" required value={country}
          onChange={(e) => setCountry(e.target.value)} aria-invalid={invalid("country") || undefined}>
          <option value="" disabled>{t.fields.countryPlaceholder}</option>
          {countries.map((c) => (
            <option key={c.code} value={c.code}>{c.label}</option>
          ))}
        </select>
      </div>
      <div className="demo-field">
        <label htmlFor="demo-lang">{t.fields.lang}</label>
        <select id="demo-lang" name="lang" value={replyLang} onChange={(e) => setReplyLang(e.target.value as Lang)}>
          {LOCALES.map((l) => (
            <option key={l} value={l}>{LANG_NAMES[l]}</option>
          ))}
        </select>
      </div>
      <fieldset className="demo-field demo-fleet" aria-invalid={invalid("fleet_bucket") || undefined}>
        <legend>{t.fields.fleet}</legend>
        <div className="demo-seg">
          {FLEET_BUCKETS.map((b, i) => (
            <label key={b} className="demo-seg-opt">
              <input type="radio" name="fleet_bucket" value={b} required={i === 0}
                checked={fleet === b} onChange={() => setFleet(b)} />
              <span>{t.fleetOptions[b]}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className="demo-check">
        <input type="checkbox" name="newsletter" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} />
        <span>{t.fields.newsletter}</span>
      </label>
      <div className="demo-hp" aria-hidden="true">
        <label htmlFor="demo-website">Website</label>
        <input id="demo-website" name="website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
      </div>
      {status === "error" && errorText ? (
        <p className="demo-error" role="alert">{errorText}</p>
      ) : null}
      <button type="submit" className="btn accent demo-submit" disabled={status === "sending"}>
        {status === "sending" ? t.sending : t.submit}
      </button>
      <p className="demo-gdpr">
        {t.gdpr.text} <a href={privacyHref}>{t.gdpr.link}</a>
      </p>
    </form>
  );
}
