import type { DemoDict } from "./types";

/* Перевод мастера EN, ворота 2. Обращение — «Sie», термины как на сайте (Fahrerdokumente, Touren, Urlaub, ab 20 Lkw). */
export const demo: DemoDict = {
  metaTitle: "Demo anfragen · G-Track",
  metaDescription: "Erzählen Sie uns von Ihrer Flotte. Wir antworten innerhalb eines Arbeitstags und zeigen G-Track an Ihren eigenen Daten.",
  overline: "Demo-Anfrage",
  h1: "Wir zeigen G-Track an Ihren Daten",
  lead: "Für Transportunternehmen ab 20 Lkw: Fahrerdokumente, Touren und Urlaub an einem Ort.",
  fields: {
    name: "Ihr Name",
    company: "Unternehmen",
    email: "Geschäftliche E-Mail",
    phone: "Telefon (optional)",
    phoneHint: "Wir antworten schriftlich in Ihrer Sprache.",
    country: "Land",
    countryPlaceholder: "Land auswählen",
    countryOther: "Anderes",
    fleet: "Flottengröße",
    lang: "Sprache unserer Antwort",
    newsletter: "G-Track-Neuigkeiten per E-Mail erhalten (optional)",
  },
  fleetOptions: { lt20: "unter 20", "20_50": "20–50", "50_200": "50–200", "200_plus": "200+" },
  submit: "Anfrage senden",
  sending: "Wird gesendet…",
  required: "Pflichtfeld",
  errors: {
    invalid: "Bitte prüfen Sie die markierten Felder.",
    network: "Die Anfrage wurde nicht gesendet. Bitte versuchen Sie es erneut oder schreiben Sie an sales@g-track.eu.",
  },
  success: { title: "Anfrage erhalten", text: "Wir antworten Ihnen innerhalb eines Arbeitstags per E-Mail." },
  gdpr: {
    text: "Verantwortlicher: G-Track Software s.r.o. Zweck: Beantwortung Ihrer Anfrage. Wir speichern die Daten 24 Monate.",
    link: "Datenschutzerklärung",
  },
  next: "So geht es weiter: Wir antworten innerhalb eines Arbeitstags und zeigen G-Track an Ihren Daten.",
};
