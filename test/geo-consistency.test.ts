import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { LANDING_DICT, LOCALES } from "../src/lib/landing-i18n";
import type { Lang } from "../src/lib/landing-i18n";
import { COMPANY, SOCIAL, seatOf } from "../src/lib/company";
import { organizationNode } from "../src/lib/organization-jsonld";
import { DEMO_DICT } from "../src/lib/demo-page";
import { landingMetadata } from "../src/lib/landing-metadata";

/* ============================================================================
   Согласованность фактов для ИИ-ассистентов (GEO-аудит 18.10.2026, раздел 5 п. 2 и 6):
   что видит ответная машина в title/description и в JSON-LD, не должно спорить
   с продуктом. Ожидания вписаны литералами, а не пересчитаны кодом.
   ============================================================================ */

/* --- 1. В meta нет планирования маршрутов и карт: в продукте нет ни того, ни другого.
   Семьи основами по всем 12 языкам. Проверяются title и description главной
   (d.meta); заголовок страницы дорожной карты — «Mapa rozwoju», это «roadmap»,
   а не карта, поэтому d.roadmap.meta сюда не входит. */
/* Границы слова — через \p{L}: `\b` не видит кириллицу и «ă». */
const L0 = "(?<![\\p{L}])";
const L1 = "(?![\\p{L}])";
const ROUTE_OR_MAP = new RegExp(
  [
    `${L0}route`, "routing", `${L0}Routen`, "Tourenplan", // en, de
    `${L0}tras(?:a|ę|y|ie|ach|u|e)?${L1}`, // pl, cs: trasa, trasę, trasy, trasie, trasach, trasu
    "маршрут", "maršrut", "itinér", "itinerar", "percors", // ru/uk, lt/lv, fr, it
    `${L0}rutas?${L1}`, `${L0}rută`, `${L0}rute${L1}`, // es, ro
    `${L0}map(?:a|ę|y|ie|u|ě|as)?${L1}`, `${L0}mapp(?:a|e|as)${L1}`, // en, pl, cs, es, it
    `${L0}Karten?${L1}`, `${L0}cartes?${L1}`, // de, fr
    `${L0}hăr[tțţ]`, `${L0}hartă`, `${L0}harta${L1}`, // ro: hartă, hărți
    "žemėlap", `${L0}kart(?:e|es|i|ē)${L1}`, `${L0}карт[аиуі]${L1}`, // lt, lv, ru/uk
  ].join("|"),
  "iu",
);

/* До правки — литералы с origin/main (75490f9). */
const OLD_META_TITLE: Partial<Record<Lang, string>> = {
  pl: "G-Track — zarządzanie kierowcami i planowanie tras",
  de: "G-Track — EU-Compliance und Tourenplanung für Spediteure",
};

