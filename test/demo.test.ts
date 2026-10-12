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
  NEWSLETTER_CONSENT_VERSION,
  attributionFromSearch,
  buildDemoPayload,
  leadEvent,
  type DemoFormInput,
} from "../src/lib/demo-form";
import { DEMO_DICT } from "../src/lib/demo-page";
import { LOCALES, demoPath } from "../src/lib/landing-i18n";
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
