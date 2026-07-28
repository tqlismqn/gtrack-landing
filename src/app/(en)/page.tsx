/* Корень / = английская (каноническая) версия лендинга.
   Остальные 11 локалей живут на /ru /de /cs … — см. app/[locale]/page.tsx. */

import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";
import { landingMetadata } from "@/lib/landing-metadata";

export const metadata: Metadata = landingMetadata("en");

export default function Home() {
  return <LandingPage locale="en" />;
}
