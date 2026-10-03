/* OG-картинка канонической (английской) версии на корне.
   alt — из словаря, как у языковых версий (generateImageMetadata в (intl)):
   литерал разошёлся бы с заголовком страницы при первой же правке meta.title. */

import { LANDING_DICT } from "@/lib/landing-i18n";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const alt = LANDING_DICT.en.meta.title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage("en");
}
