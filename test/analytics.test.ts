import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { MARKETING_PARAMS, withMarketingParams, isAttributionTarget,
         isDemoPath, shouldAttribute, keepQuery } from "../src/lib/analytics";
import { LOCALES, demoPath } from "../src/lib/landing-i18n";
import nextConfig from "../next.config";

const WWW = "www.g-track.eu";
describe("MARKETING_PARAMS", () => {
  it("несёт gbraid и wbraid рядом с прежними метками", () => {
    for (const k of ["utm_source","utm_medium","utm_campaign","utm_term","utm_content","utm_id",
                     "gclid","gclsrc","gbraid","wbraid","fbclid","msclkid"])
      expect(MARKETING_PARAMS).toContain(k);
    expect(MARKETING_PARAMS).toHaveLength(12);
  });
});
describe("isDemoPath / demoPath", () => {
  it.each(["/demo","/demo/","/cs/demo","/de/demo/","/ru/demo","/cs/demo/x"])("%s — да", (p) =>
    expect(isDemoPath(p, LOCALES)).toBe(true));
  it.each(["/xx/demo","/demo-x","/cs","/roadmap","/cs/roadmap","/en/demo","/"])("%s — нет", (p) =>
    expect(isDemoPath(p, LOCALES)).toBe(false));
  it("demoPath", () => { expect(demoPath("en")).toBe("/demo"); expect(demoPath("cs")).toBe("/cs/demo"); });
});
describe("shouldAttribute", () => {
  const u = (s: string) => new URL(s);
  it("app: только белый список", () => {
    expect(shouldAttribute(u("https://app.g-track.eu/register?lng=cs"), WWW, LOCALES)).toBe(true);
    expect(shouldAttribute(u("https://app.g-track.eu/legal?tab=privacy"), WWW, LOCALES)).toBe(false);
  });
  it("тот же хост: только demo", () => {
    expect(shouldAttribute(u("https://www.g-track.eu/cs/demo#form"), WWW, LOCALES)).toBe(true);
    expect(shouldAttribute(u("https://www.g-track.eu/cs/roadmap"), WWW, LOCALES)).toBe(false);
  });
  it("чужой хост и поддомен — нет", () => {
    expect(shouldAttribute(u("https://example.com/demo"), WWW, LOCALES)).toBe(false);
    expect(shouldAttribute(u("https://x.www.g-track.eu/demo"), WWW, LOCALES)).toBe(false);
  });
});
describe("withMarketingParams — сценарий спеки", () => {
  it("/cs?utm_source=x → клик → /cs/demo?utm_source=x", () =>
    expect(withMarketingParams("https://www.g-track.eu/cs/demo", { utm_source: "x" }))
      .toBe("https://www.g-track.eu/cs/demo?utm_source=x"));
  it("не перетирает свою метку, хранит lng и хеш", () =>
    expect(withMarketingParams("https://www.g-track.eu/cs/demo?utm_source=driver_share#form",
      { utm_source: "x", gclid: "G1" }))
      .toBe("https://www.g-track.eu/cs/demo?utm_source=driver_share&gclid=G1#form"));
  it("пустые значения не пишет", () =>
    expect(withMarketingParams("/cs/demo", { utm_source: "" })).toBe("/cs/demo"));
});
describe("keepQuery", () => {
  it("склеивает путь, query и хеш как есть", () =>
    expect(keepQuery("/cs", "?gclid=G1&utm_source=x", "#faq")).toBe("/cs?gclid=G1&utm_source=x#faq"));
  it("пустые хвосты", () => expect(keepQuery("/cs", "", "")).toBe("/cs"));
});
it("редиректы /en: два правила, без петли", async () => {
  const r = await nextConfig.redirects!();
  expect(r).toContainEqual({ source: "/en", destination: "/", permanent: false });
  expect(r).toContainEqual({ source: "/en/:path+", destination: "/:path+", permanent: false });
  expect(r.some((x) => x.source === "/en/:path*")).toBe(false);
});
it("isAttributionTarget не сломан", () => {
  expect(isAttributionTarget("/login/")).toBe(true);
  expect(isAttributionTarget("/registerx")).toBe(false);
});

/* ---- сторож связки в LandingProvider: Review Focus 1 и «метки только в памяти» ----------------
   Без DOM провайдер не смонтировать, поэтому сверяем исходник (как llms.test.ts). Проверки — функции
   от текста: негативный контроль мутирует строку, а не файл. Поведение в браузере — attr.cjs в vault. */
