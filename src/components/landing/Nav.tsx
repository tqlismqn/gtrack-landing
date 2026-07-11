"use client";

/* ============================================================================
   NAV — порт хедера прототипа. Лого-морф G-Track ↔ G-Truck (fx.js):
   единственное место, где остался .wm-морф (hover); из hero-sub убран
   сознательно при порте. Тема/язык — из LandingProvider.
   Мобильный (<880px): ссылки/язык/«Войти» уходят в бургер-панель;
   CTA и тема остаются в баре.
   ============================================================================ */

import { useEffect, useRef, useState } from "react";
import { LANG_NAMES, LOCALES, type Lang } from "@/lib/landing-i18n";
import { useLanding } from "./LandingProvider";
import { appLoginUrl, appSignupUrl, appRoadmapUrl } from "./urls";

/* язык → код страны флага в SVG-спрайте (#f-…): en→GB, uk→UA, cs→CZ */
const FLAG_CC: Record<Lang, string> = {
  en: "gb", ru: "ru", de: "de", fr: "fr", cs: "cz", pl: "pl",
  it: "it", lv: "lv", lt: "lt", uk: "ua", es: "es", ro: "ro",
};

function Flag({ lang }: { lang: Lang }) {
  return (
    <svg className="flag-svg" aria-hidden="true">
      <use href={`#f-${FLAG_CC[lang]}`} />
    </svg>
  );
}

export function Nav() {
  const { d, lang, setLang, toggleTheme } = useLanding();
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const wmRef = useRef<HTMLSpanElement>(null);
  const langWrapRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuWasOpen = useRef(false);

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

  /* бургер-панель: закрытие по клику вне, Escape и переходе на десктоп (≥880) */
  useEffect(() => {
    if (!menuOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 880) setMenuOpen(false);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  /* возврат фокуса на кнопку-бургер при закрытии панели (не на первом рендере),
     чтобы клавиатурные пользователи не теряли контекст */
  useEffect(() => {
    if (menuOpen) {
      menuWasOpen.current = true;
    } else if (menuWasOpen.current) {
      menuWasOpen.current = false;
      burgerRef.current?.focus();
    }
  }, [menuOpen]);

  return (
    <header className={`nav${menuOpen ? " menu-open" : ""}`} data-screen-label="Nav" ref={navRef}>
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
          <span className="logo-tms">TMS</span>
        </a>
        <nav className="nav-links">
          <a className="nav-link" href="#product">{d.nav.product}</a>
          <a className="nav-link" href="#pricing">{d.nav.pricing}</a>
          <a className="nav-link" href={appRoadmapUrl(lang)}>{d.nav.roadmap}</a>
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
              aria-expanded={langOpen}
              aria-controls="lang-menu"
              aria-label={d.nav.langAria}
              onClick={() => setLangOpen((v) => !v)}
            >
              <Flag lang={lang} />
              <span>{lang.toUpperCase()}</span> <span style={{ opacity: 0.55 }}>▾</span>
            </button>
            <div className="lang-menu" id="lang-menu" role="group" aria-label={d.nav.langAria}>
              {LOCALES.map((l) => (
                <button
                  key={l}
                  className="lang-opt"
                  type="button"
                  aria-pressed={lang === l}
                  onClick={() => { setLang(l); setLangOpen(false); }}
                >
                  <Flag lang={l} />
                  {LANG_NAMES[l]}
                </button>
              ))}
            </div>
          </div>
          <a className="nav-login" href={appLoginUrl(lang)}>{d.nav.login}</a>
          <a className="btn accent sm" href={appSignupUrl(lang)}>
            <span className="cta-full">{d.nav.ctaFull}</span>
            <span className="cta-short">{d.nav.ctaShort}</span>
            <span className="cta-tiny">{d.nav.ctaTiny}</span>
          </a>
          <button
            className="nav-burger"
            type="button"
            ref={burgerRef}
            aria-label={d.nav.menuAria}
            aria-expanded={menuOpen}
            aria-controls="nav-mobile-panel"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg><use href={menuOpen ? "#i-x" : "#i-menu"} /></svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="nav-mobile-panel" id="nav-mobile-panel">
          <nav className="nmp-links" aria-label={d.nav.menuAria}>
            <a href="#product" onClick={() => setMenuOpen(false)}>{d.nav.product}</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)}>{d.nav.pricing}</a>
            <a href={appRoadmapUrl(lang)} onClick={() => setMenuOpen(false)}>{d.nav.roadmap}</a>
            <a href={appLoginUrl(lang)} className="nmp-login" onClick={() => setMenuOpen(false)}>{d.nav.login}</a>
          </nav>
          <div className="nmp-langs" role="group" aria-label={d.nav.langAria}>
            {LOCALES.map((l) => (
              <button
                key={l}
                className="lang-opt"
                type="button"
                aria-pressed={lang === l}
                onClick={() => { setLang(l); setMenuOpen(false); }}
              >
                <Flag lang={l} />
                {LANG_NAMES[l]}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
