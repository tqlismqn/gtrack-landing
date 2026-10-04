/* ============================================================================
   G-Track Landing — latviešu (lv) lokalizācija.
   Terminoloģija sinhronizēta ar lietotnes lokāli gtrack-tms/src/i18n/locales/lv.ts:
   driverPill («Reisā», «Aktīvs», «Atvaļinājums», «Slimības lapa»), «Gatavība
   reisam», «attīstības plāns», «dispečerpults», «dispečeru vietas», days_short
   «d.», cenas/procenti — baits-baitā ar RU/EN (Stripe livemode), izņemot
   decimālo atdalītāju: komats (≈ 2,25 €, −6,7%).
   ============================================================================ */

import type { LandingDict } from "../landing-i18n";

export const lv: LandingDict = {
  meta: {
    title: "G-Track — ES atbilstība un reisu plānošana pārvadātājiem",
    description:
      "Vadītāju dokumenti, reisi un atvaļinājumi, remonts un apkope — vienā pārlūka lietotnē pārvadātājiem ar 50+ mašīnām. 30 dienas bez maksas, cenas — lapā.",
  },

  nav: {
    product: "Produkts",
    pricing: "Cenas",
    roadmap: "Ceļvedis",
    login: "Ieiet",
    ctaFull: "Izmēģināt 30 dienas",
    ctaShort: "30 dienas bez maksas",
    ctaTiny: "30 dienas",
    themeAria: "Pārslēgt vietnes tēmu",
    langAria: "Saskarnes valoda",
    menuAria: "Navigācijas izvēlne",
    langRu: "Русский",
    langEn: "English",
    langNote: "+10 valodu produkcijā",
  },

  hero: {
    kicker: "ES atbilstība · plānošana · autoparks un apkope",
    h1: "Katrs vadītājs gatavs reisam.",
    h1dim: "Vienmēr.",
    sub: " — ES atbilstības un plānošanas sistēma pārvadātājiem ar 50 un vairāk mašīnām. Vadītāju dokumenti, reisi un atvaļinājumi, remonts un apkope — pārlūkā, bez aparatūras un ieviešanas konsultantiem. Kas šodien gaida tavu lēmumu, sistēma parāda pati.",
    ctaTrial: "Izmēģināt 30 dienas",
    ctaPricing: "Apskatīt cenas",
    micro1: "Bez kartes",
    micro2: "Reģistrācija 2 minūtēs",
    micro3: "Dati glabājas ES",
    boardAria:
      "G-Track dispečerpults: tu augšupielādē dokumenta skenējumu, sistēma atpazīst numuru un derīguma termiņu, tu pārbaudi un saglabā ierakstu",
    boardCaption:
      "Tu augšupielādē skenējumu → G-Track atpazīst numuru un termiņu → tu pārbaudi un saglabā",
  },

  /* Полоса под первым экраном (TrustStrip): чипы-ссылки на модули, решение владельца 03.10.
     Термины — из app-локали lv: nav (Vadītāji, Plānošana, Lēmumu centrs, Remonts un apkope),
     vehicles_sub (Vilcēji / Piekabes), «reisi»; c5 — «Autoparks» (группа меню и заголовок
     roadmap.tracks.fleet), а не длинное «Transportlīdzekļi»; «pieteikumi» — как в
     roadmap.tracks.telegram. c7 — фраза из telematics.d, c9 = vid.chip6. Бренд в aria
     вынесен вперёд: «G-Track» не склоняется. */
  trust: {
    aria: "G-Track: kas jau darbojas",
    c1: "Vadītāji · 16 dokumentu tipi",
    c2: "Plānošana · dēlis un reisi",
    c3: "Lēmumu centrs",
    c4: "Rotācija · 3 mēnešus uz priekšu",
    c5: "Autoparks · vilcēji un piekabes",
    c6: "Remonts un apkope",
    c7: "Telemātika · tava transporta uzraudzības sistēma",
    c8: "Telegram vadītājiem · pieteikumi un atgādinājumi",
    c9: "12 saskarnes valodas",
  },

  /* Подвал OG-картинки (og-image.tsx): подписи к числам 16 и 30 — бывшие trust.m1/m2
     дословно: полоса стала чипами (03.10), а картинка для шеров осталась прежней. */
  og: {
    docTypes: "vadītāja dokumentu veidi",
    langs: "saskarnes valodas",
  },

  /* ---- полоса «было → стало»: s2–s4 — названия модулей из меню приложения ---- */
  strip: {
    aria: "Kā bija un kā ir: četri produkta ekrāni",
    was: "Bija —",
    p1: "zvans vakarā: „pieraksti mani no desmitā”",
    p2: "rindiņa Excel tabulā — ja kāds neaizmirsa to ierakstīt",
    p3: "kurš pie kuras mašīnas atgriezīsies — dispečera galvā",
    p4: "par tehnisko apskati atceras, kad mašīna jau vajadzīga reisam",
    s1: "Telegram",
    s2: "Plānošana",
    s3: "Vadītāju rotācija",
    s4: "Transportlīdzekļi",
  },

  /* ---- витрина «Одна заявка». Строки макетов не переводятся заново: они взяты из
     словарей приложения и мини-приложения; числа и даты подставляет showcase-data.ts ---- */
  showcase: {
    /* текст секции */
    overline: "Produkts",
    h2: "Viens pieteikums — un visa sistēma zina",
    sub: "Šodien tas ir zvans, rindiņa Excel tabulā un dispečera atmiņa. G-Track sistēmā vadītāja pieteikums nonāk uz dēļa, atbilde atgriežas pie viņa Telegram, bet rotācija laikus salīdzina viņa atgriešanās dienu ar mašīnas termiņiem.",
    legend: "Tie paši dati — visos ekrānos:",
    c1h: "Vadītājs iesniedz pieteikumu no kabīnes",
    c1p: "Atvaļinājums vai slimības lapa — Telegram, kas viņam jau ir. Neko nav jāinstalē.",
    c2h: "Pieteikums jau uz dēļa",
    c2p: "Raustīta josla vadītāja rindā, augšā — cik liela komandas daļa jau ir atvaļinājumā. Apstiprināt — viens klikšķis.",
    cAns: "Atbilde — pie vadītāja Telegram",
    c3h: "Atgriešanās — laikus",
    c3p: "Kurš atgriezīsies {n} dienās un vai viņa mašīna ir gatava: brīva, nav servisā, dokumenti derīgi.",
    c4h: "Mašīnai — savi termiņi",
    c4p: "Tehniskā apskate beigsies, kamēr vadītājs būs atvaļinājumā, — vēl ir laiks pierakstīt mašīnu.",
    foot: "Viss šajos ekrānos darbojas bez telemātikas.",
    /* водители макетов (выдуманные) */
    marek: "Marek Hájek",
    marekFirst: "Marek",
    marekAv: "MH",
    oleg: "Oleh Bondar",
    olegAv: "OB",
    andrzej: "Andrzej Mazur",
    andrzejAv: "AM",
    mihai: "Mihai Rusu",
    mihaiAv: "MR",
    lukas: "Lukáš Vítek",
    lukasAv: "LV",
    juris: "Juris Kalniņš",
    jurisAv: "JK",
    /* мини-приложение Telegram — дословно из его словаря */
    tgGreet: "Labrīt",
    tgDate: "pirmd., 2026. gada 5. oktobris",
    tgOnShift: "Maiņā",
    tgTruck: "Vilcējs",
    tgTrailer: "Piekabe",
    tgCta: "Jauns pieteikums",
    tgSheet: "Kas jums nepieciešams?",
    tgVac: "Atvaļinājums",
    tgSick: "Slimības lapa",
    tgOther: "Cits",
    tgCancel: "Atcelt",
    tgReqs: "Mani pieteikumi",
    tgReqVac: "Atvaļinājums",
    tgApproved: "Apstiprināts",
    tgMonth: "Oktobris",
    tgDays: "dienas",
    tgSubmitted: "iesniegts",
    /* планировщик — дословно из словаря приложения */
    plTitle: "Plānošana",
    plMonth: "okt.",
    wd: ["Sv", "Pr", "Ot", "Tr", "Ce", "Pk", "Se"],
    dayFmt: "{wd} {d}.",
    kpiAway: "Atvaļinājums un slimība",
    kpiAwaySub: "{pct}% komandas",
    kpiPending: "Pieteikums gaida",
    kpiPendingSub: "gaida atbildi",
    needs: "Nepieciešams lēmums",
    stTrip: "Reisā",
    stFree: "Brīvs",
    stSick: "Slimības lapa",
    stVac: "Atvaļinājums",
    stUntil: "{status} · līdz {date}",
    barPending: "⏳ Atvaļinājums",
    barUntil: "līdz {date}",
    popTitle: "Atvaļinājuma pieprasījums",
    popPeriod: "Periods",
    popDays: "{n} d.",
    popReason: "Vadītāja komentārs",
    popReasonV: "Brāļa kāzas",
    popHistory: "Vēsture",
    popCreated: "Izveidots",
    popAwaiting: "Gaida lēmumu",
    popReject: "Noraidīt",
    popApprove: "Apstiprināt",
    /* ротация */
    rotTitle: "Vadītāju rotācija",
    rotReturning: "Atgriežas",
    rotHorizon: "{n} dienās",
    rotPrepare: "Sagatavot {n}",
    rotWeek: "Nedēļa {range}",
    rotWeekCount: "atgriežas {n}",
    rotVac: "Atvaļinājums",
    rotSick: "Slimības lapa",
    rotReturn: "atgriežas {date}",
    rotPrev: "iepriekšējā mašīna",
    rotReady: "Vilcējs gatavs",
    rotBusy: "Aizņemts: {name}",
    rotDoc: "{doc} līdz {date}",
    /* карточка машины */
    vehTitle: "Transportlīdzekļi",
    vehType: "Vilcējs",
    vehFuel: "Dīzelis",
    vehOnTrip: "Braucienā",
    vehTabOverview: "Pārskats",
    vehTabDocs: "Dokumenti",
    vehTabService: "Serviss",
    vehGroup: "Tehniskā apskate",
    docStk: "Tehniskā apskate",
    docCal: "Tahogrāfa kalibrēšana",
    docTdl: "Tahogrāfa datu lejupielāde",
    daysLeft: "Atlikušas {n} dienas",
    days: "{n} dienas",
  },

  vid: {
    overline: "Eiropas tirgus",
    h2: "Radīts Eiropas pārvadātājiem.",
    sub: "A1, Code 95, vīzas — termiņi kontrolē jau šodien.",
    chip2: "A1",
    chip3: "Code 95",
    chip4: "ADR",
    chip5: "DDD atšifrēšana",
    chip6: "12 saskarnes valodas",
    tag: "VIDEO · VIETTURIS",
  },

  langs: {
    overline: "Lokalizācija",
    h2: "12 saskarnes valodas",
    sub: "Dispečers un HR strādā dzimtajā valodā — personāla apmācība aizņem dienu, nevis mēnesi.",
  },

  europe: {
    overline: "Ģeogrāfija",
    h2: "Visa Eiropa uz viena dēļa",
    sub: "Kurš reisā, kurš atvaļinājumā, kura mašīna servisā — uz dēļa. Kurš atgriezīsies un kurš būs brīvs — 14 dienas, mēnesi vai trīs mēnešus uz priekšu.",
    mapAria: "Eiropas maršrutu karte, kas pārplūst plānošanas dēlī",
    captionB: "Viss šis haoss tiek vadīts no šejienes",
    caption: " — no viena dēļa un viena lēmumu saraksta.",
  },

  modules: {
    h2: "Nevis „drīzumā”. Tagad.",
    cta: "Pilns attīstības plāns",
  },

  /* Страница дорожной карты (/roadmap). Свой H1 и свои meta: заголовок главной
     сюда не наследуется — иначе 12 страниц карты получают title продукта. */
  roadmap: {
    meta: {
      title: "G-Track ceļvedis — kas darbojas, ko veidojam, kas būs tālāk",
      description:
        "Trīs G-Track attīstības horizonti: kas jau darbojas, pie kā strādājam un kas būs tālāk. Bez kalendāra datumiem un solījumiem.",
    },
    h1: "Kas jau darbojas, pie kā strādājam un kas būs tālāk",
    lede: "Šeit redzams, kurp virzās produkts: kas jau darbojas, ko veidojam tagad un kas būs tālāk. Termiņus nesolām — rādām virzienu.",
    now: "Jau darbojas",
    wip: "Izstrādē",
    next: "Tālāk",
    releases: "{n}+ atjauninājumi kopš palaišanas 2026. gada maijā.",
    nowMark: "Tagad",
    launch: "Palaišana 1.0",
    aria: "G-Track attīstības virzieni: kas darbojas, kas ir izstrādē un kas ir plānots",
    tracks: {
      drivers: { t: "Vadītāji un dokumenti", d: "Kartītes, 16 dokumentu tipi, 8 valstu noteikumi" },
      planning: { t: "Plānošana un autopilots", d: "Dēlis, Lēmumu centrs, rotācija, taho kartes autopilots" },
      fleet: { t: "Autoparks un apkope", d: "Transportlīdzekļi, remonts un apkope, borta dati" },
      telematics: { t: "Telemātikas integrācija", d: "Pieslēdzam tavu transporta uzraudzības sistēmu — dati par mašīnām pienāk paši, plānošanai un apkopes intervālu aprēķinam. Var arī manuāli." },
      telegram: { t: "Telegram vadītājiem", d: "Pieteikumi atvaļinājumam un slimības lapai, šodienas maiņa, atgādinājumi par dokumentu termiņiem" },
      reports: { t: "Atskaites un paziņojumi", d: "Nedēļas atskaite, paziņojumu centrs, taho failu termiņi" },
      companies: { t: "Saistītie uzņēmumi", d: "Vairāki viena īpašnieka uzņēmumi: katram savs abonements, viens otra mašīnas un vadītājus redz tikai lasīšanas režīmā" },
      finance: { t: "Pasūtījumi un finanses", d: "Pasūtījumi, rēķini, sodi, mašīnas ekonomika" },
      integrations: { t: "Karte un integrācijas", d: "Karte un maršruti, DDD atšifrēšana, API, kravu biržas" },
    },
    ms: { autopilot: "Autopilots", decisions: "Lēmumu centrs", rotation: "Rotācija", service: "Remonts un apkope", miniapp: "Mini lietotne", telematics: "Pirmā integrācija" },
  },

  pricing: {
    overline: "Cenas",
    h2: "Viss tirgus slēpj cenas aiz „contact sales”. Mēs — nē.",
    sub: "Cenas ir tepat. Reģistrācija bez zvana, demo 30 dienas. Visi moduļi — visos plānos: atšķiras tikai autoparka ietilpība.",
    periodAria: "Norēķinu periods",
    perMo: "Ik mēnesi",
    perQ: "Ik ceturksni",
    perY: "Ik gadu",
    discQ: "−6,7%",
    discY: "−16,7%",
    /* CIPARI SINHRONIZĒTI AR STRIPE LIVEMODE — NEMAINĪT */
    billedMo: "rēķins ik mēnesi",
    billedQ: "rēķins ik ceturksni",
    billedY: "rēķins ik gadu",
    perMonth: "/mēn.",
    afterLaunch: "pēc palaišanas",
    perTruck: "par mašīnu/mēn.",
    starterBlurb: "Mazs autoparks, kas sakārto dokumentus",
    fleetBlurb: "Vidēja pārvadātāja darba zirgs ar dispečeru maiņu",
    businessBlurb: "Liels autoparks ar vairākiem dispečerpultiem",
    plusBlurb: "Autoparks ārpus 1000 mašīnām — nosacījumi pielāgoti taviem procesiem",
    fleetFlag: "Vairākuma izvēle",
    choose: "Izvēlēties",
    plusPrice: "Individuāla",
    plusGa: "nosacījumi — līgumā",
    plusBilled: "līgums",
    plusCta: "Rakstīt sales@",
    lock12: "Cena nofiksēta 12 mēn.",
    lock24: "Cena nofiksēta 24 mēn.",
    lockContract: "Nofiksēts līgumā",
    capTrucks: "transportlīdzekļiem",
    capDrivers: "vadītāji",
    capTrailers: "piekabes",
    capSeats: "dispečeru vietas",
    upTo: "līdz",
    plusTrucks: "transportlīdzekļi",
    plusUnlim: "neierobežots",
    packLead: "Vajag vairāk?",
    packMax: "līdz 5 paketēm",
    plusSla: "SLA",
    plusSlaSuffix: "un prioritārais atbalsts",
    foundingB: "Sākuma cena paliek ar tevi 12–24 mēnešus pēc oficiālās palaišanas.",
    founding: " Jaunie klienti pēc palaišanas maksās vairāk — tu ne.",
    noteA: "Gads — tie ir ",
    noteB: "„2 mēneši bez maksas”",
    noteC: ". Bezmaksas datu migrācija no Excel agrīnajiem klientiem.",
    anchorOverline: "Aprēķins",
    anchorBig: "≈ 2,25 €",
    anchorUnit: "par vienību/mēn. · 200 vienību parks",
    anchorArg: "Vienam vadītājam beidzies Kods 95 — līdz 20 000 € sods Vācijā. Viena nokavēta vīza — apturēts reiss. G-Track notur visu autoparku kontrolē lētāk, nekā maksā viena šāda kļūme.",
  },

  /* Jautājumi: formulējumi ņemti no reāliem pārvadātāju iebildumiem, atbildes —
     tikai par pārbaudāmiem produkta faktiem. Sodu summas un atsauces uz likumu
     pantiem apzināti nenorādām: likumi mainās, bet teksts dzīvo 12 lokālēs.
     JSON-LD FAQPage NELIEKAM — Google izslēdza FAQ fragmentus 2026. gada 7. maijā. */
  faq: {
    overline: "Jautājumi",
    h2: "Ko pārvadātāji jautā, pirms izveido kontu",
    sub: "Īsas atbildes bez „sazinieties ar mums”. Šeit ir tas, ko mums jautā visbiežāk — arī tas, ko mēs nedarām.",
    askLead: "Savu jautājumu neatradi?",
    askCta: "Uzraksti — atbildēsim tikpat īsi",

    g1: "Termiņi un atbildība",
    g2: "Ieviešana un dati",
    g3: "Piekļuve, autoparks, cena",

    q1: "Kā sistēma atgādinās, ka vadītājam beidzas dokuments?",
    a1: "Katru rītu G-Track pārbauda visu vadītāju dokumentus. Pase nonāk kopsavilkumā 180 dienas iepriekš, pārējie dokumenti — 90 dienas iepriekš. Birojs saņem e-pastu, lietotnē pie dokumenta parādās atzīme „Beidzas derīgums”, bet vadītājs, kurš pieslēdzies Telegram botam, saņem atgādinājumu.",
    a1b: "Kopsavilkuma e-pastus ieslēdz pats un izvēlies, kam tie tiek sūtīti: tikai īpašniekam, administratoriem vai visiem dalībniekiem. Tāpēc atgādinājums nekarājas uz viena cilvēka un nepazūd, kamēr HR ir atvaļinājumā.",

    q2: "Kas atbild, ja vadītājs izbrauc reisā ar dokumentu, kuram beidzies termiņš?",
    a2: "Lielākajā daļā ES valstu — pārvadātājs, nevis tikai vadītājs: sodu uzraksta firmai, un vairākās valstīs atsevišķi arī par transportu atbildīgajai personai. Konkrētās summas un kārtība atkarīgas no pārbaudes valsts. Tieši tāpēc G-Track vispirms atgādina birojam — tam, kas ieliek reisu plānā, — bet vadītājam, kurš pieslēdzies botam, atgādinājumu papildus nosūta Telegram.",

    q3: "Vai dispečerpultī ir redzams, kas nevar izbraukt dokumenta dēļ?",
    a3: "Jā, dispečerpults saved cilvēkus, mašīnas un termiņus vienā vietā: kas ir atvaļinājumā, kas uz slimības lapas, kam nav mašīnas, kam dokuments nav kārtībā. Katra plāna izmaiņa nonāk audita žurnālā — redzama ne tikai pašreizējā aina, bet arī tas, kas un kad to mainījis.",

    q11: "Ko G-Track dara pats un ko izlemj dispečers?",
    a11: "Pamana pats: kurš atgriežas no atvaļinājuma, kura reiss beidzas bez turpinājuma, kuriem jaunajiem vadītājiem nav plāna — tas viss tiek apkopots Lēmumu centrā. Vai sistēma mainīs plānu tavā vietā, nosaka režīms, ko izvēlies: „Manuāls”, „Centrs” vai „Automātisks”. Pēc noklusējuma sistēma tikai jautā. Katra tās veiktā plāna izmaiņa tiek ierakstīta žurnālā.",

    q4: "Man ir 40–60 vadītāju un gadiem krāti skenējumi Excel un mapēs. Kas to pārnesīs?",
    a4: "Sākt var arī bez arhīva: ievadi vadītājus un tos dokumentus, kuriem termiņš ir vistuvāk — atgādinājumi sāks strādāt jau no tā. Vecie skenējumi tiek augšupielādēti pa ceļam un neko nebloķē.",
    a4b: "Pārnešanu no Excel agrīnajiem klientiem darām bez maksas. Sūti failu tādu, kāds tas ir — ar piezīmēm, tukšām šūnām un „??” datumu vietā.",

    q5: "Kur fiziski atrodas dati un skenējumi? Vai parakstīsiet DPA?",
    a5: "Dati un faili — Eiropas Savienībā, datu centrs Īrijā. Datu apstrādes dokuments ir publicēts, saite lapas kājenē; parakstām. Piekļuvi sensitīviem laukiem tavā uzņēmumā ierobežo lomas, nevis viens kopējs ķeksītis.",

    q6: "Ja izlemšu aiziet — vai dabūšu savus datus?",
    a6: "Kamēr konts ir aktīvs, datus jebkurā brīdī un bez atsevišķa pieprasījuma izgūsti CSV: vadītāju saraksts, dokumentu statusi, termiņi. Skenējumi paliek tavi: pašlaik tos lejupielādē pa vienam, visa arhīva izsniegšanu darām pēc pieprasījuma. Kontu īpašnieks izdzēš pats, bez zvana no „noturēšanas menedžera”.",

    q7: "Kas jādara vadītājam? Vai viņam kaut kas jāinstalē?",
    a7: "Nekas: Telegram viņam jau ir. Botā viņš iesniedz pieteikumu atvaļinājumam vai slimības lapai — tas nonāk plānošanā, un atbilde atgriežas pie viņa. Viņš redz, ar kuru mašīnu šodien brauc, un saņem atgādinājumus par savu dokumentu termiņiem.",
    a7b: "Lietotnei vajag internetu. Dokumentu oriģinālus kabīnē tas neatceļ.",

    q8: "Vai dispečers var redzēt grafiku, bet neredzēt pasi un medicīnisko izziņu?",
    a8: "Jā. Tiesības tiek dotas pa vienai — to ir 36. Pases, vīzas un ID kartes numuru un skenējumu pēc noklusējuma redz tikai darbinieki ar piekļuvi konfidenciāliem datiem, pārējie — tikai statusu un termiņu. Jebkuru citu dokumenta tipu, piemēram, medicīnisko izziņu, uzņēmums tāpat var paslēpt iestatījumos. Personas kods un bankas konta numurs ir aiz atsevišķas tiesības un rādās maskēti.",

    q9: "Kā ir ar vadītājiem no trešajām valstīm — Ukraina, Serbija, Uzbekistāna?",
    a9: "Vadītājiem bez ES pilsonības obligātais saraksts ir garāks: pasei, vadītāja apliecībai un tahogrāfa kartei pievienojas vīza, transporta licence un Kods 95. Gatavība reisam tiek rēķināta tieši pēc šī paplašinātā saraksta — vadītājs nebūs gatavs, kamēr nav sakārtoti tieši viņa dokumenti, nevis kopēja veidne.",

    q12: "Telemātika mums jau ir. Vai G-Track tā ir vajadzīga?",
    a12: "Nav obligāta: dokumenti, plānošanas dēlis, rotācija, remonts un apkope darbojas arī bez tās, nobraukumu ievada manuāli. Pieslēdzam tavu transporta uzraudzības sistēmu — un nobraukums nāk no borta, G-Track redz, kura vadītāja karte ir tahogrāfā, un pamana mašīnu, kas brauc bez plāna.",

    q10: "Cik tas maksā autoparkam ar 40 mašīnām un 45 piekabēm? Vai jāmaksā par katru lietotāju?",
    a10: "Starter plāns — 150 € mēnesī, maksājot par gadu 125 €. Tajā ietilpst 50 mašīnas, 100 vadītāji un 75 piekabes, tāpēc tavs autoparks iekļaujas ar rezervi. Dispečeru un HR vietas netiek skaitītas: ievadi visus, kam vajag.",
    a10b: "Trīsdesmit dienu demo bez kartes un bez menedžera zvana. Cenas — šajā pašā lapā, nevis „pēc pieprasījuma”.",

    notHead: "Ko G-Track nedara",
    notSub: "Lai tu netērētu trīsdesmit demo dienas, pārbaudot to, kā šeit nav.",
    not1: "Neanalizē tahogrāfu. Mēs nelasām DDD failus, nerēķinām darba un atpūtas režīmu un nerēķinām kabotāžu 3/7.",
    not2: "Nerāda mašīnas kartē. Nobraukumu un kustību G-Track ņem tieši no auto, bet kartes un maršrutu nav — tā ir tava telemātika.",
    not3: "Neved pasūtījumus un frahtu. Pasūtījumi un rēķini ir attīstības plānā, šodien to nav.",
    not4: "Nerēķina algas un neaizstāj grāmatvedību.",
    notBridge: "Mēs neaizstājam tahogrāfa programmatūru un telemātiku. Mēs nosedzam to, kā tajās nav: cilvēki, dokumenti, termiņi un tas, kas kurā dienā brauc.",
  },

  final: {
    overline: "Cena pirmajiem",
    h2: "Sāc tagad — cena brauc tev līdzi.",
    ctaTrial: "Izmēģināt 30 dienas",
    ctaPricing: "Apskatīt cenas",
    migrate: "Dati ir Excel? Migrēsim bez maksas — ",
  },

  footer: {
    tagline: "ES atbilstība, plānošana, autoparks un apkope pārvadātājiem",
    legalHeading: "Juridiskā informācija",
    privacy: "Privātums",
    terms: "Lietošanas noteikumi",
    dpa: "Datu apstrāde",
    securityHeading: "Datu drošība",
    trust1: "Dati tiek glabāti ES",
    trust2: "Atbilstība GDPR",
    trust3: "Piekļuve pēc lomām",
    langs: "12 valodas",
    rights: "© 2026 G-Track Software s.r.o.",
  },

  names: {
    kratochvil: "M. Kratohvils", kratochvilAv: "MK",
    savchenko: "P. Savčenko", savchenkoAv: "PS",
    novak: "J. Novaks", novakAv: "JN",
    berzins: "E. Bērziņš", berzinsAv: "EB",
  },

  /* ---- mokapu vārdnīca: termini = lietotnes lokāle (driverPill, planning) ---- */
  mock: {
    planning: "Plānošana", week24: "24. nedēļa · 8.–13. jūnijs", colDriver: "Vadītājs",
    d1: "Pr 08", d2: "Ot 09", d3: "Tr 10", d4: "Ce 11", d5: "Pk 12",
    kpiTrip: "Šobrīd reisā", kpiVac: "Atvaļinājumā", kpiFree: "Brīvi",
    stActive: "Aktīvs", stTrip: "Reisā", ready: "gatavs reisam",
    vacUntil: "Atvaļinājums līdz 15.06", sick: "Slimības lapa",
    toastWarnT: "Kopsavilkums e-pastā: vīza beidzas 12.07", toastWarnD: "P. Savčenko · atlikušas 32 dienas",
    mcH: "Vīza · P. Savčenko",
    mc1: "Augšupielādēts jauns vīzas skenējums",
    mc2: "G-Track pats atpazina numuru un datumu",
    mc3: "Reģistrētais vīzas derīgums: 08.2028",
    mcSub2: "CZ-4471920 · līdz 03.08.2028",
    chipVisaWarn: "VIS · 32 d.", chipVisaOk: "VIS · 2028",
  },
};
