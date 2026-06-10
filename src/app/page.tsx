/* ============================================================================
   Маркетинговый лендинг G-Track — порт прототипа
   raw/claude-design-runs/2026-06-10-marketing-landing/bundle3.
   Порядок секций = порядку прототипа:
   hero → trust → pain → product(scrolly) → vid → languages → europe →
   modules → pricing → final → footer.
   MotionRoot монтируется последним: к его эффекту секции уже подписаны.
   ============================================================================ */

import { LandingProvider } from "@/components/landing/LandingProvider";
import { LandingIcons } from "@/components/landing/LandingIcons";
import { MotionRoot } from "@/components/landing/MotionRoot";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { TrustStrip } from "@/components/landing/TrustStrip";
import { Pain } from "@/components/landing/Pain";
import { Scrolly } from "@/components/landing/Scrolly";
import { VideoSection } from "@/components/landing/VideoSection";
import { Languages } from "@/components/landing/Languages";
import { Europe } from "@/components/landing/Europe";
import { Modules } from "@/components/landing/Modules";
import { Pricing } from "@/components/landing/Pricing";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <LandingProvider>
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
