import type { DemoDict } from "./types";

/* Перевод мастера EN, ворота 2. Обращение на «ты» (как на сайте: «Încearcă», «tău»), термины как на сайте. */
export const demo: DemoDict = {
  metaTitle: "Cerere de demo · G-Track",
  metaDescription: "Spune-ne despre flota ta. Răspundem în cel mult o zi lucrătoare și îți arătăm G-Track pe datele tale.",
  overline: "Cerere de demo",
  h1: "Îți arătăm G-Track pe datele tale",
  lead: "Pentru transportatori de la 20 de camioane: documentele șoferilor, cursele și concediile într-un singur loc.",
  fields: {
    name: "Numele tău",
    company: "Firma",
    email: "E-mail de serviciu",
    phone: "Telefon (opțional)",
    phoneHint: "Răspundem în scris, în limba ta.",
    country: "Țara",
    countryPlaceholder: "Alege țara",
    countryOther: "Altă țară",
    fleet: "Mărimea flotei",
    lang: "Limba răspunsului nostru",
    newsletter: "Trimite-mi noutățile G-Track pe e-mail (opțional)",
  },
  fleetOptions: { lt20: "sub 20", "20_50": "20–50", "50_200": "50–200", "200_plus": "200+" },
  submit: "Trimite cererea",
  sending: "Se trimite…",
  required: "Obligatoriu",
  errors: {
    invalid: "Verifică câmpurile marcate.",
    network: "Cererea nu a fost trimisă. Încearcă din nou sau scrie la sales@g-track.eu.",
  },
  success: { title: "Cerere primită", text: "Îți răspundem pe e-mail în cel mult o zi lucrătoare." },
  gdpr: {
    before: "Trimițând cererea, confirmi că ai citit ",
    link: "politica de confidențialitate",
    after: ".",
  },
  steps: {
    label: "Ce urmează",
    request: "Cerere",
    reply: "Răspuns în cel mult o zi lucrătoare",
    demo: "Demo pe datele tale",
  },
};
