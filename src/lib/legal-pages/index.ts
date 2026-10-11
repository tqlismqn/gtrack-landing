/* ============================================================================
   Тексты юр-страниц лендинга: Impressum («Údaje o provozovateli») и
   уведомление о соцсетях («Ochrana osobních údajů na sociálních sítích»).
   Реквизиты (название, IČO, адрес, суд, почта) здесь НЕ живут — они в
   ../company.ts и не переводятся; словарь несёт только подписи и связки.
   registerValue — шаблон fill() из showcase-data в ИМЕНИТЕЛЬНОМ падеже:
   cs «{court}, oddíl {section}, vložka {insert}». Косвенный падеж
   («vedeném Městským soudem») с подстановкой названия суда не склеивается.
   При расхождении языковых версий действует чешская (Czech prevails).
   Lovable, Cloudflare, Vercel и Mesartim здесь не называются (Г19; Mesartim —
   только в уведомлении о соцсетях), ODR-ссылки и «§ 5 TMG» нет: ODR отменена
   с 20.07.2025, TMG заменён DDG и чешскую s.r.o. прямо не связывает.
   ============================================================================ */

/* Импорты относительные, не @/: модуль импортирует тест
   (test/legal-pages.test.ts), а vitest здесь без конфига и алиаса. */
import type { Lang } from "../landing-i18n";
import { COMPANY, seatOf } from "../company";
import { fill } from "../showcase-data";
import { impressum as en, socialNotice as socialEn } from "./en";
import { impressum as ru, socialNotice as socialRu } from "./ru";
import { impressum as de, socialNotice as socialDe } from "./de";
import { impressum as fr, socialNotice as socialFr } from "./fr";
import { impressum as cs, socialNotice as socialCs } from "./cs";
import { impressum as pl, socialNotice as socialPl } from "./pl";
import { impressum as it, socialNotice as socialIt } from "./it";
import { impressum as lv, socialNotice as socialLv } from "./lv";
import { impressum as lt, socialNotice as socialLt } from "./lt";
import { impressum as uk, socialNotice as socialUk } from "./uk";
import { impressum as es, socialNotice as socialEs } from "./es";
import { impressum as ro, socialNotice as socialRo } from "./ro";

export type ImpressumDict = {
  /* H1 страницы = подпись ссылки в подвале (footer.impressum) */
  title: string;
  metaDescription: string;
  /* вводная строка: чей это сайт и сервис */
  lead: string;
  labels: {
    company: string;
    legalForm: string;
    legalFormValue: string;
    seat: string;
    /* название страны — значение, а не подпись: дописывается к адресу */
    country: string;
    ico: string;
    register: string;
    registerValue: string;
    director: string;
    /* Строки о DPH / DIČ нет намеренно — решение владельца 12.10 (Г29):
       статус плательщика НДС не указываем, пока нет оборотов. § 435 OZ
       требует от сайта фирму, сидло, IČO и запись в реестре; DIČ указывает
       только плательщик DPH. Сторож — test/legal-pages.test.ts. */
    email: string;
    privacy: string;
    legalDocs: string;
  };
};

export const IMPRESSUM: Record<Lang, ImpressumDict> = {
  en,
  ru,
  de,
  fr,
  cs,
  pl,
  it,
  lv,
  lt,
  uk,
  es,
  ro,
};

/* Строки реквизитов Impressum в порядке страницы — их рисует LegalNoticePage,
   и их же читает тест: проверяется ровно тот текст, что видит посетитель.
   Порядок — как в § 435 OZ / ст. 5 ECD: кто, где, реестр, кто представляет,
   связь. Строка правовых документов (ссылки подвала) — в компоненте.
   mailto — значение рисуется ссылкой на почту. */
export type ImpressumRow = { dt: string; dd: string; mailto?: true };

export function impressumRows(lang: Lang): ImpressumRow[] {
  const l = IMPRESSUM[lang].labels;
  return [
    { dt: l.company, dd: COMPANY.name },
    { dt: l.legalForm, dd: l.legalFormValue },
    { dt: l.seat, dd: `${seatOf(COMPANY)}, ${l.country}` },
    { dt: l.ico, dd: COMPANY.ico },
    { dt: l.register, dd: fill(l.registerValue, COMPANY) },
    { dt: l.director, dd: COMPANY.director },
    { dt: l.email, dd: COMPANY.email, mailto: true },
    { dt: l.privacy, dd: COMPANY.privacyEmail, mailto: true },
  ];
}

