import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { LANDING_DICT, LOCALES } from "../src/lib/landing-i18n";
import type { Lang } from "../src/lib/landing-i18n";
import { COMPANY, SOCIAL, seatOf } from "../src/lib/company";
import { organizationNode } from "../src/lib/organization-jsonld";

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
    `${L0}tras${L1}`, `${L0}trasa`, `${L0}trasy`, // pl, cs
    "маршрут", "maršrut", "itinér", "itinerar", "percors", // ru/uk, lt/lv, fr, it
    `${L0}rutas?${L1}`, `${L0}rută`, `${L0}rute${L1}`, // es, ro
    `${L0}map${L1}`, `${L0}mapa${L1}`, `${L0}mapě`, `${L0}mappa${L1}`, `${L0}Karte${L1}`, `${L0}carte${L1}`,
    `${L0}hartă`, `${L0}harta${L1}`, "žemėlap", `${L0}kartē`, `${L0}карт[аиуі]${L1}`,
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
    ]) {
      expect(probe, probe).toMatch(ROUTE_OR_MAP);
    }
    // законное не краснит: «рейсы», «trips», «przejazdy», «reisų», «curse»
    for (const ok of ["рейсы и отпуска", "trips and leave", "przejazdy i urlopy", "reisų planavimas", "planificare de curse", "plánování jízd"]) {
      expect(ok, ok).not.toMatch(ROUTE_OR_MAP);
    }
  });

  it("pl: title говорит словами description — «przejazdy i urlopy»", () => {
    const m = LANDING_DICT.pl.meta;
    expect(m.title).toBe("G-Track — zarządzanie kierowcami, przejazdy i urlopy");
    expect(m.description.toLowerCase()).toContain("przejazdy i urlopy");
    expect(m.title).not.toBe(OLD_META_TITLE.pl);
  });

  it("de: title без «Tourenplanung»", () => {
    expect(LANDING_DICT.de.meta.title).toBe("G-Track — EU-Compliance und Planung für Spediteure");
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
  pl: /oświadczenie/i,
  it: /dichiarazione/i,
  lv: /deklarācij/i,
  lt: /deklaracij/i,
  uk: /декларац/i,
  es: /declaración/i,
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
  // порядок: паспорт 180 → остальные 90 → (метка в приложении) декларация 60; слово «декларация» рядом с 60
  return i180 >= 0 && i90 > i180 && i60 > i90 && iDecl > i90 && iDecl < i60 && i60 - iDecl < 40;
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

  it("a1 изменён во всех 12 локалях (в каждой появилась метка 60)", () => {
    for (const l of LOCALES) expect(LANDING_DICT[l].faq.a1, l).toMatch(/\b60\b/);
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

  it("sameAs — Facebook-страница и Instagram @gtrack.eu (литералы из PROFILE.md 12.10)", () => {
    expect(org.sameAs).toEqual([
      "https://www.facebook.com/profile.php?id=61595506131584",
      "https://www.instagram.com/gtrack.eu/",
    ]);
    expect(org.sameAs).toEqual([SOCIAL.facebook, SOCIAL.instagram]);
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
    expect(faq).toContain("JSON-LD FAQPage сознательно НЕ добавляется");
  });
});
