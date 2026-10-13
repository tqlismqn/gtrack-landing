/* ============================================================================
   Форма заявки /{lang}/demo (ворота 2) — чистая логика без DOM:
   адрес функции приёма, корзины парка, страны, сборка тела запроса и решение
   «пушить ли generate_lead». Тест — test/demo.test.ts.
   - Адрес функции — тот самый хост, что уже стоит в CSP connect-src
     (next.config.ts, csp.test.ts): ни ключа Supabase, ни Authorization лендинг
     не шлёт, функция развёрнута с verify_jwt:false и пускает только Origin
     https://www.g-track.eu (превью Vercel отправить заявку не могут — это норма).
   - Метки рекламы берутся из адреса самой страницы (белый список
     MARKETING_PARAMS), в хранилище не пишутся — сторож analytics.test.ts.
   - generate_lead уходит в dataLayer только при ответе counted:true с id:
     ловушка, лимит и дубль получают counted:false и конверсией не считаются.
     В событии нет ни одного личного поля.
   Импорты относительные: модуль тянет vitest без алиаса @/.
   ============================================================================ */

import { MARKETING_PARAMS } from "./analytics";
import type { Lang } from "./landing-i18n";

export const DEMO_ENDPOINT = "https://qawvvbjmfimpyilaqsrj.supabase.co/functions/v1/demo-intake";

/* Что подготовить к показу: три флажка. Порядок фиксирован и совпадает с тем, что ждёт
   функция приёма (контракт 12.10): в теле запроса interests всегда в этом порядке, без повторов. */
export const INTERESTS = ["excel", "telematics", "demo_access"] as const;
export type Interest = (typeof INTERESTS)[number];

/* Предел комментария — 1000 символов Юникода (контракт 12.10): эмодзи считается за один.
   maxLength у textarea считает кодовыми единицами UTF-16 (эмодзи = 2), то есть строже сервера:
   он не даёт набрать лишнее, а точный предел держит normalizeMessage — вставка и автозаполнение
   до maxLength доходят не всегда. */
export const MESSAGE_MAX = 1000;

/* G42 / ревью безопасности 12.10 (M2): сервер молча отбрасывает заявку со ссылкой (так режется спам
   ботов), поэтому человеку, вставившему адрес своего сайта, форма говорит об этом ДО отправки — боты
   JS не выполняют. Выражение — то же, что SPAM_RE в demo-intake/core.ts (vault): меняются вместе. */
