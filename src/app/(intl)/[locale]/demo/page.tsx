/* Языковые версии страницы заявки: /ru/demo /de/demo … — 11 путей (ворота 2).
   Английская живёт на /demo; /en/demo редиректит туда правилом /en/:path+ в
   next.config.ts. generateStaticParams — здесь, а не только у родителя: параметры
   сегмента резолвит каждый маршрут отдельно (как у impressum). */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoPage } from "@/components/landing/DemoPage";
import { isLang, LOCALES, type Lang } from "@/lib/landing-i18n";
import { demoMetadata } from "@/lib/landing-metadata";

interface LocaleParams {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams(): Array<{ locale: Lang }> {
  return LOCALES.filter((l) => l !== "en").map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLang(locale)) return {};
  return demoMetadata(locale);
}

export default async function LocaleDemo({ params }: LocaleParams) {
  const { locale } = await params;
  if (!isLang(locale)) notFound();
  return <DemoPage locale={locale} />;
}
