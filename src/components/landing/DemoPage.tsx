/* ============================================================================
   Страница заявки на показ /{lang}/demo (ворота 2). Оболочка — как у юр-страниц
   (LegalNoticePage): провайдер языка и темы, спрайт иконок, шапка, подвал,
   MotionRoot последним; без FinalCta — страница сама и есть призыв.
   Текст — серверная разметка (виден без JS), форма — клиентский островок
   DemoForm. Словарь передаётся форме одной локалью, а не всеми двенадцатью.
   noindex и ни одной ссылки на неё до ворот 5.5.
   ============================================================================ */

import { DEMO_DICT } from "@/lib/demo-page";
import type { Lang } from "@/lib/landing-i18n";
import { DemoForm } from "./DemoForm";
import { LandingIcons } from "./LandingIcons";
import { LandingProvider } from "./LandingProvider";
import { MotionRoot } from "./MotionRoot";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { legalUrl } from "./urls";

/* «G-Track» не рвём по дефису в заголовке: на 1280 cs-заголовок ломался «G-» / «Track» */
function withBrand(text: string) {
  return text.split("G-Track").flatMap((part, i) =>
    i === 0 ? [part] : [<span key={i} className="demo-brand">G-Track</span>, part],
  );
}

export function DemoPage({ locale }: { locale: Lang }) {
  const t = DEMO_DICT[locale];
  return (
    <LandingProvider locale={locale} page="demo">
      <LandingIcons />
      <Nav />
      <main id="top">
        <section className="sect lg-page demo-page" data-screen-label="Demo request">
          <div className="wrap demo-grid">
            <div className="demo-intro">
              <span className="overline">{t.overline}</span>
              <h1 className="lg-h1">{withBrand(t.h1)}</h1>
              <p className="sect-sub">{t.lead}</p>
              <p className="demo-next">{withBrand(t.next)}</p>
            </div>
            <DemoForm locale={locale} t={t} privacyHref={legalUrl("privacy", locale)} />
          </div>
        </section>
      </main>
      <Footer />
      <MotionRoot />
    </LandingProvider>
  );
}
