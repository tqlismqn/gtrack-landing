import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { BANNED } from "./banned";
import { LANDING_DICT, LOCALES, impressumPath, localePath, roadmapPath } from "../src/lib/landing-i18n";
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
  const fmt = (n: number) => n.toLocaleString("en-US");
  return ["Starter", "Fleet", "Business"].map(
    (name, i) =>
      `${name} €${by.mo[i]}/month billed monthly, €${by.q[i]}/month billed quarterly (€${fmt(Number(by.q[i]) * 3)} per quarter), €${by.y[i]}/month billed yearly (€${fmt(Number(by.y[i]) * 12)} per year), up to ${trucks[i + 1]} trucks`,
  );
}

// пакет и порог Business Plus — из Pricing.tsx; форма кода изменится — тест упадёт явно
function expectedExtraLines(src: string): string[] {
  const pack = src.match(/const PACK = \{ price: (\d+), trucks: (\d+), drivers: (\d+), trailers: (\d+), max: (\d+) \}/);
  const plus = src.match(/const PLUS_CAPS = \{ trucks: (\d+)/);
  if (!pack || !plus) throw new Error("форма PACK/PLUS_CAPS в Pricing.tsx изменилась — поправить разбор в llms.test.ts");
  return [
    `a pack adds +${pack[2]} trucks, +${pack[3]} drivers and +${pack[4]} trailers for €${pack[1]} per month, up to ${pack[5]} packs`,
    `Beyond ${plus[1]} trucks`,
  ];
}

describe("JSON-LD", () => {
  it("PLAN_OFFERS в JsonLd.tsx совпадает с PRICING.mo в Pricing.tsx", () => {
    const jsonLdSrc = readFileSync(new URL("../src/components/landing/JsonLd.tsx", import.meta.url), "utf8");
    const offers = [...jsonLdSrc.matchAll(/\{ name: "(Starter|Fleet|Business)", price: (\d+) \}/g)].map((m) => [m[1], m[2]]);
    const mo = pricingSrc.match(/\bmo: \{ starter: (\d+), fleet: (\d+), business: (\d+) \}/);
    if (offers.length !== 3 || !mo) throw new Error("форма PLAN_OFFERS/PRICING изменилась — поправить разбор в llms.test.ts");
    expect(offers).toEqual([["Starter", mo[1]], ["Fleet", mo[2]], ["Business", mo[3]]]);
  });
});

/* GEO-аудит 18.10.2026 (раздел 2 п. 9): на сайте есть A1 и бесплатный перенос из Excel, в файле их не было.
   Источники фактов: A1 — `gtrack-tms` src/config/documentTypes.ts:15 (`posted_worker_certificate_a1`,
   `expiryRequired: true`), в Telegram-напоминаниях и в утренней сводке (прод: get_due_driver_doc_reminders,
   send_doc_expiry_alerts); перенос — faq.a4b и pricing.noteC на сайте («ранним клиентам»). */
describe("llms.txt: A1 и бесплатный перенос из Excel", () => {
  const lineStarting = (t: string, start: string) => t.split("\n").filter((l) => l.startsWith(start));

  it("A1 назван отслеживаемым документом со сроком, в той же сводке и напоминаниях", () => {
    const [a1, ...rest] = lineStarting(txt, "- A1 certificate");
    expect(rest).toHaveLength(0);
    expect(a1).toBeDefined();
    expect(a1).toMatch(/driver document with an expiry date/);
    expect(a1).toMatch(/digest/);
    expect(a1).toMatch(/reminders/);
    // согласовано с сайтом: чип «A1» и подзаголовок про сроки A1 в блоке видео
    expect(LANDING_DICT.en.vid.chip2).toBe("A1");
    expect(LANDING_DICT.en.vid.sub).toMatch(/\bA1\b/);
  });

  it("перенос из Excel — бесплатно и только ранним клиентам, как в FAQ и в тарифах", () => {
    const [mig, ...rest] = lineStarting(txt, "- Migration:");
    expect(rest).toHaveLength(0);
    expect(mig).toMatch(/early customers/);
    expect(mig).toMatch(/Excel/);
    expect(mig).toMatch(/for free/);
    // оффер на сайте именно такой: снимут его там — тест напомнит снять строку здесь
    expect(LANDING_DICT.en.faq.a4b).toMatch(/early customers.*Excel.*for free/);
    expect(LANDING_DICT.en.pricing.noteC).toMatch(/Free data migration from Excel for early customers/);
    // «бесплатно для всех» файл не обещает
    expect(mig).not.toMatch(/\b(all|every) customers\b/i);
  });

  it("негативный контроль: без этих строк проверки краснеют", () => {
    const stripped = txt.split("\n").filter((l) => !l.startsWith("- A1 certificate") && !l.startsWith("- Migration:")).join("\n");
    expect(lineStarting(stripped, "- A1 certificate")).toHaveLength(0);
    expect(lineStarting(stripped, "- Migration:")).toHaveLength(0);
    expect(stripped).not.toMatch(/early customers we migrate/);
  });

  it("новые строки в разделе фактов — до первого H2, а не среди ссылок", () => {
    const h2 = txt.search(/^## /m);
    expect(txt.indexOf("- A1 certificate")).toBeLessThan(h2);
    expect(txt.indexOf("- Migration:")).toBeLessThan(h2);
  });
});

describe("llms.txt", () => {
  it("начинается с H1 «G-Track»", () => {
    expect(txt.startsWith("# G-Track\n")).toBe(true);
  });

  it("содержит главную каждой из 12 локалей", () => {
    expect(LOCALES).toHaveLength(12);
    // точное совпадение: подстрока «https://www.g-track.eu/» есть в любом URL сайта и для en ничего не доказывает
    for (const l of LOCALES) expect(foundUrls.has(`${ORIGIN}${localePath(l)}`), l).toBe(true);
  });

  it("содержит факты: 20 машин, Impressum, roadmap, контакт", () => {
    expect(impressumPath("en")).toBe("/impressum");
    expect(txt).toContain("20 trucks");
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
    // мутируем текущее значение, а не литерал: правка цен «везде разом» не должна краснить набор
    const m = pricingSrc.replace(/(mo: \{ starter: )(\d+)/, (_, p: string, n: string) => p + (Number(n) + 10));
    expect(m).not.toBe(pricingSrc);
    expect(txt).not.toContain(expectedTierLines(m)[0]);
    const m2 = pricingSrc.replace(/(const PACK = \{ price: )(\d+)/, (_, p: string, n: string) => p + (Number(n) + 10));
    expect(m2).not.toBe(pricingSrc);
    expect(txt).not.toContain(expectedExtraLines(m2)[0]);
  });

  it("пакет расширения и порог Business Plus совпадают с Pricing.tsx", () => {
    for (const l of expectedExtraLines(pricingSrc)) expect(txt, l).toContain(l);
    expect(txt).toContain(LANDING_DICT.en.pricing.packMax);
  });

  it("оговорка о фиксации цены привязана к официальному запуску, как на сайте", () => {
    expect(LANDING_DICT.en.pricing.foundingB).toContain("after the official launch");
    expect(txt).toMatch(/before the official launch/);
    expect(txt).toMatch(/new customers pay more after the launch/);
  });

  it("не называет сроки фиксации цены (12/24 месяца) — до юр-батча по §5.5 Условий", () => {
    expect(txt).not.toMatch(/\b(12|24) months\b/);
  });

  /* Пункта о стартовых ценах в Условиях нет, §5.5 говорит обратное («цены меняем с уведомлением
     за 30 дней»): строка цен не отсылает к Условиям. Снять, когда юр-батч (ворота 5) впишет пункт. */
  it("строка цен не отсылает к Условиям — до юр-батча по §5.5", () => {
    const priceLine = txt.split("\n").find((l) => l.startsWith("- Prices ("));
    expect(priceLine).toBeDefined();
    expect(priceLine).not.toMatch(/Terms of service/i);
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
