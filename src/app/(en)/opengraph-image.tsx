/* OG-картинка канонической (английской) версии на корне. */

import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const alt = "G-Track — EU compliance and trip planning for carriers";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage("en");
}
