/* OG-картинка языковых версий — свой слоган на каждом языке. */

import { isLang, LANDING_DICT, LOCALES, type Lang } from "@/lib/landing-i18n";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export function generateStaticParams(): Array<{ locale: Lang }> {
  return LOCALES.map((locale) => ({ locale }));
}

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Lang = isLang(locale) ? locale : "en";
  return [
    {
      id: lang,
      size: OG_SIZE,
      contentType: OG_CONTENT_TYPE,
      alt: LANDING_DICT[lang].meta.title,
    },
  ];
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return renderOgImage(isLang(locale) ? locale : "en");
}
