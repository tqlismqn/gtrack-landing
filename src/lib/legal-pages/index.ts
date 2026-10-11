/* ============================================================================
   Тексты юр-страниц лендинга: Impressum («Údaje o provozovateli»).
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

import type { Lang } from "../landing-i18n";
import { impressum as en } from "./en";
import { impressum as ru } from "./ru";
import { impressum as de } from "./de";
import { impressum as fr } from "./fr";
import { impressum as cs } from "./cs";
import { impressum as pl } from "./pl";
import { impressum as it } from "./it";
import { impressum as lv } from "./lv";
import { impressum as lt } from "./lt";
import { impressum as uk } from "./uk";
import { impressum as es } from "./es";
import { impressum as ro } from "./ro";

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
    vat: string;
    vatValue: string;
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
