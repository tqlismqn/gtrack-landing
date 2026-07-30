/* ============================================================================
   G-Track Landing — lietuviška lokalė (lt).
   Terminologija 1:1 su programa (gtrack-tms/src/i18n/locales/lt.ts):
   driverPill (Aktyvus / Kelyje / Atostogos / Nedarbingumas),
   Pasirengimas reisui / Parengtis, moduliai (Vairuotojai / Dokumentai /
   Planavimas / Transporto priemonės / Užsakymai / Sąskaitų išrašymas /
   Transporto priemonės ekonomika / Vairuotojo Telegram programėlė),
   founding-leksika (founding kaina, kaina užfiksuota, po oficialaus
   paleidimo, veiksmų planas), dokumentai (Viza, Pridėti dokumentą,
   Dokumento tipas, Skubu), dienų vienetas «d.».
   Kainos, procentai ir skaičiai — baitas į baitą kaip en/ru.
   ============================================================================ */

import type { LandingDict } from "../landing-i18n";

export const lt: LandingDict = {
  meta: {
    title: "G-Track — EU atitiktis ir reisų planavimas vežėjams",
    description:
      "Vairuotojai, dokumentai, planavimas ir parkas — vienoje naršyklės programoje. Įdiegiama per dieną. Kainos — šiame puslapyje.",
  },

  nav: {
    product: "Produktas",
    pricing: "Kainos",
    roadmap: "Planas",
    login: "Prisijungti",
    ctaFull: "Išbandyti 30 dienų",
    ctaShort: "30 dienų nemokamai",
    ctaTiny: "30 dienų",
    themeAria: "Perjungti svetainės temą",
    langAria: "Sąsajos kalba",
    menuAria: "Navigacijos meniu",
    langRu: "Русский",
    langEn: "English",
    langNote: "+10 kalbų programoje",
  },

  hero: {
    kicker: "EU atitiktis · planavimas · parkas",
    h1: "Kiekvienas vairuotojas pasirengęs reisui.",
    h1dim: "Visada.",
    sub: " — EU atitikties ir reisų planavimo sistema vežėjams, turintiems 25 ir daugiau transporto priemonių. Vairuotojai, dokumentai, dispečerinė lenta ir parkas — naršyklėje, be papildomos įrangos ir diegimo konsultantų. Įdiegiama per dieną.",
    ctaTrial: "Išbandyti 30 dienų",
    ctaPricing: "Pamatyti kainas",
    micro1: "Be banko kortelės",
    micro2: "Registracija per 2 minutes",
    micro3: "Duomenys saugomi ES",
    boardAria:
      "G-Track dispečerinė lenta: vairuotojas įkelia skenuotą dokumentą per Telegram, viza pratęsiama, vairuotojas vėl išvyksta į reisą",
    boardCaption:
      "Vairuotojas įkėlė skeną per Telegram → G-Track atpažino ir pratęsė → vėl į reisą",
  },

  trust: {
    m1: "vairuotojo dokumentų tipų",
    m2: "demo dienų be skambučio",
    m3: "sąsajos kalbų",
  },

  pain: {
    collageAria:
      "Koliažas: lentelės, žinučių programa ir popierinis aplankas byra, o pro juos ryškėja tvarka",
    excelTitle: "Vairuotojai_2026_FINAL_v7.xlsx",
    xlsHdrDriver: "Vairuotojas",
    xlsHdrVisa: "Viza",
    xlsHdrA1: "A1",
    xlsHdrNote: "Pastabos",
    xlsR1n: "Petr S.", xlsR1v: "12.07??", xlsR1a: "yra", xlsR1note: "paklausti Iros",
    xlsR2n: "Marek K.", xlsR2v: "???", xlsR2a: "—", xlsR2note: "aplankas pas Tomą",
    xlsR3n: "Jan N.", xlsR3v: "2027", xlsR3a: "yra", xlsR3note: "atostogos nuo 15 d.",
    xlsR4n: "Oleg D.", xlsR4v: "rugp.?", xlsR4a: "baigėsi", xlsR4note: "—",
    chatTitle: "Dispečerinė · pokalbis",
    chat1: "kur Petro viza??",
    chat2: "rodos, baigiasi rugpjūtį",
    chat3: "ar čia buvo A1… pas ką aplankas?",
    chat4: "jis reise iki penktadienio!!",
    folderTitle: "Spinta · 2 lentyna",
    folder1: "A1 — Lenkija (skenai 2024)",
    folder2: "Code 95 — originalai",
    folder3: "Medicininės pažymos — ???",
    orderName: "Petr Savchenko",
    overline: "Status quo",
    h2: "Kaip tai atrodo šiandien",
    sub: "Excel su pastabomis, susirašinėjimas žinutėmis, popieriniai aplankai. Sistema veikia tol, kol viską atsimena vienas žmogus.",
    fact1a: "Viza rasta ",
    fact1b: "likus 3 savaitėms iki galiojimo pabaigos",
    fact1c: " — atsitiktinai, senoje susirašinėjimo gijoje.",
    fact2a: "Bauda už kabotažo pažeidimą — ",
    fact2b: "iki 7 500 €", // U+202F kaip ru/en šaltinyje
    fact2c: " už vieną reisą. Daugiau nei metinė prenumerata.",
    fact3a: "Dispečeris laiko ",
    fact3b: "40 vairuotojų galvoje",
    fact3c: ". Kol neišeina atostogų.",
  },

  scrolly: {
    overline: "Produktas",
    h2: "Vieno vairuotojo istorija",
    s1h: "Vairuotojas sistemoje",
    s1p: "Kortelė, statusas, dokumentai ir pasirengimas reisui — viskas vienoje vietoje. Banko duomenys — pagal vaidmenis.",
    s2h: "Viza baigia galioti po 30 dienų",
    s2p: "G-Track terminus skaičiuoja pats. Žymelė pagelsta, dispečeris ir vairuotojas gauna priminimą.",
    s3h: "HR pratęsia",
    s3p: "Skenas įkeltas — G-Track pats atpažįsta numerį ir datą. Žymelė sužaliuoja, parengtis auga.",
    s4h: "Vėl į reisą",
    s4p: "Reisas gula ant lentos, užsakymas prisegtas. Kiekvienas pakeitimas — istorijoje.",
    cap1b: "Vairuotojas sistemoje.",
    cap1: " Kortelė: statusas, dokumentai, konfidencialūs duomenys — pagal vaidmenis.",
    cap2b: "Viza baigia galioti.",
    cap2: " Priminimas dispečeriui ir Telegram pranešimas vairuotojui.",
    cap3b: "HR pratęsia.",
    cap3: " G-Track pats atpažįsta numerį ir datą iš skeno — žymelė sužaliuoja.",
    cap4b: "Vėl į reisą.",
    cap4: " Reisas lentoje, kiekvienas pakeitimas — istorijoje.",
    outroB: "Vienas vairuotojas — dešimtys terminų.",
    outro: " Jūs jų turite šimtą.",
    skip: "Praleisti istoriją",
  },

  vid: {
    overline: "Europos rinka",
    h2: "Sukurta Europos vežėjams.",
    sub: "A1, posted workers, Code 95, vizos — jau šiandien suvaldyta. Kabotažas 3/7 — plėtros plane.",
    chip1: "Kabotažas 3/7",
    chip2: "A1 / posted workers",
    chip3: "Code 95",
    chip4: "ADR",
    chip5: "Tachografas",
    chip6: "12 sąsajos kalbų",
    tag: "VIDEO · PLACEHOLDER",
  },

  langs: {
    overline: "Lokalizacija",
    h2: "12 sąsajos kalbų",
    sub: "Dispečeris ir HR dirba gimtąja kalba — personalo apmokymas trunka dieną, o ne mėnesį.",
  },

  europe: {
    overline: "Geografija",
    h2: "Visa Europa vienoje lentoje",
    sub: "A1, posted workers, vairuotojų dokumentai — sukurta pagal ES taisykles. Kiekvienas reisas vienoje lentoje.",
    mapAria: "Europos maršrutų žemėlapis, pereinantis į planavimo lentą",
    captionB: "Visas šis chaosas valdomas iš čia",
    caption: " — iš vienos dispečerinės lentos.",
  },

  modules: {
    overline: "Moduliai",
    h2: "Branduolys veikia. Horizontas — atviras.",
    ready: "Parengta",
    soon: "Netrukus",
    m1: "Vairuotojai", m1d: "Kortelės, statusai, pasirengimas reisui",
    m2: "Dokumentai", m2d: "16 tipų, terminai, skenų atpažinimas",
    m3: "Planavimas", m3d: "Lenta vairuotojai × dienos, reisai, konfliktai",
    m4: "Transporto priemonės", m4d: "Vilkikai ir priekabos, TÜV, draudimas",
    m5: "Užsakymai", m5d: "Užsakymas → reisas → dokumentai",
    m6: "Sąskaitų išrašymas", m6d: "Sąskaitos iš reisų",
    m7: "Transporto priemonės ekonomika", m7d: "Cost-per-km kiekvienam vilkikui",
    m8: "Vairuotojo Telegram programėlė", m8d: "Dokumentai ir reisai kišenėje",
    m9: "Žinutės", m9d: "Pokalbis su vairuotoju su integruotu vertimu",
    cta: "Visas veiksmų planas",
  },

  pricing: {
    overline: "Kainos",
    h2: "Visa rinka slepia kainas už „contact sales“. Mes — ne.",
    sub: "Kainos — čia pat. Registracija be skambučio, 30 dienų demo. Visi moduliai — visuose planuose: skiriasi tik parko pajėgumas. ",
    subB: "Jokių užrakintų funkcijų.",
    periodAria: "Atsiskaitymo laikotarpis",
    perMo: "Mėnuo",
    perQ: "Ketvirtis",
    perY: "Metai",
    discQ: "−6.7%",
    discY: "−16.7%",
    /* SKAIČIAI SINCHRONIZUOTI SU STRIPE LIVEMODE — NEKEISTI */
    billedMo: "apmokestinama kas mėnesį",
    billedQ: "per ketvirtį",
    billedY: "per metus",
    perMonth: "/mėn.",
    afterLaunch: "po paleidimo",
    perTruck: "už transporto priemonę/mėn.",
    starterBlurb: "Nedidelis parkas, įsivedantis tvarką dokumentuose",
    fleetBlurb: "Vidutinio vežėjo darbinis arklys su dispečerine pamaina",
    businessBlurb: "Didelis parkas su keliomis dispečerinėmis",
    plusBlurb: "Parkas, viršijantis 1000 transporto priemonių — sąlygos pritaikytos jūsų procesams",
    fleetFlag: "Daugumos pasirinkimas",
    choose: "Pasirinkti",
    plusPrice: "Individuali",
    plusGa: "sąlygos — sutartyje",
    plusBilled: "pagal sutartį",
    plusCta: "Rašyti sales@",
    lock12: "Kaina užfiksuota 12 mėn.",
    lock24: "Kaina užfiksuota 24 mėn.",
    lockContract: "Užfiksuota sutartyje",
    capTrucks: "transporto priemonių",
    capDrivers: "vairuotojų",
    capTrailers: "priekabų",
    capSeats: "dispečerio vietų",
    upTo: "iki",
    plusTrucks: "transporto priemonių",
    plusUnlim: "neribotai",
    packLead: "Reikia daugiau?",
    packMax: "iki 5 paketų",
    plusSla: "SLA",
    plusSlaSuffix: "ir prioritetinis palaikymas",
    foundingB: "Pradinė kaina lieka su jumis 12–24 mėnesius po oficialaus paleidimo.",
    founding: " Nauji klientai po paleidimo mokės daugiau — jūs ne.",
    noteA: "Metai — tai ",
    noteB: "„2 mėnesiai nemokamai“",
    noteC: ". Nemokama duomenų migracija iš Excel ankstyviesiems klientams.",
    anchorOverline: "Skaičiavimas",
    anchorBig: "≈ 2,25 €",
    anchorUnit: "už vienetą/mėn. · 200 vienetų parkas",
    anchorArg: "Viena kabotažo bauda — iki 7 500 €. Viena pasibaigusi viza — sustabdytas reisas. G-Track laiko visą parką kontroliuojamą pigiau, nei kainuoja vienas toks sutrikimas.",
  },

  /* Klausimai: formuluotės paimtos iš realių vežėjų prieštaravimų, atsakymai —
     tik apie patikrinamus produkto faktus. Baudų sumų ir nuorodų į įstatymų
     straipsnius sąmoningai nenurodome: įstatymai keičiasi, o tekstas gyvena
     12 lokalių. JSON-LD FAQPage NEDEDAME — Google FAQ ištraukas išjungė
     2026 m. gegužės 7 d. */
  faq: {
    overline: "Klausimai",
    h2: "Ko vežėjai klausia prieš susikurdami paskyrą",
    sub: "Trumpi atsakymai be „susisiekite su mumis“. Čia tai, ko mūsų klausia dažniausiai — įskaitant tai, ko mes nedarome.",
    askLead: "Savo klausimo neradote?",
    askCta: "Parašykite — atsakysime taip pat trumpai",

    g1: "Terminai ir atsakomybė",
    g2: "Įdiegimas ir duomenys",
    g3: "Prieiga, parkas, kaina",

    q1: "Kaip sistema primins, kad vairuotojui baigia galioti dokumentas?",
    a1: "Kiekvieną rytą 8:00 G-Track patikrina viso parko dokumentus. Pasas pakelia žymą prieš 180 dienų, gyvenamosios vietos deklaracija — prieš 60, visi kiti — prieš 90. Pranešimas išeina trimis kanalais vienu metu: el. laišku į biurą, žyma pačioje programoje ir Telegram pranešimu vairuotojui.",
    a1b: "Kanalus ir laiškų dažnumą kiekvienam pranešimo tipui nustatote patys. Todėl priminimas nekabo ant vieno žmogaus ir nepražūva, kol HR atostogauja.",

    q2: "Kas atsako, jei vairuotojas išvyko į reisą su nebegaliojančiu dokumentu?",
    a2: "Daugumoje ES šalių — vežėjas, o ne vien vairuotojas: bauda skiriama įmonei, o kai kuriose šalyse atskirai ir už transportą atsakingam vadovui. Konkrečios sumos ir tvarka priklauso nuo tikrinančios šalies. Būtent todėl G-Track primena ne vairuotojui, o biurui — tam, kas įrašo reisą į planą.",

    q3: "Ar dispečerinėje lentoje matoma, kas negali išvykti dėl dokumento?",
    a3: "Taip, lenta sudeda žmones, transporto priemones ir terminus į vieną vietą: kas atostogose, kas nedarbingumo lapelyje, kas be transporto priemonės, kieno dokumentas netvarkoje. Kiekvienas plano pakeitimas rašomas į veiklos žurnalą — matote ne tik esamą vaizdą, bet ir kas bei kada jį pakeitė.",

    q4: "Turiu 40–60 vairuotojų ir metais kauptus skenus Excel bei aplankuose. Kas visa tai perkels?",
    a4: "Pradėti galima ir be archyvo: įveskite vairuotojus ir tuos dokumentus, kurių terminai arčiausiai — priminimai pradės veikti jau vien iš to. Seni skenai keliami pakeliui ir nieko neblokuoja.",
    a4b: "Perkėlimą iš Excel ankstyviesiems klientams atliekame nemokamai. Atsiųskite failą tokį, kokį turite — su pastabomis, tuščiais laukais ir „??“ datų vietoje.",

    q5: "Kur fiziškai laikomi duomenys ir skenai? Ar pasirašysite DPA?",
    a5: "Duomenys ir failai — Europos Sąjungoje, duomenų centras Airijoje. Duomenų apdorojimo dokumentas paskelbtas, nuoroda — puslapio apačioje; pasirašome. Prieigą prie jautrių laukų jūsų įmonės vidyje riboja vaidmenys, o ne viena bendra varnelė.",

    q6: "Jei nuspręsiu išeiti — ar atsiimsiu duomenis?",
    a6: "Duomenis bet kada ir be atskiro prašymo atsisiunčiate CSV formatu: vairuotojų sąrašas, dokumentų statusai, terminai. Skenai lieka jūsų: šiuo metu jie atsisiunčiami po vieną, visą archyvą perduodame pagal prašymą. Paskyrą ištrinate patys, be skambučio iš „išlaikymo vadybininko“.",

    q7: "Ką turi daryti vairuotojas? Ar jam reikia ką nors įsidiegti?",
    a7: "Nieko. Vairuotojas dirba Telegram, kurį jau turi: mato savo dokumentus ir terminus, savo pamainą ir transporto priemonę, naujo dokumento nuotrauką atsiunčia tiesiai į pokalbį. Vertimas įmontuotas — vairuotojas rašo savo kalba, dispečeris skaito savąja.",
    a7b: "Programėlei reikia interneto. Dokumentų originalų kabinoje tai neatšaukia.",

    q8: "Ar dispečeris gali matyti grafiką, bet nematyti paso ir medicininės pažymos?",
    a8: "Taip, ir taip yra pagal nutylėjimą. Teisės dalijamos po vieną — jų daugiau nei trisdešimt. Asmens kodas ir banko sąskaitos numeris yra už atskiros teisės ir rodomi užmaskuoti. Kuriuos dokumentų tipus laikyti konfidencialiais, kiekviena įmonė sprendžia pati.",

    q9: "Kaip pas jus su vairuotojais iš trečiųjų šalių — Ukraina, Serbija, Uzbekistanas?",
    a9: "Ne ES pilietybę turintiems vairuotojams privalomas sąrašas yra kitas ir ilgesnis: viza, pasas, Kodas 95, gyvenamosios vietos deklaracija. Pasirengimas reisui skaičiuojamas būtent pagal šį išplėstą sąrašą — vairuotojas nebus rodomas parengtas, kol neuždaryti būtent jo dokumentai, o ne bendras šablonas.",

    q10: "Kiek tai kainuoja parkui iš 40 transporto priemonių ir 45 priekabų? Ar mokėti už kiekvieną naudotoją?",
    a10: "Starter planas — 150 € per mėnesį, mokant už metus 125 €. Į jį įeina 50 transporto priemonių, 100 vairuotojų ir 75 priekabos, tad jūsų parkas įsitalpina su atsarga. Dispečerių ir HR vietos neskaičiuojamos: įveskite visus, kam reikia.",
    a10b: "Trisdešimt dienų demo be kortelės ir be vadybininko skambučio. Kainos — šiame pačiame puslapyje, o ne „pagal užklausą“.",

    notHead: "Ko G-Track nedaro",
    notSub: "Kad nesugaištumėte trisdešimties demo dienų tikrindami tai, ko čia nėra.",
    not1: "Neanalizuoja tachografo. Neskaitome DDD failų, neskaičiuojame darbo ir atokvėpio režimo ir neskaičiuojame kabotažo 3/7.",
    not2: "Neseka transporto priemonių. Nei GPS pėdsako, nei maršrutų realiu laiku — tai jūsų telematika.",
    not3: "Netvarko užsakymų ir frachto. Užsakymai ir sąskaitos — plėtros plane, šiandien jų nėra.",
    not4: "Neskaičiuoja atlyginimų ir nekeičia buhalterijos.",
    notBridge: "Mes nekeičiame tachografų programinės įrangos ir telematikos. Mes uždengiame tai, ko jose nėra: žmonės, dokumentai, terminai ir kas kurią dieną vyksta.",
  },

  final: {
    overline: "Kaina pirmiesiems",
    h2: "Pradėkite dabar — kaina keliauja su jumis.",
    ctaTrial: "Išbandyti 30 dienų",
    ctaPricing: "Pamatyti kainas",
    migrate: "Duomenys Excel lentelėse? Perkelsime nemokamai — ",
  },

  footer: {
    tagline: "ES atitiktis ir planavimas vežėjams",
    legalHeading: "Teisinė informacija",
    privacy: "Privatumas",
    terms: "Naudojimo sąlygos",
    dpa: "Duomenų tvarkymas",
    securityHeading: "Duomenų sauga",
    trust1: "Duomenys saugomi ES",
    trust2: "Atitiktis BDAR",
    trust3: "Prieiga pagal vaidmenis",
    langs: "12 kalbų",
    rights: "© 2026 G-Track Software s.r.o.",
  },

  names: {
    kratochvil: "M. Kratochvil", kratochvilAv: "MK",
    savchenko: "P. Savchenko", savchenkoAv: "PS",
    savchenkoFull: "Petr Savchenko",
    novak: "J. Novak", novakAv: "JN",
    berzins: "E. Berzins", berzinsAv: "EB",
  },

  /* ---- mokapų žodynas: terminai = programos lt.ts ---- */
  mock: {
    planning: "Planavimas", week24: "24 savaitė · birželio 8–13", colDriver: "Vairuotojas",
    d1: "Pr 08", d2: "An 09", d3: "Tr 10", d4: "Kt 11", d5: "Pn 12",
    w1: "Pr 15", w2: "An 16", w3: "Tr 17", w4: "Kt 18", w5: "Pn 19",
    kpiTrip: "Šiandien reise", kpiVac: "Atostogose", kpiNoVeh: "Be transporto priemonės",
    stActive: "Aktyvus", stTrip: "Kelyje", ready: "parengtis",
    vacUntil: "Atostogos iki 15.06", sick: "Nedarbingumas",
    toastWarnT: "Viza baigia galioti po 30 dienų", toastWarnD: "P. Savchenko · pratęsti iki 12.07.2026",
    toastOkT: "Viza pratęsta iki 08.2028", toastOkD: "Numeris ir data atpažinti iš skeno",
    docs: "Dokumentai", urgent: "Skubu", nonEU: "NON-EU",
    tabOverview: "Apžvalga", tabDocs: "Dokumentai", tabComments: "Komentarai", tabHistory: "Istorija",
    confid: "Konfidencialu", confNote: "Banko duomenis mato tik tie, kuriems jie skirti.",
    cardTitle: "Vairuotojo kortelė", remindTitle: "Dokumentai · priminimas",
    remindT: "Viza baigia galioti 12.07.2026", remindD: "Automatinis priminimas prieš 30 dienų · atsakingas: HR",
    tgBot: "G-Track Bot",
    tgMsg: "Petrai, jūsų viza baigia galioti 12.07. Įkelkite naują dokumentą arba kreipkitės į HR.",
    tgTime: "šiandien · 08:00",
    dlgTitle: "Pridėti dokumentą", dlgQuick: "Greitas užpildymas pagal dokumentą",
    fldType: "Dokumento tipas", fldTypeV: "Viza (VIS)", fldNum: "Numeris", fldUntil: "Galioja iki",
    recognized: "atpažinta",
    week25: "Planavimas · 25 savaitė",
    histTs1: "šiandien 14:02", hist1: "Pakeistas statusas — Kelyje (3QR 6671)", histBy1: "disp. S. Malek",
    histTs2: "šiandien 13:58", hist2: "Atnaujintas dokumentas — Viza (VIS)", histBy2: "HR · I. Koval",
    histNote: "Kiekvienas pakeitimas — istorijoje.",
    mcH: "Viza · P. Savchenko",
    mc1: "Vairuotojas įkėlė skeną per Telegram",
    mc2: "G-Track pats atpažino numerį ir datą",
    mc3: "Viza pratęsta iki 08.2028",
    mcSub2: "CZ-4471920 · iki 03.08.2028",
    chipVisaWarn: "VIS · 30 d.", chipVisaOk: "VIS · 2028",
  },
};
