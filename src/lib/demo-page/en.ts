import type { DemoDict } from "./types";

/* Мастер-текст EN (план ворот 2, Task 5). «Звонка» не обещаем: созвон только на русском (Г8);
   «за рабочий день» — решение Г37. */
export const demo: DemoDict = {
  metaTitle: "Request a demo · G-Track",
  metaDescription: "Tell us about your fleet. We reply within one working day and show G-Track on your own data.",
  overline: "Demo request",
  h1: "We'll show G-Track on your data",
  lead: "For carriers running 20 trucks and up: driver documents, trips and leave in one place.",
  fields: {
    name: "Your name",
    company: "Company",
    email: "Work e-mail",
    phone: "Phone (optional)",
    phoneHint: "We reply in writing in your language. A call is possible in Russian.",
    country: "Country",
    countryPlaceholder: "Choose a country",
    countryOther: "Other",
    fleet: "Fleet size",
    lang: "Language of our reply",
    newsletter: "Send me G-Track news by e-mail (optional)",
  },
  fleetOptions: { lt20: "under 20", "20_50": "20–50", "50_200": "50–200", "200_plus": "200+" },
  submit: "Send request",
  sending: "Sending…",
  required: "Required",
  errors: {
    invalid: "Please check the highlighted fields.",
    network: "The request did not go through. Please try again or write to sales@g-track.eu.",
  },
  success: { title: "Request received", text: "We will reply by e-mail within one working day." },
  gdpr: {
    text: "Data controller: G-Track Software s.r.o. Purpose: replying to your request. We keep it for 24 months.",
    link: "Privacy Policy",
  },
  next: "What happens next: we reply within one working day and show G-Track on your data.",
};
