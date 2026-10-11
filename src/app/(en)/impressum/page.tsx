/* Impressum на корне: /impressum = английская (каноническая) версия.
   Остальные 11 локалей — /<locale>/impressum, см. (intl)/[locale]/impressum/page.tsx. */

import type { Metadata } from "next";
import { LegalNoticePage } from "@/components/landing/LegalNoticePage";
import { impressumMetadata } from "@/lib/landing-metadata";

export const metadata: Metadata = impressumMetadata("en");

export default function Impressum() {
  return <LegalNoticePage locale="en" />;
}
