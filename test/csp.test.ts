import { describe, expect, it } from "vitest";
import nextConfig, { CSP_REPORT_ONLY } from "../next.config";

/* Разбор строки CSP в Map<директива, Set<источник>>. */
function parse(csp: string): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>();
  for (const part of csp.split(";")) {
    const [name, ...sources] = part.trim().split(/\s+/);
    if (name) map.set(name, new Set(sources));
  }
  return map;
}

const NEED: Record<string, string[]> = {
  "script-src": [
    "https://connect.facebook.net",
    "https://www.googletagmanager.com",
    "https://www.googleadservices.com",
    "https://www.google.com",
  ],
  "img-src": [
    "https://www.facebook.com",
    "https://www.google.com",
    "https://www.googleadservices.com",
    "https://googleads.g.doubleclick.net",
  ],
  "connect-src": [
    "https://connect.facebook.net",
    "https://www.facebook.com",
    "https://www.google.com",
    "https://www.googleadservices.com",
    "https://googleads.g.doubleclick.net",
    "https://qawvvbjmfimpyilaqsrj.supabase.co",
  ],
  "frame-src": ["https://www.googletagmanager.com", "https://td.doubleclick.net", "https://www.facebook.com"],
  /* длинное событие пикселя fbevents.js шлёт POST-формой на www.facebook.com/tr/ (next.config.ts) */
  "form-action": ["https://www.facebook.com"],
};

describe("CSP Report-Only", () => {
  const csp = parse(CSP_REPORT_ONLY);

  it.each(Object.entries(NEED))("%s содержит нужные хосты", (dir, hosts) => {
    const set = csp.get(dir);
    expect(set, `директива ${dir} есть`).toBeDefined();
    for (const host of hosts) expect(set!.has(host), `${dir} ∋ ${host}`).toBe(true);
  });

  it("без широких дыр", () => {
    for (const [dir, set] of csp) {
      for (const src of set) {
        expect(src, `${dir}: голая *`).not.toBe("*");
        /* источник из одной схемы («https:») пускает любой хост этой схемы */
        if (src !== "data:") expect(src, `${dir}: только схема`).not.toMatch(/^[a-z][a-z0-9+.-]*:$/);
        expect(src, `${dir}: *.supabase.co`).not.toMatch(/\*\.supabase\.co$/);
        /* «gtm.js просит 'unsafe-eval' — осознанно не даём» (next.config.ts); в цикле — чтобы
           не прошло и через default-src / script-src-elem */
        expect(src, `${dir}: 'unsafe-eval'`).not.toBe("'unsafe-eval'");
      }
    }
    /* только свой хост и точный адрес формы пикселя, без *.facebook.com */
    expect([...csp.get("form-action")!]).toEqual(["'self'", "https://www.facebook.com"]);
  });

  it("заголовок остаётся Report-Only", async () => {
    const rules = await nextConfig.headers!();
    /* имена заголовков HTTP не зависят от регистра — сравниваем в нижнем */
    const keys = rules.flatMap((r) => r.headers.map((h) => h.key.toLowerCase()));
    expect(keys).toContain("content-security-policy-report-only");
    expect(keys).not.toContain("content-security-policy");
  });
});
