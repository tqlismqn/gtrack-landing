/* Root-layout языковых версий: `<html lang>` берётся из сегмента маршрута.
   Именно ради этого лендинг разделён на две route-группы — см. ../../layout-shared.tsx. */

import type { Metadata } from "next";
import { LandingHtml } from "../../layout-shared";
import { isLang } from "@/lib/landing-i18n";
import { baseMetadata } from "@/lib/landing-metadata";

export const metadata: Metadata = baseMetadata();

export default async function LocaleRootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  /* неизвестный сегмент сюда не доходит (dynamicParams = false); /en ловит
     редирект в next.config.ts. Запасной "en" — только чтобы lang всегда был кодом */
  return (
    <LandingHtml lang={isLang(locale) ? locale : "en"}>{children}</LandingHtml>
  );
}
