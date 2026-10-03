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
   Kainos, procentai ir skaičiai — baitas į baitą kaip en/ru, išskyrus
   dešimtainį skyriklį: kablelis (≈ 2,25 €, −6,7%).
   ============================================================================ */

import type { LandingDict } from "../landing-i18n";

export const lt: LandingDict = {
  meta: {
    title: "G-Track — EU atitiktis ir reisų planavimas vežėjams",
    description:
      "Vairuotojų dokumentai, reisai ir atostogos, remontas ir TA — vienoje naršyklės programoje vežėjams su 50+ vilkikų. 30 dienų nemokamai, kainos — puslapyje.",
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
    kicker: "EU atitiktis · planavimas · parkas ir servisas",
    h1: "Kiekvienas vairuotojas pasirengęs reisui.",
    h1dim: "Visada.",
    sub: " — EU atitikties ir planavimo sistema vežėjams, turintiems 50 ir daugiau transporto priemonių. Vairuotojų dokumentai, reisai ir atostogos, remontas ir TA — naršyklėje, be papildomos įrangos ir diegimo konsultantų. Ką šiandien reikia spręsti, sistema parodo pati.",
    ctaTrial: "Išbandyti 30 dienų",
    ctaPricing: "Pamatyti kainas",
    micro1: "Be banko kortelės",
    micro2: "Registracija per 2 minutes",
    micro3: "Duomenys saugomi ES",
    boardAria:
      "G-Track dispečerinė lenta: jūs įkeliate dokumento skeną, sistema atpažįsta numerį bei galiojimo terminą, jūs patikrinate ir išsaugote įrašą",
    boardCaption:
      "Įkeliate skeną → G-Track atpažįsta numerį ir terminą → jūs patikrinate ir išsaugote",
  },

  /* Полоса под первым экраном (TrustStrip): чипы-ссылки на модули, решение владельца 03.10.
     Термины — из app-локали lt: nav (Vairuotojai, Planavimas, Sprendimų centras,
     Transportas, Remontas ir TA, Prašymai), vehicles_sub (Vilkikai / Priekabos), «reisai»;
     c8 — заголовок roadmap.tracks.telegram, c7 — фраза из его telematics.d, c9 = vid.chip6.
     aria начинается с бренда: «G-Track» не склоняется, местный падеж звучал бы криво. */
  trust: {
    aria: "G-Track: kas jau veikia",
    c1: "Vairuotojai · 16 dokumentų tipų",
    c2: "Planavimas · lenta ir reisai",
    c3: "Sprendimų centras",
    c4: "Rotacija · 3 mėnesiams į priekį",
    c5: "Transportas · vilkikai ir priekabos",
    c6: "Remontas ir TA",
    c7: "Telematika · jūsų transporto stebėjimo sistema",
    c8: "Telegram vairuotojams · prašymai ir priminimai",
    c9: "12 sąsajos kalbų",
  },

  /* Подвал OG-картинки (og-image.tsx): подписи к числам 16 и 30 — бывшие trust.m1/m2
     дословно: полоса стала чипами (03.10), а картинка для шеров осталась прежней. */
  og: {
    docTypes: "vairuotojo dokumentų tipų",
    langs: "sąsajos kalbų",
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
    fact2a: "Vairuotojas su pasibaigusiu Kodu 95 — ",
    fact2b: "iki 20 000 €", // U+202F kaip ru/en šaltinyje
    fact2c: " baudos įmonei Vokietijoje. Daugiau nei bet kurio plano metinė prenumerata.",
    fact3a: "Dispečeris laiko ",
    fact3b: "40 vairuotojų galvoje",
    fact3c: ". Kol neišeina atostogų.",
  },

  scrolly: {
    overline: "Produktas",
    h2: "Vieno vairuotojo istorija",
    s1h: "Vairuotojas sistemoje",
    s1p: "Kortelė, statusas, dokumentai ir pasirengimas reisui — viskas vienoje vietoje. Banko duomenys — pagal vaidmenis.",
    s2h: "Iki techninės — 4 200 km",
    s2p: "Odometras atkeliauja tiesiai iš automobilio. G-Track pats suskaičiuoja, kiek liko iki techninės, ir paryškina automobilius, kuriems laikas į servisą, — be sąsiuvinių ir skambučių mechanikui.",
    s3h: "Barselona: automobilio keitimas",
    s3p: "Automobilis išvažiuoja į servisą, vairuotojas įkiša savo kortelę į kitą. G-Track pats perkelia reisą į naują automobilį — arba paklausia dispečerio, kaip nustatysite.",
    s4h: "Vėl į reisą",
    s4p: "Reisas atsiranda lentoje. Kiekvienas pakeitimas — istorijoje.",
    cap1b: "Vairuotojas sistemoje.",
    cap1: " Kortelė: statusas, dokumentai, konfidencialūs duomenys — pagal vaidmenis.",
    cap2b: "Kilometrai iki techninės.",
    cap2: " Odometras iš automobilio ir likutis iki techninės — matyti, kuriems automobiliams laikas į servisą.",
    cap3b: "Reisas persikėlė pats.",
    cap3: " Vairuotojo kortelė naujame automobilyje — įrašas istorijoje.",
    cap4b: "Vėl į reisą.",
    cap4: " Reisas lentoje, kiekvienas pakeitimas — istorijoje.",
    mapAria: "Europos žemėlapis: reisas Praha → Miunchenas → Lionas → Barselona, automobilis dabartinėje maršruto atkarpoje",
    leg1: "Praha → Miunchenas",
    leg2: "Miunchenas → Lionas",
    leg3: "Lionas → Barselona",
    arrived: "Atvykimas · Barselona",
    outroB: "Vienas vairuotojas — daugiau nei dešimt terminų.",
    outro: " Jūs jų turite šimtą.",
    skip: "Praleisti istoriją",
  },

  vid: {
    overline: "Europos rinka",
    h2: "Sukurta Europos vežėjams.",
    sub: "A1, Code 95, vizos — terminai suvaldyti jau šiandien.",
    chip2: "A1",
    chip3: "Code 95",
    chip4: "ADR",
    chip5: "DDD iššifravimas",
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
    sub: "Kas reise, kas atostogose, kuris automobilis servise — lentoje. Kas grįš ir kas bus laisvas — 14 dienų, mėnesį ar tris mėnesius į priekį.",
    mapAria: "Europos maršrutų žemėlapis, pereinantis į planavimo lentą",
    captionB: "Visas šis chaosas valdomas iš čia",
    caption: " — iš vienos lentos ir vieno sprendimų sąrašo.",
  },

  modules: {
    h2: "Ne „netrukus“. Dabar.",
    cta: "Visas veiksmų planas",
  },

  /* Страница дорожной карты (/roadmap). Свой H1 и свои meta: заголовок главной
     сюда не наследуется — иначе 12 страниц карты получают title продукта. */
  roadmap: {
    meta: {
      title: "G-Track planas — kas veikia, ką kuriame, kas toliau",
      description:
        "Trys G-Track plėtros horizontai: kas jau veikia, ką kuriame dabar ir kas bus toliau. Be kalendorinių datų ir pažadų.",
    },
    h1: "Kas jau veikia, ką kuriame ir kas bus toliau",
    lede: "Čia matote, kuria linkme juda produktas: kas jau veikia, ką kuriame dabar ir kas bus toliau. Datų nežadame — rodome kryptį.",
    now: "Jau veikia",
    wip: "Kuriama",
    next: "Toliau",
    releases: "{n}+ atnaujinimų nuo paleidimo 2026 m. gegužę.",
    nowMark: "Dabar",
    launch: "Paleidimas 1.0",
    aria: "G-Track plėtros kryptys: kas veikia, kas kuriama ir kas planuojama",
    tracks: {
      drivers: { t: "Vairuotojai ir dokumentai", d: "Kortelės, 16 dokumentų tipų, 8 šalių taisyklės" },
      planning: { t: "Planavimas ir autopilotas", d: "Lenta, Sprendimų centras, rotacija, tacho kortelės autopilotas" },
      fleet: { t: "Transportas ir servisas", d: "Autoparkas, remontas ir TA, borto duomenys" },
      telematics: { t: "Telematikos integracija", d: "Prijungiame jūsų transporto stebėjimo sistemą — duomenys apie automobilius ateina patys, planavimui ir TA skaičiavimui. Galima ir rankiniu būdu." },
      telegram: { t: "Telegram vairuotojams", d: "Prašymai dėl atostogų ir nedarbingumo, šiandienos pamaina, priminimai apie dokumentų terminus" },
      reports: { t: "Ataskaitos ir pranešimai", d: "Savaitės ataskaita, pranešimų centras, tacho failų terminai" },
      companies: { t: "Susietos įmonės", d: "Kelios vieno savininko įmonės: kiekviena su savo prenumerata, viena kitos transportą ir vairuotojus mato tik peržiūros režimu" },
      finance: { t: "Užsakymai ir finansai", d: "Užsakymai, sąskaitos, baudos, transporto priemonės ekonomika" },
      integrations: { t: "Žemėlapis ir integracijos", d: "Žemėlapis ir maršrutai, DDD iššifravimas, API, krovinių biržos" },
    },
    ms: { autopilot: "Autopilotas", decisions: "Sprendimų centras", rotation: "Rotacija", service: "Remontas ir TA", miniapp: "Mini programėlė", telematics: "Pirmoji integracija" },
  },

  pricing: {
    overline: "Kainos",
    h2: "Visa rinka slepia kainas už „contact sales“. Mes — ne.",
    sub: "Kainos — čia pat. Registracija be skambučio, 30 dienų demo. Visi moduliai — visuose planuose: skiriasi tik parko pajėgumas.",
    periodAria: "Atsiskaitymo laikotarpis",
    perMo: "Mėnuo",
    perQ: "Ketvirtis",
    perY: "Metai",
    discQ: "−6,7%",
    discY: "−16,7%",
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
    anchorArg: "Vienas vairuotojas su pasibaigusiu Kodu 95 — iki 20 000 € baudos Vokietijoje. Viena pasibaigusi viza — sustabdytas reisas. G-Track laiko visą parką kontroliuojamą pigiau, nei kainuoja vienas toks sutrikimas.",
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
    a1: "Kiekvieną rytą G-Track patikrina visų vairuotojų dokumentus. Pasas į suvestinę patenka likus 180 dienų, kiti dokumentai — likus 90. Biuras gauna el. laišką, programoje prie dokumento atsiranda žyma „Baigiasi galiojimas“, o vairuotojas, prisijungęs prie Telegram boto, gauna priminimą.",
    a1b: "Suvestinės el. laiškus įjungiate patys ir pasirenkate, kam jie siunčiami: tik savininkui, administratoriams ar visiems nariams. Todėl priminimas nekabo ant vieno žmogaus ir nepražūva, kol HR atostogauja.",

    q2: "Kas atsako, jei vairuotojas išvyko į reisą su nebegaliojančiu dokumentu?",
    a2: "Daugumoje ES šalių — vežėjas, o ne vien vairuotojas: bauda skiriama įmonei, o kai kuriose šalyse atskirai ir už transportą atsakingam vadovui. Konkrečios sumos ir tvarka priklauso nuo tikrinančios šalies. Būtent todėl G-Track pirmiausia primena biurui — tam, kas įrašo reisą į planą, — o vairuotojui, prisijungusiam prie boto, priminimą papildomai atsiunčia per Telegram.",

    q3: "Ar dispečerinėje lentoje matoma, kas negali išvykti dėl dokumento?",
    a3: "Taip, lenta sudeda žmones, transporto priemones ir terminus į vieną vietą: kas atostogose, kas nedarbingumo lapelyje, kas be transporto priemonės, kieno dokumentas netvarkoje. Kiekvienas plano pakeitimas rašomas į veiklos žurnalą — matote ne tik esamą vaizdą, bet ir kas bei kada jį pakeitė.",

    q11: "Ką G-Track daro pats, o ką sprendžia dispečeris?",
    a11: "Pastebi pats: kas grįžta iš atostogų, kieno reisas baigiasi be tolesnio plano, kurie nauji vairuotojai neturi plano — visa tai surenkama Sprendimų centre. Ar sistema keis planą už jus, lemia jūsų pasirinktas režimas: „Rankinis“, „Centras“ arba „Automatinis“. Pagal nutylėjimą sistema tik klausia. Kiekvienas jos atliktas plano pakeitimas įrašomas į žurnalą.",

    q4: "Turiu 40–60 vairuotojų ir metais kauptus skenus Excel bei aplankuose. Kas visa tai perkels?",
    a4: "Pradėti galima ir be archyvo: įveskite vairuotojus ir tuos dokumentus, kurių terminai arčiausiai — priminimai pradės veikti jau vien iš to. Seni skenai keliami pakeliui ir nieko neblokuoja.",
    a4b: "Perkėlimą iš Excel ankstyviesiems klientams atliekame nemokamai. Atsiųskite failą tokį, kokį turite — su pastabomis, tuščiais laukais ir „??“ datų vietoje.",

    q5: "Kur fiziškai laikomi duomenys ir skenai? Ar pasirašysite DPA?",
    a5: "Duomenys ir failai — Europos Sąjungoje, duomenų centras Airijoje. Duomenų apdorojimo dokumentas paskelbtas, nuoroda — puslapio apačioje; pasirašome. Prieigą prie jautrių laukų jūsų įmonės vidyje riboja vaidmenys, o ne viena bendra varnelė.",

    q6: "Jei nuspręsiu išeiti — ar atsiimsiu duomenis?",
    a6: "Kol paskyra aktyvi, duomenis bet kada ir be atskiro prašymo atsisiunčiate CSV formatu: vairuotojų sąrašas, dokumentų statusai, terminai. Skenai lieka jūsų: šiuo metu jie atsisiunčiami po vieną, visą archyvą perduodame pagal prašymą. Paskyrą savininkas ištrina pats, be skambučio iš „išlaikymo vadybininko“.",

    q7: "Ką turi daryti vairuotojas? Ar jam reikia ką nors įsidiegti?",
    a7: "Nieko: Telegram jis jau turi. Per botą jis pateikia prašymą dėl atostogų ar nedarbingumo — prašymas patenka į planavimą, o atsakymas grįžta jam. Jis taip pat mato, kokiu automobiliu šiandien važiuoja, ir gauna priminimus apie savo dokumentų terminus.",
    a7b: "Programėlei reikia interneto. Dokumentų originalų kabinoje tai neatšaukia.",

    q8: "Ar dispečeris gali matyti grafiką, bet nematyti paso ir medicininės pažymos?",
    a8: "Taip. Teisės dalijamos po vieną — jų yra 36. Paso, vizos ir ID kortelės numerį bei skeną pagal nutylėjimą mato tik darbuotojai, turintys prieigą prie konfidencialių duomenų, kiti — tik statusą ir galiojimo terminą. Bet kurį kitą dokumento tipą, pavyzdžiui, medicininę pažymą, įmonė taip pat gali paslėpti nustatymuose. Asmens kodas ir banko sąskaitos numeris yra už atskiros teisės ir rodomi užmaskuoti.",

    q9: "Kaip pas jus su vairuotojais iš trečiųjų šalių — Ukraina, Serbija, Uzbekistanas?",
    a9: "Ne ES pilietybę turintiems vairuotojams privalomas sąrašas ilgesnis: prie paso, vairuotojo pažymėjimo ir tachografo kortelės prisideda viza, transporto licencija ir Kodas 95. Pasirengimas reisui skaičiuojamas būtent pagal šį išplėstą sąrašą — vairuotojas nebus rodomas parengtas, kol neuždaryti būtent jo dokumentai, o ne bendras šablonas.",

    q12: "Telematiką jau turime. Ar ji būtina norint naudotis G-Track?",
    a12: "Nebūtina: dokumentai, lenta, rotacija, remontas ir TA veikia ir be jos, o rida įvedama rankiniu būdu. Prijungiame jūsų transporto stebėjimo sistemą — ir rida ateina tiesiai iš borto, G-Track mato, kieno kortelė tachografe, ir pastebi automobilį, kuris važiuoja be plano.",

    q10: "Kiek tai kainuoja parkui iš 40 transporto priemonių ir 45 priekabų? Ar mokėti už kiekvieną naudotoją?",
    a10: "Starter planas — 150 € per mėnesį, mokant už metus 125 €. Į jį įeina 50 transporto priemonių, 100 vairuotojų ir 75 priekabos, tad jūsų parkas įsitalpina su atsarga. Dispečerių ir HR vietos neskaičiuojamos: įveskite visus, kam reikia.",
    a10b: "Trisdešimt dienų demo be kortelės ir be vadybininko skambučio. Kainos — šiame pačiame puslapyje, o ne „pagal užklausą“.",

    notHead: "Ko G-Track nedaro",
    notSub: "Kad nesugaištumėte trisdešimties demo dienų tikrindami tai, ko čia nėra.",
    not1: "Neanalizuoja tachografo. Neskaitome DDD failų, neskaičiuojame darbo ir atokvėpio režimo ir neskaičiuojame kabotažo 3/7.",
    not2: "Nerodo transporto priemonių žemėlapyje. Ridą ir judėjimą G-Track ima tiesiai iš automobilio, bet žemėlapio ir maršrutų nėra — tai jūsų telematika.",
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
    tagline: "ES atitiktis, planavimas, parkas ir servisas vežėjams",
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
    kpiTrip: "Šiandien reise", kpiVac: "Atostogose", kpiFree: "Laisvi",
    stActive: "Aktyvus", stTrip: "Kelyje", ready: "parengtis",
    vacUntil: "Atostogos iki 15.06", sick: "Nedarbingumas",
    toastWarnT: "Suvestinė el. paštu: viza baigia galioti 12.07", toastWarnD: "P. Savchenko · liko 32 dienos",
    toastOkT: "Įrašytas vizos galiojimas: 08.2028", toastOkD: "Numeris ir data atpažinti iš skeno",
    docs: "Parengtis", urgent: "Skubu", nonEU: "NON-EU",
    tabOverview: "Apžvalga", tabDocs: "Dokumentai", tabComments: "Komentarai", tabHistory: "Istorija",
    confid: "Konfidencialu", confNote: "Banko duomenis mato tik tie, kuriems jie skirti.",
    cardTitle: "Vairuotojo kortelė", remindTitle: "Dokumentai · priminimas",
    remindT: "Viza baigia galioti 12.07.2026", remindD: "Automatinis priminimas prieš 30 dienų · atsakingas: HR",
    tgMsg: "Petrai, jūsų viza baigia galioti 12.07. Įkelkite naują dokumentą arba kreipkitės į HR.",
    tgTime: "šiandien · 08:00",
    dlgTitle: "Pridėti dokumentą", dlgQuick: "Greitas užpildymas pagal dokumentą",
    fldType: "Dokumento tipas", fldTypeV: "Viza (VIS)", fldNum: "Numeris", fldUntil: "Galioja iki",
    recognized: "atpažinta",
    week25: "Planavimas · 25 savaitė",
    histTs1: "šiandien 14:02", hist1: "Pakeistas statusas — Kelyje (4TC 2190)", histBy1: "disp. S. Malek",
    histTs2: "šiandien 13:58", hist2: "Atnaujintas dokumentas — Viza (VIS)", histBy2: "HR · I. Koval",
    histNote: "Kiekvienas pakeitimas — istorijoje.",
    mcH: "Viza · P. Savchenko",
    mc1: "Įkeltas naujas vizos skenas",
    mc2: "G-Track pats atpažino numerį ir datą",
    mc3: "Įrašytas vizos galiojimas: 08.2028",
    mcSub2: "CZ-4471920 · iki 03.08.2028",
    chipVisaWarn: "VIS · 32 d.", chipVisaOk: "VIS · 2028",
    svcTitle: "Rida ir aptarnavimas",
    svcOdo: "Odometras",
    svcNext: "Iki techninės",
    svcInterval: "Aptarnavimo intervalas",
    svcCap: "intervalo",
    svcSource: "iš automobilio",
    svcSoon: "Greitai TA",
    chipSvc: "Techninė · 4 200 km",
    unloadTitle: "Reisas · automobilio keitimas",
    unloadOk: "Reisą perkėlė sistema",
    unloadNote: "Vairuotojo kortelė kitame automobilyje — senas reisas uždarytas, naujas atidarytas.",
    unloadWhere: "Naujas automobilis",
    unloadPlace: "4TC 2190 · Barselona",
    unloadWhen: "Laikas",
    unloadDocV: "Tachografo kortelė",
    sumStatus: "kelyje",
    sumVehicle: "automobilis",
    sumDocs: "parengtis",
  },
};