export const LINK_RE = /(?:https?|ftp|file|smb):\/\/|\\\\[\w.-]+\\|<\s*a[\s>]|\[url/i;

export function linkFields(v: { name: string; company: string; message: string }): Array<"name" | "company" | "message"> {
  return (["name", "company", "message"] as const).filter((k) => LINK_RE.test(v[k]));
}

export const FLEET_BUCKETS = ["lt20", "20_50", "50_200", "200_plus"] as const;
export type FleetBucket = (typeof FLEET_BUCKETS)[number];

/* ЕС-27 + соседи, откуда реально пишут перевозчики; «ZZ» = «Другая», всегда последней.
   Названия стран — Intl.DisplayNames на языке страницы, словарю они не нужны. */
export const COUNTRY_CODES: readonly string[] = [
  "AL", "AT", "BA", "BE", "BG", "CH", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GB",
  "GR", "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MD", "ME", "MK", "MT", "NL", "NO", "PL",
  "PT", "RO", "RS", "SE", "SI", "SK", "TR", "UA", "ZZ",
];

/* Страна по умолчанию из языка страницы; en и ru — без умолчания: по языку
   страну не угадать (русскоязычные фирмы в CZ, PL, LT, LV), выбор обязателен. */
export const DEFAULT_COUNTRY: Record<Lang, string> = {
  en: "", ru: "", uk: "UA", de: "DE", fr: "FR", cs: "CZ", pl: "PL", it: "IT", lv: "LV", lt: "LT", es: "ES", ro: "RO",
};

/* Версия текста согласия на новости: меняется вместе с формулировкой
   fields.newsletter, чтобы доказательство согласия ссылалось на точный текст. */
export const NEWSLETTER_CONSENT_VERSION = "nl-2026-10";

const ATTR_MAX = 200;

/* Вставка из подписи письма или документа несёт невидимые символы (мягкий перенос, нулевой
   пробел, BOM) и табуляцию; сервер такие символы отвергает, а человек их не видит и не может
   исправить поле (финальное ревью 12.10). Неразрывные пробелы — в обычный пробел. */
function clean(value: string): string {
  return value
    .replace(/[\u00ad\u200b-\u200d\u2060\ufeff]/g, "")
    .replace(/[\t\u00a0\u202f]/g, " ")
    .replace(/ {2,}/g, " ")
    .trim();
}

/* «0171/1234567» (DE/AT) и узкие пробелы из подписей — к формату, который принимает сервер. */
function cleanPhone(value: string): string {
  return clean(value.replace(/\//g, " "));
}

/* Комментарий: CRLF и одинокий CR — в LF, края без пробелов, не более MESSAGE_MAX символов
   Юникода (срез по кодовым точкам не рвёт суррогатную пару), пусто — "". Переносы строк в тексте
   законны и остаются. Невидимые символы подписей и писем (мягкий перенос, нулевой пробел, BOM)
   и табуляцию убираем так же, как в остальных полях (см. clean): такие символы сервер в полях
   отвергает, и для комментария безопаснее предположить то же — человек их не видит и поправить
   не может. Срез идёт после trim, а хвост после среза
   обрезается снова: на границе 1000 мог остаться пробел или перенос. */
export function normalizeMessage(value: string): string {
  const text = value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u00ad\u200b-\u200d\u2060\ufeff]/g, "")
    .replace(/[\t\u00a0\u202f]/g, " ")
    .trim();
  return [...text].slice(0, MESSAGE_MAX).join("").trim();
}

/* Любой список → подмножество INTERESTS в фиксированном порядке, без повторов и чужих значений. */
export function normalizeInterests(values: readonly string[]): Interest[] {
  return INTERESTS.filter((i) => values.includes(i));
}

export type DemoFormInput = {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  fleet_bucket: FleetBucket;
  lang: Lang;
  newsletter: boolean;
  hp: string;
  message: string;
  interests: readonly string[];
};

export type DemoPayload = Omit<DemoFormInput, "phone" | "interests"> & {
  phone: string | null;
  interests: Interest[];
  consent_text: string | null;
  consent_version: string | null;
  attribution: Record<string, string>;
  t_ms: number;
};

export type DemoResponse =
  | { ok: true; id: string | null; counted: boolean }
  | { ok: false; error: string; fields?: string[] };

export type LeadEvent = {
  event: "generate_lead";
  transaction_id: string;
  fleet_bucket: FleetBucket;
  lang: Lang;
};

export function attributionFromSearch(search: string): Record<string, string> {
  const params = new URLSearchParams(search);
  const out: Record<string, string> = {};
  for (const key of MARKETING_PARAMS) {
    const value = (params.get(key) ?? "").trim();
    if (value) out[key] = [...value].slice(0, ATTR_MAX).join("");
  }
  return out;
}

export function buildDemoPayload(
  input: DemoFormInput,
  search: string,
  elapsedMs: number,
  consentText: string,
): DemoPayload {
  const phone = cleanPhone(input.phone);
  return {
    name: clean(input.name),
    company: clean(input.company),
    email: clean(input.email),
    phone: phone === "" ? null : phone,
    country: input.country,
    fleet_bucket: input.fleet_bucket,
    lang: input.lang,
    newsletter: input.newsletter,
    hp: input.hp,
    message: normalizeMessage(input.message),
    interests: normalizeInterests(input.interests),
    consent_text: input.newsletter ? consentText : null,
    consent_version: input.newsletter ? NEWSLETTER_CONSENT_VERSION : null,
    attribution: attributionFromSearch(search),
    t_ms: Math.round(elapsedMs),
  };
}

export function leadEvent(resp: DemoResponse, fleet: FleetBucket, lang: Lang): LeadEvent | null {
  if (!resp.ok || !resp.counted || !resp.id) return null;
  return { event: "generate_lead", transaction_id: resp.id, fleet_bucket: fleet, lang };
}
