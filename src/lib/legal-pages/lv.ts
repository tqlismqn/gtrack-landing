/* Impressum — latviešu. Čehu versijas tulkojums; pretrunu gadījumā noteicošā ir čehu versija. */
import type { ImpressumDict } from "./index";

export const impressum: ImpressumDict = {
  title: "Rekvizīti",
  metaDescription:
    "Kas uztur vietni www.g-track.eu un pakalpojumu G-Track: nosaukums, juridiskā adrese, reģistrācijas numurs, ieraksts komercreģistrā un kontakti.",
  lead: "Vietnes www.g-track.eu un pakalpojuma G-Track adresē app.g-track.eu uzturētājs.",
  labels: {
    company: "Nosaukums",
    legalForm: "Juridiskā forma",
    legalFormValue:
      "sabiedrība ar ierobežotu atbildību saskaņā ar Čehijas tiesībām (společnost s ručením omezeným)",
    seat: "Juridiskā adrese",
    country: "Čehijas Republika",
    ico: "Reģistrācijas numurs (IČO)",
    register: "Komercreģistrs",
    registerValue:
      "{court} (Prāgas pilsētas tiesa), sadaļa {section}, ieraksts {insert}",
    director: "Valdes loceklis (jednatel)",
    vat: "PVN",
    vatValue: "Sabiedrība nav PVN maksātāja (neplátce DPH).",
    email: "E-pasts",
    privacy: "Datu aizsardzība",
    legalDocs: "Juridiskie dokumenti",
  },
};
