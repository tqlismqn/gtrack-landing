"use client";

/* ============================================================================
   LangProvider + ThemeProvider лендинга (порт language/theme-блоков
   mock-i18n.js). Язык: SSR-дефолт en; на клиенте в useEffect —
   localStorage('gt-landing-lang') → navigator.language (ru* → ru) → en.
   Тема: html[data-theme], дефолт dark; инлайн-скрипт в layout.tsx применяет
   сохранённую тему до hydration.
   ============================================================================ */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LANDING_DICT, type Lang, type LandingDict } from "@/lib/landing-i18n";

interface LandingCtxValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  d: LandingDict;
  toggleTheme: () => void;
}

const LandingCtx = createContext<LandingCtxValue | null>(null);

export function LandingProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  /* инициализация языка — только на клиенте, без hydration mismatch */
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("gt-landing-lang");
    } catch {
      /* приватный режим и т.п. */
    }
    if (saved === "ru" || saved === "en") {
      /* осознанный паттерн: клиентская инициализация после hydration
         (SSR-дефолт en, без mismatch) — один доп. рендер на маунте */
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(saved);
      return;
    }
    const nav = (navigator.language || "").toLowerCase();
    setLangState(nav.startsWith("ru") ? "ru" : "en");
  }, []);

  /* html lang + data-mock-lang (как applyMockLang в прототипе) */
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.setAttribute("data-mock-lang", lang);
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem("gt-landing-lang", next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("gt-landing-theme", next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<LandingCtxValue>(
    () => ({ lang, setLang, d: LANDING_DICT[lang], toggleTheme }),
    [lang, setLang, toggleTheme],
  );

  return <LandingCtx.Provider value={value}>{children}</LandingCtx.Provider>;
}

export function useLanding(): LandingCtxValue {
  const ctx = useContext(LandingCtx);
  if (!ctx) {
    throw new Error("useLanding must be used within <LandingProvider>");
  }
  return ctx;
}
