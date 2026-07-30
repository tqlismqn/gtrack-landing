/* ============================================================================
   G-Track Landing — румынская локаль (ro).
   Терминология синхронизирована с app-локалью gtrack-tms/src/i18n/locales/ro.ts:
   «В рейсе» = «În cursă» (driverPill), «готовность к рейсу» = «pregătire
   pentru cursă», статусы Activ/Concediu/Concediu medical, модули (Șoferi/
   Vehicule/Comenzi/Facturare/Economia vehiculelor), founding/price-lock
   («Membru founding», «Preț blocat»), типы документов. Цифры и проценты —
   байт-в-байт со Stripe livemode (−6.7% / −16.7%, как в app-ro).
   Единица дней — «z» (как «{{days}}z» в app-ro).
   ============================================================================ */

import type { LandingDict } from "../landing-i18n";

export const ro: LandingDict = {
  meta: {
    title: "G-Track — conformitate UE și planificare de curse",
    description:
      "Șoferi, documente, planificare și flotă — într-o singură aplicație în browser. Funcțional într-o zi. Prețurile — pe această pagină.",
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
    kicker: "Conformitate UE · planificare · flotă",
    h1: "Fiecare șofer pregătit de cursă.",
    h1dim: "Mereu.",
    sub: " — sistem de conformitate UE și planificare a curselor pentru transportatori de la 25 de camioane în sus. Șoferi, documente, panou de dispecerat și flotă — în browser, fără hardware și fără consultanți de implementare. Funcțional într-o zi.",
    ctaTrial: "Încearcă 30 de zile",
    ctaPricing: "Vezi prețurile",
    micro1: "Fără card",
    micro2: "Înregistrare în 2 minute",
    micro3: "Date în UE",
    boardAria:
      "Panoul de dispecerat G-Track: șoferul încarcă un scan din Telegram, viza se prelungește, șoferul pleacă din nou în cursă",
    boardCaption:
      "Șoferul a încărcat scanul în Telegram → G-Track l-a recunoscut și a prelungit viza → din nou în cursă",
  },

  trust: {
    m1: "tipuri de documente ale șoferului",
    m2: "zile de demo fără apel",
    m3: "limbi de interfață",
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
    fact2a: "Amenda pentru încălcarea cabotajului — ",
    fact2b: "până la 7 500 €", //   = narrow no-break space, как в ru/en
    fact2c: " pentru o singură cursă. Mai mult decât un an de abonament.",
    fact3a: "Dispecerul ține ",
    fact3b: "40 de șoferi în minte",
    fact3c: ". Până pleacă în concediu.",
  },

  scrolly: {
    overline: "Produs",
    h2: "Povestea unui șofer",
    s1h: "Șoferul în sistem",
    s1p: "Profil, status, documente și pregătirea pentru cursă — totul într-un singur loc. Datele bancare — pe bază de roluri.",
    s2h: "Viza expiră în 30 de zile",
    s2p: "G-Track calculează singur termenele. Insigna devine galbenă, dispecerul și șoferul primesc un memento.",
    s3h: "HR prelungește",
    s3p: "Scanul e încărcat — G-Track recunoaște singur numărul și data. Insigna devine verde, pregătirea crește.",
    s4h: "Din nou în cursă",
    s4p: "Cursa intră pe panou, comanda e atașată. Fiecare modificare — în istoric.",
    cap1b: "Șoferul în sistem.",
    cap1: " Profil: status, documente, date confidențiale — pe bază de roluri.",
    cap2b: "Viza expiră.",
    cap2: " Memento pentru dispecer și push pe Telegram pentru șofer.",
    cap3b: "HR prelungește.",
    cap3: " G-Track recunoaște singur numărul și data din scan — insigna devine verde.",
    cap4b: "Din nou în cursă.",
    cap4: " Cursa pe panou, fiecare modificare în istoric.",
    outroB: "Un șofer — zeci de termene.",
    outro: " Tu ai o sută.",
    skip: "Sari peste poveste",
  },

  vid: {
    overline: "Piața europeană",
    h2: "Construit pentru transportatorii europeni.",
    sub: "A1, lucrători detașați, Code 95, vize — sub control încă de azi. Cabotaj 3/7 — pe foaia de parcurs.",
    chip1: "Cabotaj 3/7",
    chip2: "A1 / lucrători detașați",
    chip3: "Code 95",
    chip4: "ADR",
    chip5: "Tahograf",
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
    sub: "A1, lucrători detașați, documentele șoferilor — proiectat după regulile UE. Fiecare cursă pe un singur panou.",
    mapAria: "Hartă a rutelor prin Europa care se transformă într-un panou de planificare",
    captionB: "Tot acest haos se gestionează de aici",
    caption: " — de pe un singur panou de dispecerat.",
  },

  modules: {
    overline: "Module",
    h2: "Nucleul funcționează. Orizontul e deschis.",
    ready: "Gata",
    soon: "Urmează",
    m1: "Șoferi", m1d: "Profiluri, statusuri, pregătire pentru cursă",
    m2: "Documente", m2d: "16 tipuri, termene, recunoașterea scanurilor",
    m3: "Planificare", m3d: "Panou șoferi × zile, curse, conflicte",
    m4: "Vehicule", m4d: "Autotractoare și remorci, TÜV, asigurări",
    m5: "Comenzi", m5d: "Comandă → cursă → documente",
    m6: "Facturare", m6d: "Facturi din curse",
    m7: "Economia vehiculelor", m7d: "Cost-per-km pentru fiecare autotractor",
    m8: "Telegram pentru șoferi", m8d: "Documente și curse în buzunar",
    m9: "Mesaje", m9d: "Chat cu șoferul, cu traducere integrată",
    cta: "Roadmapul complet",
  },

  pricing: {
    overline: "Prețuri",
    h2: "Toată piața își ascunde prețurile după „contact sales”. Noi — nu.",
    sub: "Prețurile sunt chiar aici. Înregistrare fără apel telefonic, demo de 30 de zile. Toate modulele — în toate planurile: diferă doar capacitatea flotei. ",
    subB: "Nicio funcție în spatele unui paywall.",
    periodAria: "Perioada de facturare",
    perMo: "Lunar",
    perQ: "Trimestrial",
    perY: "Anual",
    discQ: "−6.7%",
    discY: "−16.7%",
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
    anchorArg: "O amendă pentru cabotaj — până la 7 500 €. O viză expirată — o cursă oprită. G-Track ține tot parcul sub control mai ieftin decât costă un singur astfel de incident.",
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
    a1: "În fiecare dimineață la 8:00 G-Track verifică documentele întregii flote. Pentru pașaport avertismentul apare cu 180 de zile înainte, pentru declarație cu 60, pentru restul cu 90. Notificarea pleacă pe trei canale simultan: e-mail la birou, marcaj în aplicație și push pe Telegram către șofer.",
    a1b: "Canalele și frecvența e-mailurilor le configurezi tu, separat pentru fiecare tip de notificare. Astfel, memento-ul nu atârnă de un singur om și nu dispare cât timp colegul de la HR e în concediu.",

    q2: "Cine răspunde dacă un șofer pleacă în cursă cu un document expirat?",
    a2: "În majoritatea statelor UE — transportatorul, nu doar șoferul: amenda se dă firmei, iar în unele țări separat și managerului de transport. Cuantumul și procedura depind de țara în care are loc controlul. Exact de asta G-Track nu îi amintește șoferului, ci biroului — celui care pune cursa în plan.",

    q3: "Se vede pe panoul de planificare cine nu poate pleca din cauza unui document?",
    a3: "Da, panoul adună oameni, vehicule și termene într-un singur loc: cine e în concediu, cine e în concediu medical, cine e fără vehicul, cui nu îi e în regulă un document. Fiecare modificare a planului intră în istoric — vezi nu doar situația de acum, ci și cine a schimbat-o și când.",

    q4: "Am 40–60 de șoferi și ani de scanuri în Excel și dosare. Cine mută toate astea?",
    a4: "Poți începe fără arhivă: introdu șoferii și documentele cu termenele cele mai apropiate — mementourile pornesc deja de la atât. Scanurile vechi se încarcă pe parcurs și nu blochează nimic.",
    a4b: "Migrarea din Excel o facem gratuit pentru primii clienți. Trimite fișierul așa cum e — cu observații, celule goale și „??” în coloana cu date.",

    q5: "Unde stau fizic datele și scanurile? Semnați un DPA?",
    a5: "Datele și fișierele stau în Uniunea Europeană, în centrul de date din Irlanda. Documentul privind prelucrarea datelor este publicat — linkul e în josul paginii — și îl semnăm. Accesul la câmpurile sensibile din interiorul firmei tale este limitat prin roluri, nu printr-o bifă generală.",

    q6: "Dacă decid să plec — îmi iau datele?",
    a6: "Datele se exportă în CSV oricând și fără să ne ceri: lista șoferilor, statusurile documentelor, termenele. Scanurile rămân ale tale: deocamdată se descarcă unul câte unul, iar arhiva întreagă o predăm la cerere. Contul îl ștergi singur, fără telefon de la un „manager de retenție”.",

    q7: "Ce trebuie să facă șoferul? Trebuie să instaleze ceva?",
    a7: "Nimic. Șoferul lucrează în Telegram, pe care îl are deja: își vede documentele și termenele, tura și vehiculul, și trimite poza unui document nou direct în chat. Traducerea e integrată — șoferul scrie în limba lui, dispecerul citește în limba lui.",
    a7b: "Aplicația are nevoie de internet. Și nu înlocuiește originalele documentelor din cabină.",

    q8: "Poate un dispecer să vadă graficul, dar să nu vadă pașaportul și certificatul medical?",
    a8: "Da, și așa e din start. Permisiunile se dau punctual — sunt peste treizeci. Codul numeric personal și contul bancar stau în spatele unei permisiuni separate și se afișează mascate. Ce tipuri de documente sunt considerate confidențiale decide fiecare firmă pentru sine.",

    q9: "Cum stați cu șoferii din țări terțe — Ucraina, Serbia, Uzbekistan?",
    a9: "Pentru cetățenii non-UE lista obligatorie e alta și mai lungă: viză, pașaport, Code 95, adeverință de reședință. Pregătirea pentru cursă se calculează exact după lista extinsă — un șofer nu apare ca pregătit până nu îi sunt în regulă documentele lui, nu un șablon general.",

    q10: "Cât costă pentru 40 de vehicule și 45 de remorci? Se plătește pentru fiecare utilizator?",
    a10: "Planul Starter — 150 € pe lună, iar la plata anuală 125 €. Include 50 de vehicule, 100 de șoferi și 75 de remorci, deci flota ta încape cu rezervă. Locurile de dispecer și de HR nu se numără: adaugă pe toți cei care au nevoie.",
    a10b: "Treizeci de zile de demo, fără card și fără apel de la vânzări. Prețurile — pe această pagină, nu „la cerere”.",

    notHead: "Ce nu face G-Track",
    notSub: "Ca să nu-ți pierzi cele treizeci de zile de demo verificând ceva ce nu există aici.",
    not1: "Nu analizează tahograful. Nu citim fișiere DDD, nu calculăm timpul de conducere și de odihnă și nu calculăm cabotajul 3/7.",
    not2: "Nu urmărește vehiculele. Nici traseu GPS, nici rute în timp real — asta e telematica ta.",
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
    tagline: "Conformitate UE și planificare pentru transportatori",
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
    kpiTrip: "În cursă astăzi", kpiVac: "În concediu", kpiNoVeh: "Fără vehicul",
    stActive: "Activ", stTrip: "În cursă", ready: "pregătit",
    vacUntil: "Concediu până la 15.06", sick: "Concediu medical",
    toastWarnT: "Viza expiră în 30 de zile", toastWarnD: "P. Savchenko · de prelungit până la 12.07.2026",
    toastOkT: "Viza prelungită până în 08.2028", toastOkD: "Numărul și data recunoscute din scan",
    docs: "Documente", urgent: "Urgente", nonEU: "NON-EU",
    tabOverview: "Prezentare generală", tabDocs: "Documente", tabComments: "Comentarii", tabHistory: "Istoric",
    confid: "Confidențial", confNote: "Datele bancare sunt vizibile doar celor care trebuie să le vadă.",
    cardTitle: "Profilul șoferului", remindTitle: "Documente · memento",
    remindT: "Viza expiră la 12.07.2026", remindD: "Memento automat cu 30 de zile înainte · responsabil: HR",
    tgBot: "G-Track Bot",
    tgMsg: "Petr, viza dvs. expiră pe 12.07. Încărcați un document nou sau contactați HR.",
    tgTime: "astăzi · 08:00",
    dlgTitle: "Adaugă document", dlgQuick: "Completare rapidă din document",
    fldType: "Tip de document", fldTypeV: "Viză (VIS)", fldNum: "Număr", fldUntil: "Valabilă până la",
    recognized: "recunoscut",
    week25: "Planificare · săptămâna 25",
    histTs1: "astăzi 14:02", hist1: "Stare modificată — În cursă (3QR 6671)", histBy1: "disp. S. Malek",
    histTs2: "astăzi 13:58", hist2: "Document actualizat — Viză (VIS)", histBy2: "HR · I. Koval",
    histNote: "Fiecare modificare — în istoric.",
    mcH: "Viză · P. Savchenko",
    mc1: "Șoferul a încărcat scanul din Telegram",
    mc2: "G-Track a recunoscut singur numărul și data",
    mc3: "Viza prelungită până în 08.2028",
    mcSub2: "CZ-4471920 · până la 03.08.2028",
    chipVisaWarn: "VIS · 30 z", chipVisaOk: "VIS · 2028",
  },
};