describe("meta: нет маршрутов и карт", () => {
  it.each(LOCALES)("%s: title и description без «маршрут / карта»", (l) => {
    const m = LANDING_DICT[l].meta;
    expect(m.title, `title ${l}`).not.toMatch(ROUTE_OR_MAP);
    expect(m.description, `description ${l}`).not.toMatch(ROUTE_OR_MAP);
  });

  it("сторож умеет краснеть: прежние строки pl и de, и проба на каждую семью, дают попадание", () => {
    expect(OLD_META_TITLE.pl).toMatch(ROUTE_OR_MAP);
    expect(OLD_META_TITLE.de).toMatch(ROUTE_OR_MAP);
    for (const probe of [
      "route planning", "Routenplanung", "planificación de rutas", "planification d’itinéraires",
      "pianificazione dei percorsi", "planificare de rute", "планирование маршрутов", "planování tras",
      "maršrutų planavimas", "maršrutu plānošana", "mapa tras", "Karte der Flotte", "hartă", "карта Европы",
      // падежные и множественные формы (вычитка PR #37)
      "mapę", "mapy", "na mapie", "trasę", "w trasie", "mapu", "trasu", "cartes", "mapas", "mappe", "Karten", "hărți", "kartes", "karti",
    ]) {
      expect(probe, probe).toMatch(ROUTE_OR_MAP);
    }
    // законное не краснит: «рейсы», «trips», «kursy», «reisų», «curse»
    for (const ok of ["рейсы и отпуска", "trips and leave", "kursy i urlopy", "kursami i urlopami", "reisų planavimas", "planificare de curse", "plánování jízd"]) {
      expect(ok, ok).not.toMatch(ROUTE_OR_MAP);
    }
  });

  /* вычитка PR #37: по-польски рейс = «kurs» («przejazd» — проезд, калька), а «trasa» обещает маршрут;
     в meta слово одно и то же, в рекламе тоже «kursy» */
  it("pl: title и description говорят «kurs», слова «przejazd*» в польских строках нет", () => {
    const m = LANDING_DICT.pl.meta;
    expect(m.title).toBe("G-Track — zarządzanie kierowcami, kursami i urlopami");
    expect(m.description).toContain("Dokumenty kierowców, kursy i urlopy,");
    expect(m.title).not.toBe(OLD_META_TITLE.pl);
    expect(JSON.stringify(LANDING_DICT.pl)).not.toMatch(/przejazd/i);
    expect(DEMO_DICT.pl.lead).toContain("kursy i urlopy");
    expect(DEMO_DICT.pl.lead).not.toMatch(/przejazd/i);
  });

  it("de: title без «Tourenplanung»", () => {
    expect(LANDING_DICT.de.meta.title).toBe("G-Track — EU-Compliance und Planung für Transportunternehmen");
    expect(LANDING_DICT.de.meta.title).not.toBe(OLD_META_TITLE.de);
  });

  it.each(LOCALES)("%s: description по-прежнему про рейсы и отпуска, документы и «от 20»", (l) => {
    expect(LANDING_DICT[l].meta.description).toMatch(/\b20\b/);
    expect(LANDING_DICT[l].meta.description.length).toBeGreaterThan(80);
  });
});

/* --- 2. Окна «скоро истечёт» в FAQ a1 = пороги приложения.
   Источник (gtrack-tms, origin/main 1c61f19, проверено 18.10.2026):
   - src/lib/documents/expiryStatus.ts:24–29 — паспорт 180, декларация 60, остальные 90;
   - прод: триггер compute_driver_document_status — те же 180 / 60 / 90 (статус «истекает» в приложении);
   - прод: send_doc_expiry_alerts (утренняя сводка) — паспорт 180, ВСЕ остальные, в том числе
     декларация, 90;
   - src/data/releaseNotes.ts:703 + locales/*.ts `releaseNotes.v161.declarationWindow` —
     «декларация становится «истекающей» за 60 дней».
   Поэтому «паспорт 180, остальные 90» относится к сводке, а 60 — только к метке в приложении
   у декларации. Названия декларации — из app-локалей (`documentTypes.declaration`, строка 187). */
const DECLARATION_STEM: Record<Lang, RegExp> = {
  en: /declaration/i,
  ru: /декларац/i,
  de: /Erklärung/,
  fr: /déclaration/i,
  cs: /deklarace/i,
  pl: /oświadczeni/i,
  it: /dichiarazion/i,
  lv: /deklarācij/i,
  lt: /deklaracij/i,
  uk: /декларац/i,
  es: /declaraci/i,
  ro: /declarați/i,
};

/* a1 en на origin/main до правки */
const OLD_A1_EN =
  "Every morning G-Track checks every driver’s documents. A passport shows up in the digest 180 days ahead, other documents 90 days ahead. The office gets an email, the document is marked as expiring in the app, and a driver who has connected the Telegram bot gets a reminder.";

