import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { BANNED } from "./banned";
import { LOCALES, impressumPath, localePath, roadmapPath } from "../src/lib/landing-i18n";
import { legalUrl } from "../src/components/landing/urls";

const ORIGIN = "https://www.g-track.eu";
const txt = readFileSync(new URL("../public/llms.txt", import.meta.url), "utf8");
const foundUrls = new Set(txt.match(/https?:\/\/[^\s)>\]]+/g) ?? []);
const pricingSrc = readFileSync(new URL("../src/components/landing/Pricing.tsx", import.meta.url), "utf8");

// ожидаемые строки тарифов — из Pricing.tsx (источник истины, синхронизирован со Stripe); форма кода изменится — тест упадёт явно
function expectedTierLines(src: string): string[] {
  const rows = [...src.matchAll(/\b(mo|q|y): \{ starter: (\d+), fleet: (\d+), business: (\d+) \}/g)];
  const trucks = src.match(/const TRUCKS[^=]*= \{ starter: (\d+), fleet: (\d+), business: (\d+) \}/);
  if (rows.length !== 3 || !trucks) throw new Error("форма PRICING/TRUCKS в Pricing.tsx изменилась — поправить разбор в llms.test.ts");
  const by = Object.fromEntries(rows.map((m) => [m[1], [m[2], m[3], m[4]]]));
  return ["Starter", "Fleet", "Business"].map(
    (name, i) => `${name} €${by.mo[i]} monthly, €${by.q[i]} billed quarterly, €${by.y[i]} billed yearly, up to ${trucks[i + 1]} trucks`,
  );
}

describe("llms.txt", () => {
  it("начинается с H1 «G-Track»", () => {
    expect(txt.startsWith("# G-Track\n")).toBe(true);
  });

  it("содержит главную каждой из 12 локалей", () => {
    expect(LOCALES).toHaveLength(12);
    // точное совпадение: подстрока «https://www.g-track.eu/» есть в любом URL сайта и для en ничего не доказывает
    for (const l of LOCALES) expect(foundUrls.has(`${ORIGIN}${localePath(l)}`), l).toBe(true);
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

  it("цены и лимиты тарифов совпадают с Pricing.tsx", () => {
    const lines = expectedTierLines(pricingSrc);
    expect(lines).toHaveLength(3);
    for (const l of lines) expect(txt, l).toContain(l);
  });

  it("негативный контроль: изменённая цена в исходнике даёт другую ожидаемую строку", () => {
    const changed = expectedTierLines(pricingSrc.replace("starter: 150", "starter: 160"));
    expect(txt).not.toContain(changed[0]);
  });

  it("оговорка о ценах, пакет расширения и порог Business Plus", () => {
    expect(txt).toMatch(/customers who sign up now keep their price/);
    expect(txt).toContain("€225");
    expect(txt).toContain("up to 5 packs");
    expect(txt).toContain("Beyond 1000 trucks");
  });

  it("формат llmstxt.org: после первого H2 только пункты-ссылки https, до него нет заголовков", () => {
    const i = txt.search(/^## /m);
    expect(i).toBeGreaterThan(0);
    expect(txt.slice(0, i).slice(2)).not.toMatch(/^#+ /m);
    for (const line of txt.slice(i).split("\n")) {
      if (!line.trim() || line.startsWith("## ")) continue;
      expect(line, line).toMatch(/^- \[[^\]]+\]\(https:\/\/[^)]+\)(?::\s*.*)?$/);
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
    expect(foundUrls.size).toBeGreaterThan(12);
    for (const u of foundUrls) expect(allowed.has(u), u).toBe(true);
    // и обратно: все разрешённые на месте (удаление строки не проходит молча)
    for (const u of allowed) expect(foundUrls.has(u), u).toBe(true);
  });
});
