/* ============================================================================
   G-Track Landing — итальянская локаль (it).
   Терминология сверена с app-локалью gtrack-tms/src/i18n/locales/it.ts:
   driverPill («In viaggio», «Ferie», «Malattia»), readiness («pronto»,
   «Preparazione al viaggio»), billing.redesign / roadmap (founding,
   «prezzo bloccato», «lancio generale»); места названы «postazioni dispatcher»
   сознательно иначе, чем в биллинге приложения («postazioni spedizioniere»):
   spedizioniere — экспедитор, а на экране Центра решений приложение само пишет «dispatcher»,
   единица дней — «g» («30 g»). Цены/проценты — байт-в-байт с RU; с EN расходится
   только десятичный разделитель: запятая (≈ 2,25 €, −6,7%).
   ============================================================================ */

import type { LandingDict } from "../landing-i18n";

export const it: LandingDict = {
  meta: {
    title: "G-Track — EU-compliance e pianificazione per vettori",
    description:
      "Documenti degli autisti, viaggi e ferie, riparazioni e manutenzione — un’unica app web per vettori da 50 veicoli in su. 30 giorni gratis, prezzi in pagina.",
  },

  nav: {
    product: "Prodotto",
    pricing: "Prezzi",
    roadmap: "Roadmap",
    login: "Accedi",
    ctaFull: "Prova 30 giorni",
    ctaShort: "30 giorni gratis",
    ctaTiny: "30 giorni",
    themeAria: "Cambia il tema del sito",
    langAria: "Lingua dell’interfaccia",
    menuAria: "Menu di navigazione",
    langRu: "Русский",
    langEn: "English",
    langNote: "+10 lingue in produzione",
  },

  hero: {
    kicker: "EU-compliance · pianificazione · flotta e manutenzione",
    h1: "Ogni autista pronto per il viaggio.",
    h1dim: "Sempre.",
    sub: " — il sistema di EU-compliance e pianificazione per vettori da 50 veicoli in su. Documenti degli autisti, viaggi e ferie, riparazioni e manutenzione — nel browser, senza hardware né consulenti d’implementazione. Il sistema ti mostra da solo cosa va deciso oggi.",
    ctaTrial: "Prova 30 giorni",
    ctaPricing: "Guarda i prezzi",
    micro1: "Senza carta di credito",
    micro2: "Registrazione in 2 minuti",
    micro3: "Dati nell’UE",
    boardAria:
      "Lavagna di disposizione G-Track: carichi la scansione di un documento, il sistema ne riconosce numero e scadenza, tu controlli e salvi la scheda",
    boardCaption:
      "Carichi una scansione → G-Track riconosce numero e scadenza → controlli e salvi",
  },

  trust: {
    aria: "Cosa funziona già in G-Track",
    c1: "Autisti · 16 tipi di documento",
    c2: "Pianificazione · lavagna e viaggi",
    c3: "Centro decisioni",
    c4: "Rotazione · 3 mesi in anticipo",
    c5: "Veicoli · trattori e rimorchi",
    c6: "Riparazioni e manutenzione",
    c7: "Telematica · il tuo sistema di monitoraggio flotta",
    c8: "L’autista su Telegram · richieste e promemoria",
    c9: "12 lingue dell’interfaccia",
  },

  og: {
    docTypes: "tipi di documento autista",
    langs: "lingue dell’interfaccia",
  },

  /* ---- полоса «было → стало»: s2–s4 — названия модулей из меню приложения ---- */
  strip: {
    aria: "Prima e dopo: quattro schermate del prodotto",
    was: "Prima —",
    p1: "una telefonata la sera: «segnami dal dieci»",
    p2: "una riga in Excel — se qualcuno si è ricordato di scriverla",
    p3: "chi rientra e su quale mezzo — nella testa del dispatcher",
    p4: "della revisione ci si ricorda quando il mezzo serve già per un viaggio",
    s1: "Telegram",
    s2: "Pianificazione",
    s3: "Rotazione autisti",
    s4: "Veicoli",
  },

  /* ---- витрина «Одна заявка». Строки макетов не переводятся заново: они взяты из
     словарей приложения и мини-приложения; числа и даты подставляет showcase-data.ts ---- */
  showcase: {
    /* текст секции */
    overline: "Prodotto",
    h2: "Una richiesta — e tutto il sistema lo sa",
    sub: "Oggi è una telefonata, una riga in Excel e la memoria del dispatcher. In G-Track la richiesta dell’autista finisce sulla lavagna, la risposta gli torna su Telegram e la rotazione confronta in anticipo il giorno del suo rientro con le scadenze del mezzo.",
    legend: "Gli stessi dati — su tutte le schermate:",
    c1h: "L’autista chiede dalla cabina",
    c1p: "Ferie o malattia — su Telegram, che ha già. Non serve installare niente.",
    c2h: "La richiesta è già sulla lavagna",
    c2p: "Una barra tratteggiata sulla riga dell’autista; in alto, quanta parte del team è già in ferie. Per approvare basta un clic.",
    cAns: "L’autista riceve la risposta su Telegram",
    c3h: "Il rientro si vede in anticipo",
    c3p: "Chi rientra entro {n} giorni e se il suo mezzo è pronto: libero, non in officina, documenti in regola.",
    c4h: "Il mezzo ha le sue scadenze",
    c4p: "La revisione scadrà mentre l’autista è in ferie — c’è ancora tempo per prenotarla.",
    foot: "Tutto ciò che vedi in queste schermate funziona senza telematica.",
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
    tgGreet: "Buongiorno",
    tgDate: "lun 5 ottobre 2026",
    tgOnShift: "In servizio",
    tgTruck: "Camion",
    tgTrailer: "Rimorchio",
    tgCta: "Nuova richiesta",
    tgSheet: "Di cosa ha bisogno?",
    tgVac: "Ferie",
    tgSick: "Malattia",
    tgOther: "Altro",
    tgCancel: "Annulla",
    tgReqs: "Le mie richieste",
    tgReqVac: "Ferie",
    tgApproved: "Approvata",
    tgMonth: "Ottobre",
    tgDays: "giorni",
    tgSubmitted: "inviata",
    /* планировщик — дословно из словаря приложения */
    plTitle: "Pianificazione",
    plMonth: "ott",
    wd: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
    dayFmt: "{wd} {d}",
    kpiAway: "Ferie e malattia",
    kpiAwaySub: "{pct}% del team",
    kpiPending: "Richiesta in attesa",
    kpiPendingSub: "in attesa di risposta",
    needs: "Richiedono una decisione",
    stTrip: "In viaggio",
    stFree: "Libero",
    stSick: "Malattia",
    stVac: "Ferie",
    stUntil: "{status} · fino al {date}",
    barPending: "⏳ Ferie",
    barUntil: "fino al {date}",
    popTitle: "Richiesta di ferie",
    popPeriod: "Periodo",
    popDays: "{n} giorni",
    popReason: "Commento dell’autista",
    popReasonV: "Matrimonio di mio fratello",
    popHistory: "Cronologia",
    popCreated: "Creata",
    popAwaiting: "In attesa di decisione",
    popReject: "Rifiuta",
    popApprove: "Approva",
    /* ротация */
    rotTitle: "Rotazione autisti",
    rotReturning: "Rientrano",
    rotHorizon: "in {n} giorni",
    rotPrepare: "Da preparare {n}",
    rotWeek: "Settimana {range}",
    rotWeekCount: "rientrano {n}",
    rotVac: "Ferie",
    rotSick: "Malattia",
    rotReturn: "rientro {date}",
    rotPrev: "veicolo precedente",
    rotReady: "Mezzo pronto",
    rotBusy: "Occupato: {name}",
    rotDoc: "{doc} fino al {date}",
    /* карточка машины */
    vehTitle: "Veicoli",
    vehType: "Trattore",
    vehFuel: "Diesel",
    vehOnTrip: "In viaggio",
    vehTabOverview: "Panoramica",
    vehTabDocs: "Documenti",
    vehTabService: "Manutenzione",
    vehGroup: "Revisione",
    docStk: "Revisione tecnica",
    docCal: "Taratura tachigrafo",
    docTdl: "Scarico dati tachigrafo",
    daysLeft: "{n} giorni rimanenti",
    days: "{n} giorni",
  },

  vid: {
    overline: "Mercato europeo",
    h2: "Fatto per i vettori europei.",
    sub: "A1, Code 95, visti — scadenze già sotto controllo oggi.",
    chip2: "A1",
    chip3: "Code 95",
    chip4: "ADR",
    chip5: "Analisi DDD",
    chip6: "12 lingue dell’interfaccia",
    tag: "VIDEO · PLACEHOLDER",
  },

  langs: {
    overline: "Localizzazione",
    h2: "12 lingue dell’interfaccia",
    sub: "Il dispatcher e l’HR lavorano nella propria lingua — la formazione del personale richiede un giorno, non un mese.",
  },

  europe: {
    overline: "Geografia",
    h2: "Tutta l’Europa su una sola lavagna",
    sub: "Chi è in viaggio, chi è in ferie, quale mezzo è in officina — sulla lavagna. Chi rientra e chi sarà libero — con 14 giorni, un mese o tre mesi di anticipo.",
    mapAria: "Mappa dei percorsi in Europa che confluisce in una lavagna di pianificazione",
    captionB: "Tutto questo caos si gestisce da qui",
    caption: " — da una sola lavagna e un solo elenco di decisioni.",
  },

  /* Секция «Работает сейчас» на главной: карточки строятся из TRACKS
     (roadmap-content.ts) и текстов d.roadmap — здесь только заголовок и ссылка. */
  modules: {
    h2: "Non «in arrivo». Adesso.",
    cta: "La roadmap completa",
  },

  /* Страница дорожной карты (/roadmap). Свой H1 и свои meta: заголовок главной
     сюда не наследуется — иначе 12 страниц карты получают title продукта. */
  roadmap: {
    meta: {
      title: "Roadmap G-Track — cosa funziona, cosa costruiamo, cosa arriva",
      description:
        "Tre orizzonti dello sviluppo di G-Track: cosa funziona già, cosa stiamo costruendo e cosa arriverà dopo. Senza date né promesse.",
    },
    h1: "Cosa funziona già, cosa stiamo costruendo e cosa arriverà",
    lede: "Ecco dove sta andando il prodotto: cosa funziona già, cosa stiamo costruendo ora e cosa arriverà dopo. Niente date promesse: solo la direzione.",
    now: "Funziona oggi",
    wip: "In corso",
    next: "Prossimo",
    releases: "{n}+ aggiornamenti dal lancio di maggio 2026.",
    nowMark: "Oggi",
    launch: "Lancio 1.0",
    aria: "Aree di sviluppo di G-Track: cosa funziona, cosa è in corso e cosa è in programma",
    tracks: {
      drivers: { t: "Autisti e documenti", d: "Profili, 16 tipi di documento, regole di 8 paesi" },
      planning: { t: "Pianificazione e pilota automatico", d: "Lavagna, Centro decisioni, rotazione, pilota automatico da carta" },
      fleet: { t: "Veicoli e manutenzione", d: "Flotta, riparazioni e manutenzione, dati di bordo" },
      telematics: { t: "Integrazione telematica", d: "Colleghiamo il tuo sistema di monitoraggio flotta: i dati dei veicoli arrivano da soli, per la pianificazione e il calcolo dei tagliandi. Funziona anche in manuale." },
      telegram: { t: "L’autista su Telegram", d: "Richieste di ferie e malattia, turno di oggi, promemoria sulle scadenze dei documenti" },
      reports: { t: "Report e notifiche", d: "Report settimanale, centro notifiche, scadenze scarico tachigrafo" },
      companies: { t: "Aziende collegate", d: "Più aziende dello stesso titolare: ognuna con il proprio abbonamento, veicoli e autisti delle altre visibili in sola lettura" },
      finance: { t: "Ordini e finanze", d: "Ordini, fatture, multe, economia del veicolo" },
      integrations: { t: "Mappa e integrazioni", d: "Mappa e percorsi, analisi dei DDD, API, borse carichi" },
    },
    ms: { autopilot: "Pilota automatico", decisions: "Centro decisioni", rotation: "Rotazione", service: "Riparazioni e manutenzione", miniapp: "Mini-app", telematics: "Prima integrazione" },
  },

  pricing: {
    overline: "Prezzi",
    h2: "Tutto il mercato nasconde i prezzi dietro al «contact sales». Noi no.",
    sub: "I prezzi sono qui. Registrazione senza telefonate, demo di 30 giorni. Tutti i moduli in ogni piano: cambia solo la capacità della flotta.",
    periodAria: "Periodo di fatturazione",
    perMo: "Mensile",
    perQ: "Trimestrale",
    perY: "Annuale",
    discQ: "−6,7%",
    discY: "−16,7%",
    /* NUMERI SINCRONIZZATI CON STRIPE LIVEMODE — NON MODIFICARE */
    billedMo: "fatturazione mensile",
    billedQ: "fatturazione trimestrale",
    billedY: "fatturazione annuale",
    perMonth: "/mese",
    afterLaunch: "dopo il lancio",
    perTruck: "per veicolo/mese",
    starterBlurb: "Una piccola flotta che mette ordine nei documenti",
    fleetBlurb: "Il cavallo da lavoro del vettore medio con un turno di disposizione",
    businessBlurb: "Una grande flotta con più uffici di disposizione",
    plusBlurb: "Una flotta oltre i 1000 veicoli — condizioni costruite sui tuoi processi",
    fleetFlag: "Il più scelto",
    choose: "Scegli",
    plusPrice: "Personalizzato",
    plusGa: "condizioni — nel contratto",
    plusBilled: "su contratto",
    plusCta: "Scrivi a sales@",
    lock12: "Prezzo bloccato 12 mesi",
    lock24: "Prezzo bloccato 24 mesi",
    lockContract: "Bloccato nel contratto",
    capTrucks: "veicoli",
    capDrivers: "conducenti",
    capTrailers: "rimorchi",
    capSeats: "postazioni dispatcher",
    upTo: "fino a",
    plusTrucks: "veicoli",
    plusUnlim: "illimitati",
    packLead: "Serve di più?",
    packMax: "fino a 5 pacchetti",
    plusSla: "SLA",
    plusSlaSuffix: "e supporto prioritario",
    foundingB: "Il prezzo iniziale resta con te per 12–24 mesi dopo il lancio generale.",
    founding: " I nuovi clienti dopo il lancio pagheranno di più — tu no.",
    noteA: "Un anno vale ",
    noteB: "«2 mesi gratis»",
    noteC: ". Migrazione gratuita dei dati da Excel per i primi clienti.",
    anchorOverline: "I conti",
    anchorBig: "≈ 2,25 €",
    anchorUnit: "per veicolo/mese · flotta da 200 veicoli",
    anchorArg: "Un autista con il Codice 95 scaduto — fino a 20 000 € di multa in Germania. Un visto scaduto — un viaggio fermo. G-Track tiene tutta la flotta sotto controllo per meno di quanto costi un singolo imprevisto.",
  },

  faq: {
    overline: "Domande",
    h2: "Cosa chiedono i vettori prima di aprire un account",
    sub: "Risposte brevi, senza «contattaci». Qui c’è quello che ci chiedono più spesso — comprese le cose che non facciamo.",
    askLead: "La tua domanda non c’è?",
    askCta: "Scrivici — rispondiamo con la stessa brevità",

    g1: "Scadenze e responsabilità",
    g2: "Avvio e dati",
    g3: "Accessi, flotta, prezzo",

    q1: "Come mi avvisa il sistema che a un autista sta scadendo un documento?",
    a1: "Ogni mattina G-Track controlla i documenti di tutti gli autisti. Il passaporto compare nel riepilogo 180 giorni prima della scadenza, gli altri documenti 90 giorni prima. L’ufficio riceve una email, nell’app il documento viene segnato come in scadenza e l’autista che ha collegato il bot Telegram riceve un promemoria.",
    a1b: "Le email con il riepilogo le attivi tu e scegli a chi arrivano: solo al proprietario, agli amministratori o a tutti i membri. Così il promemoria non resta appeso a una sola persona e non svanisce mentre l’HR è in ferie.",

    q2: "Chi risponde se un autista parte in viaggio con un documento scaduto?",
    a2: "Nella maggior parte dei paesi UE il vettore, non solo l’autista: la sanzione arriva all’azienda e in diversi paesi anche al gestore dei trasporti in prima persona. Importi e procedura dipendono dal paese in cui avviene il controllo. Proprio per questo G-Track avvisa prima di tutto l’ufficio — chi mette il viaggio in programma — e ripete il promemoria su Telegram all’autista che ha collegato il bot.",

    q3: "Dalla lavagna di pianificazione si vede chi non può partire per un documento?",
    a3: "Sì, la lavagna riunisce persone, veicoli e scadenze in un unico posto: chi è in ferie, chi è in malattia, chi è senza veicolo, chi ha un documento non in ordine. Ogni modifica del piano finisce nella cronologia — vedi non solo la situazione attuale, ma anche chi l’ha cambiata e quando.",

    q11: "Cosa fa G-Track da solo e cosa decide il dispatcher?",
    a11: "Se ne accorge da solo: chi rientra dalle ferie, quale viaggio finisce senza un seguito, quali autisti nuovi sono ancora senza piano — tutto questo confluisce nel Centro decisioni. Se il sistema può cambiare il piano al posto tuo, lo decidi tu scegliendo la modalità: «Manuale», «Centro» o «Automatico». Di default si limita a chiedere. Ogni sua modifica al piano finisce nel registro.",

    q4: "Ho 40–60 autisti e anni di scansioni tra Excel e cartelle di carta. Chi le trasferisce?",
    a4: "Si può partire senza l’archivio: inserisci gli autisti e i documenti con le scadenze più vicine — i promemoria funzionano già solo con questo. Le vecchie scansioni si caricano strada facendo e non bloccano nulla.",
    a4b: "Ai primi clienti la migrazione da Excel la facciamo gratis. Mandaci il file com’è — con le note, le celle vuote e i «??» nelle date.",

    q5: "Dove stanno fisicamente i dati e le scansioni? Firmate un DPA?",
    a5: "Dati e file stanno nell’Unione europea, in un data center in Irlanda. Il documento sul trattamento dei dati è pubblicato, il link è nel piè di pagina; lo firmiamo. L’accesso ai campi riservati dentro la tua azienda è limitato dai ruoli, non da un’unica spunta generale.",

    q6: "Se decido di andarmene — i dati me li porto via?",
    a6: "Finché l’account è attivo, i dati si esportano in CSV in qualsiasi momento e senza chiedere: elenco autisti, stati dei documenti, scadenze. Le scansioni restano tue: oggi si scaricano una per una, l’intero archivio lo consegniamo su richiesta. L’account lo elimina il proprietario in autonomia, senza telefonate del «responsabile fidelizzazione».",

    q7: "Cosa deve fare l’autista? Deve installare qualcosa?",
    a7: "Niente: Telegram ce l’ha già. Nel bot invia la richiesta di ferie o di malattia — arriva in pianificazione e la risposta torna a lui. Vede su quale mezzo viaggia oggi e riceve i promemoria sulle scadenze dei suoi documenti.",
    a7b: "All’app serve internet. E non elimina l’obbligo di tenere gli originali in cabina.",

    q8: "Un dispatcher può vedere la pianificazione ma non il passaporto e il certificato medico?",
    a8: "Sì. I permessi si assegnano uno per uno — sono 36. Di default numero e scansione di passaporto, visto e carta d’identità li vede solo chi ha accesso ai dati riservati; gli altri vedono solo stato e scadenza. Qualsiasi altro tipo di documento, per esempio il certificato medico, l’azienda può renderlo riservato allo stesso modo nelle impostazioni. Codice fiscale e numero di conto bancario stanno dietro un permesso a parte e si vedono mascherati.",

    q9: "Come gestite gli autisti dai paesi terzi — Ucraina, Serbia, Uzbekistan?",
    a9: "Per i non cittadini UE l’elenco obbligatorio è più lungo: a passaporto, patente di guida e carta tachigrafica si aggiungono visto, licenza di trasporto e Codice 95. La preparazione al viaggio si calcola proprio su quell’elenco esteso — un autista non risulta pronto finché non sono a posto i suoi documenti, non quelli di un modello generico.",

    q12: "La telematica ce l’abbiamo già. Serve anche a G-Track?",
    a12: "Non è obbligatoria: documenti, lavagna, rotazione, riparazioni e manutenzione funzionano anche senza, e i chilometri si inseriscono a mano. Colleghiamo il tuo sistema di monitoraggio flotta e i chilometri arrivano dal mezzo; G-Track vede di chi è la carta nel tachigrafo e si accorge se un mezzo viaggia senza piano.",

    q10: "Quanto costa per 40 veicoli e 45 rimorchi? Si paga per ogni utente?",
    a10: "Il piano Starter costa 150 € al mese, 125 € con pagamento annuale. Comprende 50 veicoli, 100 autisti e 75 rimorchi, quindi la tua flotta ci sta con margine. Le postazioni di dispatcher e HR non si contano: registra tutti quelli che servono.",
    a10b: "Trenta giorni di demo senza carta e senza telefonate commerciali. I prezzi sono su questa stessa pagina, non «su richiesta».",

    notHead: "Cosa G-Track non fa",
    notSub: "Così non spendi trenta giorni di demo a cercare qualcosa che qui non c’è.",
    not1: "Non analizza il tachigrafo. Non leggiamo i file DDD, non calcoliamo tempi di guida e riposo e non contiamo il cabotaggio 3/7.",
    not2: "Non mostra i veicoli su una mappa. Chilometraggio e movimento G-Track li prende dal mezzo, ma mappa e percorsi non ci sono — quella è la tua telematica.",
    not3: "Non gestisce ordini e noli. Ordini e fatture sono all’orizzonte, oggi non ci sono.",
    not4: "Non calcola gli stipendi e non sostituisce la contabilità.",
    notBridge: "Non sostituiamo il software del tachigrafo né la telematica. Copriamo quello che in loro non c’è: persone, documenti, scadenze e chi guida in quale giorno.",
  },

  final: {
    overline: "Il prezzo dei primi",
    h2: "Inizia adesso — il prezzo viaggia con te.",
    ctaTrial: "Prova 30 giorni",
    ctaPricing: "Guarda i prezzi",
    migrate: "I dati sono in Excel? Li migriamo gratis — ",
  },

  footer: {
    tagline: "EU-compliance, pianificazione, flotta e manutenzione per vettori",
    legalHeading: "Note legali",
    privacy: "Privacy",
    terms: "Termini di servizio",
    dpa: "Trattamento dei dati",
    securityHeading: "Sicurezza dei dati",
    trust1: "Dati archiviati nell'UE",
    trust2: "Conforme al GDPR",
    trust3: "Accesso basato su ruoli",
    langs: "12 lingue",
    rights: "© 2026 G-Track Software s.r.o.",
  },

  names: {
    kratochvil: "M. Kratochvil", kratochvilAv: "MK",
    savchenko: "P. Savchenko", savchenkoAv: "PS",
    novak: "J. Novak", novakAv: "JN",
    berzins: "E. Berzins", berzinsAv: "EB",
  },

  /* ---- словарь мокапов: термины = app-локаль it (driverPill, planning) ---- */
  mock: {
    planning: "Pianificazione", week24: "Settimana 24 · 8–13 giu", colDriver: "Autista",
    d1: "Lun 08", d2: "Mar 09", d3: "Mer 10", d4: "Gio 11", d5: "Ven 12",
    kpiTrip: "In viaggio oggi", kpiVac: "In ferie", kpiFree: "Liberi",
    stActive: "Attivo", stTrip: "In viaggio", ready: "pronto",
    vacUntil: "Ferie fino al 15.06", sick: "Malattia",
    toastWarnT: "Riepilogo via email: il visto scade il 12.07", toastWarnD: "P. Savchenko · mancano 32 giorni",
    mcH: "Visto · P. Savchenko",
    mc1: "Caricata una nuova scansione del visto",
    mc2: "G-Track ha riconosciuto da solo numero e data",
    mc3: "Validità del visto registrata: 08.2028",
    mcSub2: "CZ-4471920 · fino al 03.08.2028",
    chipVisaWarn: "VIS · 32 g", chipVisaOk: "VIS · 2028",
  },
};
