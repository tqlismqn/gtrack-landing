import type { DemoDict } from "./types";

/* Перевод мастера EN, ворота 2. Обращение «usted» (как на сайте: «Pruébelo», «su»), термины как на сайте. */
export const demo: DemoDict = {
  metaTitle: "Solicitar una demo · G-Track",
  metaDescription: "Cuéntenos sobre su flota. Respondemos en un día laborable y le mostramos G-Track con sus propios datos.",
  overline: "Solicitud de demo",
  h1: "Le mostramos G-Track con sus datos",
  lead: "Para transportistas desde 20 camiones: documentos de conductores, viajes y vacaciones en un solo lugar.",
  fields: {
    name: "Su nombre",
    company: "Empresa",
    email: "Correo profesional",
    phone: "Teléfono (opcional)",
    phoneHint: "Respondemos por escrito en su idioma.",
    country: "País",
    countryPlaceholder: "Elija un país",
    countryOther: "Otro",
    fleet: "Tamaño de la flota",
    lang: "Idioma de nuestra respuesta",
    newsletter: "Quiero recibir las novedades de G-Track por correo (opcional)",
  },
  fleetOptions: { lt20: "menos de 20", "20_50": "20–50", "50_200": "50–200", "200_plus": "200+" },
  submit: "Enviar solicitud",
  sending: "Enviando…",
  required: "Obligatorio",
  errors: {
    invalid: "Revise los campos marcados.",
    network: "La solicitud no se ha enviado. Inténtelo de nuevo o escriba a sales@g-track.eu.",
  },
  success: { title: "Solicitud recibida", text: "Le responderemos por correo en un día laborable." },
  gdpr: {
    before: "Al enviar la solicitud, confirma que ha leído nuestra ",
    link: "política de privacidad",
    after: ".",
  },
  next: "Qué ocurre después: respondemos en un día laborable y le mostramos G-Track con sus datos.",
};
