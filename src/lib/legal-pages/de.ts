/* Impressum + social media notice — Deutsch. Übersetzung der tschechischen Fassung; diese ist maßgeblich. */
import { COMPANY, MESARTIM, META_IE, SOCIAL, seatOf } from "../company";
import type { ImpressumDict, SocialNoticeDict } from "./index";

export const impressum: ImpressumDict = {
  title: "Impressum",
  metaDescription:
    "Impressum von www.g-track.eu und dem Dienst G-Track: Firma, Sitz, Identifikationsnummer, Handelsregistereintrag und Kontakt.",
  lead: "Anbieter der Website www.g-track.eu und des Dienstes G-Track unter app.g-track.eu.",
  labels: {
    company: "Firma",
    legalForm: "Rechtsform",
    legalFormValue:
      "Gesellschaft mit beschränkter Haftung nach tschechischem Recht (společnost s ručením omezeným)",
    seat: "Sitz",
    country: "Tschechische Republik",
    ico: "Identifikationsnummer (IČO)",
    register: "Handelsregister",
    registerValue:
      "{court} (Stadtgericht Prag), Abteilung {section}, Einlage {insert}",
    director: "Vertretungsberechtigter Geschäftsführer (jednatel)",
    email: "E-Mail",
    privacy: "Datenschutz",
    legalDocs: "Rechtliche Dokumente",
  },
};

