/* ============================================================================
   Сборка лендинга (общая для / и /[locale]).
   Порядок секций:
   hero → trust → было/стало → product (витрина «Одна заявка») → vid →
   languages → europe → modules → pricing → faq → final → footer.
   Полоса «было → стало» и витрина стоят на местах секций «Статус-кво» и
   «История одного водителя» (волна «Витрина модулей», 04.10.2026).
   Вопросы стоят между ценами и финальным призывом: возражения снимаются там,
   где решение уже почти принято, но ещё не нажата кнопка.
   MotionRoot монтируется последним: к его эффекту секции уже подписаны.
   ============================================================================ */

import type { Lang } from "@/lib/landing-i18n";
import { LandingProvider } from "./LandingProvider";
import { LandingIcons } from "./LandingIcons";
import { MotionRoot } from "./MotionRoot";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { TrustStrip } from "./TrustStrip";
import { BeforeAfter } from "./BeforeAfter";
import { Showcase } from "./Showcase";
import { VideoSection } from "./VideoSection";
import { Languages } from "./Languages";
import { Europe } from "./Europe";
import { Modules } from "./Modules";
import { Pricing } from "./Pricing";
import { Faq } from "./Faq";
import { FinalCta } from "./FinalCta";
import { Footer } from "./Footer";
import { JsonLd } from "./JsonLd";

export function LandingPage({ locale }: { locale: Lang }) {
  return (
    <LandingProvider locale={locale}>
      <JsonLd locale={locale} />
      <LandingIcons />
      <Nav />
      <main id="top">
        <Hero />
        <TrustStrip />
        <BeforeAfter />
        <Showcase />
        <VideoSection />
        <Languages />
        <Europe />
        <Modules />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MotionRoot />
    </LandingProvider>
  );
}
