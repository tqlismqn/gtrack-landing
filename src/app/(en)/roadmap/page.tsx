/* Дорожная карта на корне: /roadmap = английская (каноническая) версия.
   Остальные 11 локалей — /<locale>/roadmap, см. (intl)/[locale]/roadmap/page.tsx. */

import type { Metadata } from "next";
import { RoadmapPage } from "@/components/landing/RoadmapPage";
import { roadmapMetadata } from "@/lib/landing-metadata";

/* Своя пара title/description. Без неё страница берёт title главной. */
export const metadata: Metadata = roadmapMetadata("en");

export default function Roadmap() {
  return <RoadmapPage locale="en" />;
}
