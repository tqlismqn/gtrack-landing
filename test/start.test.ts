/* ============================================================================
   Рекламная страница /{lang}/start: словарь ×12, мягкая строка про Excel, noindex и
   отсутствие в sitemap / llms.txt, событие cta_register_click, ссылка «Зарегистрироваться»
   (href, lng, метки рекламы), разметка страницы en и ru.
   Поведение клика в живом браузере (dataLayer, метки в href) — Playwright, шаги в отчёте PR.
   ============================================================================ */

import { describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { START_DICT } from "../src/lib/start-page";
import { startPath } from "../src/lib/start-page/path";
import { startMetadata } from "../src/lib/start-page/metadata";
import {
  REGISTER_CLICK_EVENT,
  registerClickEvent,
  trackRegisterClick,
} from "../src/lib/start-page/track";
import { LANDING_DICT, LOCALES } from "../src/lib/landing-i18n";
import { SITE_ORIGIN } from "../src/lib/landing-metadata";
import { decorateHref, linkKind } from "../src/lib/analytics";
import sitemap from "../src/app/sitemap";
import { BANNED, aiPattern } from "./banned";

/* провайдер без роутера: страница рендерится в node, useRouter из next/navigation вне приложения бросает */
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: () => {}, replace: () => {} }) }));

const ROOT = join(__dirname, "..");
const KEYS = ["metaTitle", "metaDescription", "h1", "lead", "cta", "excel", "demoLink"] as const;

describe("словарь /start", () => {
  it("ключи полны и непусты во всех 12 локалях", () => {
    expect(Object.keys(START_DICT).sort()).toEqual([...LOCALES].sort());
    for (const l of LOCALES) {
      expect(Object.keys(START_DICT[l]).sort(), l).toEqual([...KEYS].sort());
      for (const k of KEYS) expect(START_DICT[l][k].trim().length, `${l}.${k}`).toBeGreaterThan(0);
    }
  });

  it("мастер ru и en — слова финальной карточки роликов дословно", () => {
    expect(START_DICT.ru.h1).toBe("Регистрируйтесь и работайте");
    expect(START_DICT.ru.cta).toBe("Зарегистрироваться");
    expect(START_DICT.ru.excel).toBe("Работали в Excel? Поможем начать.");
    expect(LANDING_DICT.ru.nav.ctaShort).toBe("30 дней бесплатно");
    expect(START_DICT.en.h1).toBe("Sign up and get to work");
    expect(START_DICT.en.cta).toBe("Sign up");
    expect(START_DICT.en.excel).toBe("Worked in Excel? We’ll help you get started.");
  });

  it("запреты копирайта (banned.ts) и «ИИ» не нарушены ни в одной строке", () => {
    for (const l of LOCALES) {
      for (const k of KEYS) {
        const s = START_DICT[l][k];
        expect(BANNED.test(s), `${l}.${k}: ${s}`).toBe(false);
        expect(aiPattern(l).test(s), `${l}.${k}: ${s}`).toBe(false);
      }
    }
  });

  /* юридическое ограничение: на странице нет обещания принять или перенести файлы клиента.
     Семья слов — «перенос / импорт / загрузка» всех локалей; «Excel» в строке обязан быть. */
  const MIGRATE = /перен|импорт|загруз|завант|migr|import|transf|upload|übertrag|überführ|přenes|převe|nahr|przen|przeni|trasfer|trasfe|pārnes|perkel|traspas|importa/i;
  it("строка про Excel — мягкая: «поможем начать», без переноса и импорта", () => {
    for (const l of LOCALES) {
      const s = START_DICT[l].excel;
      expect(/Excel/.test(s), `${l}: ${s}`).toBe(true);
      expect(MIGRATE.test(s), `${l}: ${s}`).toBe(false);
    }
  });

  it("проба краснеет: оффер переноса с главной ловится семьёй слов", () => {
    expect(MIGRATE.test(LANDING_DICT.ru.final.migrate)).toBe(true);
    expect(MIGRATE.test(LANDING_DICT.en.final.migrate)).toBe(true);
    expect(MIGRATE.test("Send us your file, we will import it")).toBe(true);
  });

  it("«30 дней бесплатно» и «Без карты» — уже сказанное сайтом, не новое обещание", () => {
    for (const l of LOCALES) {
      const d = LANDING_DICT[l];
      expect(d.nav.ctaShort.length, l).toBeGreaterThan(0);
      expect(d.hero.micro1.length, l).toBeGreaterThan(0);
      expect(d.hero.micro2.length, l).toBeGreaterThan(0);
    }
    expect(LANDING_DICT.en.hero.micro1).toBe("No credit card");
    expect(LANDING_DICT.ru.hero.micro1).toBe("Без карты");
  });
});

