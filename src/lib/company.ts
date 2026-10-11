/* ============================================================================
   Реквизиты оператора сайта — константы, не переводятся.
   Источник — ARES (основная запись и выписка из obchodního rejstříku), сверено
   11.10.2026: IČO 14237890, Městský soud v Praze, oddíl C, vložka 362529,
   jednatel Thomas Gradinar. Адрес — с «Žižkov», как в ARES и в юр-текстах
   приложения.
   DIČ здесь нет намеренно: компания не плательщик DPH (в ARES нет записи
   о регистрации к DPH). Если регистрация появится — строку «DIČ: CZ14237890»
   добавить сюда и в Impressum (план, Task 8 Step 7).
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
  director: "Thomas Gradinar",
  email: "sales@g-track.eu",
  privacyEmail: "privacy@g-track.eu",
} as const;