function windowsOk(a1: string, stem: RegExp): boolean {
  const i180 = a1.search(/\b180\b/);
  const i90 = a1.search(/\b90\b/);
  const i60 = a1.search(/\b60\b/);
  const iDecl = a1.search(stem);
  // предложение про сводку («…180…, остальные — 90.») кончается раньше, чем встретится 60: иначе 60
  // относили бы к сводке, а у сводки декларация тоже 90
  const end = a1.indexOf(". ", i90);
  // порядок: паспорт 180 → остальные 90 → (метка в приложении) декларация 60; слово «декларация» рядом с 60
  return i180 >= 0 && i90 > i180 && end > 0 && i60 > end && iDecl > i90 && iDecl < i60 && i60 - iDecl < 40;
}

describe("FAQ a1: окна 180 / 90 / 60 как в приложении", () => {
  it.each(LOCALES)("%s: паспорт 180, остальные 90, у декларации 60", (l) => {
    const a1 = LANDING_DICT[l].faq.a1;
    expect(windowsOk(a1, DECLARATION_STEM[l]), a1).toBe(true);
    // других «N дней» в абзаце нет: цифры 180, 90 и 60 — единственные
    expect([...a1.matchAll(/\b\d{2,3}\b/g)].map((m) => m[0])).toEqual(["180", "90", "60"]);
  });

  it("сторож умеет краснеть: прежний a1 (en) без 60 не проходит; 60 до слова «declaration» тоже", () => {
    expect(windowsOk(OLD_A1_EN, DECLARATION_STEM.en)).toBe(false);
    expect(windowsOk(LANDING_DICT.en.faq.a1.replace("60 days ahead", "90 days ahead"), DECLARATION_STEM.en)).toBe(false);
    expect(windowsOk(LANDING_DICT.en.faq.a1, DECLARATION_STEM.en)).toBe(true);
  });

  /* вычитка PR #37: перенос скобки с 60 в предложение про сводку должен краснеть в КАЖДОЙ локали, не только в en */
  function moveWindowIntoDigest(a1: string): string {
    const paren = a1.match(/ ?\([^)]*\b60\b[^)]*\)/)![0];
    const without = a1.replace(paren, "");
    const at = without.search(/\b90\b/) + 2;
    return without.slice(0, at) + (paren.startsWith(" ") ? paren : ` ${paren}`) + without.slice(at);
  }

  it.each(LOCALES)("%s: сторож краснеет, если 60 перенесли в предложение про сводку", (l) => {
    const a1 = LANDING_DICT[l].faq.a1;
    const moved = moveWindowIntoDigest(a1);
    expect(moved).not.toBe(a1);
    expect(windowsOk(moved, DECLARATION_STEM[l]), moved).toBe(false);
  });

  it("сводка не переписана: «остальные 90» стоит до «60» и не относит 60 к сводке", () => {
    // en: «60 days ahead» живёт в скобках при слове «in the app», а не при слове «digest»
    const en = LANDING_DICT.en.faq.a1;
    expect(en.indexOf("digest")).toBeLessThan(en.indexOf("90"));
    expect(en.indexOf("in the app")).toBeLessThan(en.indexOf("60"));
  });
});

/* --- 3. JSON-LD Organization: юрлицо, IČO, адрес, sameAs */
const org = organizationNode({ description: "x", availableLanguage: ["en"] });

