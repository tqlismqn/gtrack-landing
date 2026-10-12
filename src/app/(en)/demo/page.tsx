/* Страница заявки на корне: /demo = английская версия (ворота 2).
   Остальные 11 локалей — /<locale>/demo, см. (intl)/[locale]/demo/page.tsx.
   noindex и ни одной ссылки до ворот 5.5 (после публикации юр-пакета). */

import type { Metadata } from "next";
import { DemoPage } from "@/components/landing/DemoPage";
import { demoMetadata } from "@/lib/landing-metadata";

export const metadata: Metadata = demoMetadata("en");

export default function Demo() {
  return <DemoPage locale="en" />;
}
