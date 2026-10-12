import type { DemoDict } from "./types";

/* Перевод мастера EN, ворота 2. Обращение — «vous»; перед «:» неразрывный пробел (как в словаре сайта). */
export const demo: DemoDict = {
  metaTitle: "Demander une démo · G-Track",
  metaDescription: "Parlez-nous de votre flotte. Nous répondons sous un jour ouvré et présentons G-Track sur vos propres données.",
  overline: "Demande de démo",
  h1: "Nous vous montrons G-Track sur vos données",
  lead: "Pour les transporteurs dès 20 camions : documents conducteurs, trajets et congés au même endroit.",
  fields: {
    name: "Votre nom",
    company: "Entreprise",
    email: "E-mail professionnel",
    phone: "Téléphone (facultatif)",
    phoneHint: "Nous répondons par écrit, dans votre langue.",
    country: "Pays",
    countryPlaceholder: "Choisissez un pays",
    countryOther: "Autre",
    fleet: "Taille de la flotte",
    lang: "Langue de notre réponse",
    newsletter: "Recevoir les actualités de G-Track par e-mail (facultatif)",
  },
  fleetOptions: { lt20: "moins de 20", "20_50": "20–50", "50_200": "50–200", "200_plus": "200+" },
  submit: "Envoyer la demande",
  sending: "Envoi en cours…",
  required: "Obligatoire",
  errors: {
    invalid: "Veuillez vérifier les champs signalés.",
    network: "La demande n’a pas pu être envoyée. Veuillez réessayer ou écrire à sales@g-track.eu.",
  },
  success: { title: "Demande reçue", text: "Nous vous répondrons par e-mail sous un jour ouvré." },
  gdpr: {
    text: "Responsable du traitement : G-Track Software s.r.o. Finalité : répondre à votre demande. Durée de conservation : 24 mois.",
    link: "Politique de confidentialité",
  },
  next: "Et ensuite : nous répondons sous un jour ouvré et vous montrons G-Track sur vos données.",
};
