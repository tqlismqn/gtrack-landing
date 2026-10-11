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
  "script-src": ["https://connect.facebook.net", "https://www.googletagmanager.com"],
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
  "frame-src": ["https://www.googletagmanager.com", "https://td.doubleclick.net"],
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
      expect(set.has("*"), `${dir} без *`).toBe(false);
      expect(set.has("https://*.supabase.co"), `${dir} без *.supabase.co`).toBe(false);
    }
    expect([...csp.get("form-action")!]).toEqual(["'self'"]);
  });

  it("заголовок остаётся Report-Only", async () => {
    const rules = await nextConfig.headers!();
    const keys = rules[0].headers.map((h) => h.key);
    expect(keys).toContain("Content-Security-Policy-Report-Only");
    expect(keys).not.toContain("Content-Security-Policy");
  });
});
