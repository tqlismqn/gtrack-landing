/* ============================================================================
   Рекламная страница /{lang}/start: сюда ведут платные объявления Facebook /
   Instagram, у страницы одно главное действие — «Зарегистрироваться» (30 дней
   бесплатно, регистрация в приложении). Не форма заявки /demo и не прямая ссылка
   на регистрацию (решение владельца Г1224 / Г1259): клик считаем здесь, на сайте,
   потому что приложение исключено из пикселя Meta (CtaLink → cta_register_click).
   Оболочка — как у DemoPage: провайдер, спрайт, шапка, подвал, MotionRoot
   последним. Первый экран — те же .hero / .atmo / .hero-sub / .hero-ctas /
   .hero-micro, что на главной; три блока выгод повторяют три сцены роликов и
   берут тексты из LANDING_DICT (сцены hero, showcase, europe), а не пишут свои.
   noindex, вне sitemap, ни одной ссылки на неё с сайта.
   ============================================================================ */

import { LANDING_DICT, type Lang } from "@/lib/landing-i18n";
import { START_DICT } from "@/lib/start-page";
import { CtaLink } from "./CtaLink";
import { Footer } from "./Footer";
import { LandingIcons } from "./LandingIcons";
import { LandingProvider } from "./LandingProvider";
import { MotionRoot } from "./MotionRoot";
import { Nav } from "./Nav";
import { appSignupUrl } from "./urls";

/* тире ведущей части фразы не открывает строку — тот же приём, что lead() в Hero.tsx;
   неразрывный пробел — кодом символа, чтобы правка «нормализовать пробелы» его не съела */
const NBSP = String.fromCharCode(0xa0);
const glue = (s: string) => s.replace(/ —$/, NBSP + "—");

export function StartPage({ locale }: { locale: Lang }) {
  const t = START_DICT[locale];
  const d = LANDING_DICT[locale];
  const signup = appSignupUrl(locale);

  /* три выгоды = три сцены роликов: заявка на отпуск из Telegram → решение на доске,
     срок документа заранее, кто свободен. Тексты — слова сайта, не новые обещания. */
  const benefits = [
    { icon: "i-send", lead: glue(d.hero.phA), dim: d.hero.phAdim, text: d.showcase.c1p },
    { icon: "i-alert", lead: glue(d.hero.phC), dim: d.hero.phCdim, text: d.roadmap.tracks.drivers.d },
    { icon: "i-board", lead: d.europe.h2, dim: "", text: d.europe.sub },
  ];

  return (
    <LandingProvider locale={locale} page="start">
      <LandingIcons />
      <Nav />
      <main id="top">
        <section className="hero start-hero" data-screen-label="Start hero">
          <div className="atmo" aria-hidden="true">
            <div className="blob b1"></div><div className="blob b2"></div>
            <div className="grid-layer"></div>
            <div className="fade"></div>
          </div>
          <div className="wrap start-wrap">
            <span className="overline">{d.hero.kicker}</span>
            <h1>{t.h1}</h1>
            <p className="hero-sub">{t.lead}</p>
            <div className="hero-ctas">
              <CtaLink className="btn accent" href={signup} location="start_hero">{t.cta}</CtaLink>
            </div>
            <div className="hero-micro">
              <span>{d.nav.ctaShort}</span><span className="mdot"></span>
              <span>{d.hero.micro1}</span><span className="mdot"></span>
              <span>{d.hero.micro2}</span>
            </div>
          </div>
        </section>

        <section className="start-benefits" data-screen-label="Start benefits">
          <div className="wrap">
            <ul className="start-cards">
              {benefits.map((b, i) => (
                <li className="start-card reveal" data-delay={i * 60} key={b.icon}>
                  <span className="start-ic" aria-hidden="true">
                    <svg><use href={`#${b.icon}`} /></svg>
                  </span>
                  <h2 className="start-card-h">
                    {b.lead}{b.dim ? <> <span className="dim">{b.dim}</span></> : null}
                  </h2>
                  <p>{b.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="start-final" data-screen-label="Start final">
          <div className="wrap start-final-inner">
            <h2 className="start-final-h">{t.excel}</h2>
            <div className="hero-ctas">
              <CtaLink className="btn accent" href={signup} location="start_footer">{t.cta}</CtaLink>
            </div>
            <p className="start-note">{d.nav.ctaShort} · {d.hero.micro1}</p>
          </div>
        </section>
      </main>
      <Footer />
      <MotionRoot />
    </LandingProvider>
  );
}