describe("индексация /start", () => {
  it("startPath: en на корне, остальные под префиксом", () => {
    expect(startPath("en")).toBe("/start");
    expect(startPath("ru")).toBe("/ru/start");
    expect(startPath("cs")).toBe("/cs/start");
  });

  it("metadata: noindex, follow, canonical на себя, без hreflang", () => {
    for (const l of LOCALES) {
      const m = startMetadata(l);
      expect(m.robots, l).toMatchObject({ index: false, follow: true });
      expect(m.alternates?.canonical, l).toBe(`${SITE_ORIGIN}${startPath(l)}`);
      expect(m.alternates?.languages, l).toBeUndefined();
      expect(m.title, l).toBe(START_DICT[l].metaTitle);
    }
  });

  it("нет в sitemap и в llms.txt", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls.some((u) => /\/start(?:$|[?#])/.test(u))).toBe(false);
    const txt = readFileSync(join(ROOT, "public", "llms.txt"), "utf8");
    expect(txt.includes("/start")).toBe(false);
  });
});

describe("событие cta_register_click", () => {
  it("состав: event, cta_location, page_lang — и больше ничего", () => {
    expect(REGISTER_CLICK_EVENT).toBe("cta_register_click");
    expect(registerClickEvent("start_hero", "ru")).toEqual({
      event: "cta_register_click",
      cta_location: "start_hero",
      page_lang: "ru",
    });
    expect(Object.keys(registerClickEvent("start_footer", "pl")).sort()).toEqual(["cta_location", "event", "page_lang"]);
  });

  it("trackRegisterClick пушит в dataLayer, создаёт его при отсутствии и не бросает", () => {
    const w: { dataLayer?: unknown[] } = {};
    trackRegisterClick(w, "start_nav", "de");
    trackRegisterClick(w, "start_footer", "de");
    expect(w.dataLayer).toEqual([
      { event: "cta_register_click", cta_location: "start_nav", page_lang: "de" },
      { event: "cta_register_click", cta_location: "start_footer", page_lang: "de" },
    ]);
    const frozen = { dataLayer: Object.freeze([]) as unknown as unknown[] };
    expect(() => trackRegisterClick(frozen, "start_hero", "en")).not.toThrow();
  });
});

/* компонент CtaLink без DOM: useLanding подменён, функция компонента вызывается напрямую и
   отдаёт <a>; onClick вызывается с поддельным событием и поддельным window */
const stub = vi.hoisted(() => ({ on: false }));
vi.mock("../src/components/landing/LandingProvider", async (orig) => {
  const real = await orig<typeof import("../src/components/landing/LandingProvider")>();
  return { ...real, useLanding: () => (stub.on ? ({ lang: "pl" } as ReturnType<typeof real.useLanding>) : real.useLanding()) };
});

describe("CtaLink", () => {
  it("клик пушит событие, не отменяет переход и не трогает href", async () => {
    const { CtaLink } = await import("../src/components/landing/CtaLink");
    stub.on = true;
    const el = CtaLink({
      href: "https://app.g-track.eu/register?lng=pl",
      location: "start_hero",
      className: "btn accent",
      children: "x",
    }) as unknown as { props: { href: string; onClick: (e: unknown) => void } };
    stub.on = false;
    expect(el.props.href).toBe("https://app.g-track.eu/register?lng=pl");
    const w = { dataLayer: [] as unknown[] };
    vi.stubGlobal("window", w);
    const preventDefault = vi.fn();
    el.props.onClick({ preventDefault });
    vi.unstubAllGlobals();
    expect(preventDefault).not.toHaveBeenCalled();
    expect(w.dataLayer).toEqual([{ event: "cta_register_click", cta_location: "start_hero", page_lang: "pl" }]);
  });

  it("исходник: нет preventDefault, нет задержки и навигации в обработчике", () => {
    const src = readFileSync(join(ROOT, "src/components/landing/CtaLink.tsx"), "utf8")
      .replace(/\/\*[\s\S]*?\*\//g, "");
    expect(src).not.toMatch(/preventDefault|setTimeout|location\.(href|assign)|router\./);
    expect(src).toContain("trackRegisterClick(window, location, lang)");
  });
});

describe("страница /start в разметке", () => {
  async function render(locale: "en" | "ru" | "pl") {
    const { StartPage } = await import("../src/components/landing/StartPage");
    return renderToStaticMarkup(createElement(StartPage, { locale }));
  }
  const signups = (html: string) => [...html.matchAll(/<a [^>]*href="(https:\/\/app\.g-track\.eu\/register[^"]*)"/g)].map((m) => m[1]);

  it("en: один h1, три кнопки регистрации (шапка, первый экран, низ) с lng=en, ссылка на /demo", async () => {
    const html = await render("en");
    expect(html.match(/<h1[ >]/g)).toHaveLength(1);
    expect(html).toContain("Sign up and get to work");
    expect(signups(html)).toEqual(Array(3).fill("https://app.g-track.eu/register?lng=en"));
    expect(html).toContain('data-cta-location="start_hero"');
    expect(html).toContain('data-cta-location="start_footer"');
    expect(html).toContain('href="/demo"');
    expect(html).toContain("No credit card");
    expect(html).toContain("30 days free");
  });

  it("ru и pl: lng в href и тексты своей локали", async () => {
    const ru = await render("ru");
    expect(signups(ru)).toEqual(Array(3).fill("https://app.g-track.eu/register?lng=ru"));
    expect(ru).toContain("Регистрируйтесь и работайте");
    expect(ru).toContain(">Зарегистрироваться<");
    expect(ru).toContain("Работали в Excel? Поможем начать.");
    expect(ru).toContain('href="/ru/demo"');
    const pl = await render("pl");
    expect(signups(pl)).toEqual(Array(3).fill("https://app.g-track.eu/register?lng=pl"));
    expect(pl).toContain("Zarejestruj się i pracuj");
    expect(pl).toContain('href="/pl/demo"');
  });
});

describe("метки рекламы доходят до регистрации", () => {
  const AD = { utm_source: "fb", utm_campaign: "x", fbclid: "abc" };
  const signup = "https://app.g-track.eu/register?lng=ru";
  it.each(["/start", "/ru/start", "/pl/start"])("со страницы %s: ссылка на регистрацию — app, метки и lng сохраняются", (p) => {
    const kind = linkKind(new URL(signup), new URL(`https://www.g-track.eu${p}`), LOCALES);
    expect(kind).toBe("app");
    const out = new URL(decorateHref(signup, AD, p, "app"));
    expect(out.searchParams.get("lng")).toBe("ru");
    expect(out.searchParams.get("utm_source")).toBe("fb");
    expect(out.searchParams.get("utm_campaign")).toBe("x");
    expect(out.searchParams.get("fbclid")).toBe("abc");
    expect(out.searchParams.get("gt_entry")).toBe(p);
  });

  it("ссылка со /start на /demo — internal, метки едут и туда; на саму /start — нет", () => {
    const page = new URL("https://www.g-track.eu/ru/start");
    expect(linkKind(new URL("https://www.g-track.eu/ru/demo"), page, LOCALES)).toBe("internal");
    expect(linkKind(new URL("https://www.g-track.eu/ru/start#top"), page, LOCALES)).toBeNull();
  });
});
