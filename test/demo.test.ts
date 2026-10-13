/* ============================================================================
   Страница заявки /{lang}/demo (ворота 2): сборщик тела запроса, решение
   «пушить ли generate_lead», словарь ×12, запреты копирайта, noindex,
   отсутствие /demo в sitemap и llms.txt.
   План: vault docs/superpowers/plans/2026-10-12-marketing-gate2-demo-intake-plan.md, Task 5.
   ============================================================================ */

import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  COUNTRY_CODES,
  DEFAULT_COUNTRY,
  DEMO_ENDPOINT,
  FLEET_BUCKETS,
  INTERESTS,
  MESSAGE_MAX,
  NEWSLETTER_CONSENT_VERSION,
  attributionFromSearch,
  buildDemoPayload,
  leadEvent,
  linkFields,
  type DemoFormInput,
} from "../src/lib/demo-form";
import { DEMO_DICT } from "../src/lib/demo-page";
import { LOCALES, demoPath, type Lang } from "../src/lib/landing-i18n";
import { SITE_ORIGIN, demoMetadata } from "../src/lib/landing-metadata";
import sitemap from "../src/app/sitemap";
import { BANNED, aiPattern } from "./banned";

const input: DemoFormInput = {
  name: "  Petr Novák ",
  company: " Doprava Novák s.r.o.",
  email: " petr@doprava.example ",
  phone: "",
  country: "CZ",
  fleet_bucket: "20_50",
  lang: "cs",
  newsletter: false,
  hp: "",
  message: "",
  interests: [],
};

function leaves(v: unknown, path = ""): Array<[string, string]> {
  if (typeof v === "string") return [[path, v]];
  if (v && typeof v === "object") {
    return Object.entries(v as Record<string, unknown>).flatMap(([k, x]) => leaves(x, path ? `${path}.${k}` : k));
  }
  return [];
}

describe("demo-form: адрес функции и константы", () => {
  it("endpoint — точный хост из CSP connect-src", () =>
    expect(DEMO_ENDPOINT).toBe("https://qawvvbjmfimpyilaqsrj.supabase.co/functions/v1/demo-intake"));
  it("корзины парка — как в базе", () =>
    expect([...FLEET_BUCKETS]).toEqual(["lt20", "20_50", "50_200", "200_plus"]));
  it("интересы и предел комментария — как в контракте приёма", () => {
    expect([...INTERESTS]).toEqual(["excel", "telematics", "demo_access"]);
    expect(MESSAGE_MAX).toBe(1000);
  });
  it("default_country_valid", () => {
    for (const c of COUNTRY_CODES) expect(c).toMatch(/^[A-Z]{2}$/);
    expect(COUNTRY_CODES).toContain("ZZ");
    for (const l of LOCALES) {
      const d = DEFAULT_COUNTRY[l];
      expect(d === "" || COUNTRY_CODES.includes(d), `${l}: ${d}`).toBe(true);
    }
    expect(DEFAULT_COUNTRY.cs).toBe("CZ");
    expect(DEFAULT_COUNTRY.en).toBe("");
  });
});

