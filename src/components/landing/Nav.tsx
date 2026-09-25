"use client";

/* ============================================================================
   NAV — порт хедера прототипа. Лого-морф G-Track ↔ G-Truck (fx.js):
   единственное место, где остался .wm-морф (hover); из hero-sub убран
   сознательно при порте. Тема/язык — из LandingProvider.
   Мобильный (ниже ступени l): ссылки/язык/«Войти» уходят в бургер-панель;
   CTA и тема остаются в баре.
   ============================================================================ */

import { useEffect, useRef, useState } from "react";
import { pickCta } from "@/lib/cta-variant";
import {
  LANG_NAMES,
  LOCALES,
  roadmapPath,
  type Lang,
} from "@/lib/landing-i18n";
import { useLanding } from "./LandingProvider";
import { appLoginUrl, appSignupUrl } from "./urls";

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
  /* homeAnchor: на главной это чистый "#pricing", на карте — путь главной
     той же локали плюс якорь. Иначе на /roadmap якоря шапки ведут в пустоту. */
  const { d, lang, setLang, toggleTheme, homeAnchor } = useLanding();
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

  /* бургер-панель: закрытие по клику вне, Escape и переходе на десктоп.
     Порог берётся из шкалы брейкпоинтов (globals.css): медиазапрос по ступени l
     выставляет --nav-desktop, здесь он только читается. Литерала ширины в JS нет —
     иначе CSS и JS разъезжаются и на полосе между двумя порогами пользователь
     остаётся без единого видимого элемента навигации. */
  useEffect(() => {
    if (!menuOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      const desktopNav = getComputedStyle(document.documentElement)
        .getPropertyValue("--nav-desktop")
        .trim();
      if (desktopNav === "1") setMenuOpen(false);
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
     чтобы клавиатурные пользователи не теряли контекст.

     Один из путей закрытия — поворот экрана через порог l: там бургера уже нет,
     его место заняла десктоп-навигация. focus() у скрытого элемента молча
     ничего не делает, и фокус улетает на <body> — замерено на 1024: панель
     закрывалась, а activeElement оказывался body. Поэтому если бургер не
     отрисован, фокус уходит на первую ссылку навигации, которая его заменила. */
  useEffect(() => {
    if (menuOpen) {
      menuWasOpen.current = true;
      return;
    }
    if (!menuWasOpen.current) return;
    menuWasOpen.current = false;
    const burger = burgerRef.current;
    if (burger && burger.getClientRects().length > 0) {
      burger.focus();
      return;
    }
    navRef.current?.querySelector<HTMLElement>(".nav-links .nav-link")?.focus();
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
          <a className="nav-link" href={homeAnchor("#product")}>{d.nav.product}</a>
          <a className="nav-link" href={homeAnchor("#pricing")}>{d.nav.pricing}</a>
          <a className="nav-link" href={roadmapPath(lang)}>{d.nav.roadmap}</a>
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
          {/* Надпись кнопки: ступень задаёт, сколько вариантов доступно,
              а pickCta берёт из них кратчайший (см. src/lib/cta-variant.ts).
              Все три пролёта считаются на сервере и рендерятся сразу —
              видимость переключает CSS (mobile.css), поэтому после гидрации
              вёрстка не прыгает и надпись не зависит от ширины окна в JS. */}
          <a className="btn accent sm" href={appSignupUrl(lang)}>
            <span className="cta-full">{pickCta(d.nav, "wide")}</span>
            <span className="cta-short">{pickCta(d.nav, "mid")}</span>
            <span className="cta-tiny">{pickCta(d.nav, "narrow")}</span>
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
            <a href={homeAnchor("#product")} onClick={() => setMenuOpen(false)}>{d.nav.product}</a>
            <a href={homeAnchor("#pricing")} onClick={() => setMenuOpen(false)}>{d.nav.pricing}</a>
            <a href={roadmapPath(lang)} onClick={() => setMenuOpen(false)}>{d.nav.roadmap}</a>
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
