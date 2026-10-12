/* Словарь страницы заявки /{lang}/demo (ворота 2). Тип отдельным файлом, чтобы
   файлы локалей не тянули index.ts по кругу (как ImpressumDict у legal-pages). */
export type DemoDict = {
  metaTitle: string;
  metaDescription: string;
  overline: string;
  h1: string;
  lead: string;
  fields: {
    name: string;
    company: string;
    email: string;
    phone: string;
    phoneHint: string;
    country: string;
    countryPlaceholder: string;
    countryOther: string;
    fleet: string;
    lang: string;
    newsletter: string;
  };
  fleetOptions: { lt20: string; "20_50": string; "50_200": string; "200_plus": string };
  submit: string;
  sending: string;
  required: string;
  errors: { invalid: string; network: string };
  success: { title: string; text: string };
  gdpr: { text: string; link: string };
  next: string;
};
