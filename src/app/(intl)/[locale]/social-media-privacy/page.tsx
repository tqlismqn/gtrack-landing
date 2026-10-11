/* Языковые версии уведомления о соцсетях: /ru/social-media-privacy … — 11 путей.
   Английская живёт на /social-media-privacy; /en/social-media-privacy редиректит
   туда правилом /en/:path+ в next.config.ts. generateStaticParams объявлен здесь
   по той же причине, что у impressum: без него 11 путей собирались бы по
   запросу, а не статикой. */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalNoticePage } from "@/components/landing/LegalNoticePage";
import { isLang, LOCALES, type Lang } from "@/lib/landing-i18n";
import { socialPrivacyMetadata } from "@/lib/landing-metadata";

interface LocaleParams {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams(): Array<{ locale: Lang }> {
  /* en живёт на корне; /en редиректит в next.config.ts */
  return LOCALES.filter((l) => l !== "en").map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLang(locale)) return {};
  return socialPrivacyMetadata(locale);
}

export default async function LocaleSocialMediaPrivacy({ params }: LocaleParams) {
  const { locale } = await params;
  if (!isLang(locale)) notFound();
  return <LegalNoticePage locale={locale} kind="social" />;
}