export const socialNotice: SocialNoticeDict = {
  title: "Datenschutzhinweise für unsere Social-Media-Präsenzen",
  metaDescription:
    "Wie die G-Track Software s.r.o. und Meta personenbezogene Daten auf unserer Facebook-Seite und unserem Instagram-Profil verarbeiten: Verantwortliche, Seiten-Statistiken, Werbung und Ihre Rechte.",
  effective: "Gültig ab {date}",
  sections: [
    {
      h: "Geltungsbereich",
      p: [
        `Diese Hinweise erläutern, wie wir und Meta Ihre personenbezogenen Daten verarbeiten, wenn Sie unsere Facebook-Seite [„G-Track“](facebook) oder unser Instagram-Profil [${SOCIAL.instagramHandle}](instagram) besuchen oder mit ihnen interagieren. Für unsere Website und den Dienst G-Track gilt unsere [Datenschutzerklärung](privacyPolicy).`,
      ],
    },
    {
      h: "Verantwortlicher",
      p: [
        `Verantwortlicher ist die ${COMPANY.name}, ${seatOf(COMPANY)}, Tschechische Republik, Identifikationsnummer (IČO) ${COMPANY.ico} („wir“). Die Facebook-Seite und das Instagram-Profil betreiben wir selbst über unser eigenes Meta-Business-Portfolio. Kontakt in Datenschutzfragen: [${COMPANY.privacyEmail}](privacyEmail). Einen Datenschutzbeauftragten haben wir nicht benannt.`,
        `Die ${MESARTIM.name}, IČO ${MESARTIM.ico}, ${seatOf(MESARTIM)}, Tschechische Republik, bezahlt in unserem Auftrag unsere Werbung bei Meta und stellt das Meta-Pixel (einen Datensatz zur Erfolgsmessung) bereit, das unsere Website verwendet.`,
      ],
    },
    {
      h: "Meta als eigenständig Verantwortlicher",
      p: [
        `Facebook und Instagram werden von der ${META_IE.name}, ${META_IE.address}, Irland („Meta“), betrieben. Für die Verarbeitung, die Meta für eigene Zwecke vornimmt, ist Meta eigenständig Verantwortlicher nach seiner eigenen [Datenschutzrichtlinie](metaPrivacy); auf diese Verarbeitung haben wir keinen Einfluss.`,
        "Cookies auf Facebook und Instagram setzt Meta; soweit dafür eine Einwilligung erforderlich ist, holt Meta sie selbst ein. Näheres steht in der [Cookie-Richtlinie](metaCookies) von Meta.",
      ],
    },
    {
      h: "Seiten-Statistiken auf Facebook: gemeinsame Verantwortlichkeit mit Meta",
      p: [
        "Wenn Sie unsere Facebook-Seite besuchen oder mit ihr interagieren, erfasst Meta Ereignisse, etwa das Aufrufen der Seite oder eines Beitrags, das Abonnieren oder Liken der Seite, Kommentieren, Teilen oder das Klicken auf eine Schaltfläche, zusammen mit Begleitinformationen wie Datum und Uhrzeit, dem anhand der IP-Adresse geschätzten Land oder Ort, der Sprache, dem Gerätetyp und bei angemeldeten Nutzern Altersgruppe, Geschlecht und Nutzer-ID. Aus diesen Ereignissen erstellt Meta zusammengefasste Statistiken (Page Insights). In diesen Statistiken sehen wir nur zusammengefasste Zahlen und können einzelne Besucher daraus nicht identifizieren.",
        "Für diese Verarbeitung sind wir und Meta gemeinsam Verantwortliche nach Art. 26 DSGVO. Nach der Vereinbarung trägt Meta die primäre Verantwortung für die Information der betroffenen Personen, für die Bearbeitung von Anträgen auf Ausübung Ihrer Rechte nach Art. 15–21 DSGVO, für die Sicherheit der Verarbeitung (Art. 32 DSGVO) sowie für die Meldung von Verletzungen des Schutzes personenbezogener Daten und die Benachrichtigung darüber (Art. 33–34 DSGVO). Das Wesentliche der Vereinbarung stellt Meta im [Page Insights Controller Addendum](addendum) und auf der Seite [Information about Page Insights](insightsInfo) bereit. Federführende Aufsichtsbehörde für diese Verarbeitung ist die irische Datenschutzkommission (Data Protection Commission).",
        "Rechtsgrundlage: unser berechtigtes Interesse daran, zu verstehen, wie unsere Beiträge Transportunternehmen und Fahrer erreichen, und sie zu verbessern (Art. 6 Abs. 1 lit. f DSGVO).",
      ],
    },
    {
      h: "Instagram-Statistiken",
      p: [
        "Auch Instagram stellt uns zusammengefasste Statistiken zu unserem Profil und unseren Beiträgen bereit, etwa zu Reichweite und Interaktionen. Eine eigene Vereinbarung über die gemeinsame Verantwortlichkeit für Instagram hat Meta nicht veröffentlicht; das oben genannte Page Insights Controller Addendum betrifft Facebook-Seiten. Die Instagram-Statistiken nutzen wir nur in zusammengefasster Form, zum selben Zweck und auf derselben Rechtsgrundlage (Art. 6 Abs. 1 lit. f DSGVO).",
      ],
    },
    {
      h: "Kommentare, Nachrichten und Anfragen",
      p: [
        "Wenn Sie unsere Beiträge kommentieren, uns eine Nachricht senden oder über Facebook oder Instagram eine Demo anfragen, verarbeiten wir Ihren Profilnamen, den Inhalt Ihrer Nachricht und den Zeitpunkt des Versands, um Ihnen antworten zu können. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit es um vorvertragliche Maßnahmen auf Ihre Anfrage geht, im Übrigen unser berechtigtes Interesse an der Beantwortung (Art. 6 Abs. 1 lit. f DSGVO).",
        `Eine Anfrage können wir in unser geschäftliches E-Mail-Postfach übernehmen; Anfragen speichern wir höchstens 24 Monate ab dem letzten Kontakt. Übernommene Anfragen werden in einem Postfach in Microsoft 365 gespeichert, das uns die ${MESARTIM.name} bereitstellt. Öffentliche Kommentare bleiben sichtbar, bis Sie oder wir sie löschen. Werbenachrichten über Facebook oder Instagram senden wir Ihnen nicht ohne Ihre Einwilligung.`,
      ],
    },
    {
      h: "Werbung",
      p: [
        "Wir werben auf Facebook und Instagram. Wem unsere Anzeigen ausgespielt werden, entscheidet Meta anhand von Kriterien, die wir wählen, etwa Land, Sprache und Interessen. Für die Wahl dieser Kriterien, die Ausspielung unserer Anzeigen an Personen, die ihnen entsprechen, und die Berichte über die Kampagnenergebnisse, die Meta uns bereitstellt, können wir und Meta gemeinsam Verantwortliche sein. Daten unserer Kunden oder ihrer Fahrer laden wir nie zu Meta hoch und nutzen sie nicht zur Ausrichtung von Anzeigen.",
        "Rechtsgrundlage für unseren Teil: unser berechtigtes Interesse daran, Transportunternehmen G-Track vorzustellen (Art. 6 Abs. 1 lit. f DSGVO).",
        `Unsere Werbung bezahlt in unserem Auftrag die ${MESARTIM.name} Das von ihr bereitgestellte Meta-Pixel lädt unsere Website erst, nachdem Sie im Cookie-Banner eingewilligt haben.`,
      ],
    },
    {
      h: "Ihre Rechte",
      p: [
        `Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit sowie das Recht, der Verarbeitung auf Grundlage unseres berechtigten Interesses zu widersprechen (Art. 15–21 DSGVO). Sie erreichen uns unter [${COMPANY.privacyEmail}](privacyEmail); an Meta können Sie sich direkt über die Kontaktwege wenden, die auf der Seite [Information about Page Insights](insightsInfo) genannt sind.`,
        "Anfragen zu den Seiten-Statistiken bearbeitet Meta. Richten Sie eine solche Anfrage an uns, leiten wir alle relevanten Informationen unverzüglich, spätestens innerhalb von sieben Kalendertagen, an Meta weiter.",
        "Sie können sich beim tschechischen Amt für den Schutz personenbezogener Daten (ÚOOÚ, [uoou.gov.cz](uoou)), bei der irischen Datenschutzkommission ([dataprotection.ie](dpc)) oder bei der Aufsichtsbehörde des Landes beschweren, in dem Sie leben oder arbeiten.",
      ],
    },
  ],
  prevails:
    "Diese Hinweise werden in 12 Sprachen veröffentlicht. Bei Abweichungen zwischen den Sprachfassungen ist die tschechische Fassung maßgeblich.",
};
