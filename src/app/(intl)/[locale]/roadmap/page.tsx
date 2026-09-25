/* Языковые версии дорожной карты: /ru/roadmap /de/roadmap … — 11 путей.
   Английская живёт на /roadmap; /en/roadmap редиректит туда, как и на главной.
   generateStaticParams объявлен здесь, а не только у родителя: параметры
   сегмента резолвит каждый маршрут отдельно, и без него все 11 путей
   собирались бы по запросу, а не статикой. */

import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { RoadmapPage } from "@/components/landing/RoadmapPage";
import { isLang, LOCALES, type Lang } from "@/lib/landing-i18n";
import { roadmapMetadata } from "@/lib/landing-metadata";

interface LocaleParams {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams(): Array<{ locale: Lang }> {
  /* en включён: /en/roadmap пререндерится как redirect на /roadmap */
  return LOCALES.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLang(locale) || locale === "en") return {};
  return roadmapMetadata(locale);
}

export default async function LocaleRoadmap({ params }: LocaleParams) {
  const { locale } = await params;
  if (locale === "en") redirect("/roadmap");
  if (!isLang(locale)) notFound();
  return <RoadmapPage locale={locale} />;
}
