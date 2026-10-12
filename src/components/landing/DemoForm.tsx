"use client";

/* ============================================================================
   Форма заявки на показ (ворота 2) — клиентский островок страницы /demo.
   - Отправка — fetch после preventDefault (form-action в CSP не трогаем),
     только заголовок Content-Type: ни ключа Supabase, ни Authorization.
   - Повторный клик во время отправки ничего не шлёт (флаг в ref: состояние
     React обновляется не мгновенно, второй клик успел бы уйти).
   - Ловушка для ботов — поле с нейтральным именем вне экрана (не «website»: его
     заполняют менеджеры паролей). Время на странице — performance.now() от начала
     навигации; быстрее 3,2 с отправка придерживается («Отправляем…»), иначе сервер
     принял бы человека с автозаполнением за бота и заявка пропала бы (финальное ревью 12.10).
   - После успеха фокус и прокрутка — на заголовок благодарности; после 400 — на
     первое неверное поле, ошибка связана с полями через aria-describedby.
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

const MIN_ON_PAGE_MS = 3200;

/* поле ответа сервера → id элемента, на который ставим фокус */
const FIELD_INPUT: Record<string, string> = {
  name: "demo-name",
  company: "demo-company",
  email: "demo-email",
  phone: "demo-phone",
  country: "demo-country",
  lang: "demo-lang",
  fleet_bucket: "demo-fleet-lt20",
  newsletter: "demo-newsletter",
  consent_text: "demo-newsletter",
  consent_version: "demo-newsletter",
};

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
  const sending = useRef(false);
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status !== "done") return;
    doneRef.current?.focus();
    doneRef.current?.scrollIntoView({ block: "center" });
  }, [status]);

  useEffect(() => {
    const id = badFields.map((f) => FIELD_INPUT[f]).find(Boolean);
    if (id) document.getElementById(id)?.focus();
  }, [badFields]);

  /* названия стран — на языке страницы; «Другая» всегда последней */
  const countries = useMemo(() => {
    const names = new Intl.DisplayNames([locale], { type: "region" });
    return COUNTRY_CODES.filter((c) => c !== "ZZ")
      .map((code) => ({ code, label: names.of(code) ?? code }))
      .sort((a, b) => a.label.localeCompare(b.label, locale))
      .concat({ code: "ZZ", label: t.fields.countryOther });
  }, [locale, t.fields.countryOther]);

  const invalid = (field: string) => badFields.includes(field);
  /* aria-describedby: своя подсказка (если есть) + текст ошибки, когда поле неверно */
  const describedBy = (field: string, hint?: string) =>
    [hint, invalid(field) ? "demo-error" : undefined].filter(Boolean).join(" ") || undefined;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending.current || fleet === "") return;
    sending.current = true;
    setStatus("sending");
    setErrorText("");
    setBadFields([]);
    const wait = MIN_ON_PAGE_MS - performance.now();
    if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));
    const payload = buildDemoPayload(
      { name, company, email, phone, country, fleet_bucket: fleet, lang: replyLang, newsletter, hp },
      window.location.search,
      performance.now(),
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
        <h2 className="demo-done-title" ref={doneRef} tabIndex={-1}>{t.success.title}</h2>
        <p>{t.success.text}</p>
      </div>
    );
  }

  return (
    <form className="demo-card demo-form" onSubmit={onSubmit} aria-busy={status === "sending"}>
      <div className="demo-field">
        <label htmlFor="demo-name">{t.fields.name}</label>
        <input id="demo-name" name="name" required maxLength={100} autoComplete="name"
          value={name} onChange={(e) => setName(e.target.value)} aria-invalid={invalid("name") || undefined} aria-describedby={describedBy("name")} />
      </div>
      <div className="demo-field">
        <label htmlFor="demo-company">{t.fields.company}</label>
        <input id="demo-company" name="company" required maxLength={150} autoComplete="organization"
          value={company} onChange={(e) => setCompany(e.target.value)} aria-invalid={invalid("company") || undefined} aria-describedby={describedBy("company")} />
      </div>
      <div className="demo-field">
        <label htmlFor="demo-email">{t.fields.email}</label>
        <input id="demo-email" name="email" type="email" required maxLength={254} autoComplete="email"
          value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={invalid("email") || undefined} aria-describedby={describedBy("email")} />
      </div>
      <div className="demo-field">
        <label htmlFor="demo-phone">{t.fields.phone}</label>
        <input id="demo-phone" name="phone" type="tel" maxLength={40} autoComplete="tel" aria-describedby={describedBy("phone", "demo-phone-hint")}
          value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={invalid("phone") || undefined} />
        <p id="demo-phone-hint" className="demo-hint">{t.fields.phoneHint}</p>
      </div>
      <div className="demo-field">
        <label htmlFor="demo-country">{t.fields.country}</label>
        <span className="demo-select">
          <select id="demo-country" name="country" required value={country}
            onChange={(e) => setCountry(e.target.value)} aria-invalid={invalid("country") || undefined} aria-describedby={describedBy("country")}>
            <option value="" disabled>{t.fields.countryPlaceholder}</option>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>{c.label}</option>
            ))}
          </select>
        </span>
      </div>
      <div className="demo-field">
        <label htmlFor="demo-lang">{t.fields.lang}</label>
        <span className="demo-select">
          <select id="demo-lang" name="lang" value={replyLang} onChange={(e) => setReplyLang(e.target.value as Lang)}>
            {LOCALES.map((l) => (
              <option key={l} value={l}>{LANG_NAMES[l]}</option>
            ))}
          </select>
        </span>
      </div>
      <fieldset className={`demo-field demo-fleet${invalid("fleet_bucket") ? " is-invalid" : ""}`}>
        <legend>{t.fields.fleet}</legend>
        <div className="demo-seg">
          {FLEET_BUCKETS.map((b, i) => (
            <label key={b} className="demo-seg-opt">
              <input type="radio" id={`demo-fleet-${b}`} name="fleet_bucket" value={b} required={i === 0}
                checked={fleet === b} onChange={() => setFleet(b)}
                aria-describedby={describedBy("fleet_bucket")} />
              <span>{t.fleetOptions[b]}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className="demo-check">
        <input type="checkbox" id="demo-newsletter" name="newsletter" checked={newsletter}
          onChange={(e) => setNewsletter(e.target.checked)} aria-describedby={describedBy("newsletter")} />
        <span>{t.fields.newsletter}</span>
      </label>
      <div className="demo-hp" aria-hidden="true">
        <label htmlFor="demo-extra">Leave this field empty</label>
        <input id="demo-extra" name="gt_extra" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
      </div>
      {status === "error" && errorText ? (
        <p className="demo-error" id="demo-error" role="alert">{errorText}</p>
      ) : null}
      <button type="submit" className="btn accent demo-submit" disabled={status === "sending"}>
        {status === "sending" ? t.sending : t.submit}
      </button>
      <p className="demo-gdpr">
        {t.gdpr.before}
        <a href={privacyHref} target="_blank" rel="noopener noreferrer">{t.gdpr.link}</a>
        {t.gdpr.after}
      </p>
    </form>
  );
}
