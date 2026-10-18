/* ============================================================================
   Структурированные данные (JSON-LD). До 29.07 на лендинге не было ни одного
   блока: без Organization Google не связывает бренд с сущностью, без
   SoftwareApplication + Offer нет шанса на расширенный сниппет с ценой, а
   ассистентам (ChatGPT, Perplexity) нечего цитировать.

   ЗАПРЕТ: никаких aggregateRating, reviewCount и отзывов — их у нас нет,
   а разметка несуществующих оценок это и ручная санкция, и обман.
   Цены — отдельный литерал PLAN_OFFERS ниже; test/llms.test.ts сверяет его с PRICING.mo в Pricing.tsx — расходиться им нельзя.
   ============================================================================ */

import { LANDING_DICT, localePath, type Lang } from "@/lib/landing-i18n";
import { SITE_ORIGIN } from "@/lib/landing-metadata";
import { organizationNode } from "@/lib/organization-jsonld";
import { trackGroups } from "@/lib/roadmap-content";

const FEATURE_IDS = trackGroups().shipped;

/* синхронизировано с Pricing.tsx и `subscription_plans`; те же цифры — в public/llms.txt и faq.a10 */
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
      organizationNode({
        description: d.meta.description,
        availableLanguage: [...Object.keys(LANDING_DICT)],
      }),
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
        /* только то, что уже работает: названия направлений с since из TRACKS —
           тот же состав, что у секции «Работает сейчас»; «в работе» и «дальше» сюда не идут */
        featureList: FEATURE_IDS.map((id) => d.roadmap.tracks[id].t),
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
