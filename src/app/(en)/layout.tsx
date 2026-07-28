/* Root-layout английской (канонической) версии на корне `/`.
   Общие метаданные и шрифты — в ../layout-shared.tsx. */

import type { Metadata } from "next";
import { LandingHtml } from "../layout-shared";
import { baseMetadata } from "@/lib/landing-metadata";

export const metadata: Metadata = baseMetadata();

export default function EnRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <LandingHtml lang="en">{children}</LandingHtml>;
}
