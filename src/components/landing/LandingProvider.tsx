"use client";

/* ============================================================================
   LangProvider + ThemeProvider лендинга.
   Язык = сегмент URL: / (en) и /ru /de /cs … — приходит пропом `locale`
   из серверной страницы; переключение языка = навигация на другой путь
   (cookie `gt-landing-lang` запоминает выбор).
   Авто-редирект по языку браузера — один раз, только на корне (/),
   только если выбор ещё не сохранён.
   Тема: html[data-theme], дефолт dark; инлайн-скрипт в layout.tsx применяет
   сохранённую тему до hydration.
   ============================================================================ */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import {
  LANDING_DICT,
  LOCALES,
  localePath,
  type Lang,
  type LandingDict,
} from "@/lib/landing-i18n";

const LANG_COOKIE = "gt-landing-lang";

function readLangCookie(): string | null {
  const m = document.cookie.match(/(?:^|;\s*)gt-landing-lang=([a-z]{2})/);
  return m ? m[1] : null;
}

function writeLangCookie(lang: Lang) {
  document.cookie = `${LANG_COOKIE}=${lang};path=/;max-age=31536000;samesite=lax`;
}

interface LandingCtxValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  d: LandingDict;
  toggleTheme: () => void;
}

const LandingCtx = createContext<LandingCtxValue | null>(null);

export function LandingProvider({
  locale,
  children,
}: {
  locale: Lang;
  children: React.ReactNode;
}) {
  const router = useRouter();

  /* html lang + data-mock-lang (как applyMockLang в прототипе) */
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.setAttribute("data-mock-lang", locale);
  }, [locale]);

  /* первый визит на корень: авто-редирект по языку браузера */
  useEffect(() => {
    if (locale !== "en") {
      /* визит на языковой URL = явный выбор, запоминаем */
      writeLangCookie(locale);
      return;
    }
    if (readLangCookie()) return;
    const nav = (navigator.language || "").toLowerCase();
    const hit = LOCALES.find((l) => nav.startsWith(l));
    writeLangCookie(hit ?? "en");
    if (hit && hit !== "en") router.replace(localePath(hit));
  }, [locale, router]);

  const setLang = useCallback(
    (next: Lang) => {
      writeLangCookie(next);
      router.push(localePath(next), { scroll: false });
    },
    [router],
  );

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
    () => ({ lang: locale, setLang, d: LANDING_DICT[locale], toggleTheme }),
    [locale, setLang, toggleTheme],
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
