import { describe, expect, it } from "vitest";
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
