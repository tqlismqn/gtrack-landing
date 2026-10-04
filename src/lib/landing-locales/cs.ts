/* ============================================================================
   G-Track Landing — чешская локаль (cs). Домашний рынок.
   Терминология синхронизирована с app-локалью gtrack-tms/src/i18n/locales/cs.ts:
   driverPill (Aktivní / Na cestě / Dovolená / Nemocenská), «Připravenost na
   cestu», модули (Řidiči / Dokumenty / Plánování / Vozidla / Zakázky /
   Fakturace), founding/price-lock (founding cena, «Cena zamčená N měs po
   spuštění», oficiální spuštění), типы документов (Vízum, Kód 95, Tachograf,
   Lékařská prohlídka, TÜV/STK), волна 02.10: Centrum rozhodnutí, режимы
   Ruční / Centrum / Automatický, плитка «Volní», Opravy a servis, Rotace,
   žurnál, souhrn, končící. Цифры — байт-в-байт с en (Stripe livemode),
   кроме десятичного разделителя: запятая (≈ 2,25 €, −6,7%).
   ============================================================================ */

import type { LandingDict } from "../landing-i18n";

export const cs: LandingDict = {
  meta: {
    title: "G-Track — správa řidičů a plánování jízd pro dopravce",
    description:
      "Dokumenty řidičů, jízdy a dovolené, opravy a servis — v jedné aplikaci v prohlížeči pro dopravce od 50 vozidel. 30 dní zdarma, ceny přímo na stránce.",
  },

  nav: {
    product: "Produkt",
    pricing: "Ceník",
    roadmap: "Roadmapa",
    login: "Přihlásit se",
    ctaFull: "Vyzkoušet na 30 dní",
    ctaShort: "30 dní zdarma",
    ctaTiny: "30 dní",
    themeAria: "Přepnout motiv webu",
    langAria: "Jazyk rozhraní",
    menuAria: "Navigační nabídka",
    langRu: "Русский",
    langEn: "English",
    langNote: "+10 jazyků v produkci",
  },

  hero: {
    kicker: "EU compliance · plánování · vozidla a servis",
    h1: "Každý řidič připraven na cestu.",
    h1dim: "Vždy.",
    sub: " — systém EU compliance a plánování pro dopravce od 50 vozidel. Dokumenty řidičů, jízdy a dovolené, opravy a servis — v prohlížeči, bez hardwaru a bez implementačních konzultantů. Co je dnes potřeba rozhodnout, vám systém ukáže sám.",
    ctaTrial: "Vyzkoušet na 30 dní",
    ctaPricing: "Zobrazit ceník",
    micro1: "Bez platební karty",
    micro2: "Registrace za 2 minuty",
    micro3: "Data uložená v EU",
    boardAria:
      "Dispečerská tabule G-Track: nahrajete sken dokumentu, systém rozpozná číslo a datum platnosti, vy záznam zkontrolujete a uložíte",
    boardCaption:
      "Nahrajete sken → G-Track rozpozná číslo a datum platnosti → vy zkontrolujete a uložíte",
  },

  /* Полоса под первым экраном (TrustStrip): чипы-ссылки на модули, решение владельца 03.10.
     Термины — из app-локали cs: nav (Řidiči, Plánování, Centrum rozhodnutí, Vozidla,
     Opravy a servis), vehicles_sub (Tahače / Návěsy), «jízdy», «Telegram připomínky»;
     c7 — фраза из roadmap.tracks.telematics.d, c9 = vid.chip6. «Ve vývoji» у c6 — d.roadmap.wip. */
  trust: {
    aria: "Co už v G-Track funguje",
    c1: "Řidiči · 16 typů dokumentů",
    c2: "Plánování · tabule a jízdy",
    c3: "Centrum rozhodnutí",
    c4: "Rotace · na 3 měsíce dopředu",
    c5: "Vozidla · tahače a návěsy",
    c6: "Opravy a servis",
    c7: "Telematika · váš systém sledování vozidel",
    c8: "Řidič v Telegramu · žádosti a připomínky",
    c9: "12 jazyků rozhraní",
  },

  /* Подвал OG-картинки (og-image.tsx): подписи к числам 16 и 30 — бывшие trust.m1/m2
     дословно: полоса стала чипами (03.10), а картинка для шеров осталась прежней. */
  og: {
    docTypes: "typů dokumentů řidiče",
    langs: "jazyků rozhraní",
  },

  /* ---- полоса «было → стало»: s2–s4 — названия модулей из меню приложения ---- */
  strip: {
    aria: "Bylo a je: čtyři obrazovky produktu",
    was: "Bylo —",
    p1: "večerní telefonát: „zapiš mě od desátého“",
    p2: "řádek v Excelu — pokud ho nezapomněli zapsat",
    p3: "kdo se vrátí na který vůz — v hlavě dispečera",
    p4: "na STK se vzpomene, až když je vůz potřeba na cestu",
    s1: "Telegram",
    s2: "Plánování",
    s3: "Rotace řidičů",
    s4: "Vozidla",
  },

  /* ---- витрина «Одна заявка». Строки макетов не переводятся заново: они взяты из
     словарей приложения и мини-приложения; числа и даты подставляет showcase-data.ts ---- */
  showcase: {
    /* текст секции */
    overline: "Produkt",
    h2: "Jedna žádost — a ví o ní celý systém",
    sub: "Dnes je to telefonát, řádek v Excelu a paměť dispečera. V G-Track se žádost řidiče objeví na tabuli, odpověď se mu vrátí do Telegramu a rotace předem porovná den jeho návratu s termíny vozu.",
    legend: "Stejná data — na všech obrazovkách:",
    c1h: "Řidič žádá z kabiny",
    c1p: "Dovolená nebo nemocenská — v Telegramu, který už má. Nic není potřeba instalovat.",
    c2h: "Žádost už je na tabuli",
    c2p: "Čárkovaný pruh v řádku řidiče, nahoře — kolik z týmu už je na dovolené. Schválíte jedním kliknutím.",
    cAns: "Odpověď přijde řidiči do Telegramu",
    c3h: "Návrat s předstihem",
    c3p: "Kdo se vrátí během {n} dní a jestli je jeho vůz připraven: volný, ne v servisu, dokumenty v platnosti.",
    c4h: "Vůz má vlastní termíny",
    c4p: "STK vyprší, zatímco je řidič na dovolené — vůz ještě stihnete objednat na kontrolu.",
    foot: "Vše na těchto obrazovkách funguje bez telematiky.",
    /* водители макетов (выдуманные) */
    marek: "Hájek Marek",
    marekFirst: "Marek",
    marekTg: "Marek Hájek",
    marekAv: "MH",
    oleg: "Bondar Oleh",
    olegAv: "OB",
    andrzej: "Mazur Andrzej",
    andrzejAv: "AM",
    mihai: "Rusu Mihai",
    mihaiAv: "MR",
    lukas: "Vítek Lukáš",
    lukasAv: "LV",
    juris: "Kalniņš Juris",
    jurisAv: "JK",
    /* мини-приложение Telegram — дословно из его словаря */
    tgGreet: "Dobré ráno",
    tgDate: "po 5. října 2026",
    tgOnShift: "Ve službě",
    tgTruck: "Tahač",
    tgTrailer: "Návěs",
    tgCta: "Nová žádost",
    tgSheet: "Co potřebujete?",
    tgVac: "Dovolená",
    tgSick: "Nemocenská",
    tgOther: "Jiné",
    tgCancel: "Zrušit",
    tgReqs: "Moje žádosti",
    tgReqVac: "Dovolená",
    tgApproved: "Schváleno",
    tgMonth: "Říjen",
    tgDays: "dní",
    tgSubmitted: "odesláno",
    /* планировщик — дословно из словаря приложения */
    plTitle: "Plánování",
    plMonth: "říj",
    wd: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"],
    dayFmt: "{wd} {d}.",
    kpiAway: "Dovolená a nemoc",
    kpiAwaySub: "{pct}% týmu",
    kpiPending: "Žádost čeká",
    kpiPendingSub: "čekají na odpověď",
    needs: "Vyžadují rozhodnutí",
    stTrip: "Na cestě",
    stFree: "Volný",
    stSick: "Nemocenská",
    stVac: "Dovolená",
    stUntil: "{status} · do {date}",
    barPending: "⏳ Dovolená",
    barUntil: "do {date}",
    popTitle: "Žádost o dovolenou",
    popPeriod: "Období",
    popDays: "{n} dní",
    popReason: "Komentář řidiče",
    popReasonV: "Bratrova svatba",
    popHistory: "Historie",
    popCreated: "Vytvořeno",
    popAwaiting: "Čeká na rozhodnutí",
    popReject: "Zamítnout",
    popApprove: "Schválit",
    /* ротация */
    rotTitle: "Rotace řidičů",
    rotReturning: "Vracejí se",
    rotHorizon: "za {n} dní",
    rotPrepare: "Připravit {n}",
    rotWeek: "Týden {range}",
    rotWeekCount: "vracejí se {n}",
    rotVac: "Dovolená",
    rotSick: "Nemocenská",
    rotReturn: "návrat {date}",
    rotPrev: "předchozí vozidlo",
    rotReady: "Vůz je připraven",
    rotBusy: "Obsazen: {name}",
    rotDoc: "{doc} do {date}",
    /* карточка машины */
    vehTitle: "Vozidla",
    vehType: "Tahač",
    vehFuel: "Diesel",
    vehOnTrip: "Na cestě",
    vehTabOverview: "Přehled",
    vehTabDocs: "Dokumenty",
    vehTabService: "Servis",
    vehGroup: "Kontrola",
    docStk: "Technická kontrola (STK)",
    docCal: "Kalibrace tachografu",
    docTdl: "Stažení dat z tachografu",
    daysLeft: "{n} dní zbývá",
    daysCal: "{n} dní",
    daysTdl: "{n} dní",
  },

  vid: {
    overline: "Evropský trh",
    h2: "Postaveno pro evropské dopravce.",
    sub: "A1, Kód 95, víza — lhůty pod kontrolou už dnes.",
    chip2: "A1",
    chip3: "Kód 95",
    chip4: "ADR",
    chip5: "Vyhodnocení DDD",
    chip6: "12 jazyků rozhraní",
    tag: "VIDEO · PLACEHOLDER",
  },

  langs: {
    overline: "Lokalizace",
    h2: "12 jazyků rozhraní",
    sub: "Dispečer i HR pracují ve svém rodném jazyce — zaškolení týmu trvá den, ne měsíc.",
  },

  europe: {
    overline: "Geografie",
    h2: "Celá Evropa na jedné tabuli",
    sub: "Kdo je na cestě, kdo na dovolené, který vůz je v servisu — na tabuli. Kdo se vrátí a kdo bude volný — na 14 dní, měsíc nebo tři měsíce dopředu.",
    mapAria: "Mapa tras napříč Evropou přecházející v plánovací tabuli",
    captionB: "Celý tenhle chaos se řídí odsud",
    caption: " — z jedné tabule a jednoho seznamu rozhodnutí.",
  },

  /* Секция «Работает сейчас» на главной: карточки строятся из TRACKS
     (roadmap-content.ts) и текстов d.roadmap — здесь только заголовок и ссылка. */
  modules: {
    h2: "Ne „brzy“. Už teď.",
    cta: "Celá roadmapa",
  },

  /* Страница дорожной карты (/roadmap). Свой H1 и свои meta: заголовок главной
     сюда не наследуется — иначе 12 страниц карты получают title продукта. */
  roadmap: {
    meta: {
      title: "Roadmapa G-Track — co funguje, co stavíme, co bude dál",
      description:
        "Tři horizonty vývoje G-Track: co už funguje, na čem pracujeme a co přijde dál. Bez kalendářních dat a slibů.",
    },
    h1: "Co už funguje, na čem pracujeme a co bude dál",
    lede: "Tady vidíte, kam produkt směřuje: co už funguje, co stavíme teď a co přijde dál. Termíny neslibujeme — ukazujeme směr.",
    now: "Funguje dnes",
    wip: "Ve vývoji",
    next: "Dál",
    releases: "{n}+ aktualizací od spuštění v květnu 2026.",
    nowMark: "Dnes",
    launch: "Spuštění 1.0",
    aria: "Směry vývoje G-Track: co funguje, co je ve vývoji a co plánujeme",
    tracks: {
      drivers: { t: "Řidiči a dokumenty", d: "Profily, 16 typů dokumentů, pravidla 8 zemí" },
      planning: { t: "Plánování a autopilot", d: "Tabule, Centrum rozhodnutí, rotace, autopilot podle tacho karty" },
      fleet: { t: "Vozidla a servis", d: "Vozový park, opravy a servis, palubní data" },
      telematics: { t: "Integrace s telematikou", d: "Napojíme váš systém sledování vozidel — data o vozidlech přicházejí sama, pro plánování i hlídání servisních intervalů. Jde to i ručně." },
      telegram: { t: "Řidič v Telegramu", d: "Žádosti o dovolenou a nemocenskou, dnešní směna, upozornění na končící dokumenty" },
      reports: { t: "Reporty a oznámení", d: "Týdenní report, centrum oznámení, lhůty pro tacho soubory" },
      companies: { t: "Propojené firmy", d: "Více firem jednoho majitele: každá má vlastní předplatné a vozidla i řidiče ostatních vidí jen pro čtení" },
      finance: { t: "Zakázky a finance", d: "Zakázky, faktury, pokuty, ekonomika vozidla" },
      integrations: { t: "Mapa a integrace", d: "Mapa a trasy, vyhodnocení DDD, API, burzy nákladů" },
    },
    ms: { autopilot: "Autopilot", decisions: "Centrum rozhodnutí", rotation: "Rotace", service: "Opravy a servis", miniapp: "Mini-app", telematics: "První integrace" },
  },

  pricing: {
    overline: "Ceník",
    h2: "Celý trh schovává ceny za „contact sales“. My ne.",
    sub: "Ceny jsou přímo tady. Registrace bez telefonátu, demo na 30 dní. Všechny moduly ve všech plánech: liší se jen kapacita vozového parku.",
    periodAria: "Fakturační období",
    perMo: "Měsíčně",
    perQ: "Čtvrtletně",
    perY: "Ročně",
    discQ: "−6,7%",
    discY: "−16,7%",
    /* ЦИФРЫ СИНХРОНИЗИРОВАНЫ СО STRIPE LIVEMODE — НЕ МЕНЯТЬ */
    billedMo: "účtováno měsíčně",
    billedQ: "za čtvrtletí",
    billedY: "za rok",
    perMonth: "/měs",
    afterLaunch: "po spuštění",
    perTruck: "za vozidlo/měs",
    starterBlurb: "Malý vozový park, který si dává dokumenty do pořádku",
    fleetBlurb: "Tahoun středně velkého dopravce s dispečerskou směnou",
    businessBlurb: "Velký vozový park s několika dispečerskými kancelářemi",
    plusBlurb: "Vozový park nad 1000 vozidel — podmínky postavené kolem vašich procesů",
    fleetFlag: "Volba většiny",
    choose: "Vybrat",
    plusPrice: "Na míru",
    plusGa: "podmínky — ve smlouvě",
    plusBilled: "dle smlouvy",
    plusCta: "Napsat na sales@",
    lock12: "Cena zamčená 12 měs",
    lock24: "Cena zamčená 24 měs",
    lockContract: "Zamčeno ve smlouvě",
    capTrucks: "vozidel",
    capDrivers: "řidičů",
    capTrailers: "návěsů",
    capSeats: "dispečerských míst",
    upTo: "až",
    plusTrucks: "vozidel",
    plusUnlim: "neomezeně",
    packLead: "Potřebujete víc?",
    packMax: "maximálně 5 balíčků",
    plusSla: "SLA",
    plusSlaSuffix: "a prioritní podpora",
    foundingB: "Startovní cena s vámi zůstává 12–24 měsíců po oficiálním spuštění.",
    founding: " Noví zákazníci po spuštění zaplatí víc — vy ne.",
    noteA: "Rok znamená ",
    noteB: "„2 měsíce zdarma“",
    noteC: ". Bezplatná migrace dat z Excelu pro první zákazníky.",
    anchorOverline: "Spočítáno",
    anchorBig: "≈ 2,25 €",
    anchorUnit: "za vůz/měsíc · vozový park 200 vozů",
    anchorArg: "Jeden řidič s propadlým Kódem 95 — až 20 000 € pokuty v Německu. Jedno propadlé vízum — zastavená jízda. G-Track udrží celý vozový park pod kontrolou levněji, než stojí jediný takový výpadek.",
  },

  /* FAQ: термины типов документов и «Připravenost na cestu» — из app-локали cs.
     Суммы штрафов и ссылки на статьи законов сознательно не приводим. */
  faq: {
    overline: "Otázky",
    h2: "Na co se dopravci ptají, než si založí účet",
    sub: "Krátké odpovědi bez „kontaktujte nás“. Tady je to, na co se nás ptají nejčastěji — včetně toho, co neděláme.",
    askLead: "Nenašli jste svou otázku?",
    askCta: "Napište nám — odpovíme stejně krátce",

    g1: "Termíny a odpovědnost",
    g2: "Zavedení a data",
    g3: "Přístupy, vozový park, cena",

    q1: "Jak systém upozorní, že řidiči končí platnost dokumentu?",
    a1: "Každé ráno G-Track prověří dokumenty všech řidičů. Pas se v souhrnu objeví 180 dní předem, ostatní dokumenty 90 dní předem. Kancelář dostane e-mail, v aplikaci se dokument označí jako končící a řidiči, který má v Telegramu připojeného bota, přijde připomínka.",
    a1b: "E-maily se souhrnem si zapnete sami a vyberete, komu chodí: jen vlastníkovi, administrátorům nebo všem členům. Připomínka tak nevisí na jednom člověku a nezmizí, když je personalista na dovolené.",

    q2: "Kdo nese odpovědnost, když řidič vyjede na cestu s propadlým dokumentem?",
    a2: "Ve většině zemí EU dopravce, ne jen řidič: pokutu dostane firma a v řadě zemí navíc i odpovědný zástupce pro dopravu. Konkrétní výše i postup se liší podle země kontroly. Právě proto G-Track připomíná především kanceláři — tomu, kdo zařazuje jízdu do plánu — a řidiči, který si připojil bota, posílá připomínku navíc do Telegramu.",

    q3: "Je na dispečerské tabuli vidět, kdo nemůže vyjet kvůli dokumentu?",
    a3: "Ano, tabule sdružuje lidi, vozidla a termíny na jednom místě: kdo je na dovolené, kdo na nemocenské, kdo je bez vozidla, komu neplatí dokument. Každá změna plánu se zapisuje do historie — vidíte nejen aktuální stav, ale i kdo ho kdy změnil.",

    q11: "Co G-Track dělá sám a o čem rozhoduje dispečer?",
    a11: "Sám si všimne: kdo se vrací z dovolené, komu končí jízda a nic na ni nenavazuje, kdo z nových řidičů nemá plán — to vše se sejde v Centru rozhodnutí. Jestli má systém měnit plán za vás, určíte volbou režimu: „Ruční“, „Centrum“ nebo „Automatický“. Ve výchozím nastavení se jen ptá. Každá jeho změna plánu se zapisuje do žurnálu.",

    q4: "Mám 40–60 řidičů a roky skenů v Excelu a ve složkách. Kdo to převede?",
    a4: "Začít se dá i bez archivu: založte řidiče a ty dokumenty, kterým běží nejbližší termín — připomínky fungují už jen z toho. Staré skeny doplníte postupně a nic neblokují.",
    a4b: "Převod z Excelu prvním zákazníkům děláme zdarma. Pošlete soubor tak, jak je — s poznámkami, prázdnými buňkami a „??“ v datech.",

    q5: "Kde fyzicky leží data a skeny? Podepíšete DPA?",
    a5: "Data i soubory jsou v Evropské unii, datové centrum v Irsku. Dokument o zpracování údajů je zveřejněný, odkaz najdete v patičce stránky; podepisujeme ho. Přístup k citlivým polím uvnitř vaší firmy je omezený rolemi, ne jedním společným přepínačem.",

    q6: "Když se rozhodnu odejít — vezmu si data s sebou?",
    a6: "Dokud je účet aktivní, data si kdykoli a bez žádosti vyexportujete do CSV: seznam řidičů, stavy dokumentů, termíny. Skeny zůstávají vaše: teď se stahují po jednom, celý archiv vydáváme na vyžádání. Účet si vlastník smaže sám, bez telefonátu s „manažerem pro udržení zákazníka“.",

    q7: "Co musí dělat řidič? Instaluje si něco?",
    a7: "Nic: Telegram už má. Přes bota podá žádost o dovolenou nebo nemocenskou — ta putuje do plánování a odpověď mu přijde zpátky. Vidí, kterým vozem dnes jede, a dostává připomínky, když jeho dokumentům končí platnost.",
    a7b: "Aplikace potřebuje internet. Originály dokumentů v kabině to nenahrazuje.",

    q8: "Může dispečer vidět rozvrh, ale ne pas a lékařskou prohlídku?",
    a8: "Ano. Práva se přidělují jednotlivě — je jich 36. Číslo a sken pasu, víza a občanského průkazu ve výchozím nastavení vidí jen zaměstnanci s právem na důvěrné údaje, ostatní jen stav a platnost. Jakýkoli jiný typ dokumentu, třeba lékařskou prohlídku, může firma stejným způsobem skrýt v nastavení. Identifikační číslo a číslo bankovního účtu chrání samostatné právo a zobrazují se maskovaná.",

    q9: "Jak jste na tom s řidiči ze třetích zemí — Ukrajina, Srbsko, Uzbekistán?",
    a9: "Pro občany mimo EU je povinný seznam delší: kromě pasu, řidičského průkazu a karty tachografu k němu patří i vízum, licence dopravce a Kód 95. Připravenost na cestu se počítá podle tohoto rozšířeného seznamu, ne podle obecné šablony: dokud řidiči chybí jeho dokumenty, jako připravený se neukáže.",

    q12: "Telematiku už máme. Potřebuje ji G-Track?",
    a12: "Není nutná: dokumenty, tabule, rotace, opravy a servis fungují i bez ní a kilometry se zadávají ručně. Napojíme váš systém sledování vozidel — a kilometry přicházejí přímo z vozu, G-Track vidí, čí karta je v tachografu, a všimne si vozu, který jede bez plánu.",

    q10: "Kolik to stojí pro 40 vozidel a 45 návěsů? Platí se za každého uživatele?",
    a10: "Tarif Starter — 150 € měsíčně, při roční platbě 125 €. Zahrnuje 50 vozidel, 100 řidičů a 75 návěsů, takže váš vozový park se vejde s rezervou. Místa dispečerů a personalistů se nepočítají: účet založte každému, kdo ho potřebuje.",
    a10b: "Třicet dní dema bez karty a bez telefonátu s obchodníkem. Ceny jsou na téhle stránce, ne „na vyžádání“.",

    notHead: "Co G-Track nedělá",
    notSub: "Abyste třicet dní dema nestrávili hledáním něčeho, co tu není.",
    not1: "Nevyhodnocuje tachograf. Nečteme DDD soubory, nepočítáme režim práce a odpočinku ani kabotáž 3/7.",
    not2: "Neukazuje vozidla na mapě. Kilometry a pohyb bere G-Track přímo z vozu, ale mapu ani trasy nemá — to je vaše telematika.",
    not3: "Nevede zakázky a přepravy. Zakázky a fakturace jsou na horizontu, dnes tu nejsou.",
    not4: "Nepočítá mzdy a nenahrazuje účetnictví.",
    notBridge: "Nenahrazujeme software na tachografy ani telematiku. Pokrýváme to, co v nich není: lidi, dokumenty, termíny a kdo který den jede.",
  },

  final: {
    overline: "Cena pro první",
    h2: "Začněte hned teď — cena jede s vámi.",
    ctaTrial: "Vyzkoušet na 30 dní",
    ctaPricing: "Zobrazit ceník",
    migrate: "Data v Excelu? Zmigrujeme je zdarma — ",
  },

  footer: {
    tagline: "EU compliance, plánování, vozidla a servis pro dopravce",
    legalHeading: "Právní informace",
    privacy: "Ochrana soukromí",
    terms: "Podmínky použití",
    dpa: "Zpracování údajů",
    securityHeading: "Zabezpečení dat",
    trust1: "Data uložená v EU",
    trust2: "Soulad s GDPR",
    trust3: "Přístup podle rolí",
    langs: "12 jazyků",
    rights: "© 2026 G-Track Software s.r.o.",
  },

  /* латинизированные имена — как в en (не переводятся) */
  names: {
    kratochvil: "M. Kratochvil", kratochvilAv: "MK",
    savchenko: "P. Savchenko", savchenkoAv: "PS",
    novak: "J. Novak", novakAv: "JN",
    berzins: "E. Berzins", berzinsAv: "EB",
  },

  /* ---- словарь мокапов: термины = app-локаль cs (driverPill, kpi, табы) ---- */
  mock: {
    planning: "Plánování", week24: "Týden 24 · 8.–13. června", colDriver: "Řidič",
    d1: "Po 08", d2: "Út 09", d3: "St 10", d4: "Čt 11", d5: "Pá 12",
    kpiTrip: "Právě na cestě", kpiVac: "Na dovolené", kpiFree: "Volní",
    stActive: "Aktivní", stTrip: "Na cestě", ready: "na cestu",
    vacUntil: "Dovolená do 15.06", sick: "Nemocenská",
    toastWarnT: "Souhrn e-mailem: vízum vyprší 12.07", toastWarnD: "P. Savchenko · zbývá 32 dní",
    mcH: "Vízum · P. Savchenko",
    mc1: "Nahrán nový sken víza",
    mc2: "G-Track sám rozpoznal číslo a datum",
    mc3: "Platnost víza v evidenci: 08.2028",
    mcSub2: "CZ-4471920 · do 03.08.2028",
    chipVisaWarn: "VIS · 32 dní", chipVisaOk: "VIS · 2028",
  },
};
