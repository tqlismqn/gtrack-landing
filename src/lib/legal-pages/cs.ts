/* Údaje o provozovateli a oznámení o sociálních sítích — čeština.
   Rozhodující jazyková verze: při rozporu platí tato. */
import { COMPANY, MESARTIM, META_IE, SOCIAL, seatOf } from "../company";
import type { ImpressumDict, SocialNoticeDict } from "./index";

export const impressum: ImpressumDict = {
  title: "Údaje o provozovateli",
  metaDescription:
    "Kdo provozuje web www.g-track.eu a službu G-Track: obchodní firma, sídlo, IČO, zápis v obchodním rejstříku a kontakt.",
  lead: "Provozovatel webu www.g-track.eu a služby G-Track na app.g-track.eu.",
  labels: {
    company: "Obchodní firma",
    legalForm: "Právní forma",
    legalFormValue: "společnost s ručením omezeným podle českého práva",
    seat: "Sídlo",
    country: "Česká republika",
    ico: "IČO",
    register: "Obchodní rejstřík",
    registerValue: "{court}, oddíl {section}, vložka {insert}",
    director: "Jednatel",
    email: "E-mail",
    privacy: "Ochrana osobních údajů",
    legalDocs: "Právní dokumenty",
  },
};

export const socialNotice: SocialNoticeDict = {
  title: "Ochrana osobních údajů na sociálních sítích",
  metaDescription:
    "Jak G-Track Software s.r.o. a Meta zpracovávají osobní údaje na naší stránce na Facebooku a našem profilu na Instagramu: kdo odpovídá, statistiky stránky, reklama a vaše práva.",
  effective: "Účinné od {date}",
  sections: [
    {
      h: "Čeho se toto oznámení týká",
      p: [
        `Toto oznámení vysvětluje, jak my a společnost Meta zpracováváme vaše osobní údaje, když navštívíte naši stránku [„G-Track“ na Facebooku](facebook) nebo náš profil [${SOCIAL.instagramHandle} na Instagramu](instagram) nebo s nimi komunikujete. Pro náš web a službu G-Track platí naše [Zásady ochrany osobních údajů](privacyPolicy).`,
      ],
    },
    {
      h: "Kdo za zpracování odpovídá",
      p: [
        `Správcem je ${COMPANY.name}, se sídlem ${seatOf(COMPANY)}, Česká republika, IČO ${COMPANY.ico} („my“). Stránku na Facebooku i profil na Instagramu spravujeme sami z vlastního firemního portfolia Meta. Kontakt ve věcech ochrany osobních údajů: [${COMPANY.privacyEmail}](privacyEmail). Pověřence pro ochranu osobních údajů jsme nejmenovali.`,
        `Společnost ${MESARTIM.name}, IČO ${MESARTIM.ico}, se sídlem ${seatOf(MESARTIM)}, Česká republika, z našeho pověření platí naši reklamu na sítích Meta a poskytuje pixel Meta (datovou sadu pro měření), který používá náš web.`,
      ],
    },
    {
      h: "Meta jako samostatný správce",
      p: [
        `Facebook a Instagram provozuje společnost ${META_IE.name}, ${META_IE.address}, Irsko („Meta“). Pro zpracování, které provádí pro své vlastní účely, je Meta samostatným správcem podle svých [Zásad ochrany osobních údajů](metaPrivacy); na toto zpracování nemáme vliv.`,
        "Soubory cookie na Facebooku a Instagramu ukládá Meta, která si o váš souhlas tam, kde je vyžadován, žádá sama; viz [Zásady používání souborů cookie](metaCookies) společnosti Meta.",
      ],
    },
    {
      h: "Statistiky stránky na Facebooku: společná odpovědnost s Meta",
      p: [
        "Když navštívíte naši stránku na Facebooku nebo s ní pracujete, Meta zaznamenává události, například zobrazení stránky nebo příspěvku, sledování stránky, označení „To se mi líbí“, komentář, sdílení nebo kliknutí na tlačítko, spolu s okolnostmi, jako je datum a čas, země nebo město odhadnuté z IP adresy, jazyk, typ zařízení a u přihlášených uživatelů věková skupina, pohlaví a ID uživatele. Z těchto událostí Meta sestavuje souhrnné statistiky stránky (Page Insights). V těchto statistikách vidíme jen souhrnná čísla a jednotlivé návštěvníky z nich identifikovat nemůžeme.",
        "Za toto zpracování jsme s Meta společnými správci podle čl. 26 GDPR. Podle ujednání nese Meta primární odpovědnost za informování subjektů údajů, za vyřizování žádostí o uplatnění vašich práv podle čl. 15–21 GDPR, za zabezpečení zpracování (čl. 32 GDPR) a za ohlašování a oznamování porušení zabezpečení osobních údajů (čl. 33–34 GDPR). Podstatný obsah ujednání je uveden v dokumentech [Page Insights Controller Addendum](addendum) a [Information about Page Insights](insightsInfo). Vedoucím dozorovým úřadem pro toto zpracování je irská Komise pro ochranu osobních údajů (Data Protection Commission).",
        "Právní základ: náš oprávněný zájem porozumět tomu, jak naše příspěvky oslovují dopravní firmy a řidiče, a zlepšovat je (čl. 6 odst. 1 písm. f) GDPR).",
      ],
    },
    {
      h: "Statistiky profilu na Instagramu",
      p: [
        "Instagram nám také poskytuje souhrnné statistiky o našem profilu a příspěvcích, například o dosahu a interakcích. Samostatné ujednání o společné správě pro Instagram Meta nezveřejnila; výše uvedený dokument Page Insights Controller Addendum se týká stránek na Facebooku. Statistiky z Instagramu používáme jen v souhrnné podobě, ke stejnému účelu a na stejném právním základě (čl. 6 odst. 1 písm. f) GDPR).",
      ],
    },
    {
      h: "Komentáře, zprávy a poptávky",
      p: [
        "Pokud k našim příspěvkům napíšete komentář, pošlete nám zprávu nebo přes Facebook či Instagram požádáte o ukázku, zpracováváme jméno vašeho profilu, obsah zprávy a čas jejího odeslání, abychom vám mohli odpovědět. Právním základem je čl. 6 odst. 1 písm. b) GDPR, jde-li o kroky před uzavřením smlouvy přijímané na vaši žádost, jinak náš oprávněný zájem na tom, abychom vám odpověděli (čl. 6 odst. 1 písm. f) GDPR).",
        `Poptávku můžeme přesunout do naší obchodní e-mailové schránky; poptávky uchováváme nejvýše 24 měsíců od posledního kontaktu. Přesunuté poptávky jsou uloženy ve schránce Microsoft 365, kterou nám společnost ${MESARTIM.name} poskytuje. Veřejné komentáře zůstávají viditelné, dokud je vy nebo my nesmažeme. Obchodní sdělení vám přes Facebook ani Instagram bez vašeho souhlasu neposíláme.`,
      ],
    },
    {
      h: "Reklama",
      p: [
        "Na Facebooku a Instagramu inzerujeme. Komu se naše reklama zobrazí, určuje Meta podle kritérií, která zvolíme, například země, jazyka a zájmů. Ve vztahu k volbě těchto kritérií, k zobrazení naší reklamy lidem, kteří jim odpovídají, a k přehledům o výsledcích kampaně, které nám Meta poskytuje, můžeme být s Meta společnými správci. Údaje o našich zákaznících ani o jejich řidičích do Meta nikdy nenahráváme a k cílení reklamy je nepoužíváme.",
        "Právní základ pro naši část: náš oprávněný zájem představit G-Track dopravním firmám (čl. 6 odst. 1 písm. f) GDPR).",
        `Reklamu za nás platí společnost ${MESARTIM.name} Pixel Meta, který tato společnost poskytuje, náš web načte až poté, co udělíte souhlas v cookie liště.`,
      ],
    },
    {
      h: "Vaše práva",
      p: [
        `Máte právo na přístup, opravu, výmaz, omezení zpracování a přenositelnost údajů a právo vznést námitku proti zpracování založenému na našem oprávněném zájmu (čl. 15–21 GDPR). Obrátit se můžete na nás na adrese [${COMPANY.privacyEmail}](privacyEmail) nebo přímo na Meta prostřednictvím kontaktů uvedených v dokumentu [Information about Page Insights](insightsInfo).`,
        "Žádosti týkající se statistik stránky vyřizuje Meta. Pokud takovou žádost pošlete nám, předáme Meta všechny podstatné informace bez zbytečného odkladu, nejpozději do sedmi kalendářních dnů.",
        "Stížnost můžete podat u Úřadu pro ochranu osobních údajů ([uoou.gov.cz](uoou)), u irské Komise pro ochranu osobních údajů ([dataprotection.ie](dpc)) nebo u dozorového úřadu v zemi, kde žijete nebo pracujete.",
      ],
    },
  ],
  prevails:
    "Toto oznámení zveřejňujeme ve 12 jazycích. V případě rozporu mezi jazykovými verzemi má přednost česká verze.",
};
