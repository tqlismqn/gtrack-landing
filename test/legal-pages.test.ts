import { describe, expect, it } from "vitest";
import { COMPANY } from "../src/lib/company";
import { IMPRESSUM } from "../src/lib/legal-pages";
import { LANDING_DICT, LOCALES, impressumPath } from "../src/lib/landing-i18n";
import { fill } from "../src/lib/showcase-data";
import sitemap from "../src/app/sitemap";

/* Impressum («Údaje o provozovateli»): реквизиты — константы по ARES 11.10,
   тексты — 12 словарей. Ожидания вписаны литералами из выписки ARES, а не
   пересчитаны тем же способом, что код. */
describe("Impressum", () => {
  it("реквизиты = ARES 11.10", () => {
    expect(COMPANY.ico).toBe("14237890");
    expect(COMPANY.insert).toBe("362529");
    expect(COMPANY.section).toBe("C");
    expect(COMPANY.director).toBe("Thomas Gradinar");
  });

  it("пути", () => {
    expect(impressumPath("en")).toBe("/impressum");
    expect(impressumPath("cs")).toBe("/cs/impressum");
  });

  it("cs: реестр в именительном падеже", () =>
    expect(fill(IMPRESSUM.cs.labels.registerValue, COMPANY)).toBe(
      "Městský soud v Praze, oddíl C, vložka 362529",
    ));

  it.each(LOCALES)("%s: словарь непуст, подпись подвала есть", (l) => {
    const p = IMPRESSUM[l];
    for (const v of [p.title, p.lead, ...Object.values(p.labels)]) {
      expect(v.trim().length).toBeGreaterThan(1);
    }
    expect(LANDING_DICT[l].footer.impressum.trim().length).toBeGreaterThan(3);
  });

  it.each(LOCALES)("%s: без запрещённого", (l) =>
    expect(JSON.stringify(IMPRESSUM[l])).not.toMatch(
      /Lovable|Cloudflare|Vercel|Mesartim|ODR|TMG|DIČ:\s*(nemá|—|-)/,
    ));

  it("sitemap: impressum ×12", async () => {
    const urls = (await sitemap()).map((e) => e.url);
    expect(urls.filter((u) => u.endsWith("/impressum"))).toHaveLength(12);
  });
});
