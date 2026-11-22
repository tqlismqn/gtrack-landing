/* Рекламная страница на корне: /start = английская версия. Остальные 11 локалей —
   /<locale>/start, см. (intl)/[locale]/start/page.tsx. noindex, вне sitemap. */

import type { Metadata } from "next";
import { StartPage } from "@/components/landing/StartPage";
import { startMetadata } from "@/lib/start-page/metadata";

export const metadata: Metadata = startMetadata("en");

export default function Start() {
  return <StartPage locale="en" />;
}
