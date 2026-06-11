/* Языковые версии лендинга: /ru /de /fr /cs /pl /it /lv /lt /uk /es /ro.
   Английский живёт на корне (/); /en редиректит туда. Все 11 страниц
   генерируются статически. */

import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { LandingPage } from "@/components/landing/LandingPage";
import { isLang, LOCALES, type Lang } from "@/lib/landing-i18n";
import { landingMetadata } from "@/lib/landing-metadata";

interface LocaleParams {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams(): Array<{ locale: Lang }> {
  /* en включён: страница /en пререндерится как redirect на корень */
  return LOCALES.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLang(locale) || locale === "en") return {};
  return landingMetadata(locale);
}

export default async function LocaleHome({ params }: LocaleParams) {
  const { locale } = await params;
  if (locale === "en") redirect("/");
  if (!isLang(locale)) notFound();
  return <LandingPage locale={locale} />;
}