/* ----------------------------------------------------------------------------
   Уведомление о соцсетях (/social-media-privacy).

   Реквизиты (G-Track, Mesartim, Meta Ireland, профиль @gtrack.eu) локали
   подставляют шаблонными строками из ../company.ts — переводится только
   связка вокруг них. Ссылки в абзацах — разметка [подпись](ключ): адрес
   живёт в константе и выбирается по ключу при рендере (LegalNoticePage),
   словарь несёт только подпись. Набор ключей каждой локали обязан совпадать
   с чешским — это проверяет тест.
---------------------------------------------------------------------------- */

export type SocialNoticeDict = {
  /* H1 страницы; подпись ссылки в подвале короче — footer.social */
  title: string;
  metaDescription: string;
  /* шаблон с {date}: дата — одна константа ниже, формат — по локали */
  effective: string;
  sections: { h: string; p: string[] }[];
  /* при расхождении языковых версий действует чешская */
  prevails: string;
};

export const SOCIAL_NOTICE: Record<Lang, SocialNoticeDict> = {
  en: socialEn,
  ru: socialRu,
  de: socialDe,
  fr: socialFr,
  cs: socialCs,
  pl: socialPl,
  it: socialIt,
  lv: socialLv,
  lt: socialLt,
  uk: socialUk,
  es: socialEs,
  ro: socialRo,
};

/* Ключи ссылок уведомления. Адреса Meta и надзорных органов — здесь
   (сверены 11.10.2026: дополнение о совместной ответственности и страница
   «Information about Page Insights» — в силе с 25.04.2023; uoou.cz отвечает
   301 на uoou.gov.cz). facebook/instagram — из SOCIAL, privacyEmail — из
   COMPANY, privacyPolicy — legalUrl() той же локали: их адрес строит
   LegalNoticePage. */
export const SOCIAL_LINK_KEYS = [
  "facebook",
  "instagram",
  "privacyPolicy",
  "privacyEmail",
  "metaPrivacy",
  "metaCookies",
  "addendum",
  "insightsInfo",
  "uoou",
  "dpc",
] as const;
export type SocialLinkKey = (typeof SOCIAL_LINK_KEYS)[number];

export const META_LINKS = {
  metaPrivacy: "https://www.facebook.com/privacy/policy/",
  metaCookies: "https://www.facebook.com/policies/cookies/",
  addendum: "https://www.facebook.com/legal/terms/page_controller_addendum",
  insightsInfo:
    "https://www.facebook.com/legal/terms/information_about_page_insights_data",
  uoou: "https://uoou.gov.cz/",
  dpc: "https://www.dataprotection.ie/",
} as const satisfies Partial<Record<SocialLinkKey, string>>;

export type LinkSegment = string | { text: string; key: string };

/* «a [b](addendum) c» → ["a ", {text: "b", key: "addendum"}, " c"].
   Ключ — латинское слово: в подписи допустимы любые символы, кроме «]». */
export function splitLinks(text: string): LinkSegment[] {
  const out: LinkSegment[] = [];
  const re = /\[([^\]]+)\]\(([A-Za-z]+)\)/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    out.push({ text: m[1], key: m[2] });
    last = at + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/* Дата вступления в силу — ОДНА на все 12 языков. Task 8 переставляет её
   на дату мерджа ветки; меняется только эта строка. */
export const SOCIAL_NOTICE_EFFECTIVE = "2026-10-11";

/* en — британский порядок «11 October 2026»: сайт для ЕС, американское
   «October 11» здесь чужое. Остальные локали — свой код языка как есть. */
const DATE_LOCALE: Record<Lang, string> = {
  en: "en-GB",
  ru: "ru",
  de: "de",
  fr: "fr",
  cs: "cs",
  pl: "pl",
  it: "it",
  lv: "lv",
  lt: "lt",
  uk: "uk",
  es: "es",
  ro: "ro",
};

/* Строка «Účinné od 11. října 2026». Полночь UTC и timeZone UTC: дата не
   съезжает на соседний день ни в часовом поясе сборки, ни у читателя
   (страница статическая, строка считается на сервере при сборке). */
export function socialNoticeEffective(lang: Lang): string {
  const date = new Intl.DateTimeFormat(DATE_LOCALE[lang], {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${SOCIAL_NOTICE_EFFECTIVE}T00:00:00Z`));
  return fill(SOCIAL_NOTICE[lang].effective, { date });
}
