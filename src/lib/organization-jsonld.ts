/* ============================================================================
   Узел Organization в JSON-LD главной — отдельным чистым модулем, чтобы его
   поля проверял тест (JsonLd.tsx тянет алиас `@/`, которого vitest не знает).

   Зачем юрлицо, адрес и sameAs (GEO-аудит 18.10.2026, раздел 2 п. 8 и 15):
   по запросу «G-Track» рядом с нами выходят gtrack.ai и g-track.co.za
   (телематика, ЮАР). Без юридического имени, IČO, адреса и профилей
   ассистент может склеить компании; с ними сущность однозначна.

   Все значения — из company.ts (реквизиты сверены с ARES 11.10, те же, что в
   Impressum), ничего не придумано. Сознательно НЕТ: taxID / vatID (Г29 — статус
   НДС на сайте не указываем), founder / имени директора (Г40), foundingDate
   (даты основания в репозитории нет), aggregateRating (отзывов нет).
   FAQPage не добавляется — решение записано в Faq.tsx.
   ============================================================================ */

import { COMPANY, SOCIAL } from "./company";
import { SITE_ORIGIN } from "./landing-metadata";
import { SALES_EMAIL } from "../components/landing/urls";

/* Каноническая форма адреса страницы: profile.php?id=… (SOCIAL.facebook в company.ts) отвечает
   301 именно сюда (curl 18.10.2026), а сравнивать sameAs будут строкой. Числовой id тот же;
   company.ts не трогаем — юр-тексты ссылаются на прежнюю форму. */
export const FACEBOOK_PAGE_CANONICAL = "https://www.facebook.com/people/G-Track/61595506131584/";

/* Карточка фирмы в каталоге Seznam (Г175/Г179, задание Codex №30, опубликована 22.10.2026): первый
   внешний профиль сущности — в GSC Links на 22.10 внешних ссылок 0. Адрес — как в выдаче firmy.cz
   (curl 22.10: 200, G-Track, IČO 14237890, sídlo, sales@, ссылка на g-track.eu). */
export const FIRMY_CZ_PROFILE = "https://www.firmy.cz/detail/14088113-g-track-praha-zizkov.html";

export function organizationNode(opts: { description: string; availableLanguage: string[] }) {
  return {
    "@type": "Organization",
    "@id": `${SITE_ORIGIN}/#organization`,
    name: "G-Track",
    legalName: COMPANY.name,
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/icon.svg`,
    email: SALES_EMAIL,
    description: opts.description,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "IČO",
      value: COMPANY.ico,
    },
    /* как в Impressum: «street, district, zip city»; страна — код ISO (в Impressum она словом) */
    address: {
      "@type": "PostalAddress",
      streetAddress: `${COMPANY.street}, ${COMPANY.district}`,
      addressLocality: COMPANY.city,
      postalCode: COMPANY.zip,
      addressCountry: "CZ",
    },
    /* Facebook — каноническая форма (см. выше), Instagram — из company.ts, firmy.cz — каталог Seznam;
       LinkedIn и другие каталоги — когда появятся */
    sameAs: [FACEBOOK_PAGE_CANONICAL, SOCIAL.instagram, FIRMY_CZ_PROFILE],
    contactPoint: {
      "@type": "ContactPoint",
      email: SALES_EMAIL,
      contactType: "sales",
      areaServed: "EU",
      availableLanguage: opts.availableLanguage,
    },
  };
}
