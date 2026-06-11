/* ============================================================================
   Сборка лендинга (общая для / и /[locale]).
   Порядок секций = порядку прототипа:
   hero → trust → pain → product(scrolly) → vid → languages → europe →
   modules → pricing → final → footer.
   MotionRoot монтируется последним: к его эффекту секции уже подписаны.
   ============================================================================ */

import type { Lang } from "@/lib/landing-i18n";
import { LandingProvider } from "./LandingProvider";
import { LandingIcons } from "./LandingIcons";
import { MotionRoot } from "./MotionRoot";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { TrustStrip } from "./TrustStrip";
import { Pain } from "./Pain";
import { Scrolly } from "./Scrolly";
import { VideoSection } from "./VideoSection";
import { Languages } from "./Languages";
import { Europe } from "./Europe";
import { Modules } from "./Modules";
import { Pricing } from "./Pricing";
import { FinalCta } from "./FinalCta";
import { Footer } from "./Footer";

export function LandingPage({ locale }: { locale: Lang }) {
  return (
    <LandingProvider locale={locale}>
      <LandingIcons />
      <Nav />
      <main id="top">
        <Hero />
        <TrustStrip />
        <Pain />
        <Scrolly />
        <VideoSection />
        <Languages />
        <Europe />
        <Modules />
        <Pricing />
        <FinalCta />
      </main>
      <Footer />
      <MotionRoot />
    </LandingProvider>
  );
}
