import type { DemoDict } from "./types";

/* Перевод мастера EN, ворота 2. Обращение на «ты» (как на сайте: «tavs», «Sāc»), термины как на сайте. */
export const demo: DemoDict = {
  metaTitle: "Demo pieprasījums · G-Track",
  metaDescription: "Pastāsti par savu autoparku. Atbildēsim vienas darba dienas laikā un parādīsim G-Track ar taviem datiem.",
  overline: "Demo pieprasījums",
  h1: "Parādīsim G-Track ar taviem datiem",
  lead: "Pārvadātājiem ar 20 un vairāk mašīnām: vadītāju dokumenti, reisi un atvaļinājumi vienuviet.",
  fields: {
    name: "Vārds",
    company: "Uzņēmums",
    email: "Darba e-pasts",
    phone: "Tālrunis (neobligāti)",
    phoneHint: "Atbildam rakstiski tavā valodā.",
    country: "Valsts",
    countryPlaceholder: "Izvēlies valsti",
    countryOther: "Cita",
    fleet: "Autoparka lielums",
    lang: "Atbildes valoda",
    newsletter: "Sūtīt man G-Track jaunumus e-pastā (neobligāti)",
  },
  fleetOptions: { lt20: "mazāk nekā 20", "20_50": "20–50", "50_200": "50–200", "200_plus": "200+" },
  submit: "Nosūtīt pieprasījumu",
  sending: "Notiek sūtīšana…",
  required: "Obligāti",
  errors: {
    invalid: "Pārbaudi atzīmētos laukus.",
    network: "Pieprasījums netika nosūtīts. Mēģini vēlreiz vai raksti uz sales@g-track.eu.",
  },
  success: { title: "Pieprasījums saņemts", text: "Atbildēsim uz e-pastu vienas darba dienas laikā." },
  gdpr: {
    before: "Nosūtot pieprasījumu, tu apstiprini, ka esi iepazinies ar ",
    link: "privātuma politiku",
    after: ".",
  },
  steps: {
    label: "Kas notiks tālāk",
    request: "Pieprasījums",
    reply: "Atbilde vienas darba dienas laikā",
    demo: "Demo ar taviem datiem",
  },
};
