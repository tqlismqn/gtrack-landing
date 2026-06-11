"use client";

/* ============================================================================
   NAV — порт хедера прототипа. Лого-морф G-Track ↔ G-Truck (fx.js):
   единственное место, где остался .wm-морф (hover); из hero-sub убран
   сознательно при порте. Тема/язык — из LandingProvider.
   ============================================================================ */

import { useEffect, useRef, useState } from "react";
import { LANG_NAMES, LOCALES } from "@/lib/landing-i18n";
import { useLanding } from "./LandingProvider";
import { ROADMAP_URL, APP_URL, SIGNUP_URL } from "./urls";

export function Nav() {
  const { d, lang, setLang, toggleTheme } = useLanding();
  const [langOpen, setLangOpen] = useState(false);
  const wmRef = useRef<HTMLSpanElement>(null);
  const langWrapRef = useRef<HTMLDivElement>(null);

  /* лого-морф: hover на nav-лого (порт morph() из fx.js) */
  const morphTimers = useRef<number[]>([]);
  function morph(toU: boolean) {
    const wm = wmRef.current;
    if (!wm || !document.documentElement.classList.contains("motion-ok")) return;
    wm.classList.add("driving");
    morphTimers.current.push(
      window.setTimeout(() => wm.classList.toggle("as-u", toU), 280),
      window.setTimeout(() => wm.classList.remove("driving"), 880),
    );
  }

  useEffect(() => {
    const timers = morphTimers.current;
    const onMotion = (e: Event) => {
      const ok = (e as CustomEvent<{ ok: boolean }>).detail?.ok;
      if (!ok) wmRef.current?.classList.remove("as-u", "driving");
    };
    window.addEventListener("gt-motion-applied", onMotion);
    return () => {
      window.removeEventListener("gt-motion-applied", onMotion);
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  /* закрытие языкового меню по клику вне (порт делегирования mock-i18n.js) */
  useEffect(() => {
    if (!langOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (!langWrapRef.current?.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [langOpen]);

  return (
    <header className="nav" data-screen-label="Nav">
      <div className="nav-inner">
        <a
          className="logo"
          href="#top"
          onMouseEnter={() => morph(true)}
          onMouseLeave={() => morph(false)}
        >
          <span className="logo-mark">GT</span>
          <span className="wm" ref={wmRef}>
            G-Tr
            <span className="wm-m">
              <span className="g a">a</span>
              <span className="g u">u</span>
            </span>
            ck
            <svg className="wm-truck" viewBox="0 0 40 20" aria-hidden="true">
              <use href="#i-trucksil" />
            </svg>
          </span>
        </a>
        <nav className="nav-links">
          <a className="nav-link" href="#product">{d.nav.product}</a>
          <a className="nav-link" href="#pricing">{d.nav.pricing}</a>
          <a className="nav-link" href={ROADMAP_URL}>{d.nav.roadmap}</a>
        </nav>
        <div className="nav-right">
          <button
            className="icon-ctl"
            type="button"
            aria-label={d.nav.themeAria}
            onClick={toggleTheme}
          >
            <svg className="ic-sun"><use href="#i-sun" /></svg>
            <svg className="ic-moon"><use href="#i-moon" /></svg>
          </button>
          <div className={`lang-wrap${langOpen ? " open" : ""}`} ref={langWrapRef}>
            <button
              className="lang-stub"
              type="button"
              aria-haspopup="true"
              aria-label={d.nav.langAria}
              onClick={() => setLangOpen((v) => !v)}
            >
              <span>{lang.toUpperCase()}</span> <span style={{ opacity: 0.55 }}>▾</span>
            </button>
            <div className="lang-menu" role="menu">
              {LOCALES.map((l) => (
                <button
                  key={l}
                  className="lang-opt"
                  type="button"
                  aria-pressed={lang === l}
                  onClick={() => { setLang(l); setLangOpen(false); }}
                >
                  <span className="lc">{l.toUpperCase()}</span>
                  {LANG_NAMES[l]}
                </button>
              ))}
            </div>
          </div>
          <a className="nav-login" href={APP_URL}>{d.nav.login}</a>
          <a className="btn accent sm" href={SIGNUP_URL}>
            <span className="cta-full">{d.nav.ctaFull}</span>
            <span className="cta-short">{d.nav.ctaShort}</span>
            <span className="cta-tiny">{d.nav.ctaTiny}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
