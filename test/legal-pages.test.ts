import { describe, expect, it } from "vitest";
import { COMPANY, MESARTIM, SOCIAL, seatOf } from "../src/lib/company";
import {
  IMPRESSUM,
  impressumRows,
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
      /Lovable|Cloudflare|Vercel|Mesartim|ODR|TMG/,
    ));

  /* решение владельца 12.10: статус НДС не указываем, пока нет оборотов (Г29).
     § 435 OZ требует от сайта фирму, сидло, IČO и запись в реестре (oddíl,
     vložka), DIČ — нет (подробнее — шапка company.ts). Проверяется текст страницы
     по её же данным — строки impressumRows (их рисует LegalNoticePage),
     заголовок, вводка, описание, подписи правовых ссылок — и сам словарь.
     Сокращения ловятся во всех локалях (в переводах стояло чешское «neplátce
     DPH»), слова — по языку. Регулярка обязана поймать удалённую строку своей
     локали (литералы ниже — из словарей до 12.10), иначе сторож пустой. */
  const VAT_ABBR =
    /\b(?:VAT|USt|MwSt|IVA|TVA|PVN|PVM)\b|DPH|DIČ|НДС|ПДВ|\bCZ\d{8}\b/;
  const VAT_STATUS: Record<Lang, { re: RegExp; removed: [string, string] }> = {
    cs: {
      re: /přidané hodnoty|plátc/i,
      removed: ["DPH", "Společnost není plátcem DPH."],
    },
    en: {
      re: /\bvat\b|value[- ]added/i,
      removed: ["VAT", "The company is not a VAT payer (neplátce DPH)."],
    },
    ru: {
      re: /ндс|добавленн\S* стоимост|плательщик/i,
      removed: ["НДС", "Компания не является плательщиком НДС (neplátce DPH)."],
    },
    de: {
      re: /umsatzsteuer|mehrwertsteuer|steuernummer|\bust\b|\bmwst\b/i,
      removed: [
        "Umsatzsteuer",
        "Die Gesellschaft ist kein Umsatzsteuerzahler (neplátce DPH).",
      ],
    },
    fr: {
      re: /\btva\b|valeur ajoutée|redevable/i,
      removed: ["TVA", "La société n'est pas redevable de la TVA (neplátce DPH)."],
    },
    pl: {
      re: /\bvat\b|wartości dodanej|podatnik/i,
      removed: ["VAT", "Spółka nie jest czynnym podatnikiem VAT (neplátce DPH)."],
    },
    it: {
      re: /\biva\b|valore aggiunto|contribuente/i,
      removed: ["IVA", "La società non è contribuente IVA (neplátce DPH)."],
    },
    lv: {
      re: /\bpvn\b|pievienotās vērtības|maksātāj/i,
      removed: ["PVN", "Sabiedrība nav PVN maksātāja (neplátce DPH)."],
    },
    lt: {
      re: /\bpvm\b|pridėtinės vertės|mokėtoj/i,
      removed: ["PVM", "Bendrovė nėra PVM mokėtoja (neplátce DPH)."],
    },
    uk: {
      re: /пдв|додан\S* вартіст|платник/i,
      removed: ["ПДВ", "Компанія не є платником ПДВ (neplátce DPH)."],
    },
    es: {
      re: /\biva\b|valor añadido|contribuyente/i,
      removed: ["IVA", "La sociedad no es contribuyente del IVA (neplátce DPH)."],
    },
    ro: {
      re: /\btva\b|valoarea adăugată|plătit/i,
      removed: ["TVA", "Societatea nu este plătitoare de TVA (neplátce DPH)."],
    },
  };
  const impressumText = (l: Lang) => {
    const p = IMPRESSUM[l];
    const f = LANDING_DICT[l].footer;
    return [
      p.title,
      p.metaDescription,
      p.lead,
      ...impressumRows(l).flatMap((r) => [r.dt, r.dd]),
      p.labels.legalDocs,
      f.legalHeading,
      f.privacy,
      f.terms,
      f.dpa,
    ].join("\n");
  };

  it.each(LOCALES)("%s: статус НДС / DIČ не указан", (l) => {
    const { re } = VAT_STATUS[l];
    expect(
      Object.keys(IMPRESSUM[l].labels).filter((k) => /vat|dic|tax/i.test(k)),
    ).toEqual([]);
    /* 8 строк реквизитов + строка правовых документов = 9 на странице */
    expect(impressumRows(l)).toHaveLength(8);
    for (const s of [impressumText(l), JSON.stringify(IMPRESSUM[l])]) {
      expect(s).not.toMatch(VAT_ABBR);
      expect(s).not.toMatch(re);
    }
  });

  /* Снятие строки НДС не потеряло реквизитов: в значениях строк стоят
     ровно константы company.ts, а почтовые ссылки — два адреса в порядке
     страницы. Подмена значения (например, другой IČO) краснит тест. */
  it.each(LOCALES)("%s: строки Impressum несут все реквизиты", (l) => {
    const rows = impressumRows(l);
    const dd = rows.map((r) => r.dd).join("\n");
    for (const v of [
      COMPANY.name,
      seatOf(COMPANY),
      COMPANY.ico,
      COMPANY.court,
      COMPANY.insert,
      COMPANY.director,
      COMPANY.email,
      COMPANY.privacyEmail,
    ]) {
      expect(dd).toContain(v);
    }
    expect(rows.filter((r) => r.mailto).map((r) => r.dd)).toEqual([
      COMPANY.email,
      COMPANY.privacyEmail,
    ]);
  });

  it.each(LOCALES)("%s: сторож НДС ловит удалённую строку", (l) => {
    const {
      re,
      removed: [label, value],
    } = VAT_STATUS[l];
    expect(VAT_ABBR.test(label) || re.test(label)).toBe(true);
    expect(re.test(value)).toBe(true);
    expect(VAT_ABBR.test(value)).toBe(true);
  });

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

  /* Статистика страницы (секция 3): «видим только сводные цифры» и «не
     можем идентифицировать» — ИЗ СТАТИСТИКИ, а не «вообще»: администратор
     страницы видит по имени подписчиков, лайкнувших и комментаторов, а
     секция запросов сама говорит, что имя профиля комментатора мы
     обрабатываем (ревью ветки ворот 1, legal-L2; Page Insights Controller
     Addendum: статистика агрегирована). С 12.10 обе части — одна фраза,
     привязанная к статистике (ответ владельца, B). Фраза вписана литералом
     по локали. Обороты «видим только» и «не можем идентифицировать»
     встречаются во всём уведомлении ровно по разу — внутри неё, так что
     неограниченное утверждение не вернётся ни на старом месте, ни на новом.
     Регулярки обязаны поймать собственную фразу — иначе сторож пустой. */
  const INSIGHTS = 3;
  const NO_ID_FROM_STATS: Record<
    Lang,
    { sentence: string; claim: RegExp; seeOnly: RegExp }
  > = {
    cs: {
      sentence:
        "V těchto statistikách vidíme jen souhrnná čísla a jednotlivé návštěvníky z nich identifikovat nemůžeme.",
      claim: /identifikovat nemůžeme|nemůžeme identifikovat/g,
      seeOnly: /vidíme jen/g,
    },
    en: {
      sentence:
        "In these statistics we see only aggregated figures and cannot identify individual visitors from them.",
      claim: /cannot identify/g,
      seeOnly: /see only/g,
    },
    ru: {
      sentence:
        "В этой статистике мы видим только сводные цифры и не можем идентифицировать по ней отдельных посетителей.",
      claim: /не можем (?:идентифицировать|определить)/g,
      seeOnly: /видим только/g,
    },
    de: {
      sentence:
        "In diesen Statistiken sehen wir nur zusammengefasste Zahlen und können einzelne Besucher daraus nicht identifizieren.",
      claim: /nicht identifizieren/g,
      seeOnly: /sehen wir nur|wir sehen nur/g,
    },
    fr: {
      sentence:
        "Dans ces statistiques, nous ne voyons que des chiffres agrégés et ne pouvons pas y identifier les visiteurs individuellement.",
      claim: /ne pouvons pas (?:y )?identifier/g,
      seeOnly: /ne voyons que/g,
    },
    pl: {
      sentence:
        "W tych statystykach widzimy wyłącznie zbiorcze dane liczbowe i nie możemy na ich podstawie zidentyfikować poszczególnych odwiedzających.",
      claim: /nie możemy (?:na ich podstawie )?zidentyfikować/g,
      seeOnly: /widzimy wyłącznie/g,
    },
    it: {
      sentence:
        "In queste statistiche vediamo solo dati aggregati e, sulla loro base, non possiamo identificare i singoli visitatori.",
      claim: /non possiamo identificare/g,
      seeOnly: /vediamo solo/g,
    },
    lv: {
      sentence:
        "Šajā statistikā mēs redzam tikai apkopotus skaitļus un nevaram no tās identificēt atsevišķus apmeklētājus.",
      claim: /nevaram (?:no tās )?identificēt/g,
      seeOnly: /redzam tikai/g,
    },
    lt: {
      sentence:
        "Šioje statistikoje matome tik apibendrintus skaičius ir pagal ją negalime nustatyti atskirų lankytojų tapatybės.",
      claim: /negalime nustatyti/g,
      seeOnly: /matome tik/g,
    },
    uk: {
      sentence:
        "У цій статистиці ми бачимо лише зведені показники й не можемо ідентифікувати за нею окремих відвідувачів.",
      claim: /не можемо ідентифікувати/g,
      seeOnly: /бачимо лише/g,
    },
    es: {
      sentence:
        "En estas estadísticas solo vemos cifras agregadas y no podemos identificar a partir de ellas a visitantes concretos.",
      claim: /no podemos identificar/g,
      seeOnly: /solo vemos/g,
    },
    ro: {
      sentence:
        "În aceste statistici vedem doar cifre agregate și nu putem identifica pe baza lor vizitatorii individuali.",
      claim: /nu putem identifica/g,
      seeOnly: /vedem doar/g,
    },
  };
  const noticeText = (l: Lang) =>
    SOCIAL_NOTICE[l].sections.flatMap((s) => s.p).join(" ");
  it.each(LOCALES)(
    "%s: «видим только» и «не можем идентифицировать» — только из статистики",
    (l) => {
      const { sentence, claim, seeOnly } = NO_ID_FROM_STATS[l];
      expect(SOCIAL_NOTICE[l].sections[INSIGHTS].h).toContain("Facebook");
      expect(sectionText(l, INSIGHTS)).toContain(sentence);
      for (const re of [claim, seeOnly]) {
        expect(sentence.match(re)).toHaveLength(1);
        expect(noticeText(l).match(re)).toHaveLength(1);
      }
    },
  );

  /* Роль Meta (ответ владельца 12.10, Г28; уточнено ревью 12.10 по EDPB
     Guidelines 8/2020 v2.0, пример 1, «A. Roles» и §5.4.1: рекламодатель,
     задающий критерии таргетинга, — совместный контролёр с платформой для
     выбора критериев, показа объявления аудитории и отчётов о результатах
     кампании; этапы до выбора критериев и после отчётов — собственные цели
     Meta).
     Секция 2 «Meta как самостоятельный контролёр»: самостоятельный
     контролёр и «не влияем» — одной фразой и только для обработки в
     собственных целях Meta; оборот «не влияем» встречается во всём
     уведомлении ровно раз — внутри неё, так что безоговорочное «на эту
     обработку мы не влияем» не вернётся. Секция 6 «Реклама»: фраза о
     совместном контроле отсылает к критериям предыдущей («этих критериев»)
     и называет весь объём — выбор, показ, отчёты — без «когда / если»
     (союз намекал на показы не по нашим критериям). Термин — тот же, что
     в секции 3 о статистике страницы (term ловит обе формы). Следом —
     своим абзацем правовое основание нашей части (EDPB 8/2020, пример 1,
     «B. Legal basis»; ст. 13(1)(c) GDPR) с подписью из секции 3; абзац
     стоит ДО абзаца о пикселе, чтобы не читаться основанием пикселя (тот
     грузится по согласию). Основание — черновик ревью, выбирает владелец.
     Соглашения по ст. 26, контактов и прав сверх уже названных фразы не
     вводят. Фразы вписаны литералами по локали; регулярки обязаны поймать
     собственную фразу. */
  const META_SECT = 2;
  const META_ROLE: Record<
    Lang,
    {
      own: string;
      noInfluence: RegExp;
      joint: string;
      term: RegExp;
      basis: string;
    }
  > = {
    cs: {
      own:
        "Pro zpracování, které provádí pro své vlastní účely, je Meta samostatným správcem podle svých [Zásad ochrany osobních údajů](metaPrivacy); na toto zpracování nemáme vliv.",
      noInfluence: /nemáme vliv|vliv nemáme/g,
      joint:
        "Ve vztahu k volbě těchto kritérií, k zobrazení naší reklamy lidem, kteří jim odpovídají, a k přehledům o výsledcích kampaně, které nám Meta poskytuje, můžeme být s Meta společnými správci.",
      term: /společnými správci/,
      basis:
        "Právní základ pro naši část: náš oprávněný zájem představit G-Track dopravním firmám (čl. 6 odst. 1 písm. f) GDPR).",
    },
    en: {
      own:
        "For the processing it carries out for its own purposes, Meta is an independent controller under its own [Privacy Policy](metaPrivacy); we have no influence on that processing.",
      noInfluence: /no influence/g,
      joint:
        "For the choice of these criteria, the display of our ads to the people who match them and Meta’s reports to us on campaign results, we and Meta may be joint controllers.",
      term: /joint controllers/,
      basis:
        "Legal basis for our part: our legitimate interest in presenting G-Track to transport companies (Article 6(1)(f) GDPR).",
    },
    ru: {
      own:
        "В отношении обработки, которую Meta осуществляет в собственных целях, она является самостоятельным контролёром в соответствии со своей [Политикой конфиденциальности](metaPrivacy); на эту обработку мы не влияем.",
      noInfluence: /не влияем/g,
      joint:
        "В отношении выбора этих критериев, показа нашей рекламы людям, которые им соответствуют, и отчётов о результатах кампании, которые Meta нам предоставляет, мы и Meta можем быть совместными контролёрами.",
      term: /совместн\S* контролёр/,
      basis:
        "Правовое основание с нашей стороны: наш законный интерес — представить G-Track транспортным компаниям (ст. 6(1)(f) GDPR).",
    },
    de: {
      own:
        "Für die Verarbeitung, die Meta für eigene Zwecke vornimmt, ist Meta eigenständig Verantwortlicher nach seiner eigenen [Datenschutzrichtlinie](metaPrivacy); auf diese Verarbeitung haben wir keinen Einfluss.",
      noInfluence: /keinen Einfluss/g,
      joint:
        "Für die Wahl dieser Kriterien, die Ausspielung unserer Anzeigen an Personen, die ihnen entsprechen, und die Berichte über die Kampagnenergebnisse, die Meta uns bereitstellt, können wir und Meta gemeinsam Verantwortliche sein.",
      term: /gemeinsam Verantwortliche/,
      basis:
        "Rechtsgrundlage für unseren Teil: unser berechtigtes Interesse daran, Transportunternehmen G-Track vorzustellen (Art. 6 Abs. 1 lit. f DSGVO).",
    },
    fr: {
      own:
        "Pour le traitement qu’elle effectue pour ses propres finalités, Meta est responsable du traitement indépendant, conformément à sa propre [Politique de confidentialité](metaPrivacy) ; nous n’avons aucune influence sur ce traitement.",
      noInfluence: /aucune influence/g,
      joint:
        "Pour le choix de ces critères, la diffusion de nos annonces auprès des personnes qui y correspondent et les rapports sur les résultats de la campagne que Meta nous fournit, Meta et nous pouvons être responsables conjoints du traitement.",
      term: /responsables conjoints du traitement/,
      basis:
        "Base juridique pour notre part : notre intérêt légitime à présenter G-Track aux entreprises de transport (article 6, paragraphe 1, point f), du RGPD).",
    },
    pl: {
      own:
        "W zakresie przetwarzania, którego dokonuje we własnych celach, Meta jest odrębnym administratorem na podstawie własnej [Polityki prywatności](metaPrivacy); nie mamy wpływu na to przetwarzanie.",
      noInfluence: /nie mamy wpływu/gi,
      joint:
        "W zakresie wyboru tych kryteriów, wyświetlania naszych reklam osobom, które im odpowiadają, oraz raportów o wynikach kampanii, które przekazuje nam Meta, możemy być wraz z Meta współadministratorami.",
      term: /współadministratorami/,
      basis:
        "Podstawa prawna po naszej stronie: nasz prawnie uzasadniony interes polegający na prezentowaniu G-Track firmom transportowym (art. 6 ust. 1 lit. f RODO).",
    },
    it: {
      own:
        "Per il trattamento che effettua per finalità proprie, Meta è titolare autonomo del trattamento secondo la propria [Informativa sulla privacy](metaPrivacy); non abbiamo alcuna influenza su tale trattamento.",
      noInfluence: /alcuna influenza/g,
      joint:
        "Per la scelta di questi criteri, la visualizzazione dei nostri annunci alle persone che vi corrispondono e i report sui risultati della campagna che Meta ci fornisce, noi e Meta possiamo essere contitolari del trattamento.",
      term: /contitolari del trattamento/,
      basis:
        "Base giuridica per quanto ci riguarda: il nostro legittimo interesse a presentare G-Track alle aziende di trasporto (articolo 6, paragrafo 1, lettera f), del GDPR).",
    },
    lv: {
      own:
        "Attiecībā uz apstrādi, ko Meta veic savos nolūkos, Meta ir patstāvīgs pārzinis saskaņā ar savu [Privātuma politiku](metaPrivacy); šo apstrādi mēs nevaram ietekmēt.",
      noInfluence: /nevaram ietekmēt/g,
      joint:
        "Attiecībā uz šo kritēriju izvēli, mūsu reklāmu rādīšanu cilvēkiem, kuri tiem atbilst, un pārskatus par kampaņas rezultātiem, ko Meta mums sniedz, mēs un Meta varam būt kopīgi pārziņi.",
      term: /kopīgi pārziņi/,
      basis:
        "Juridiskais pamats attiecībā uz mūsu daļu: mūsu leģitīmās intereses iepazīstināt transporta uzņēmumus ar G-Track (VDAR 6. panta 1. punkta f) apakšpunkts).",
    },
    lt: {
      own:
        "Kiek tai susiję su duomenų tvarkymu, kurį Meta atlieka savo tikslais, Meta yra savarankiškas duomenų valdytojas pagal savo [Privatumo politiką](metaPrivacy); šiam duomenų tvarkymui įtakos neturime.",
      noInfluence: /įtakos neturime/g,
      joint:
        "Šių kriterijų pasirinkimo, mūsų reklamos rodymo juos atitinkantiems žmonėms ir Meta mums teikiamų kampanijos rezultatų ataskaitų atžvilgiu mes ir Meta galime būti bendri duomenų valdytojai.",
      term: /bendri duomenų valdytojai/,
      basis:
        "Mūsų dalies teisinis pagrindas: mūsų teisėtas interesas pristatyti G-Track transporto įmonėms (BDAR 6 straipsnio 1 dalies f punktas).",
    },
    uk: {
      own:
        "Щодо обробки, яку Meta здійснює у власних цілях, вона є самостійним контролером відповідно до власної [Політики конфіденційності](metaPrivacy); ми не маємо впливу на цю обробку.",
      noInfluence: /не маємо впливу/g,
      joint:
        "Щодо вибору цих критеріїв, показу нашої реклами людям, які їм відповідають, і звітів про результати кампанії, які Meta нам надає, ми та Meta можемо бути спільними контролерами.",
      term: /спільними контролерами/,
      basis:
        "Правова підстава з нашого боку: наш законний інтерес — представити G-Track транспортним компаніям (ст. 6(1)(f) GDPR).",
    },
    es: {
      own:
        "Respecto del tratamiento que realiza para sus propios fines, Meta es responsable independiente del tratamiento conforme a su propia [Política de privacidad](metaPrivacy); no tenemos ninguna influencia sobre dicho tratamiento.",
      noInfluence: /ninguna influencia/g,
      joint:
        "Respecto de la elección de estos criterios, la presentación de nuestros anuncios a las personas que los cumplen y los informes sobre los resultados de la campaña que Meta nos facilita, Meta y nosotros podemos ser corresponsables del tratamiento.",
      term: /corresponsables del tratamiento/,
      basis:
        "Base jurídica en lo que nos corresponde: nuestro interés legítimo en dar a conocer G-Track a las empresas de transporte (artículo 6, apartado 1, letra f), del RGPD).",
    },
    ro: {
      own:
        "Pentru prelucrarea pe care o efectuează în scopuri proprii, Meta este operator independent, conform propriei [Politici de confidențialitate](metaPrivacy); nu avem nicio influență asupra acestei prelucrări.",
      noInfluence: /nicio influență/g,
      joint:
        "Pentru alegerea acestor criterii, afișarea reclamelor noastre persoanelor care le îndeplinesc și rapoartele privind rezultatele campaniei pe care ni le furnizează Meta, noi și Meta putem fi operatori asociați.",
      term: /operatori asociați/,
      basis:
        "Temei juridic pentru partea noastră: interesul nostru legitim de a prezenta G-Track firmelor de transport (articolul 6 alineatul (1) litera (f) din RGPD).",
    },
  };
  it.each(LOCALES)(
    "%s: Meta — самостоятельна только в своих целях, реклама — совместно, с основанием",
    (l) => {
      const { own, noInfluence, joint, term, basis } = META_ROLE[l];
      expect(SOCIAL_NOTICE[l].sections[META_SECT].h).toContain("Meta");
      expect(sectionText(l, META_SECT)).toContain(own);
      expect(own.match(noInfluence)).toHaveLength(1);
      expect(noticeText(l).match(noInfluence)).toHaveLength(1);
      expect(sectionText(l, ADS)).toContain(joint);
      expect(joint).toMatch(term);
      expect(sectionText(l, INSIGHTS)).toMatch(term);
      /* основание — отдельный абзац между фразой о совместном контроле и
         абзацем о пикселе; подпись — та же, что у основания статистики */
      const ads = SOCIAL_NOTICE[l].sections[ADS].p;
      const at = ads.indexOf(basis);
      expect(at).toBeGreaterThan(ads.findIndex((p) => p.includes(joint)));
      expect(at).toBeLessThan(ads.findIndex((p) => p.includes(MESARTIM.name)));
      const label = SOCIAL_NOTICE[l].sections[INSIGHTS].p.at(-1)!.split(":")[0].trim();
      expect(label.length).toBeGreaterThan(5);
      expect(basis.toLowerCase()).toContain(label.toLowerCase());
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