const SRC = new URL("../src/", import.meta.url);
const PROVIDER = readFileSync(new URL("components/landing/LandingProvider.tsx", SRC), "utf8");
const SRC_FILES = Object.fromEntries(
  readdirSync(SRC, { recursive: true, encoding: "utf8" })
    .filter((f) => /\.tsx?$/.test(f))
    .map((f) => [f, readFileSync(new URL(f, SRC), "utf8")]),
);
/* комментарии вон: «не в localStorage» в шапке провайдера — не нарушение */
const code = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
const flat = (s: string) => code(s).replace(/\s+/g, " ");

function providerProblems(src: string): string[] {
  const s = flat(src);
  const out: string[] = [];
  if (!/router\.replace\( ?keepQuery\( ?pathFor\(hit\), ?window\.location\.search, ?window\.location\.hash ?\)/.test(s))
    out.push("авто-редирект по языку теряет query или хеш");
  if (!/router\.push\( ?keepQuery\( ?pathFor\(next\), ?window\.location\.search, ?"" ?\)/.test(s))
    out.push("смена языка теряет метки");
  const click = s.slice(Math.max(0, s.indexOf("function onDocumentClick")));
  const guard = click.indexOf("if (!shouldAttribute(parsed, window.location.host, LOCALES)) return;");
  const write = click.indexOf("withMarketingParams(");
  if (guard < 0 || write < 0 || guard > write) out.push("клик дописывает метки мимо shouldAttribute");
  if (!s.includes('document.addEventListener("click", onDocumentClick, true)')) out.push("нет слушателя клика в capture-фазе");
  return out;
}

/* localStorage — только ключи интерфейса (тема, период цен), cookie — только язык (LANG_COOKIE);
   метки атрибуции не пишутся никуда (ePrivacy §5(3), шапка LandingProvider) */
const STORAGE_KEYS = ["gt-landing-theme", "gt-landing-period"];
function storageProblems(files: Record<string, string>): string[] {
  const out: string[] = [];
  for (const [f, raw] of Object.entries(files)) {
    const s = code(raw);
    if (/sessionStorage|indexedDB/.test(s)) out.push(`${f}: sessionStorage / indexedDB`);
    for (const m of s.matchAll(/localStorage\b(.{0,40})/g)) {
      const k = /^\.(?:getItem|setItem|removeItem)\(\s*(["'])([^"']+)\1/.exec(m[1]);
      if (!k || !STORAGE_KEYS.includes(k[2])) out.push(`${f}: localStorage${m[1]}`);
    }
    for (const m of s.matchAll(/document\.cookie\s*=(?!=)([^;\n]*)/g)) {
      if (!m[1].includes("${LANG_COOKIE}=")) out.push(`${f}: document.cookie =${m[1]}`);
    }
  }
  return out;
}

describe("LandingProvider: связка по исходнику", () => {
  it("редирект и смена языка несут метки, клик — через shouldAttribute", () => {
    expect(providerProblems(PROVIDER)).toEqual([]);
    expect(PROVIDER).toContain('const LANG_COOKIE = "gt-landing-lang";');
  });

  it("хранилище в src/ — только ключи интерфейса, метки не пишутся", () => {
    expect(Object.keys(SRC_FILES).length).toBeGreaterThan(20);
    expect(storageProblems(SRC_FILES)).toEqual([]);
  });

  it("негативный контроль: сторожа краснеют на мутациях", () => {
    expect(providerProblems(PROVIDER.replace(/keepQuery\(\s*pathFor\(hit\),[^)]*\)/, "pathFor(hit)"))).toHaveLength(1);
    expect(providerProblems(PROVIDER.replace("if (!shouldAttribute(parsed, window.location.host, LOCALES)) return;", ""))).toHaveLength(1);
    const mut = (line: string) => storageProblems({ "lib/analytics.ts": `${SRC_FILES["lib/analytics.ts"]}\n${line}\n` });
    expect(SRC_FILES["lib/analytics.ts"]).toBeDefined();
    expect(mut('sessionStorage.setItem("gt-attr", "x");')).toHaveLength(1);
    expect(mut('localStorage.setItem("gt-attr", JSON.stringify(params));')).toHaveLength(1);
    expect(mut("const key = 'gt-landing-theme'; localStorage.getItem(key);")).toHaveLength(1);
    expect(mut('document.cookie = `gclid=${value}`;')).toHaveLength(1);
  });
});
