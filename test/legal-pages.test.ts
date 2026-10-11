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
  type Lang,
} from "../src/lib/landing-i18n";
import {
  impressumMetadata,
  socialPrivacyMetadata,
} from "../src/lib/landing-metadata";
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

  /* Реквизиты обязаны находиться поиском: robots из baseMetadata не
     перебивается, а canonical и hreflang в <head> байт-в-байт совпадают
     с записью sitemap — при расхождении сигналов Google выбирает сам. */
  it("cs: индексируется, canonical и hreflang = sitemap", async () => {
    const m = impressumMetadata("cs");
    expect(m).not.toHaveProperty("robots");
    expect(m.alternates?.canonical).toBe("https://www.g-track.eu/cs/impressum");
    const entry = (await sitemap()).find(
      (e) => e.url === "https://www.g-track.eu/cs/impressum",
    );
    expect(entry?.alternates?.languages).toBeDefined();
    expect(m.alternates?.languages).toEqual(entry?.alternates?.languages);
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

  /* Секции адресуются по месту: порядок у всех локалей чешский, якоря —
     заголовки. 5 — комментарии, сообщения и запросы; 6 — реклама. */
  const ENQUIRIES = 5;
  const ADS = 6;
  const sectionText = (l: Lang, i: number) =>
    SOCIAL_NOTICE[l].sections[i].p.join(" ");

  it("cs: якоря секций", () => {
    expect(SOCIAL_NOTICE.cs.sections[ENQUIRIES].h).toBe(
      "Komentáře, zprávy a poptávky",
    );
    expect(SOCIAL_NOTICE.cs.sections[ADS].h).toBe("Reklama");
  });
  it.each(LOCALES)("%s: секции на местах чешских", (l) => {
    const s = SOCIAL_NOTICE[l].sections;
    expect(s).toHaveLength(SOCIAL_NOTICE.cs.sections.length);
    expect(s[ENQUIRIES].h).toMatch(/^(Com|Kom|Ком)/);
    expect(s[ADS].h).toMatch(
      /^(Advertising|Реклама|Werbung|Publicité|Reklama|Pubblicità|Reklāma|Publicidad|Publicitate)$/,
    );
  });

  /* Срок хранения запросов стоит в секции запросов, там же — получатель:
     ящик Microsoft 365, который предоставляет Mesartim (Г25, спека §4.4:
     Microsoft назвать можно, Lovable / Cloudflare / Vercel — никогда). */
  it.each(LOCALES)(
    "%s: запросы — 24 месяца, ящик Microsoft 365 у Mesartim",
    (l) => {
      const t = sectionText(l, ENQUIRIES);
      expect(t).toMatch(/\b24\b/);
      expect(t).toContain("Microsoft 365");
      expect(t).toContain(MESARTIM.name);
    },
  );

  /* Реклама не отсылает к нашей Политике: до юр-пакета (ворота 5) Политика
     рекламное измерение не описывает, и фраза «как мы измеряем рекламу,
     объясняет Политика» была бы ложной. Ловим подпись ссылки этой локали и
     название документа в любом падеже; регулярка обязана поймать собственную
     подпись — иначе сторож пустой. */
  const PRIVACY_POLICY_NAME: Record<Lang, RegExp> = {
    en: /privacy policy/i,
    ru: /политик\S* конфиденциальности/i,
    de: /datenschutz/i,
    fr: /politique de confidentialité/i,
    cs: /zásad\S* ochrany osobních údajů/i,
    pl: /polityk\S* prywatności/i,
    it: /privacy/i,
    lv: /privātuma politik/i,
    lt: /privatumo politik/i,
    uk: /політик\S* конфіденційності/i,
    es: /política de privacidad/i,
    ro: /confidențialitate/i,
  };
  const privacyLabels = (l: Lang) =>
    SOCIAL_NOTICE[l].sections.flatMap((s) =>
      s.p.flatMap((para) =>
        splitLinks(para).flatMap((seg) =>
          typeof seg !== "string" && seg.key === "privacyPolicy"
            ? [seg.text]
            : [],
        ),
      ),
    );
  it.each(LOCALES)("%s: реклама не отсылает к Политике", (l) => {
    const labels = privacyLabels(l);
    expect(labels.length).toBeGreaterThan(0);
    const ads = sectionText(l, ADS);
    expect(ads).not.toContain("(privacyPolicy)");
    for (const label of labels) {
      expect(label).toMatch(PRIVACY_POLICY_NAME[l]);
      expect(ads.toLowerCase()).not.toContain(label.toLowerCase());
    }
    expect(ads).not.toMatch(PRIVACY_POLICY_NAME[l]);
  });

  /* Статистика страницы (секция 3): идентифицировать посетителя нельзя ИЗ
     СТАТИСТИКИ, а не «вообще» — администратор страницы видит по имени
     подписчиков, лайкнувших и комментаторов, а секция запросов сама говорит,
     что имя профиля комментатора мы обрабатываем (ревью ветки ворот 1,
     legal-L2; Page Insights Controller Addendum: статистика агрегирована).
     Фраза вписана литералом по локали. Оборот «не можем идентифицировать»
     встречается во всём уведомлении ровно один раз — внутри неё, так что
     неограниченное утверждение не вернётся ни на старом месте, ни на новом.
     Регулярка обязана поймать собственную фразу — иначе сторож пустой. */
  const INSIGHTS = 3;
  const NO_ID_FROM_STATS: Record<Lang, { sentence: string; claim: RegExp }> = {
    cs: {
      sentence: "Ze statistik jednotlivé návštěvníky identifikovat nemůžeme.",
      claim: /identifikovat nemůžeme|nemůžeme identifikovat/g,
    },
    en: {
      sentence: "From these statistics we cannot identify individual visitors.",
      claim: /cannot identify/g,
    },
    ru: {
      sentence:
        "На основании этой статистики мы не можем идентифицировать отдельных посетителей.",
      claim: /не можем (?:идентифицировать|определить)/g,
    },
    de: {
      sentence:
        "Anhand dieser Statistiken können wir einzelne Besucher nicht identifizieren.",
      claim: /nicht identifizieren/g,
    },
    fr: {
      sentence:
        "À partir de ces statistiques, nous ne pouvons pas identifier les visiteurs individuellement.",
      claim: /ne pouvons pas identifier/g,
    },
    pl: {
      sentence:
        "Na podstawie tych statystyk nie możemy zidentyfikować poszczególnych odwiedzających.",
      claim: /nie możemy zidentyfikować/g,
    },
    it: {
      sentence:
        "Sulla base di queste statistiche non possiamo identificare i singoli visitatori.",
      claim: /non possiamo identificare/g,
    },
    lv: {
      sentence:
        "No šīs statistikas mēs nevaram identificēt atsevišķus apmeklētājus.",
      claim: /nevaram identificēt/g,
    },
    lt: {
      sentence:
        "Iš šios statistikos negalime nustatyti atskirų lankytojų tapatybės.",
      claim: /negalime nustatyti/g,
    },
    uk: {
      sentence:
        "На підставі цієї статистики ми не можемо ідентифікувати окремих відвідувачів.",
      claim: /не можемо ідентифікувати/g,
    },
    es: {
      sentence:
        "A partir de estas estadísticas, no podemos identificar a visitantes concretos.",
      claim: /no podemos identificar/g,
    },
    ro: {
      sentence:
        "Pe baza acestor statistici, nu putem identifica vizitatorii individuali.",
      claim: /nu putem identifica/g,
    },
  };
  it.each(LOCALES)(
    "%s: «не можем идентифицировать» — только из статистики",
    (l) => {
      const { sentence, claim } = NO_ID_FROM_STATS[l];
      expect(SOCIAL_NOTICE[l].sections[INSIGHTS].h).toContain("Facebook");
      expect(sentence.match(claim)).toHaveLength(1);
      expect(sectionText(l, INSIGHTS)).toContain(sentence);
      const all = SOCIAL_NOTICE[l].sections.flatMap((s) => s.p).join(" ");
      expect(all.match(claim)).toHaveLength(1);
    },
  );

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
