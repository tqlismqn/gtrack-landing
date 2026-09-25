/* ============================================================================
   Сборка страницы дорожной карты (общая для /roadmap и /[locale]/roadmap).
   Оболочка та же, что у главной: провайдер языка и темы, спрайт иконок, шапка,
   подвал и MotionRoot последним — чтобы шапка, тема и переключатель языка вели
   себя здесь ровно так же. Второго <html> нет: страница живёт внутри тех же
   двух route-групп, что и главная.
   ============================================================================ */

import type { Lang } from "@/lib/landing-i18n";
import { buildRoadmapModel } from "@/lib/roadmap-content";
import { LandingProvider } from "./LandingProvider";
import { LandingIcons } from "./LandingIcons";
import { MotionRoot } from "./MotionRoot";
import { Nav } from "./Nav";
import { Roadmap } from "./Roadmap";
import { FinalCta } from "./FinalCta";
import { Footer } from "./Footer";

export function RoadmapPage({ locale }: { locale: Lang }) {
  /* Модель считается здесь, на сервере при пререндере: «Сейчас» = день сборки,
     подписи месяцев — Intl серверной сборки. Клиент получает готовые числа,
     поэтому гидратация не видит расхождений. «Сейчас» сдвигается с каждым деплоем. */
  const model = buildRoadmapModel(locale, new Date());
  return (
    <LandingProvider locale={locale} page="roadmap">
      <LandingIcons />
      <Nav />
      {/* id="top" — цель ссылок логотипа в шапке и подвале; на главной он тот же */}
      <main id="top">
        <Roadmap model={model} />
        <FinalCta />
      </main>
      <Footer />
      <MotionRoot />
    </LandingProvider>
  );
}
