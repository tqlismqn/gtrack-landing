import type { DemoDict } from "./types";

/* Перевод мастера EN, ворота 2. Обращение на «Jūs» (как на сайте: «jūsų», «Pradėkite»), термины как на сайте. */
export const demo: DemoDict = {
  metaTitle: "Demo užklausa · G-Track",
  metaDescription: "Papasakokite apie savo parką. Atsakysime per vieną darbo dieną ir parodysime G-Track su jūsų pačių duomenimis.",
  overline: "Demo užklausa",
  h1: "Parodysime G-Track su jūsų duomenimis",
  lead: "Vežėjams, turintiems 20 ir daugiau vilkikų: vairuotojų dokumentai, reisai ir atostogos vienoje vietoje.",
  fields: {
    name: "Jūsų vardas",
    company: "Įmonė",
    email: "Darbo el. paštas",
    phone: "Telefonas (neprivaloma)",
    phoneHint: "Atsakome raštu jūsų kalba. Pokalbis telefonu galimas rusų kalba.",
    country: "Šalis",
    countryPlaceholder: "Pasirinkite šalį",
    countryOther: "Kita",
    fleet: "Parko dydis",
    lang: "Mūsų atsakymo kalba",
    newsletter: "Siųsti man G-Track naujienas el. paštu (neprivaloma)",
  },
  fleetOptions: { lt20: "mažiau nei 20", "20_50": "20–50", "50_200": "50–200", "200_plus": "200+" },
  submit: "Siųsti užklausą",
  sending: "Siunčiama…",
  required: "Privaloma",
  errors: {
    invalid: "Patikrinkite pažymėtus laukus.",
    network: "Užklausos išsiųsti nepavyko. Pabandykite dar kartą arba rašykite sales@g-track.eu.",
  },
  success: { title: "Užklausa gauta", text: "Atsakysime el. paštu per vieną darbo dieną." },
  gdpr: {
    text: "Duomenų valdytojas: G-Track Software s.r.o. Tikslas: atsakyti į jūsų užklausą. Saugome 24 mėnesius.",
    link: "Privatumo politika",
  },
  next: "Kas toliau: atsakysime per vieną darbo dieną ir parodysime G-Track su jūsų duomenimis.",
};
