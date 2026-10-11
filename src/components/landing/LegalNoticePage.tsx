/* ============================================================================
   Impressum («Údaje o provozovateli») — общая сборка для /impressum и
   /[locale]/impressum. Оболочка та же, что у дорожной карты (RoadmapPage):
   провайдер языка и темы, спрайт иконок, шапка, подвал и MotionRoot последним.
   Без FinalCta: юр-страница не продаёт.
   Содержимое — серверная разметка без .reveal: реквизиты обязаны быть видны
   сразу и без JS («ständig verfügbar», § 5 DDG по существу).
   Реквизиты — из company.ts (не переводятся), подписи — из IMPRESSUM,
   подписи правовых ссылок — те же d.footer.*, что в подвале.
   ============================================================================ */

import type { ReactNode } from "react";
import { COMPANY } from "@/lib/company";
import { LANDING_DICT, type Lang } from "@/lib/landing-i18n";
import { IMPRESSUM } from "@/lib/legal-pages";
import { fill } from "@/lib/showcase-data";
import { LandingProvider } from "./LandingProvider";
import { LandingIcons } from "./LandingIcons";
import { MotionRoot } from "./MotionRoot";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { legalUrl } from "./urls";

export function LegalNoticePage({ locale }: { locale: Lang }) {
  const p = IMPRESSUM[locale];
  const l = p.labels;
  const f = LANDING_DICT[locale].footer;
  const seat = `${COMPANY.street}, ${COMPANY.district}, ${COMPANY.zip} ${COMPANY.city}, ${l.country}`;

  /* порядок строк — как в § 435 OZ / ст. 5 ECD: кто, где, реестр, кто
     представляет, налоговый статус, связь */
  const rows: Array<{ dt: string; dd: ReactNode }> = [
    { dt: l.company, dd: COMPANY.name },
    { dt: l.legalForm, dd: l.legalFormValue },
    { dt: l.seat, dd: seat },
    { dt: l.ico, dd: COMPANY.ico },
    { dt: l.register, dd: fill(l.registerValue, COMPANY) },
    { dt: l.director, dd: COMPANY.director },
    { dt: l.vat, dd: l.vatValue },
    { dt: l.email, dd: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> },
    {
      dt: l.privacy,
      dd: <a href={`mailto:${COMPANY.privacyEmail}`}>{COMPANY.privacyEmail}</a>,
    },
    {
      dt: l.legalDocs,
      dd: (
        <span className="lg-links">
          <a href={legalUrl("privacy", locale)}>{f.privacy}</a>
          <a href={legalUrl("terms", locale)}>{f.terms}</a>
          <a href={legalUrl("dpa", locale)}>{f.dpa}</a>
        </span>
      ),
    },
  ];

  return (
    <LandingProvider locale={locale} page="impressum">
      <LandingIcons />
      <Nav />
      {/* id="top" — цель ссылок логотипа в шапке и подвале, как на главной и карте */}
      <main id="top">
        <section className="sect lg-page" data-screen-label="Impressum">
          <div className="wrap">
            <span className="overline">{f.legalHeading}</span>
            <h1 className="lg-h1">{p.title}</h1>
            <p className="sect-sub lg-lead">{p.lead}</p>
            <dl className="lg-dl">
              {rows.map(({ dt, dd }) => (
                <div className="lg-row" key={dt}>
                  <dt>{dt}</dt>
                  <dd>{dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
      <Footer />
      <MotionRoot />
    </LandingProvider>
  );
}
