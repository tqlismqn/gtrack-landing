/* Языковые версии дорожной карты: /ru/roadmap /de/roadmap … — 11 путей.
   Английская живёт на /roadmap; /en/roadmap редиректит туда, как и на главной.
   generateStaticParams объявлен здесь, а не только у родителя: параметры
   сегмента резолвит каждый маршрут отдельно, и без него все 11 путей
   собирались бы по запросу, а не статикой. */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoadmapPage } from "@/components/landing/RoadmapPage";
import { isLang, LOCALES, type Lang } from "@/lib/landing-i18n";
import { roadmapMetadata } from "@/lib/landing-metadata";

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
  return roadmapMetadata(locale);
}

export default async function LocaleRoadmap({ params }: LocaleParams) {
  const { locale } = await params;
  if (!isLang(locale)) notFound();
  return <RoadmapPage locale={locale} />;
}
