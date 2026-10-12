/* ============================================================================
   Реквизиты оператора сайта (и ниже — сторон уведомления о соцсетях:
   Mesartim, профили, Meta Ireland) — константы, не переводятся.
   Источник — ARES (основная запись и выписка из obchodního rejstříku), сверено
   11.10.2026: IČO 14237890, Městský soud v Praze, oddíl C, vložka 362529.
   Адрес — с «Žižkov», как в ARES и в юр-текстах приложения.
   Имени директора (jednatel) на сайте нет — решение владельца 12.10 (Г40): § 435 OZ
   его не требует, а «Vertretungsberechtigter» из § 5 DDG обязателен только для
   провайдеров с местом в Германии; кому нужно — выписка obchodního rejstříku.
   DIČ и статуса DPH здесь нет намеренно — решение владельца 12.10 (Г29):
   на сайте статус НДС не указываем, пока нет оборотов. От сайта § 435 OZ
   требует фирму, сидло, IČO и запись в реестре — DIČ не требуется. DIČ
   (CZ + IČO) у s.r.o., зарегистрированной к налогу на прибыль, есть и без
   DPH; на налоговых документах его обязан указывать плательщик DPH (§ 29
   ZDPH), а ст. 5(1)(g) ECD и § 5 DDG требуют номер плательщика НДС, только
   если регистрация к НДС есть.
   Вернуть строку в Impressum — только новым решением владельца.
   privacy@ принимает почту — подтверждено владельцем 11.10.
   ============================================================================ */

export const COMPANY = {
  name: "G-Track Software s.r.o.",
  ico: "14237890",
  street: "Dagmar Burešové 2923/1",
  district: "Žižkov",
  zip: "130 00",
  city: "Praha 3",
  court: "Městský soud v Praze",
  section: "C",
  insert: "362529",
  email: "sales@g-track.eu",
  privacyEmail: "privacy@g-track.eu",
} as const;

/* Строка адреса без страны: «Dagmar Burešové 2923/1, Žižkov, 130 00 Praha 3».
   Страна дописывается словарём — её название переводится, адрес нет. */
export function seatOf(c: {
  street: string;
  district: string;
  zip: string;
  city: string;
}): string {
  return `${c.street}, ${c.district}, ${c.zip} ${c.city}`;
}

/* Mesartim Plus s.r.o. — по поручению G-Track оплачивает нашу рекламу у Meta
   и предоставляет пиксель Meta (набор данных для измерения), которым
   пользуется сайт (решение Г25). Называется ТОЛЬКО в уведомлении о соцсетях,
   в Impressum его нет. ARES 11.10: IČO 09215191, сидит по тому же адресу. */
export const MESARTIM = {
  name: "Mesartim Plus s.r.o.",
  ico: "09215191",
  street: "Dagmar Burešové 2923/1",
  district: "Žižkov",
  zip: "130 00",
  city: "Praha 3",
} as const;

/* Профили G-Track в соцсетях: страница «G-Track» на Facebook и @gtrack.eu
   в Instagram ведутся из собственного бизнес-портфолио G-Track (11.10). */
export const SOCIAL = {
  facebook: "https://www.facebook.com/profile.php?id=61595506131584",
  instagram: "https://www.instagram.com/gtrack.eu/",
  instagramHandle: "@gtrack.eu",
} as const;

/* Meta как сторона совместной ответственности за статистику страницы —
   дословно из Page Insights Controller Addendum (в силе с 25.04.2023,
   сверено 11.10.2026). Страна переводится словарём. */
export const META_IE = {
  name: "Meta Platforms Ireland Limited",
  address: "Serpentine Avenue, Block J, Dublin 4",
} as const;
