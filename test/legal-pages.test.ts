import { describe, expect, it } from "vitest";
import { COMPANY, MESARTIM, SOCIAL } from "../src/lib/company";
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
     vložka); DIČ указывает только плательщик DPH. Проверяется текст страницы
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
        "Ze statistik vidíme jen souhrnná čísla a jednotlivé návštěvníky z nich identifikovat nemůžeme.",
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

  /* Роль Meta (ответ владельца 12.10, Г28; EDPB Guidelines 8/2020 о
     таргетинге пользователей соцсетей: рекламодатель, задающий критерии
     таргетинга, — совместный контролёр с платформой для этого таргетинга).
     Секция 2 «Meta как самостоятельный контролёр»: «не влияем» — только на
     обработку, которую Meta ведёт в собственных целях; оборот «не влияем»
     встречается во всём уведомлении ровно раз — внутри суженной фразы, так
     что безоговорочное «на эту обработку мы не влияем» не вернётся. Секция 6
     «Реклама»: при показе по нашим критериям мы и Meta можем быть
     совместными контролёрами этого отбора; термин — тот же, что в секции 3
     о статистике страницы (term ловит обе формы). Соглашения по ст. 26,
     контактов и прав сверх уже названных фраза не вводит. Фразы вписаны
     литералами по локали; регулярки обязаны поймать собственную фразу. */
  const META_SECT = 2;
  const META_ROLE: Record<
    Lang,
    { own: string; noInfluence: RegExp; joint: string; term: RegExp }
  > = {
    cs: {
      own: "Na zpracování, které Meta provádí pro své vlastní účely, nemáme vliv.",
      noInfluence: /nemáme vliv|vliv nemáme/g,
      joint:
        "Pokud Meta zobrazuje naši reklamu podle kritérií, která zvolíme, můžeme být pro tento výběr společnými správci spolu s Meta.",
      term: /společnými správci/,
    },
    en: {
      own: "We have no influence on the processing that Meta carries out for its own purposes.",
      noInfluence: /no influence/g,
      joint:
        "When Meta shows our ads according to criteria we choose, we and Meta may be joint controllers for that selection.",
      term: /joint controllers/,
    },
    ru: {
      own: "На обработку, которую Meta осуществляет в собственных целях, мы не влияем.",
      noInfluence: /не влияем/g,
      joint:
        "Когда Meta показывает нашу рекламу по выбранным нами критериям, в отношении такого отбора мы и Meta можем быть совместными контролёрами.",
      term: /совместн\S* контролёр/,
    },
    de: {
      own: "Auf die Verarbeitung, die Meta für eigene Zwecke vornimmt, haben wir keinen Einfluss.",
      noInfluence: /keinen Einfluss/g,
      joint:
        "Wenn Meta unsere Anzeigen nach Kriterien ausspielt, die wir wählen, können wir und Meta für diese Auswahl gemeinsam Verantwortliche sein.",
      term: /gemeinsam Verantwortliche/,
    },
    fr: {
      own: "Nous n’avons aucune influence sur le traitement que Meta effectue pour ses propres finalités.",
      noInfluence: /aucune influence/g,
      joint:
        "Lorsque Meta diffuse nos annonces selon des critères que nous choisissons, Meta et nous pouvons être responsables conjoints du traitement pour cette sélection.",
      term: /responsables conjoints du traitement/,
    },
    pl: {
      own: "Nie mamy wpływu na przetwarzanie, którego Meta dokonuje we własnych celach.",
      noInfluence: /nie mamy wpływu/gi,
      joint:
        "Gdy Meta wyświetla nasze reklamy według wybranych przez nas kryteriów, w zakresie tego wyboru możemy być wraz z Meta współadministratorami.",
      term: /współadministratorami/,
    },
    it: {
      own: "Non abbiamo alcuna influenza sul trattamento che Meta effettua per finalità proprie.",
      noInfluence: /alcuna influenza/g,
      joint:
        "Quando Meta mostra i nostri annunci in base a criteri scelti da noi, noi e Meta possiamo essere contitolari del trattamento per tale selezione.",
      term: /contitolari del trattamento/,
    },
    lv: {
      own: "Apstrādi, ko Meta veic savos nolūkos, mēs nevaram ietekmēt.",
      noInfluence: /nevaram ietekmēt/g,
      joint:
        "Ja Meta rāda mūsu reklāmas pēc mūsu izvēlētiem kritērijiem, attiecībā uz šo atlasi mēs un Meta varam būt kopīgi pārziņi.",
      term: /kopīgi pārziņi/,
    },
    lt: {
      own: "Duomenų tvarkymui, kurį Meta atlieka savo tikslais, įtakos neturime.",
      noInfluence: /įtakos neturime/g,
      joint:
        "Kai Meta rodo mūsų reklamą pagal mūsų pasirinktus kriterijus, šios atrankos atžvilgiu mes ir Meta galime būti bendri duomenų valdytojai.",
      term: /bendri duomenų valdytojai/,
    },
    uk: {
      own: "Ми не маємо впливу на обробку, яку Meta здійснює у власних цілях.",
      noInfluence: /не маємо впливу/g,
      joint:
        "Коли Meta показує нашу рекламу за обраними нами критеріями, щодо такого відбору ми та Meta можемо бути спільними контролерами.",
      term: /спільними контролерами/,
    },
    es: {
      own: "No tenemos ninguna influencia sobre el tratamiento que Meta realiza para sus propios fines.",
      noInfluence: /ninguna influencia/g,
      joint:
        "Cuando Meta muestra nuestros anuncios según criterios que elegimos nosotros, Meta y nosotros podemos ser corresponsables del tratamiento respecto de esa selección.",
      term: /corresponsables del tratamiento/,
    },
    ro: {
      own: "Nu avem nicio influență asupra prelucrării pe care Meta o efectuează în scopuri proprii.",
      noInfluence: /nicio influență/g,
      joint:
        "Atunci când Meta afișează reclamele noastre pe baza criteriilor pe care le alegem, noi și Meta putem fi operatori asociați pentru această selecție.",
      term: /operatori asociați/,
    },
  };
  it.each(LOCALES)(
    "%s: Meta — «не влияем» только на её цели, отбор рекламы — совместно",
    (l) => {
      const { own, noInfluence, joint, term } = META_ROLE[l];
      expect(SOCIAL_NOTICE[l].sections[META_SECT].h).toContain("Meta");
      expect(sectionText(l, META_SECT)).toContain(own);
      expect(own.match(noInfluence)).toHaveLength(1);
      expect(noticeText(l).match(noInfluence)).toHaveLength(1);
      expect(sectionText(l, ADS)).toContain(joint);
      expect(joint).toMatch(term);
      expect(sectionText(l, INSIGHTS)).toMatch(term);
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