describe("demo-form: атрибуция и тело запроса", () => {
  it("attribution_only_marketing_keys", () =>
    expect(attributionFromSearch("?utm_source=x&evil=1&gclid=g&utm_term=&to=a@b.cz")).toEqual({ utm_source: "x", gclid: "g" }));

  it("attribution_truncated_200", () =>
    expect(attributionFromSearch(`?utm_campaign=${"a".repeat(300)}`).utm_campaign).toHaveLength(200));

  it("payload_phone_empty_to_null_and_consent_only_when_newsletter", () => {
    const p = buildDemoPayload(input, "?utm_source=x", 4200.7, "Send me news");
    expect(p.phone).toBeNull();
    expect(p.consent_text).toBeNull();
    expect(p.consent_version).toBeNull();
    expect(p.name).toBe("Petr Novák");
    expect(p.company).toBe("Doprava Novák s.r.o.");
    expect(p.email).toBe("petr@doprava.example");
    const q = buildDemoPayload({ ...input, newsletter: true, phone: " +420 777 000 111 " }, "", 5000, "Send me news");
    expect(q.phone).toBe("+420 777 000 111");
    expect(q.consent_text).toBe("Send me news");
    expect(q.consent_version).toBe(NEWSLETTER_CONSENT_VERSION);
  });

  it("payload_normalizes_phone_separators", () => {
    expect(buildDemoPayload({ ...input, phone: "0171/1234567" }, "", 4000, "x").phone).toBe("0171 1234567");
    expect(buildDemoPayload({ ...input, phone: "+420\u00a0777\u202f000 111" }, "", 4000, "x").phone).toBe("+420 777 000 111");
  });

  it("payload_strips_invisible_characters", () => {
    const p = buildDemoPayload({ ...input, name: "Pe\u00adtr\u200b Novák\t", company: "\u2060Doprava\ufeff  Novák" }, "", 4000, "x");
    expect(p.name).toBe("Petr Novák");
    expect(p.company).toBe("Doprava Novák");
  });

  it("payload_carries_hp_and_t_ms", () => {
    const p = buildDemoPayload({ ...input, hp: "spam" }, "?gclid=g1", 4200.7, "x");
    expect(p.hp).toBe("spam");
    expect(p.t_ms).toBe(4201);
    expect(p.attribution).toEqual({ gclid: "g1" });
  });
});

describe("demo-form: комментарий и «что подготовить» (контракт приёма от 12.10)", () => {
  const body = (message: string, interests: readonly string[] = []) =>
    buildDemoPayload({ ...input, message, interests }, "", 4000, "x");

  it("пусто → message \"\" и interests []", () => {
    const p = buildDemoPayload(input, "", 4000, "x");
    expect(p.message).toBe("");
    expect(p.interests).toEqual([]);
    expect(body("  \n\t \r\n ").message).toBe("");
  });

  it("CRLF и одинокий CR → LF, края обрезаны, абзацы целы", () => {
    expect(body("  Нужен перенос.\r\nСейчас 35 тягачей.\rТретья строка\n\n\nПятая  \r\n ").message).toBe(
      "Нужен перенос.\nСейчас 35 тягачей.\nТретья строка\n\n\nПятая",
    );
  });

  it("1000 символов проходят целиком, 1001 → 1000", () => {
    expect(body("a".repeat(1000)).message).toBe("a".repeat(1000));
    const cut = body("a".repeat(1001)).message;
    expect(cut).toHaveLength(1000);
    expect(cut).toBe("a".repeat(1000));
  });

  it("предел — в символах Юникода: эмодзи считается за один", () => {
    const full = body("😀".repeat(1000)).message;
    expect([...full]).toHaveLength(1000);
    expect(full).toHaveLength(2000); // UTF-16: две единицы на эмодзи
    expect(body("😀".repeat(1001)).message).toBe("😀".repeat(1000));
    expect(body("я".repeat(1000) + "😀").message).toBe("я".repeat(1000));
  });

  it("после среза хвост снова обрезается (на границе остался пробел или перенос)", () => {
    expect(body(`${"a".repeat(999)} b`).message).toBe("a".repeat(999));
    expect(body(`${"a".repeat(999)}\r\nb`).message).toBe("a".repeat(999));
  });

  it("невидимые символы и табуляция из вставки убираются, как в остальных полях", () => {
    expect(body("Pe\u00adtr\u200b\tNovák\u00a0s.r.o.\ufeff").message).toBe("Petr Novák s.r.o.");
  });

  it("interests: чужие значения выброшены, повторы убраны, порядок всегда excel → telematics → demo_access", () => {
    expect(body("", ["demo_access", "excel"]).interests).toEqual(["excel", "demo_access"]);
    expect(body("", ["telematics", "demo_access", "excel"]).interests).toEqual(["excel", "telematics", "demo_access"]);
    expect(body("", ["excel", "excel", "bogus", "EXCEL", ""]).interests).toEqual(["excel"]);
    expect(body("", ["bogus", "demo-access"]).interests).toEqual([]);
    expect(body("", []).interests).toEqual([]);
  });

  it("в JSON тела оба ключа на месте, interests — массив строк", () => {
    const sent = JSON.parse(JSON.stringify(body("Нужен перенос.\nСейчас 35 тягачей.", ["demo_access", "excel"])));
    expect(sent.message).toBe("Нужен перенос.\nСейчас 35 тягачей.");
    expect(sent.interests).toEqual(["excel", "demo_access"]);
    expect(Object.keys(sent).sort()).toEqual([
      "attribution", "company", "consent_text", "consent_version", "country", "email", "fleet_bucket", "hp",
      "interests", "lang", "message", "name", "newsletter", "phone", "t_ms",
    ]);
  });
});

