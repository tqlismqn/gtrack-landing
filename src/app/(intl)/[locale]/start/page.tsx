/* Языковые версии рекламной страницы: /ru/start /de/start … — 11 путей. Английская
   живёт на /start; /en/start редиректит туда правилом /en/:path+ в next.config.ts.
   generateStaticParams — здесь, а не только у родителя: параметры сегмента
   резолвит каждый маршрут отдельно (как у demo). */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StartPage } from "@/components/landing/StartPage";
import { isLang, LOCALES, type Lang } from "@/lib/landing-i18n";
import { startMetadata } from "@/lib/start-page/metadata";

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
  return startMetadata(locale);
}

export default async function LocaleStart({ params }: LocaleParams) {
  const { locale } = await params;
  if (!isLang(locale)) notFound();
  return <StartPage locale={locale} />;
}
