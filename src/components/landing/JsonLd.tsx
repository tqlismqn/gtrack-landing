/* ============================================================================
   Структурированные данные (JSON-LD). До 29.07 на лендинге не было ни одного
   блока: без Organization Google не связывает бренд с сущностью, без
   SoftwareApplication + Offer нет шанса на расширенный сниппет с ценой, а
   ассистентам (ChatGPT, Perplexity) нечего цитировать.

   ЗАПРЕТ: никаких aggregateRating, reviewCount и отзывов — их у нас нет,
   а разметка несуществующих оценок это и ручная санкция, и обман.
   Цены берутся из тех же констант, что и витрина, — расходиться им нельзя.
   ============================================================================ */

import { LANDING_DICT, localePath, type Lang } from "@/lib/landing-i18n";
import { SITE_ORIGIN } from "@/lib/landing-metadata";
import { SALES_EMAIL } from "./urls";

/* синхронизировано с Pricing.tsx и `subscription_plans` */
const PLAN_OFFERS = [
  { name: "Starter", price: 150 },
  { name: "Fleet", price: 450 },
  { name: "Business", price: 900 },
] as const;

export function JsonLd({ locale }: { locale: Lang }) {
  const d = LANDING_DICT[locale];
  const pageUrl = `${SITE_ORIGIN}${localePath(locale)}`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_ORIGIN}/#organization`,
        name: "G-Track",
        url: SITE_ORIGIN,
        logo: `${SITE_ORIGIN}/icon.svg`,
        email: SALES_EMAIL,
        description: d.meta.description,
        contactPoint: {
          "@type": "ContactPoint",
          email: SALES_EMAIL,
          contactType: "sales",
          areaServed: "EU",
          availableLanguage: [...Object.keys(LANDING_DICT)],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        url: SITE_ORIGIN,
        name: "G-Track",
        inLanguage: locale,
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_ORIGIN}/#software`,
        name: "G-Track",
        url: pageUrl,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Transport Management System",
        operatingSystem: "Web",
        inLanguage: locale,
        description: d.meta.description,
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
        offers: PLAN_OFFERS.map((p) => ({
          "@type": "Offer",
          name: p.name,
          price: p.price,
          priceCurrency: "EUR",
          category: "SaaS subscription",
          url: `${pageUrl}#pricing`,
          availability: "https://schema.org/InStock",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: p.price,
            priceCurrency: "EUR",
            unitCode: "MON",
            billingIncrement: 1,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      /* JSON.stringify достаточно: значения приходят из наших словарей и констант,
         пользовательского ввода на лендинге нет */
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
