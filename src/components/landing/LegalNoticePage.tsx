/* ============================================================================
   Юр-страницы лендинга — общая сборка двух видов:
   - impressum: Impressum («Údaje o provozovateli»), /impressum и /[locale]/impressum;
   - social: уведомление о соцсетях, /social-media-privacy и /[locale]/social-media-privacy.
   Оболочка та же, что у дорожной карты (RoadmapPage): провайдер языка и темы,
   спрайт иконок, шапка, подвал и MotionRoot последним. Без FinalCta: юр-страница
   не продаёт.
   Содержимое — серверная разметка без .reveal: реквизиты и текст уведомления
   обязаны быть видны сразу и без JS («ständig verfügbar», § 5 DDG по существу).
   Реквизиты — из company.ts (не переводятся), тексты — из IMPRESSUM и
   SOCIAL_NOTICE, подписи правовых ссылок — те же d.footer.*, что в подвале.
   ============================================================================ */

import type { ReactNode } from "react";
import { COMPANY, SOCIAL, seatOf } from "@/lib/company";
import { LANDING_DICT, type Lang } from "@/lib/landing-i18n";
import {
  IMPRESSUM,
  META_LINKS,
  SOCIAL_LINK_KEYS,
  SOCIAL_NOTICE,
  socialNoticeEffective,
  splitLinks,
  type SocialLinkKey,
} from "@/lib/legal-pages";
import { fill } from "@/lib/showcase-data";
import { LandingProvider } from "./LandingProvider";
import { LandingIcons } from "./LandingIcons";
import { MotionRoot } from "./MotionRoot";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { legalUrl } from "./urls";

export type LegalPageKind = "impressum" | "social";

export function LegalNoticePage({
  locale,
  kind = "impressum",
}: {
  locale: Lang;
  kind?: LegalPageKind;
}) {
  return (
    <LandingProvider locale={locale} page={kind}>
      <LandingIcons />
      <Nav />
      {/* id="top" — цель ссылок логотипа в шапке и подвале, как на главной и карте */}
      <main id="top">
        {kind === "social" ? (
          <SocialNoticeBody locale={locale} />
        ) : (
          <ImpressumBody locale={locale} />
        )}
      </main>
      <Footer />
      <MotionRoot />
    </LandingProvider>
  );
}

function ImpressumBody({ locale }: { locale: Lang }) {
  const p = IMPRESSUM[locale];
  const l = p.labels;
  const f = LANDING_DICT[locale].footer;
  const seat = `${seatOf(COMPANY)}, ${l.country}`;

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
  );
}

function isLinkKey(key: string): key is SocialLinkKey {
  return (SOCIAL_LINK_KEYS as readonly string[]).includes(key);
}

/* Абзац с разметкой [подпись](ключ) → текст и ссылки. Неизвестный ключ
   печатается подписью без ссылки — тест не пропустит такой словарь, но
   страница и тогда не покажет посетителю голую разметку. */
function withLinks(text: string, href: Record<SocialLinkKey, string>): ReactNode[] {
  return splitLinks(text).map((seg, i) => {
    if (typeof seg === "string") return seg;
    if (!isLinkKey(seg.key)) return seg.text;
    return (
      <a key={i} href={href[seg.key]}>
        {seg.text}
      </a>
    );
  });
}

function SocialNoticeBody({ locale }: { locale: Lang }) {
  const n = SOCIAL_NOTICE[locale];
  const f = LANDING_DICT[locale].footer;
  /* Record по SocialLinkKey: новый ключ в словаре не соберётся, пока у него
     нет адреса здесь. Privacy Policy — на языке страницы, как в подвале. */
  const href: Record<SocialLinkKey, string> = {
    ...META_LINKS,
    facebook: SOCIAL.facebook,
    instagram: SOCIAL.instagram,
    privacyPolicy: legalUrl("privacy", locale),
    privacyEmail: `mailto:${COMPANY.privacyEmail}`,
  };

  return (
    <section className="sect lg-page" data-screen-label="Social media privacy">
      <div className="wrap">
        <span className="overline">{f.legalHeading}</span>
        <h1 className="lg-h1">{n.title}</h1>
        <p className="lg-effective">{socialNoticeEffective(locale)}</p>
        <div className="lg-doc">
          {n.sections.map((s, i) => (
            <section className="lg-sect" key={s.h}>
              <h2 className="lg-h2">{`${i + 1}. ${s.h}`}</h2>
              {s.p.map((para, j) => (
                <p key={j}>{withLinks(para, href)}</p>
              ))}
            </section>
          ))}
        </div>
        <p className="lg-prevails">{n.prevails}</p>
      </div>
    </section>
  );
}
