import { describe, expect, it } from "vitest";
import { COMPANY, MESARTIM, SOCIAL } from "../src/lib/company";
import {
  IMPRESSUM,
  SOCIAL_LINK_KEYS,
  SOCIAL_NOTICE,
  SOCIAL_NOTICE_EFFECTIVE,
  socialNoticeEffective,
  splitLinks,
} from "../src/lib/legal-pages";
import {
  LANDING_DICT,
  LOCALES,
  impressumPath,
  socialPrivacyPath,
} from "../src/lib/landing-i18n";
import { socialPrivacyMetadata } from "../src/lib/landing-metadata";
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

/* Уведомление о соцсетях (Task 4b, Г25): страница «G-Track» на Facebook и
   @gtrack.eu ведёт G-Track; Mesartim назван как плательщик рекламы и владелец
   пикселя Meta. Ссылки в тексте — разметка [подпись](ключ): адреса живут в
   константах, словарь несёт только подписи. */
describe("Уведомление о соцсетях", () => {
  it("пути", () => {
    expect(socialPrivacyPath("en")).toBe("/social-media-privacy");
    expect(socialPrivacyPath("de")).toBe("/de/social-media-privacy");
  });

  it("Mesartim и профили = факты 11.10", () => {
    expect(MESARTIM.name).toBe("Mesartim Plus s.r.o.");
    expect(MESARTIM.ico).toBe("09215191");
    expect(SOCIAL.facebook).toBe(
      "https://www.facebook.com/profile.php?id=61595506131584",
    );
    expect(SOCIAL.instagram).toBe("https://www.instagram.com/gtrack.eu/");
    expect(SOCIAL.instagramHandle).toBe("@gtrack.eu");
  });

  it.each(LOCALES)("%s: ≥ 5 секций, у каждой заголовок и абзацы", (l) => {
    const n = SOCIAL_NOTICE[l];
    for (const v of [n.title, n.metaDescription, n.effective, n.prevails]) {
      expect(v.trim().length).toBeGreaterThan(3);
    }
    expect(n.sections.length).toBeGreaterThanOrEqual(5);
    for (const s of n.sections) {
      expect(s.h.trim().length).toBeGreaterThan(3);
      expect(s.p.length).toBeGreaterThan(0);
      for (const para of s.p) expect(para.trim().length).toBeGreaterThan(10);
    }
    expect(LANDING_DICT[l].footer.social.trim().length).toBeGreaterThan(3);
  });

  it.each(LOCALES)("%s: Mesartim по IČO, без запрещённого", (l) => {
    const s = JSON.stringify(SOCIAL_NOTICE[l]);
    expect(s).toContain("09215191");
    expect(s).not.toMatch(/Lovable|Cloudflare|Vercel|ODR|TMG/);
    /* «s.r.o.» в конце предложения: точка сокращения и есть точка
       предложения, вторая — опечатка (поймано на next start 11.10) */
    expect(s).not.toContain("s.r.o..");
  });

  it("en: дополнение Meta не выдаётся за покрывающее Instagram", () =>
    expect(JSON.stringify(SOCIAL_NOTICE.en)).not.toMatch(
      /addendum (also )?covers Instagram/i,
    ));

  it("разбор ссылок: [подпись](ключ)", () =>
    expect(splitLinks("a [b c](addendum) d")).toEqual([
      "a ",
      { text: "b c", key: "addendum" },
      " d",
    ]));

  /* Набор ссылок каждой локали = набору чешской (она действует при
     расхождении): перевод не может молча потерять дополнение Meta или адрес
     надзорного органа. Разметка без пары не остаётся в тексте. */
  const linkKeys = (l: (typeof LOCALES)[number]) => {
    const keys = new Set<string>();
    for (const s of SOCIAL_NOTICE[l].sections) {
      for (const para of s.p) {
        for (const seg of splitLinks(para)) {
          if (typeof seg === "string") {
            expect(seg).not.toMatch(/\]\(|\[[^\]]*\]/);
          } else {
            expect(SOCIAL_LINK_KEYS).toContain(seg.key);
            expect(seg.text.trim().length).toBeGreaterThan(1);
            keys.add(seg.key);
          }
        }
      }
    }
    return [...keys].sort();
  };
  it("cs: все ключи ссылок на месте", () =>
    expect(linkKeys("cs")).toEqual([...SOCIAL_LINK_KEYS].sort()));
  it.each(LOCALES)("%s: ссылки те же, что в чешской версии", (l) =>
    expect(linkKeys(l)).toEqual(linkKeys("cs")));

  it("noindex, follow", () =>
    expect(socialPrivacyMetadata("cs").robots).toMatchObject({
      index: false,
      follow: true,
    }));

  it("sitemap без уведомления", async () => {
    const urls = (await sitemap()).map((e) => e.url);
    expect(urls.some((u) => u.includes("social-media-privacy"))).toBe(false);
  });

  /* Дата вступления в силу — одна константа (Task 8 переставит её на дату
     мерджа); локали несут только шаблон с {date}. */
  it("дата вступления — одна константа, формат локали", () => {
    expect(SOCIAL_NOTICE_EFFECTIVE).toBe("2026-10-11");
    expect(socialNoticeEffective("cs")).toBe("Účinné od 11. října 2026");
    expect(socialNoticeEffective("en")).toBe("Effective from 11 October 2026");
    expect(socialNoticeEffective("de")).toBe("Gültig ab 11. Oktober 2026");
    for (const l of LOCALES) {
      expect(SOCIAL_NOTICE[l].effective).toContain("{date}");
      expect(socialNoticeEffective(l)).toContain("2026");
    }
  });
});
