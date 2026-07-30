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
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import {
  APP_HOST,
  isAttributionTarget,
  MARKETING_PARAMS,
  withMarketingParams,
} from "@/lib/analytics";
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

/* Баннер cookie живёт вне React: он читает <html lang> один раз при инициализации
   и сам себя не перерисовывает, а переключение языка здесь — клиентская навигация
   без перезагрузки. Поэтому язык баннера переключаем явно через его публичный API. */
type CookieScriptWindow = Window & {
  CookieScript?: {
    instance?: {
      applyTranslationByCode?: (code: string) => void;
      getLanguagesKeys?: () => string[];
    };
  };
};

function applyCmpLang(lang: Lang) {
  const cmp = (window as CookieScriptWindow).CookieScript?.instance;
  if (typeof cmp?.applyTranslationByCode !== "function") return;
  const available = cmp.getLanguagesKeys?.() ?? [];
  if (available.length > 0 && !available.includes(lang)) return;
  try {
    cmp.applyTranslationByCode(lang);
  } catch {
    /* CMP не загрузился — язык применится при следующей загрузке страницы */
  }
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

  /* ------------------------------------------------------------------------
     Маркетинговые метки: снимаем из URL визита и дописываем к ссылкам на
     app.g-track.eu, иначе источник регистрации теряется на границе origin'ов.

     ХРАНИМ ТОЛЬКО В ПАМЯТИ, не в localStorage. По ePrivacy §5(3) любая запись
     на устройство, кроме strictly necessary, требует согласия, а gclid для
     атрибуции им не является: сохранив его до баннера, мы бы нарушили ровно то,
     ради чего ставим CMP. Плата за честность — first-touch живёт в пределах
     визита, а не между визитами; межвизитную атрибуцию всё равно считает GA4
     после согласия. Порядок «сначала снять, потом слушать клики» тоже важен:
     иначе клик по CTA в первую же секунду уйдёт без меток.
  ------------------------------------------------------------------------ */
  const attribution = useRef<Record<string, string>>({});

  useEffect(() => {
    try {
      const search = new URLSearchParams(window.location.search);
      const found: Record<string, string> = {};
      for (const key of MARKETING_PARAMS) {
        const value = search.get(key);
        if (value) found[key] = value;
      }
      /* first-touch: набор, снятый первым, не перетираем */
      if (
        Object.keys(found).length > 0 &&
        Object.keys(attribution.current).length === 0
      ) {
        attribution.current = found;
      }
    } catch {
      /* сломанный URL не должен ронять страницу */
    }

    /* Делегируем на document и матчим по хосту + белому списку путей, а не по
       data-атрибуту: ссылок на приложение десять в шести файлах, и атрибут
       в новой рано или поздно забудут. Capture-фаза — чтобы href был готов
       до навигации, включая Cmd+click и «открыть в новой вкладке». */
    function onDocumentClick(event: MouseEvent) {
      const params = attribution.current;
      if (Object.keys(params).length === 0) return;

      const target = event.target as Element | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      let parsed: URL;
      try {
        parsed = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (parsed.host !== APP_HOST) return;
      if (!isAttributionTarget(parsed.pathname)) return;

      anchor.href = withMarketingParams(anchor.href, params);
    }

    document.addEventListener("click", onDocumentClick, true);
    return () => document.removeEventListener("click", onDocumentClick, true);
  }, []);

  /* html lang + data-mock-lang (как applyMockLang в прототипе) */
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.setAttribute("data-mock-lang", locale);
    applyCmpLang(locale);
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
