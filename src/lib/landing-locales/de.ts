/* ============================================================================
   G-Track Landing — deutsche Lokalisierung (de).
   Terminologie 1:1 mit der App (gtrack-tms/src/i18n/locales/de.ts):
   driverPill (Aktiv / Auf Tour / Urlaub / Krank), Einsatzbereitschaft,
   Module (Fahrer / Dokumente / Planung / Fahrzeuge / Aufträge / Fakturierung),
   Founding-Lexik (Founding-Preis, offizieller Launch, Preisgarantie),
   Dokumenttypen (Visum, Kennziffer 95, A1-Bescheinigung, Führerschein).
   Zahlen, Preise und Prozente — byte-identisch mit en, außer dem
   Dezimaltrennzeichen: Komma (≈ 2,25 €, −6,7%).
   ============================================================================ */

import type { LandingDict } from "../landing-i18n";

export const de: LandingDict = {
  meta: {
    title: "G-Track — EU-Compliance und Tourenplanung für Spediteure",
    description:
      "Fahrerdokumente, Touren und Urlaub, Reparaturen & Wartung — in einer Browser-App für Transportunternehmen ab 50 Lkw. 30 Tage gratis, Preise auf der Seite.",
  },

  nav: {
    product: "Produkt",
    pricing: "Preise",
    roadmap: "Roadmap",
    login: "Anmelden",
    ctaFull: "30 Tage testen",
    ctaShort: "30 Tage gratis",
    ctaTiny: "30 Tage",
    themeAria: "Farbschema der Website umschalten",
    langAria: "Oberflächensprache",
    menuAria: "Navigationsmenü",
    langRu: "Русский",
    langEn: "English",
    langNote: "+10 Sprachen in der App",
  },

  hero: {
    kicker: "EU-Compliance · Planung · Flotte & Wartung",
    h1: "Jeder Fahrer bereit für die Tour.",
    h1dim: "Immer.",
    sub: " — das EU-Compliance- und Planungssystem für Transportunternehmen ab 50 Lkw. Fahrerdokumente, Touren und Urlaub, Reparaturen und Wartung — im Browser, ohne Hardware und ohne Einführungsberater. Was heute entschieden werden muss, zeigt Ihnen das System von selbst.",
    ctaTrial: "30 Tage testen",
    ctaPricing: "Preise ansehen",
    micro1: "Keine Kreditkarte",
    micro2: "Registrierung in 2 Minuten",
    micro3: "Daten in der EU",
    boardAria:
      "G-Track-Dispositionsboard: Sie laden einen Dokumentenscan hoch, das System erkennt Nummer und Ablaufdatum, Sie prüfen und speichern den Eintrag",
    boardCaption:
      "Sie laden einen Scan hoch → G-Track erkennt Nummer und Ablaufdatum → Sie prüfen und speichern",
  },

  trust: {
    aria: "Was in G-Track bereits funktioniert",
    c1: "Fahrer · 16 Dokumenttypen",
    c2: "Planung · Board und Touren",
    c3: "Entscheidungszentrum",
    c4: "Rotation · 3 Monate im Voraus",
    c5: "Fahrzeuge · Zugmaschinen und Anhänger",
    c6: "Reparaturen & Wartung",
    c7: "Telematik · Anbindung Ihres Systems",
    c8: "Fahrer in Telegram · Anträge und Erinnerungen",
    c9: "12 Oberflächensprachen",
  },

  og: {
    docTypes: "Fahrer-Dokumenttypen",
    langs: "Oberflächensprachen",
  },

  /* ---- полоса «было → стало»: s2–s4 — названия модулей из меню приложения ---- */
  strip: {
    aria: "Vorher und nachher: vier Produktbildschirme",
    was: "Vorher —",
    p1: "ein Anruf am Abend: „Trag mich ab dem Zehnten ein“",
    p2: "eine Zeile in Excel — wenn niemand vergessen hat, sie einzutragen",
    p3: "wer nach der Rückkehr welchen Lkw fährt — im Kopf des Disponenten",
    p4: "an den TÜV denkt man erst, wenn der Lkw schon auf Tour muss",
    s1: "Telegram",
    s2: "Planung",
    s3: "Fahrerrotation",
    s4: "Fahrzeuge",
  },

  /* ---- витрина «Одна заявка». Строки макетов не переводятся заново: они взяты из
     словарей приложения и мини-приложения; числа и даты подставляет showcase-data.ts ---- */
  showcase: {
    /* текст секции */
    overline: "Produkt",
    h2: "Ein Antrag — das ganze System weiß Bescheid",
    sub: "Heute sind das ein Anruf, eine Zeile in Excel und das Gedächtnis des Disponenten. In G-Track landet der Antrag des Fahrers auf dem Board, die Antwort kommt in Telegram zu ihm zurück, und die Fahrerrotation gleicht seinen Rückkehrtag schon im Voraus mit den Fristen des Lkw ab.",
    legend: "Dieselben Daten — auf allen Bildschirmen:",
    c1h: "Der Fahrer stellt den Antrag im Führerhaus",
    c1p: "Urlaub oder Krankschreibung — in Telegram, das er schon hat. Installieren muss er nichts.",
    c2h: "Der Antrag ist schon auf dem Board",
    c2p: "Ein gestrichelter Balken in der Zeile des Fahrers, darüber — wie viele im Team schon im Urlaub sind. Genehmigen — ein Klick.",
    cAns: "Die Antwort — beim Fahrer in Telegram",
    c3h: "Die Rückkehr — vorab im Blick",
    c3p: "Wer in den nächsten {n} Tagen zurückkommt und ob sein Fahrzeug bereit ist: frei, nicht in der Werkstatt, Dokumente gültig.",
    c4h: "Der Lkw hat seine eigenen Fristen",
    c4p: "Der TÜV läuft ab, während der Fahrer im Urlaub ist — für einen Termin bleibt noch Zeit.",
    foot: "Alles auf diesen Bildschirmen funktioniert ohne Telematik.",
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
    tgGreet: "Guten Morgen",
    tgDate: "Mo., 5. Oktober 2026",
    tgOnShift: "Im Dienst",
    tgTruck: "Zugmaschine",
    tgTrailer: "Auflieger",
    tgCta: "Neue Anfrage",
    tgSheet: "Was brauchen Sie?",
    tgVac: "Urlaub",
    tgSick: "Krankschreibung",
    tgOther: "Sonstiges",
    tgCancel: "Abbrechen",
    tgReqs: "Meine Anträge",
    tgReqVac: "Urlaub",
    tgApproved: "Genehmigt",
    tgMonth: "Oktober",
    tgDays: "Tage",
    tgSubmitted: "eingereicht",
    /* планировщик — дословно из словаря приложения */
    plTitle: "Planung",
    plMonth: "Okt.",
    wd: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    dayFmt: "{wd} {d}.",
    kpiAway: "Urlaub & Krank",
    kpiAwaySub: "{pct}% des Teams",
    kpiPending: "Antrag offen",
    kpiPendingSub: "warten auf Antwort",
    needs: "Erfordern Entscheidung",
    stTrip: "Auf Tour",
    stFree: "Frei",
    stSick: "Krank",
    stVac: "Urlaub",
    stUntil: "{status} · bis {date}",
    barPending: "⏳ Urlaub",
    barUntil: "bis {date}",
    popTitle: "Urlaubsantrag",
    popPeriod: "Zeitraum",
    popDays: "{n} Tage",
    popReason: "Kommentar des Fahrers",
    popReasonV: "Hochzeit meines Bruders",
    popHistory: "Verlauf",
    popCreated: "Erstellt",
    popAwaiting: "Wartet auf Entscheidung",
    popReject: "Ablehnen",
    popApprove: "Genehmigen",
    /* ротация */
    rotTitle: "Fahrerrotation",
    rotReturning: "Kommen zurück",
    rotHorizon: "für {n} Tage",
    rotPrepare: "Vorbereiten {n}",
    rotWeek: "Woche {range}",
    rotWeekCount: "kommen zurück {n}",
    rotVac: "Urlaub",
    rotSick: "Krankheit",
    rotReturn: "Rückkehr {date}",
    rotPrev: "vorheriges Fahrzeug",
    rotReady: "Fahrzeug bereit",
    rotBusy: "Belegt: {name}",
    rotDoc: "{doc} bis {date}",
    /* карточка машины */
    vehTitle: "Fahrzeuge",
    vehType: "Sattelzugmaschine",
    vehFuel: "Diesel",
    vehOnTrip: "Auf Tour",
    vehTabOverview: "Übersicht",
    vehTabDocs: "Dokumente",
    vehTabService: "Service",
    vehGroup: "Prüfung",
    docStk: "Technische Prüfung (TÜV)",
    docCal: "Tachograph-Kalibrierung",
    docTdl: "Tachograph-Datendownload",
    daysLeft: "{n} Tage verbleibend",
    daysCal: "{n} Tage",
    daysTdl: "{n} Tage",
  },

  vid: {
    overline: "Europäischer Markt",
    h2: "Gebaut für europäische Transportunternehmen.",
    sub: "A1, Kennziffer 95, Visa — Fristen schon heute im Griff.",
    chip2: "A1",
    chip3: "Kennziffer 95",
    chip4: "ADR",
    chip5: "DDD-Auswertung",
    chip6: "12 Oberflächensprachen",
    tag: "VIDEO · PLATZHALTER",
  },

  langs: {
    overline: "Lokalisierung",
    h2: "12 Sprachen in der Oberfläche",
    sub: "Disponenten und HR arbeiten in ihrer Muttersprache — das Onboarding des Teams dauert einen Tag, nicht einen Monat.",
  },

  europe: {
    overline: "Geografie",
    h2: "Ganz Europa auf einem Board",
    sub: "Wer auf Tour ist, wer im Urlaub, welcher Lkw in der Werkstatt — auf dem Board. Wer zurückkommt und wer frei wird — 14 Tage, einen Monat oder drei Monate im Voraus.",
    mapAria: "Karte der Routen durch Europa, die in ein Planungsboard übergeht",
    captionB: "Dieses ganze Chaos wird von hier gesteuert",
    caption: " — über ein Board und eine Liste offener Entscheidungen.",
  },

  /* Секция «Работает сейчас» на главной: карточки строятся из TRACKS
     (roadmap-content.ts) и текстов d.roadmap — здесь только заголовок и ссылка. */
  modules: {
    h2: "Nicht „bald“. Jetzt.",
    cta: "Zur vollständigen Roadmap",
  },

  /* Страница дорожной карты (/roadmap). Свой H1 и свои meta: заголовок главной
     сюда не наследуется — иначе 12 страниц карты получают title продукта. */
  roadmap: {
    meta: {
      title: "G-Track Roadmap — was läuft, was entsteht, was als Nächstes kommt",
      description:
        "Drei Horizonte der G-Track-Entwicklung: was heute schon läuft, woran wir gerade arbeiten und was danach kommt. Ohne Kalenderdaten und Versprechen.",
    },
    h1: "Was heute läuft, woran wir arbeiten und was danach kommt",
    lede: "Hier sehen Sie, wohin sich das Produkt entwickelt: was heute läuft, woran wir gerade arbeiten und was als Nächstes kommt. Keine Terminversprechen — nur die Richtung.",
    now: "Läuft heute",
    wip: "In Arbeit",
    next: "Als Nächstes",
    releases: "{n}+ Updates seit dem Start im Mai 2026.",
    nowMark: "Heute",
    launch: "Start 1.0",
    aria: "Entwicklungsbereiche von G-Track: was läuft, was in Arbeit ist und was geplant ist",
    tracks: {
      drivers: { t: "Fahrer & Dokumente", d: "Profile, 16 Dokumenttypen, Regeln aus 8 Ländern" },
      planning: { t: "Planung & Autopilot", d: "Board, Entscheidungszentrum, Rotation, Autopilot per Fahrerkarte" },
      fleet: { t: "Fahrzeuge & Wartung", d: "Flotte, Reparaturen & Wartung, Daten vom Bordgerät" },
      telematics: { t: "Telematik-Integration", d: "Wir binden Ihr Telematiksystem an — Fahrzeugdaten kommen von selbst, für Planung und Wartungsintervalle. Manuell geht es auch." },
      telegram: { t: "Fahrer in Telegram", d: "Urlaubsanträge und Krankmeldungen, heutige Schicht, Erinnerungen an Dokumentfristen" },
      reports: { t: "Berichte & Benachrichtigungen", d: "Wochenbericht, Benachrichtigungszentrum, Tacho-Downloadfristen" },
      companies: { t: "Verbundene Unternehmen", d: "Mehrere Firmen eines Inhabers: jede mit eigenem Abonnement, gegenseitiger Lesezugriff auf Fahrzeuge und Fahrer" },
      finance: { t: "Aufträge & Finanzen", d: "Aufträge, Rechnungen, Bußgelder, Fahrzeug-Ökonomie" },
      integrations: { t: "Karte & Integrationen", d: "Karte & Routen, DDD-Auswertung, API, Frachtbörsen" },
    },
    ms: { autopilot: "Autopilot", decisions: "Entscheidungszentrum", rotation: "Rotation", service: "Reparaturen & Wartung", miniapp: "Mini-App", telematics: "Erste Integration" },
  },

  pricing: {
    overline: "Preise",
    h2: "Der ganze Markt versteckt seine Preise hinter „Contact Sales“. Wir nicht.",
    sub: "Die Preise stehen direkt hier. Registrierung ohne Verkaufsgespräch, 30 Tage Demo. Alle Module in jedem Plan: Nur die Flottenkapazität unterscheidet sich.",
    periodAria: "Abrechnungszeitraum",
    perMo: "Monatlich",
    perQ: "Vierteljährlich",
    perY: "Jährlich",
    discQ: "−6,7%",
    discY: "−16,7%",
    /* ZAHLEN SIND MIT STRIPE LIVEMODE SYNCHRONISIERT — NICHT ÄNDERN */
    billedMo: "monatliche Abrechnung",
    billedQ: "Abrechnung pro Quartal",
    billedY: "Abrechnung pro Jahr",
    perMonth: "/Mon.",
    afterLaunch: "nach dem Launch",
    perTruck: "pro Fahrzeug/Mon.",
    starterBlurb: "Eine kleine Flotte, die Ordnung in ihre Dokumente bringt",
    fleetBlurb: "Das Arbeitstier eines mittelgroßen Transportunternehmens mit Dispositionsschicht",
    businessBlurb: "Eine große Flotte mit mehreren Dispositionsbüros",
    plusBlurb: "Eine Flotte jenseits von 1000 Fahrzeugen — Konditionen zugeschnitten auf Ihre Prozesse",
    fleetFlag: "Die Wahl der meisten",
    choose: "Wählen",
    plusPrice: "Individuell",
    plusGa: "Konditionen — im Vertrag",
    plusBilled: "Vertrag",
    plusCta: "E-Mail an sales@",
    lock12: "Preisgarantie 12 Mon.",
    lock24: "Preisgarantie 24 Mon.",
    lockContract: "Vertraglich festgelegt",
    capTrucks: "Fahrzeuge",
    capDrivers: "Fahrer",
    capTrailers: "Anhänger",
    capSeats: "Disponentenplätze",
    upTo: "bis zu",
    plusTrucks: "Fahrzeuge",
    plusUnlim: "unbegrenzt",
    packLead: "Mehr nötig?",
    packMax: "maximal 5 Pakete",
    plusSla: "SLA",
    plusSlaSuffix: "und Priority-Support",
    foundingB: "Ihr Startpreis bleibt 12–24 Monate nach dem offiziellen Launch bei Ihnen.",
    founding: " Neukunden zahlen nach dem Launch mehr — Sie nicht.",
    noteA: "Ein Jahr heißt ",
    noteB: "„2 Monate gratis“",
    noteC: ". Kostenlose Datenmigration aus Excel für frühe Kunden.",
    anchorOverline: "Die Rechnung",
    anchorBig: "≈ 2,25 €",
    anchorUnit: "pro Lkw/Monat · Flotte 200 Lkw",
    anchorArg: "Ein Fahrer mit abgelaufener Kennziffer 95 — bis zu 20 000 € Bußgeld in Deutschland. Ein abgelaufenes Visum — eine gestoppte Tour. G-Track hält die ganze Flotte unter Kontrolle für weniger, als ein einziger solcher Ausfall kostet.",
  },

  faq: {
    overline: "Fragen",
    h2: "Was Spediteure fragen, bevor sie ein Konto anlegen",
    sub: "Kurze Antworten, ohne „Kontaktieren Sie uns“. Hier stehen die Fragen, die wir am häufigsten hören — auch die zu dem, was wir nicht tun.",
    askLead: "Ihre Frage steht nicht dabei?",
    askCta: "Schreiben Sie uns — wir antworten genauso kurz",

    g1: "Fristen und Haftung",
    g2: "Einführung und Ihre Daten",
    g3: "Zugriff, Flotte, Preis",

    q1: "Wie erinnert das System daran, dass bei einem Fahrer ein Dokument abläuft?",
    a1: "Jeden Morgen prüft G-Track die Dokumente aller Fahrer. Ein Reisepass erscheint 180 Tage vor Ablauf in der Morgenübersicht, alle übrigen Dokumente 90 Tage vorher. Das Büro bekommt eine E-Mail, in der App wird das Dokument als ablaufend markiert, und der Fahrer erhält eine Erinnerung, sofern er den Telegram-Bot verbunden hat.",
    a1b: "Die E-Mails mit der Morgenübersicht aktivieren Sie selbst und legen fest, wer sie erhält: nur der Inhaber, die Administratoren oder alle Mitglieder. So hängt die Erinnerung nicht an einer einzigen Person und verschwindet nicht, solange HR im Urlaub ist.",

    q2: "Wer haftet, wenn ein Fahrer mit einem abgelaufenen Dokument auf Tour geht?",
    a2: "In den meisten EU-Ländern das Verkehrsunternehmen, nicht nur der Fahrer: das Bußgeld trifft die Firma, in mehreren Ländern zusätzlich den Verkehrsleiter persönlich. Höhe und Verfahren richten sich nach dem Land, in dem kontrolliert wird. Genau deshalb erinnert G-Track in erster Linie das Büro — diejenigen, die die Tour einplanen — und schickt dem Fahrer, der den Bot verbunden hat, die Erinnerung zusätzlich per Telegram.",

    q3: "Sieht man am Dispositionsboard, wer wegen eines Dokuments nicht rausfahren kann?",
    a3: "Ja. Das Board führt Menschen, Fahrzeuge und Fristen an einem Ort zusammen: wer im Urlaub ist, wer krank ist, wer kein Fahrzeug hat, wessen Dokument nicht in Ordnung ist. Jede Änderung am Plan wird in den Verlauf geschrieben — Sie sehen nicht nur das aktuelle Bild, sondern auch, wer es wann geändert hat.",

    q11: "Was erledigt G-Track selbst, und was entscheidet der Disponent?",
    a11: "G-Track bemerkt von selbst, wer aus dem Urlaub zurückkommt, wessen Tour ohne Anschluss endet und welche neuen Fahrer noch keinen Plan haben — all das sammelt sich im Entscheidungszentrum. Ob das System den Plan für Sie ändert, bestimmen Sie über den Modus: „Manuell“, „Zentrum“ oder „Automatisch“. Standardmäßig fragt es nur nach. Jede Änderung, die es selbst am Plan vornimmt, wird im Journal festgehalten.",

    q4: "Ich habe 40–60 Fahrer und Jahre voller Scans in Excel und Ordnern. Wer überträgt das?",
    a4: "Sie können ohne das Archiv anfangen: Legen Sie die Fahrer an und die Dokumente, deren Fristen am nächsten liegen — die Erinnerungen laufen bereits damit. Alte Scans kommen unterwegs dazu und blockieren nichts.",
    a4b: "Frühen Kunden migrieren wir die Daten aus Excel kostenlos. Schicken Sie die Datei so, wie sie ist — mit Anmerkungen, leeren Zellen und „??“ in der Datumsspalte.",

    q5: "Wo liegen die Daten und die Scans physisch? Unterschreiben Sie ein DPA?",
    a5: "Daten und Dateien liegen in der Europäischen Union, im Rechenzentrum in Irland. Das Dokument zur Datenverarbeitung ist veröffentlicht — der Link steht im Fuß dieser Seite — und wir unterschreiben es. Der Zugriff auf sensible Felder innerhalb Ihres Unternehmens ist über Rollen begrenzt, nicht über einen globalen Schalter.",

    q6: "Wenn ich gehen will — nehme ich meine Daten mit?",
    a6: "Solange das Konto aktiv ist, exportieren Sie die Daten jederzeit und ohne Anfrage als CSV: Fahrerliste, Dokumentstatus, Fristen. Die Scans bleiben Ihre: derzeit werden sie einzeln heruntergeladen, das gesamte Archiv geben wir auf Anfrage heraus. Das Konto löscht der Inhaber selbst, ohne Anruf von einem „Kundenbindungsmanager“.",

    q7: "Was muss der Fahrer tun? Muss er etwas installieren?",
    a7: "Nichts: Telegram hat er schon. Im Bot beantragt er Urlaub oder meldet sich krank — der Antrag landet in der Planung, und die Antwort kommt zu ihm zurück. Er sieht, auf welchem Lkw er heute eingeteilt ist, und wird an die Fristen seiner Dokumente erinnert.",
    a7b: "Die App braucht Internet. Die Originaldokumente im Führerhaus ersetzt sie nicht.",

    q8: "Kann ein Disponent den Plan sehen, aber nicht Reisepass und ärztliche Untersuchung?",
    a8: "Ja. Berechtigungen werden einzeln vergeben — es sind 36. Nummer und Scan von Reisepass, Visum und Personalausweis sehen standardmäßig nur Mitarbeiter mit der Berechtigung „Vertrauliche Daten“, alle anderen nur Status und Ablaufdatum. Jeden anderen Dokumenttyp, etwa die ärztliche Untersuchung, kann das Unternehmen in den Einstellungen ebenso als vertraulich einstufen. Identifikationsnummer und Bankkonto liegen hinter einer eigenen Berechtigung und werden maskiert angezeigt.",

    q9: "Wie ist es bei Fahrern aus Drittstaaten — Ukraine, Serbien, Usbekistan?",
    a9: "Für Nicht-EU-Bürger ist die Pflichtliste länger: Zu Reisepass, Führerschein und Fahrerkarte kommen Visum, Transportlizenz und Kennziffer 95 hinzu. Die Einsatzbereitschaft wird genau gegen diese erweiterte Liste gerechnet — ein Fahrer gilt nicht als bereit, solange seine eigenen Dokumente offen sind, und nicht nach einer allgemeinen Vorlage.",

    q12: "Telematik haben wir schon. Braucht G-Track sie?",
    a12: "Nicht zwingend: Dokumente, Board, Fahrerrotation sowie Reparaturen und Wartung funktionieren auch ohne sie; den Kilometerstand tragen Sie dann von Hand ein. Sobald wir Ihr Telematiksystem anbinden, kommt der Kilometerstand direkt vom Fahrzeug, G-Track sieht, wessen Fahrerkarte im Tachografen steckt, und bemerkt Lkw, die ohne Plan unterwegs sind.",

    q10: "Was kostet das für 40 Fahrzeuge und 45 Anhänger? Zahle ich pro Benutzer?",
    a10: "Der Plan Starter kostet 150 € im Monat, bei Jahreszahlung 125 €. Darin enthalten sind 50 Fahrzeuge, 100 Fahrer und 75 Anhänger — Ihre Flotte passt mit Reserve hinein. Plätze für Disponenten und HR werden nicht gezählt: Legen Sie alle an, die einen brauchen.",
    a10b: "Dreißig Tage Demo ohne Karte und ohne Anruf vom Vertrieb. Die Preise stehen auf dieser Seite, nicht „auf Anfrage“.",

    notHead: "Was G-Track nicht macht",
    notSub: "Damit Sie nicht dreißig Tage Demo darauf verwenden, nach etwas zu suchen, das es hier nicht gibt.",
    not1: "Wertet keine Tachografen aus. Wir lesen keine DDD-Dateien, berechnen keine Lenk- und Ruhezeiten und zählen keine Kabotage 3/7.",
    not2: "Zeigt keine Fahrzeuge auf der Karte. Kilometerstand und Bewegung holt G-Track direkt vom Fahrzeug, aber Karte und Routen gibt es nicht — das ist Ihre Telematik.",
    not3: "Führt keine Aufträge und keine Frachten. Aufträge und Rechnungen stehen am Horizont, heute gibt es sie nicht.",
    not4: "Rechnet keine Löhne ab und ersetzt keine Buchhaltung.",
    notBridge: "Wir ersetzen weder Ihre Tachografen-Software noch Ihre Telematik. Wir schließen die Lücke, die dort bleibt: Menschen, Dokumente, Fristen und wer an welchem Tag fährt.",
  },

  final: {
    overline: "Preis für die Ersten",
    h2: "Starten Sie jetzt — der Preis fährt mit.",
    ctaTrial: "30 Tage testen",
    ctaPricing: "Preise ansehen",
    migrate: "Daten in Excel? Wir migrieren kostenlos — ",
  },

  footer: {
    tagline: "EU-Compliance, Planung, Flotte und Wartung für Transportunternehmen",
    legalHeading: "Rechtliches",
    privacy: "Datenschutz",
    terms: "AGB",
    dpa: "Datenverarbeitung",
    securityHeading: "Datensicherheit",
    trust1: "Daten werden in der EU gespeichert",
    trust2: "DSGVO-konform",
    trust3: "Rollenbasierter Zugriff",
    langs: "12 Sprachen",
    rights: "© 2026 G-Track Software s.r.o.",
  },

  names: {
    kratochvil: "M. Kratochvil", kratochvilAv: "MK",
    savchenko: "P. Savchenko", savchenkoAv: "PS",
    novak: "J. Novak", novakAv: "JN",
    berzins: "E. Berzins", berzinsAv: "EB",
  },

  /* ---- Mockup-Wörterbuch: Status und Labels 1:1 wie in der App ---- */
  mock: {
    planning: "Planung", week24: "Woche 24 · 8.–13. Juni", colDriver: "Fahrer",
    d1: "Mo 08", d2: "Di 09", d3: "Mi 10", d4: "Do 11", d5: "Fr 12",
    kpiTrip: "Heute auf Tour", kpiVac: "Im Urlaub", kpiFree: "Frei",
    stActive: "Aktiv", stTrip: "Auf Tour", ready: "bereit",
    vacUntil: "Urlaub bis 15.06", sick: "Krank",
    toastWarnT: "E-Mail-Übersicht: Visum läuft am 12.07. ab", toastWarnD: "P. Savchenko · noch 32 Tage",
    mcH: "Visum · P. Savchenko",
    mc1: "Neuer Visumscan hochgeladen",
    mc2: "G-Track hat Nummer und Datum von selbst erkannt",
    mc3: "Erfasste Visumgültigkeit: 08.2028",
    mcSub2: "CZ-4471920 · bis 03.08.2028",
    chipVisaWarn: "VIS · 32 Tage", chipVisaOk: "VIS · 2028",
  },
};
