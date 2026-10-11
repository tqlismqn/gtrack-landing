/* Уведомление о соцсетях на корне: /social-media-privacy = английская версия.
   Остальные 11 локалей — /<locale>/social-media-privacy, см.
   (intl)/[locale]/social-media-privacy/page.tsx. noindex, follow и вне sitemap —
   см. socialPrivacyMetadata. */

import type { Metadata } from "next";
import { LegalNoticePage } from "@/components/landing/LegalNoticePage";
import { socialPrivacyMetadata } from "@/lib/landing-metadata";

export const metadata: Metadata = socialPrivacyMetadata("en");

export default function SocialMediaPrivacy() {
  return <LegalNoticePage locale="en" kind="social" />;
}