describe("JSON-LD Organization", () => {
  it("legalName и IČO — реквизиты из Impressum (ARES 11.10)", () => {
    expect(org.legalName).toBe("G-Track Software s.r.o.");
    expect(org.name).toBe("G-Track");
    expect(org.identifier).toEqual({ "@type": "PropertyValue", propertyID: "IČO", value: "14237890" });
    expect(COMPANY.ico).toBe("14237890");
  });

  it("адрес — как в Impressum (Dagmar Burešové 2923/1, Žižkov, 130 00 Praha 3), страна CZ", () => {
    expect(org.address).toEqual({
      "@type": "PostalAddress",
      streetAddress: "Dagmar Burešové 2923/1, Žižkov",
      addressLocality: "Praha 3",
      postalCode: "130 00",
      addressCountry: "CZ",
    });
    expect(`${org.address.streetAddress}, ${org.address.postalCode} ${org.address.addressLocality}`).toBe(seatOf(COMPANY));
  });

  /* Facebook — каноническая форма: profile.php?id=… отвечает 301 сюда (curl 18.10), id тот же,
     что в company.ts; Instagram — литерал из PROFILE.md 12.10 */
  it("sameAs — Facebook-страница (каноническая форма) и Instagram @gtrack.eu", () => {
    expect(org.sameAs).toEqual([
      "https://www.facebook.com/people/G-Track/61595506131584/",
      "https://www.instagram.com/gtrack.eu/",
    ]);
    expect(SOCIAL.facebook).toBe("https://www.facebook.com/profile.php?id=61595506131584");
    expect(org.sameAs[0]).toContain("/61595506131584/");
    expect(org.sameAs[1]).toBe(SOCIAL.instagram);
  });

  it("прежние поля на месте: @id, url, logo, email, contactPoint", () => {
    expect(org["@type"]).toBe("Organization");
    expect(org["@id"]).toBe("https://www.g-track.eu/#organization");
    expect(org.url).toBe("https://www.g-track.eu");
    expect(org.logo).toBe("https://www.g-track.eu/icon.svg");
    expect(org.email).toBe("sales@g-track.eu");
    expect(org.contactPoint).toMatchObject({ contactType: "sales", areaServed: "EU", availableLanguage: ["en"] });
  });

  it("чего нет намеренно: налоговых номеров (Г29), директора (Г40), оценок", () => {
    const keys = Object.keys(org);
    for (const k of ["taxID", "vatID", "founder", "employee", "aggregateRating", "review"]) expect(keys).not.toContain(k);
    expect(JSON.stringify(org)).not.toMatch(/Gradinar|jednatel|DIČ|CZ14237890/i);
  });

  it("JsonLd.tsx берёт Organization из organizationNode; FAQPage нет ни в разметке, ни в Faq.tsx", () => {
    const ld = readFileSync(new URL("../src/components/landing/JsonLd.tsx", import.meta.url), "utf8");
    const faq = readFileSync(new URL("../src/components/landing/Faq.tsx", import.meta.url), "utf8");
    expect(ld).toContain("organizationNode(");
    expect(ld).not.toContain('"Organization"');
    expect(ld).not.toMatch(/FAQPage/);
    expect(faq).not.toMatch(/["']@type["']:\s*["']FAQPage["']/);
  });
});

/* --- 4. Опечатки, найденные носителями при вычитке PR #37 */
describe("lv: опечатка «saved» → «savieno»", () => {
  it("a3 говорит «savieno cilvēkus…», а сырого «saved» в латышском словаре нет", () => {
    expect(LANDING_DICT.lv.faq.a3).toContain("dispečerpults savieno cilvēkus, mašīnas un termiņus vienā vietā");
    expect(JSON.stringify(LANDING_DICT.lv)).not.toMatch(/\bsaved\b/i);
    // сторож умеет краснеть
    expect("dispečerpults saved cilvēkus").toMatch(/\bsaved\b/i);
  });
});

/* --- 5. Подтверждение сайта в Seznam Webmaster (Г179, задание Codex №30, 22.10) */
describe("Seznam Webmaster: meta seznam-wmt только на корне /", () => {
  it("у en (корень /) — точный токен из кабинета; у остальных 11 локалей тега нет", () => {
    // литерал из seo/2026-10-22/SEZNAM_VERIFICATION.md (Codex), не из кода
    expect(landingMetadata("en").verification).toEqual({
      other: { "seznam-wmt": "kFALhPpFk3I8tf7cSiEHNBuHCpZrkyBs" },
    });
    for (const l of LOCALES.filter((x) => x !== "en")) {
      expect(landingMetadata(l).verification, l).toBeUndefined();
    }
  });
});
