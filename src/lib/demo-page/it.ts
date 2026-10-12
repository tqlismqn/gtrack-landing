import type { DemoDict } from "./types";

/* Перевод мастера EN, ворота 2. Обращение на «ты» (как на сайте: «tuo», «Prova»), термины как на сайте. */
export const demo: DemoDict = {
  metaTitle: "Richiedi una demo · G-Track",
  metaDescription: "Raccontaci della tua flotta. Rispondiamo entro un giorno lavorativo e ti mostriamo G-Track sui tuoi dati.",
  overline: "Richiesta di demo",
  h1: "Ti mostriamo G-Track sui tuoi dati",
  lead: "Per i vettori da 20 veicoli in su: documenti degli autisti, viaggi e ferie in un unico posto.",
  fields: {
    name: "Il tuo nome",
    company: "Azienda",
    email: "Email di lavoro",
    phone: "Telefono (facoltativo)",
    phoneHint: "Rispondiamo per iscritto nella tua lingua.",
    country: "Paese",
    countryPlaceholder: "Scegli un paese",
    countryOther: "Altro",
    fleet: "Dimensione della flotta",
    lang: "Lingua della nostra risposta",
    newsletter: "Voglio ricevere le novità di G-Track via email (facoltativo)",
  },
  fleetOptions: { lt20: "meno di 20", "20_50": "20–50", "50_200": "50–200", "200_plus": "200+" },
  submit: "Invia la richiesta",
  sending: "Invio in corso…",
  required: "Obbligatorio",
  errors: {
    invalid: "Controlla i campi evidenziati.",
    network: "La richiesta non è stata inviata. Riprova o scrivi a sales@g-track.eu.",
  },
  success: { title: "Richiesta ricevuta", text: "Ti rispondiamo via email entro un giorno lavorativo." },
  gdpr: {
    before: "Inviando la richiesta confermi di aver letto l'",
    link: "informativa sulla privacy",
    after: ".",
  },
  steps: {
    label: "Cosa succede dopo",
    request: "Richiesta",
    reply: "Risposta entro un giorno lavorativo",
    demo: "Demo sui tuoi dati",
  },
};
