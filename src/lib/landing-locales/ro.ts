/* ============================================================================
   G-Track Landing — румынская локаль (ro).
   Терминология синхронизирована с app-локалью gtrack-tms/src/i18n/locales/ro.ts:
   «В рейсе» = «În cursă» (driverPill), «готовность к рейсу» = «pregătire
   pentru cursă», статусы Activ/Concediu/Concediu medical, модули (Șoferi/
   Vehicule/Comenzi/Facturare/Economia vehiculelor), founding/price-lock
   («Membru founding», «Preț blocat»), типы документов. Цифры и проценты —
   байт-в-байт со Stripe livemode и en, кроме десятичного разделителя:
   запятая (≈ 2,25 €, −6,7% / −16,7%).
   Единица дней — «z» (как «{{days}}z» в app-ro).
   ============================================================================ */

import type { LandingDict } from "../landing-i18n";

export const ro: LandingDict = {
  meta: {
    title: "G-Track — conformitate UE și planificare de curse",
    description:
      "Documentele șoferilor, curse și concedii, reparații și mentenanță — într-o aplicație web pentru flote de 50+ camioane. 30 de zile gratuit, prețuri pe pagină.",
  },

  nav: {
    product: "Produs",
    pricing: "Prețuri",
    roadmap: "Roadmap",
    login: "Autentificare",
    ctaFull: "Încearcă 30 de zile",
    ctaShort: "30 de zile gratuit",
    ctaTiny: "30 de zile",
    themeAria: "Comută tema site-ului",
    langAria: "Limba interfeței",
    menuAria: "Meniu de navigare",
    langRu: "Русский",
    langEn: "English",
    langNote: "+10 limbi în producție",
  },

  hero: {
    kicker: "Conformitate UE · planificare · flotă și service",
    h1: "Fiecare șofer pregătit de cursă.",
    h1dim: "Mereu.",
    sub: " — sistem de conformitate UE și planificare pentru transportatori de la 50 de camioane în sus. Documentele șoferilor, curse și concedii, reparații și mentenanță — în browser, fără hardware și fără consultanți de implementare. Sistemul îți arată singur ce trebuie decis azi.",
    ctaTrial: "Încearcă 30 de zile",
    ctaPricing: "Vezi prețurile",
    micro1: "Fără card",
    micro2: "Înregistrare în 2 minute",
    micro3: "Date în UE",
    boardAria:
      "Panoul de dispecerat G-Track: încarci scanul unui document, sistemul recunoaște numărul și data de expirare și actualizează evidența",
    boardCaption:
      "Încarci un scan → G-Track recunoaște numărul și data de expirare → evidența documentului e actualizată",
  },

  trust: {
    aria: "Ce funcționează deja în G-Track",
    c1: "Șoferi · 16 tipuri de documente",
    c2: "Planificare · panou și curse",
    c3: "Centru de decizii",
    c4: "Rotație · pe 3 luni înainte",
    c5: "Vehicule · capete tractor și remorci",
    c6: "Reparații și mentenanță",
    c7: "Telematică · sistemul tău de monitorizare a flotei",
    c8: "Șoferul pe Telegram · cereri și mementouri",
    c9: "12 limbi de interfață",
  },

  og: {
    docTypes: "tipuri de documente ale șoferului",
    trialDays: "zile de demo fără apel",
  },

  pain: {
    collageAria:
      "Colaj: tabele, un messenger și un dosar de hârtie se destramă, iar ordinea iese la iveală",
    excelTitle: "Soferi_2026_FINAL_v7.xlsx",
    xlsHdrDriver: "Șofer",
    xlsHdrVisa: "Viză",
    xlsHdrA1: "A1",
    xlsHdrNote: "Obs.",
    xlsR1n: "Petr S.", xlsR1v: "12.07??", xlsR1a: "da", xlsR1note: "întreab-o pe Ira",
    xlsR2n: "Marek K.", xlsR2v: "???", xlsR2a: "—", xlsR2note: "dosarul e la Tomas",
    xlsR3n: "Jan N.", xlsR3v: "2027", xlsR3a: "da", xlsR3note: "concediu din 15",
    xlsR4n: "Oleg D.", xlsR4v: "aug?", xlsR4a: "expirat", xlsR4note: "—",
    chatTitle: "Dispecerat · chat",
    chat1: "unde e viza lui Petr??",
    chat2: "parcă expiră în august",
    chat3: "sau era A1… la cine e dosarul?",
    chat4: "e în cursă până vineri!!",
    folderTitle: "Dulap · raft 2",
    folder1: "A1 — Polonia (scanuri 2024)",
    folder2: "Code 95 — originale",
    folder3: "Fișe medicale — ???",
    orderName: "Petr Savchenko",
    overline: "Status quo",
    h2: "Cum arată asta astăzi",
    sub: "Excel cu observații, conversații în messenger, dosare de hârtie. Sistemul funcționează cât timp un singur om ține totul minte.",
    fact1a: "O viză găsită ",
    fact1b: "cu 3 săptămâni înainte de expirare",
    fact1c: " — din întâmplare, într-o conversație veche.",
    fact2a: "Un șofer cu Code 95 expirat — ",
    fact2b: "până la 20 000 €", //   = narrow no-break space, как в ru/en
    fact2c: " amendă pentru firmă în Germania. Mai mult decât un an de abonament, pe orice plan.",
    fact3a: "Dispecerul ține ",
    fact3b: "40 de șoferi în minte",
    fact3c: ". Până pleacă în concediu.",
  },

  scrolly: {
    overline: "Produs",
    h2: "Povestea unui șofer",
    s1h: "Șoferul în sistem",
    s1p: "Profil, status, documente și pregătirea pentru cursă — totul într-un singur loc. Datele bancare — pe bază de roluri.",
    s2h: "4 200 km până la revizie",
    s2p: "Kilometrajul vine direct de la camion. G-Track calculează singur cât a mai rămas până la revizie și evidențiază camioanele care trebuie să intre în service — fără carnețele și telefoane la mecanic.",
    s3h: "Barcelona: schimb de camion",
    s3p: "Camionul intră în service, iar șoferul își introduce cardul în altul. G-Track mută singur cursa pe camionul nou — sau întreabă dispecerul, după cum setezi.",
    s4h: "Din nou în cursă",
    s4p: "Cursa intră pe panou. Fiecare modificare — în istoric.",
    cap1b: "Șoferul în sistem.",
    cap1: " Profil: status, documente, date confidențiale — pe bază de roluri.",
    cap2b: "Kilometri până la revizie.",
    cap2: " Kilometraj de la camion și rest până la revizie — vezi ce camioane trebuie să intre în service.",
    cap3b: "Cursa s-a mutat singură.",
    cap3: " Cardul șoferului în camionul nou — o intrare în istoric.",
    cap4b: "Din nou în cursă.",
    cap4: " Cursa pe panou, fiecare modificare în istoric.",
    mapAria: "Harta Europei: cursa Praga → München → Lyon → Barcelona, camionul pe segmentul actual al rutei",
    leg1: "Praga → München",
    leg2: "München → Lyon",
    leg3: "Lyon → Barcelona",
    arrived: "Sosire · Barcelona",
    outroB: "Un șofer — peste zece termene.",
    outro: " Tu ai o sută.",
    skip: "Sari peste poveste",
  },

  vid: {
    overline: "Piața europeană",
    h2: "Construit pentru transportatorii europeni.",
    sub: "A1, Code 95, vize — termenele sub control încă de azi.",
    chip2: "A1",
    chip3: "Code 95",
    chip4: "ADR",
    chip5: "Citire DDD",
    chip6: "12 limbi de interfață",
    tag: "VIDEO · PLACEHOLDER",
  },

  langs: {
    overline: "Localizare",
    h2: "12 limbi de interfață",
    sub: "Dispecerul și HR lucrează în limba lor maternă — instruirea echipei durează o zi, nu o lună.",
  },

  europe: {
    overline: "Geografie",
    h2: "Toată Europa pe un singur panou",
    sub: "Cine e în cursă, cine e în concediu, ce camion e în service — pe panou. Cine se întoarce și cine va fi liber — pe 14 zile, o lună sau trei luni înainte.",
    mapAria: "Hartă a rutelor prin Europa care se transformă într-un panou de planificare",
    captionB: "Tot acest haos se gestionează de aici",
    caption: " — de pe un singur panou și dintr-o singură listă de decizii.",
  },

  /* Секция «Работает сейчас» на главной: карточки строятся из TRACKS
     (roadmap-content.ts) и текстов d.roadmap — здесь только заголовок и ссылка. */
  modules: {
    h2: "Nu „în curând”. Acum.",
    cta: "Roadmapul complet",
  },

  /* Страница дорожной карты (/roadmap). Свой H1 и свои meta: заголовок главной
     сюда не наследуется — иначе 12 страниц карты получают title продукта. */
  roadmap: {
    meta: {
      title: "Foaia de parcurs G-Track — ce funcționează, ce construim, ce urmează",
      description:
        "Trei orizonturi ale dezvoltării G-Track: ce funcționează deja, ce construim acum și ce urmează. Fără date calendaristice și promisiuni.",
    },
    h1: "Ce funcționează deja, ce construim și ce urmează",
    lede: "Aici vezi încotro se îndreaptă produsul: ce funcționează deja, ce construim acum și ce urmează. Nu promitem termene — arătăm direcția.",
    now: "Deja activ",
    wip: "În lucru",
    next: "Urmează",
    releases: "{n}+ actualizări de la lansarea din mai 2026.",
    nowMark: "Acum",
    launch: "Lansare 1.0",
    aria: "Direcțiile de dezvoltare ale G-Track: ce funcționează, ce este în lucru și ce este planificat",
    tracks: {
      drivers: { t: "Șoferi și documente", d: "Profiluri, 16 tipuri de documente, reguli din 8 țări" },
      planning: { t: "Planificare și pilot automat", d: "Panou, Centru de decizii, rotație, pilot automat după cardul de tahograf" },
      fleet: { t: "Vehicule și service", d: "Flotă, reparații și mentenanță, date de la bord" },
      telematics: { t: "Integrare telematică", d: "Conectăm sistemul tău de monitorizare a flotei — datele despre vehicule vin singure, pentru planificare și calculul reviziilor. Merge și manual." },
      telegram: { t: "Șoferul pe Telegram", d: "Cereri de concediu și concediu medical, tura de azi, mementouri despre expirarea documentelor" },
      reports: { t: "Rapoarte și notificări", d: "Raport săptămânal, centru de notificări, termene fișiere tahograf" },
      companies: { t: "Companii conectate", d: "Mai multe firme ale aceluiași proprietar: fiecare cu abonamentul său și acces doar în citire la vehiculele și șoferii celorlalte" },
      finance: { t: "Comenzi și finanțe", d: "Comenzi, facturi, amenzi, economia vehiculelor" },
      integrations: { t: "Hartă și integrări", d: "Hartă și rute, citirea fișierelor DDD, API, burse de marfă" },
    },
    ms: { autopilot: "Pilot automat", decisions: "Centru de decizii", rotation: "Rotație", service: "Reparații și mentenanță", miniapp: "Mini-aplicație", telematics: "Prima integrare" },
  },

  pricing: {
    overline: "Prețuri",
    h2: "Toată piața își ascunde prețurile după „contact sales”. Noi — nu.",
    sub: "Prețurile sunt chiar aici. Înregistrare fără apel telefonic, demo de 30 de zile. Toate modulele — în toate planurile: diferă doar capacitatea flotei.",
    periodAria: "Perioada de facturare",
    perMo: "Lunar",
    perQ: "Trimestrial",
    perY: "Anual",
    discQ: "−6,7%",
    discY: "−16,7%",
    /* ЦИФРЫ СИНХРОНИЗИРОВАНЫ СО STRIPE LIVEMODE — НЕ МЕНЯТЬ */
    billedMo: "facturat lunar",
    billedQ: "pe trimestru",
    billedY: "pe an",
    perMonth: "/lună",
    afterLaunch: "după lansare",
    perTruck: "per vehicul/lună",
    starterBlurb: "O flotă mică ce își pune ordine în documente",
    fleetBlurb: "Instrumentul de zi cu zi al unui transportator mediu, cu schimb de dispecerat",
    businessBlurb: "O flotă mare, cu mai multe birouri de dispecerat",
    plusBlurb: "O flotă dincolo de 1000 de vehicule — condiții construite în jurul proceselor tale",
    fleetFlag: "Alegerea majorității",
    choose: "Alege",
    plusPrice: "Personalizat",
    plusGa: "condiții — în contract",
    plusBilled: "contract",
    plusCta: "Scrie la sales@",
    lock12: "Preț blocat 12 luni",
    lock24: "Preț blocat 24 de luni",
    lockContract: "Blocat prin contract",
    capTrucks: "vehicule",
    capDrivers: "șoferi",
    capTrailers: "remorci",
    capSeats: "locuri de dispecer",
    upTo: "până la",
    plusTrucks: "vehicule",
    plusUnlim: "fără limită",
    packLead: "Aveți nevoie de mai mult?",
    packMax: "maximum 5 pachete",
    plusSla: "SLA",
    plusSlaSuffix: "și suport prioritar",
    foundingB: "Prețul inițial rămâne cu tine 12–24 de luni după lansarea oficială.",
    founding: " Clienții noi de după lansare vor plăti mai mult — tu nu.",
    noteA: "Un an înseamnă ",
    noteB: "„2 luni gratuite”",
    noteC: ". Migrare gratuită a datelor din Excel pentru primii clienți.",
    anchorOverline: "Calculul",
    anchorBig: "≈ 2,25 €",
    anchorUnit: "pe vehicul/lună · flotă de 200 vehicule",
    anchorArg: "Un șofer cu Code 95 expirat — până la 20 000 € amendă în Germania. O viză expirată — o cursă oprită. G-Track ține tot parcul sub control mai ieftin decât costă un singur astfel de incident.",
  },

  /* FAQ: termeni din app-локаль ro — «Pregătire pentru cursă», «Pașaport»,
     «Declarație», «Code 95», «Certificat medical», «Adeverință de reședință»,
     «Concediu / Concediu medical», «istoric», «Export CSV».
     Sumele amenzilor și articolele de lege NU se adaugă (vezi comentariul ru). */
  faq: {
    overline: "Întrebări",
    h2: "Ce ne întreabă transportatorii înainte să deschidă un cont",
    sub: "Răspunsuri scurte, fără „contactați-ne”. Aici sunt întrebările pe care le primim cel mai des — inclusiv cele despre ce nu facem.",
    askLead: "Nu ți-ai găsit întrebarea?",
    askCta: "Scrie-ne — răspundem la fel de scurt",

    g1: "Termene și răspundere",
    g2: "Implementare și date",
    g3: "Acces, flotă, preț",

    q1: "Cum mă anunță sistemul că unui șofer îi expiră un document?",
    a1: "În fiecare dimineață G-Track verifică documentele tuturor șoferilor. Pașaportul intră în rezumat cu 180 de zile înainte de expirare, celelalte documente — cu 90. Biroul primește un e-mail, în aplicație documentul e marcat ca fiind pe cale să expire, iar șoferul care a conectat botul de Telegram primește un memento.",
    a1b: "E-mailurile cu rezumatul le activezi singur și tot tu alegi cui ajung: doar proprietarului, administratorilor sau tuturor membrilor. Astfel, memento-ul nu atârnă de un singur om și nu dispare cât timp colegul de la HR e în concediu.",

    q2: "Cine răspunde dacă un șofer pleacă în cursă cu un document expirat?",
    a2: "În majoritatea statelor UE — transportatorul, nu doar șoferul: amenda se dă firmei, iar în unele țări separat și managerului de transport. Cuantumul și procedura depind de țara în care are loc controlul. Exact de asta G-Track îi amintește în primul rând biroului, celui care pune cursa în plan, iar șoferului care a conectat botul îi trimite același memento pe Telegram.",

    q3: "Se vede pe panoul de planificare cine nu poate pleca din cauza unui document?",
    a3: "Da, panoul adună oameni, vehicule și termene într-un singur loc: cine e în concediu, cine e în concediu medical, cine e fără vehicul, cui nu îi e în regulă un document. Fiecare modificare a planului intră în istoric — vezi nu doar situația de acum, ci și cine a schimbat-o și când.",

    q11: "Ce face G-Track singur și ce decide dispecerul?",
    a11: "Observă singur: cine se întoarce din concediu, a cui cursă se termină fără continuare, care dintre șoferii noi nu au încă plan — toate acestea se adună în Centrul de decizii. Tu alegi, prin modul de lucru, dacă poate modifica planul în locul tău: „Manual”, „Centru” sau „Automat”. Implicit, sistemul doar întreabă. Fiecare modificare pe care o face în plan intră în jurnal.",

    q4: "Am 40–60 de șoferi și ani de scanuri în Excel și dosare. Cine mută toate astea?",
    a4: "Poți începe fără arhivă: introdu șoferii și documentele cu termenele cele mai apropiate — mementourile pornesc deja de la atât. Scanurile vechi se încarcă pe parcurs și nu blochează nimic.",
    a4b: "Migrarea din Excel o facem gratuit pentru primii clienți. Trimite fișierul așa cum e — cu observații, celule goale și „??” în coloana cu date.",

    q5: "Unde stau fizic datele și scanurile? Semnați un DPA?",
    a5: "Datele și fișierele stau în Uniunea Europeană, în centrul de date din Irlanda. Documentul privind prelucrarea datelor este publicat — linkul e în josul paginii — și îl semnăm. Accesul la câmpurile sensibile din interiorul firmei tale este limitat prin roluri, nu printr-o bifă generală.",

    q6: "Dacă decid să plec — îmi iau datele?",
    a6: "Cât timp contul e activ, datele se exportă în CSV oricând și fără să ne ceri: lista șoferilor, statusurile documentelor, termenele. Scanurile rămân ale tale: deocamdată se descarcă unul câte unul, iar arhiva întreagă o predăm la cerere. Proprietarul își șterge singur contul, fără să sune la vreun „manager de retenție”.",

    q7: "Ce trebuie să facă șoferul? Trebuie să instaleze ceva?",
    a7: "Nimic: Telegram îl are deja. În bot trimite o cerere de concediu sau de concediu medical — cererea ajunge în planificare, iar răspunsul se întoarce la el. Vede cu ce camion merge azi și primește mementouri despre termenele documentelor sale.",
    a7b: "Aplicația are nevoie de internet. Și nu înlocuiește originalele documentelor din cabină.",

    q8: "Poate un dispecer să vadă graficul, dar să nu vadă pașaportul și certificatul medical?",
    a8: "Da. Permisiunile se dau punctual — sunt 36. Implicit, numărul și scanul pașaportului, al vizei și al cărții de identitate le văd doar angajații cu acces la date confidențiale; ceilalți văd doar statusul și data de expirare. Orice alt tip de document, de exemplu certificatul medical, firma îl poate marca la fel drept confidențial în setări. Codul numeric personal și contul bancar stau în spatele unei permisiuni separate și se afișează mascate.",

    q9: "Cum stați cu șoferii din țări terțe — Ucraina, Serbia, Uzbekistan?",
    a9: "Pentru cetățenii non-UE lista obligatorie e mai lungă: pe lângă pașaport, permis de conducere și cardul de tahograf, se adaugă viza, licența de transport și Code 95. Pregătirea pentru cursă se calculează exact după lista extinsă — un șofer nu apare ca pregătit până nu îi sunt în regulă documentele lui, nu un șablon general.",

    q12: "Avem deja telematică. G-Track are nevoie de ea?",
    a12: "Nu e obligatorie: documentele, panoul, rotația, reparațiile și mentenanța funcționează și fără ea, iar kilometrajul se introduce manual. Conectăm sistemul tău de monitorizare a flotei — și kilometrajul vine de la camion, G-Track vede al cui card e în tahograf și observă dacă un camion merge fără plan.",

    q10: "Cât costă pentru 40 de vehicule și 45 de remorci? Se plătește pentru fiecare utilizator?",
    a10: "Planul Starter — 150 € pe lună, iar la plata anuală 125 €. Include 50 de vehicule, 100 de șoferi și 75 de remorci, deci flota ta încape cu rezervă. Locurile de dispecer și de HR nu se numără: adaugă pe toți cei care au nevoie.",
    a10b: "Treizeci de zile de demo, fără card și fără apel de la vânzări. Prețurile — pe această pagină, nu „la cerere”.",

    notHead: "Ce nu face G-Track",
    notSub: "Ca să nu-ți pierzi cele treizeci de zile de demo verificând ceva ce nu există aici.",
    not1: "Nu analizează tahograful. Nu citim fișiere DDD, nu calculăm timpul de conducere și de odihnă și nu calculăm cabotajul 3/7.",
    not2: "Nu arată vehiculele pe hartă. G-Track preia kilometrajul și deplasarea direct de la camion, dar hartă și rute nu există — asta e telematica ta.",
    not3: "Nu gestionează comenzi și transporturi. Comenzile și facturile sunt pe orizont, astăzi nu există.",
    not4: "Nu calculează salarii și nu înlocuiește contabilitatea.",
    notBridge: "Nu înlocuim software-ul de tahograf și nici telematica. Acoperim ce nu se găsește în ele: oamenii, documentele, termenele și cine conduce în care zi.",
  },

  final: {
    overline: "Prețul pentru primii",
    h2: "Începe acum — prețul călătorește cu tine.",
    ctaTrial: "Încearcă 30 de zile",
    ctaPricing: "Vezi prețurile",
    migrate: "Date în Excel? Le migrăm gratuit — ",
  },

  footer: {
    tagline: "Conformitate UE, planificare, flotă și service pentru transportatori",
    legalHeading: "Informații legale",
    privacy: "Confidențialitate",
    terms: "Termeni de utilizare",
    dpa: "Prelucrarea datelor",
    securityHeading: "Securitatea datelor",
    trust1: "Date stocate în UE",
    trust2: "Conform GDPR",
    trust3: "Acces bazat pe roluri",
    langs: "12 limbi",
    rights: "© 2026 G-Track Software s.r.o.",
  },

  names: {
    kratochvil: "M. Kratochvil", kratochvilAv: "MK",
    savchenko: "P. Savchenko", savchenkoAv: "PS",
    savchenkoFull: "Petr Savchenko",
    novak: "J. Novak", novakAv: "JN",
    berzins: "E. Berzins", berzinsAv: "EB",
  },

  /* ---- словарь мокапов (термины = app-локаль ro) ---- */
  mock: {
    planning: "Planificare", week24: "Săptămâna 24 · 8–13 iun.", colDriver: "Șofer",
    d1: "Lun 08", d2: "Mar 09", d3: "Mie 10", d4: "Joi 11", d5: "Vin 12",
    w1: "Lun 15", w2: "Mar 16", w3: "Mie 17", w4: "Joi 18", w5: "Vin 19",
    kpiTrip: "În cursă astăzi", kpiVac: "În concediu", kpiFree: "Liberi",
    stActive: "Activ", stTrip: "În cursă", ready: "pregătit",
    vacUntil: "Concediu până la 15.06", sick: "Concediu medical",
    toastWarnT: "Rezumatul de dimineață: viza expiră pe 12.07", toastWarnD: "P. Savchenko · mai sunt 32 de zile",
    toastOkT: "Valabilitatea vizei înregistrată: 08.2028", toastOkD: "Numărul și data recunoscute din scan",
    docs: "Pregătit", urgent: "Urgente", nonEU: "NON-EU",
    tabOverview: "Prezentare generală", tabDocs: "Documente", tabComments: "Comentarii", tabHistory: "Istoric",
    confid: "Confidențial", confNote: "Datele bancare sunt vizibile doar celor care trebuie să le vadă.",
    cardTitle: "Profilul șoferului", remindTitle: "Documente · memento",
    remindT: "Viza expiră la 12.07.2026", remindD: "Memento automat cu 30 de zile înainte · responsabil: HR",
    tgMsg: "Petr, viza dvs. expiră pe 12.07. Încărcați un document nou sau contactați HR.",
    tgTime: "astăzi · 08:00",
    dlgTitle: "Adaugă document", dlgQuick: "Completare rapidă din document",
    fldType: "Tip de document", fldTypeV: "Viză (VIS)", fldNum: "Număr", fldUntil: "Valabilă până la",
    recognized: "recunoscut",
    week25: "Planificare · săptămâna 25",
    histTs1: "astăzi 14:02", hist1: "Stare modificată — În cursă (4TC 2190)", histBy1: "disp. S. Malek",
    histTs2: "astăzi 13:58", hist2: "Document actualizat — Viză (VIS)", histBy2: "HR · I. Koval",
    histNote: "Fiecare modificare — în istoric.",
    mcH: "Viză · P. Savchenko",
    mc1: "S-a încărcat un scan nou al vizei",
    mc2: "G-Track a recunoscut singur numărul și data",
    mc3: "Valabilitatea vizei înregistrată: 08.2028",
    mcSub2: "CZ-4471920 · până la 03.08.2028",
    chipVisaWarn: "VIS · 32 z", chipVisaOk: "VIS · 2028",
    svcTitle: "Kilometraj și revizie",
    svcOdo: "Kilometraj",
    svcNext: "Până la revizie",
    svcInterval: "Interval de revizie",
    svcCap: "din interval",
    svcSource: "de la camion",
    svcSoon: "Revizie apropiată",
    chipSvc: "Revizie · 4 200 km",
    unloadTitle: "Cursă · schimb de camion",
    unloadOk: "Cursă mutată de sistem",
    unloadNote: "Cardul șoferului în alt camion — cursa veche închisă, una nouă deschisă.",
    unloadWhere: "Camion nou",
    unloadPlace: "4TC 2190 · Barcelona",
    unloadWhen: "Ora",
    unloadDocV: "Card tahograf",
    sumStatus: "în cursă",
    sumVehicle: "vehicul",
    sumDocs: "pregătit",
  },
};
