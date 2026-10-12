import type { DemoDict } from "./types";

/* Перевод мастера EN, ворота 2. Обращение на «вы» (vykání), термины как на сайте (dokumenty řidičů, jízdy, dovolené, od 20 vozidel). */
export const demo: DemoDict = {
  metaTitle: "Žádost o demo · G-Track",
  metaDescription: "Řekněte nám o svém vozovém parku. Odpovíme do jednoho pracovního dne a ukážeme G-Track na vašich vlastních datech.",
  overline: "Žádost o demo",
  h1: "Ukážeme vám G-Track na vašich datech",
  lead: "Pro dopravce od 20 vozidel: dokumenty řidičů, jízdy a dovolené na jednom místě.",
  fields: {
    name: "Vaše jméno",
    company: "Firma",
    email: "Pracovní e-mail",
    phone: "Telefon (nepovinné)",
    phoneHint: "Odpovídáme písemně ve vašem jazyce. Hovor je možný v ruštině.",
    country: "Země",
    countryPlaceholder: "Vyberte zemi",
    countryOther: "Jiná",
    fleet: "Velikost vozového parku",
    lang: "Jazyk naší odpovědi",
    newsletter: "Zasílat novinky o G-Track e-mailem (nepovinné)",
  },
  fleetOptions: { lt20: "méně než 20", "20_50": "20–50", "50_200": "50–200", "200_plus": "200+" },
  submit: "Odeslat žádost",
  sending: "Odesílá se…",
  required: "Povinné",
  errors: {
    invalid: "Zkontrolujte prosím označená pole.",
    network: "Žádost se nepodařilo odeslat. Zkuste to prosím znovu nebo napište na sales@g-track.eu.",
  },
  success: { title: "Žádost přijata", text: "Odpovíme vám e-mailem do jednoho pracovního dne." },
  gdpr: {
    text: "Správce údajů: G-Track Software s.r.o. Účel: odpověď na vaši žádost. Uchováváme 24 měsíců.",
    link: "Zásady ochrany osobních údajů",
  },
  next: "Co bude dál: odpovíme do jednoho pracovního dne a ukážeme vám G-Track na vašich datech.",
};
