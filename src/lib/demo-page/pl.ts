import type { DemoDict } from "./types";

/* Перевод мастера EN, ворота 2. Обращение на «ты» (как на сайте: «twój», «Zacznij»), термины как на сайте. */
export const demo: DemoDict = {
  metaTitle: "Zapytanie o demo · G-Track",
  metaDescription: "Opowiedz nam o swojej flocie. Odpowiadamy w ciągu jednego dnia roboczego i pokazujemy G-Track na twoich własnych danych.",
  overline: "Zapytanie o demo",
  h1: "Pokażemy G-Track na twoich danych",
  lead: "Dla przewoźników od 20 pojazdów: dokumenty kierowców, przejazdy i urlopy w jednym miejscu.",
  fields: {
    name: "Imię i nazwisko",
    company: "Firma",
    email: "Służbowy e-mail",
    phone: "Telefon (opcjonalnie)",
    phoneHint: "Odpowiadamy pisemnie w twoim języku.",
    country: "Kraj",
    countryPlaceholder: "Wybierz kraj",
    countryOther: "Inny",
    fleet: "Wielkość floty",
    lang: "Język naszej odpowiedzi",
    newsletter: "Chcę otrzymywać nowości G-Track e-mailem (opcjonalnie)",
  },
  fleetOptions: { lt20: "poniżej 20", "20_50": "20–50", "50_200": "50–200", "200_plus": "200+" },
  submit: "Wyślij zapytanie",
  sending: "Wysyłanie…",
  required: "Wymagane",
  errors: {
    invalid: "Sprawdź zaznaczone pola.",
    network: "Nie udało się wysłać zapytania. Spróbuj ponownie lub napisz na sales@g-track.eu.",
  },
  success: { title: "Zapytanie otrzymane", text: "Odpowiemy e-mailem w ciągu jednego dnia roboczego." },
  gdpr: {
    before: "Wysłanie zapytania oznacza zapoznanie się z ",
    link: "polityką prywatności",
    after: ".",
  },
  next: "Co dalej: odpowiemy w ciągu jednego dnia roboczego i pokażemy G-Track na twoich danych.",
};