describe("demo-form: событие generate_lead", () => {
  it("lead_event_only_when_counted_with_id", () => {
    expect(leadEvent({ ok: true, id: "t-1", counted: true }, "20_50", "cs")).toEqual({
      event: "generate_lead",
      transaction_id: "t-1",
      fleet_bucket: "20_50",
      lang: "cs",
    });
    expect(leadEvent({ ok: true, id: null, counted: false }, "20_50", "cs")).toBeNull();
    expect(leadEvent({ ok: true, id: null, counted: true }, "20_50", "cs")).toBeNull();
    expect(leadEvent({ ok: false, error: "server" }, "20_50", "cs")).toBeNull();
  });

  it("lead_event_has_no_personal_keys", () => {
    const e = leadEvent({ ok: true, id: "t-1", counted: true }, "lt20", "en");
    expect(Object.keys(e ?? {}).sort()).toEqual(["event", "fleet_bucket", "lang", "transaction_id"]);
  });
});

describe("словарь страницы заявки ×12", () => {
  const enPaths = leaves(DEMO_DICT.en).map(([p]) => p).sort();

  it("dict_has_12_locales_same_shape", () => {
    expect(Object.keys(DEMO_DICT).sort()).toEqual([...LOCALES].sort());
    for (const l of LOCALES) {
      expect(leaves(DEMO_DICT[l]).map(([p]) => p).sort(), l).toEqual(enPaths);
      for (const [p, s] of leaves(DEMO_DICT[l])) expect(s.trim(), `${l}.${p}`).not.toBe("");
    }
  });

  it("dict_has_interest_and_message_keys", () => {
    const keys = ["interests", "interestExcel", "interestTelematics", "interestDemo", "message", "messagePlaceholder"] as const;
    for (const l of LOCALES) {
      for (const k of keys) expect(DEMO_DICT[l].fields[k].trim().length, `${l}.fields.${k}`).toBeGreaterThan(5);
      expect(DEMO_DICT[l].fields.interestExcel, l).toContain("Excel");
    }
  });

  // Г16: телематика — всегда с условием «если поддерживается», без названия поставщика
  it("interest_telematics_keeps_the_conditional_g16", () => {
    const conditional: Record<Lang, string> = {
      en: "if it is supported",
      ru: "если он поддерживается",
      uk: "якщо він підтримується",
      cs: "pokud je podporovaný",
      pl: "jeśli jest obsługiwany",
      de: "sofern er unterstützt wird",
      fr: "s’il est compatible",
      it: "se è supportato",
      lt: "Jei jūsų sekiklis palaikomas",
      lv: "Ja tavs izsekotājs tiek atbalstīts",
      es: "si es compatible",
      ro: "Dacă trackerul tău e compatibil",
    };
    expect(Object.keys(conditional).sort()).toEqual([...LOCALES].sort());
    for (const l of LOCALES) expect(DEMO_DICT[l].fields.interestTelematics, l).toContain(conditional[l]);
  });

  it("dict_strings_pass_banned", () => {
    for (const l of LOCALES) {
      for (const [p, s] of leaves(DEMO_DICT[l])) {
        expect(BANNED.test(s), `${l}.${p}: ${s}`).toBe(false);
        expect(aiPattern(l).test(s), `${l}.${p}: ${s}`).toBe(false);
      }
    }
  });

  it("dict_never_says_call_promise", () => {
    const call = /позвоним|зателефонуємо|zavoláme|zadzwonimy|we will call|we'll call|rufen wir|nous vous appel|vi chiamiamo|paskambinsime|piezvanīsim|le llamamos|vă sunăm/i;
    for (const l of LOCALES) for (const [p, s] of leaves(DEMO_DICT[l])) expect(call.test(s), `${l}.${p}`).toBe(false);
  });

  // Г40 (владелец 12.10): под кнопкой одна фраза со ссылкой на политику — без оператора, цели и срока
  it("gdpr_line_is_link_only", () => {
    for (const l of LOCALES) {
      const g = DEMO_DICT[l].gdpr;
      const s = g.before + g.link + g.after;
      expect(g.link.length, l).toBeGreaterThan(5);
      expect(s, l).not.toMatch(/G-Track Software|s\.r\.o\.|24/);
      expect(s.length, l).toBeLessThan(140);
    }
  });

  /* M2 (ревью безопасности 12.10): те же примеры, что в core.test.ts функции приёма — выражения совпадают */
  it("link_fields_match_server_spam_rule", () => {
    const at = (message: string, company = "Doprava s.r.o.", name = "Petr") => linkFields({ name, company, message });
    for (const s of ["see https://x.y", "HTTP://x.y", "ftp://x.y/a", "file:///c:/x", "smb://h/s", "\\\\host\\share", "< A href=x>", "[url=x]a[/url]"])
      expect(at(s), s).toEqual(["message"]);
    for (const s of ["www.firma.cz/stranka", "HTTP Logistik", "máme 3 auta", ""]) expect(at(s), s).toEqual([]);
    expect(at("", "<a href=x>F</a>", "[url]P")).toEqual(["name", "company"]);
  });

  it("link_hint_x12", () => {
    for (const l of LOCALES) {
      expect(DEMO_DICT[l].errors.link, l).toContain("https://");
      expect(DEMO_DICT[l].errors.link.length, l).toBeGreaterThan(20);
    }
  });

  // Г38 (владелец 12.10): о созвоне на русском страница не пишет ни на одном языке — только «отвечаем письменно».
  it("dict_never_mentions_russian_call", () => {
    const ru = /russ|ruštin|rusk|ruso|rusa|rusă|rusų|rosyjsk|krievu|російськ|русск/i;
    for (const l of LOCALES) for (const [p, s] of leaves(DEMO_DICT[l])) expect(ru.test(s), `${l}.${p}: ${s}`).toBe(false);
  });

  it("обещание «за рабочий день» (Г37) в en и ru", () => {
    expect(DEMO_DICT.en.next).toContain("one working day");
    expect(DEMO_DICT.ru.next).toContain("за рабочий день");
  });

  it("e-mail для связи в тексте ошибки сети — sales@", () => {
    for (const l of LOCALES) expect(DEMO_DICT[l].errors.network, l).toContain("sales@g-track.eu");
  });
});

describe("индексация /demo", () => {
  it("demo_metadata_noindex", () => {
    for (const l of LOCALES) {
      const m = demoMetadata(l);
      expect(m.robots, l).toMatchObject({ index: false, follow: true });
      expect(m.alternates?.canonical, l).toBe(`${SITE_ORIGIN}${demoPath(l)}`);
    }
  });

  it("sitemap_has_no_demo", async () => {
    const urls = (await sitemap()).map((e) => e.url);
    expect(urls.some((u) => /\/demo(?:$|[?#])/.test(u))).toBe(false);
  });

  it("llms_has_no_demo", () => {
    const txt = readFileSync(join(__dirname, "..", "public", "llms.txt"), "utf8");
    expect(txt.includes("/demo")).toBe(false);
  });
});
