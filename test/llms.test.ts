import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { BANNED } from "./banned";
import { LOCALES, impressumPath, localePath, roadmapPath } from "../src/lib/landing-i18n";
import { legalUrl } from "../src/components/landing/urls";

const ORIGIN = "https://www.g-track.eu";
const txt = readFileSync(new URL("../public/llms.txt", import.meta.url), "utf8");

describe("llms.txt", () => {
  it("начинается с H1 «G-Track»", () => {
    expect(txt.startsWith("# G-Track\n")).toBe(true);
  });

  it("содержит главную каждой из 12 локалей", () => {
    expect(LOCALES).toHaveLength(12);
    for (const l of LOCALES) expect(txt).toContain(`${ORIGIN}${localePath(l)}`);
  });

  it("содержит факты: 20 машин, цены, Impressum, roadmap, контакт", () => {
    expect(impressumPath("en")).toBe("/impressum");
    expect(txt).toContain("20 trucks");
    expect(txt).toContain("€150");
    expect(txt).toContain(`${ORIGIN}${impressumPath("en")}`);
    expect(txt).toContain(`${ORIGIN}${roadmapPath("en")}`);
    expect(txt).toContain("sales@g-track.eu");
    for (const tab of ["privacy", "terms", "dpa"] as const) expect(txt).toContain(legalUrl(tab, "en"));
  });

  it("цены и лимиты тарифов", () => {
    for (const s of ["€150", "€140", "€125", "€450", "€420", "€375", "€900", "€840", "€750", "50 trucks", "200 trucks", "500 trucks"]) {
      expect(txt).toContain(s);
    }
  });

  it("не содержит запрещённого", () => {
    expect(txt).not.toMatch(/real[- ]time|LocTracker|\bAI\b|online/i);
    expect(txt).not.toMatch(/instantly|immediately/i);
    expect(txt).not.toMatch(BANNED);
  });

  it("каждый URL — известная страница сайта или юр-ссылка из кода", () => {
    const allowed = new Set<string>([
      ...LOCALES.map((l) => `${ORIGIN}${localePath(l)}`),
      `${ORIGIN}${roadmapPath("en")}`,
      `${ORIGIN}${impressumPath("en")}`,
      legalUrl("privacy", "en"),
      legalUrl("terms", "en"),
      legalUrl("dpa", "en"),
    ]);
    const urls = txt.match(/https?:\/\/[^\s)>\]]+/g) ?? [];
    expect(urls.length).toBeGreaterThan(12);
    for (const u of urls) expect(allowed.has(u), u).toBe(true);
  });
});
