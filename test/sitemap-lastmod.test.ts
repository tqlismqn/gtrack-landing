import { describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sitemap from "../src/app/sitemap";
import {
  CONTENT_SOURCES,
  CONTENT_UPDATED_AT,
  type ContentPage,
} from "../src/lib/content-dates";
import { SITE_ALTERNATE_NAMES, SITE_ORIGIN } from "../src/lib/landing-metadata";

/* <lastmod> в sitemap (Г174, 22.10.2026): дата последнего изменения страницы, не дата
   сборки. Google берёт lastmod, только если он стабильно и проверяемо точен — поэтому
   сторож сверяет даты из content-dates.ts с историей git. */

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PAGES: ContentPage[] = ["home", "roadmap", "impressum"];
/* PR сливают позже, чем собирают: дата коммита слияния = день выкатки и может уйти вперёд */
const MERGE_SLACK_DAYS = 3;

/* Вид страницы по адресу — литералами путей, не функциями кода */
function pageOf(url: string): ContentPage {
  const path = url.slice(SITE_ORIGIN.length);
  if (/(^|\/)roadmap$/.test(path)) return "roadmap";
  if (/(^|\/)impressum$/.test(path)) return "impressum";
  return "home";
}

function git(args: string[]): string {
  return execFileSync("git", ["-C", ROOT, ...args], { encoding: "utf8" }).trim();
}

/* Сторож работает только на полной истории: в мелком клоне `git log -- путь`
   отвечает последним доступным коммитом, а не настоящим */
function fullHistory(): boolean {
  try {
    return git(["rev-parse", "--is-shallow-repository"]) === "false";
  } catch {
    return false;
  }
}
const HAS_HISTORY = fullHistory();

function daysBefore(isoDate: string, days: number): string {
  const t = Date.parse(`${isoDate}T00:00:00Z`) - days * 86_400_000;
  return new Date(t).toISOString().slice(0, 10);
}

/* Дата устарела, если текст страницы менялся позже неё (с допуском на слияние) */
function isStale(date: string, lastSourceChange: string): boolean {
  return date < daysBefore(lastSourceChange, MERGE_SLACK_DAYS);
}

function lastChange(paths: readonly string[]): { sha: string; date: string } {
  const out = git(["log", "-1", "--format=%H %cs", "--", ...paths]);
  const [sha, date] = out.split(" ");
  return { sha, date };
}

describe("sitemap: lastmod у каждого адреса", () => {
  const entries = sitemap();

  it("36 адресов: главная, /roadmap и /impressum × 12 локалей", () => {
    expect(entries).toHaveLength(36);
    for (const page of PAGES) {
      expect(entries.filter((e) => pageOf(e.url) === page)).toHaveLength(12);
    }
  });

  it("у адреса — дата своей страницы из content-dates.ts", () => {
    for (const e of entries) {
      expect(e.lastModified, e.url).toBe(CONTENT_UPDATED_AT[pageOf(e.url)]);
    }
  });

  it("даты — настоящие дни в формате ГГГГ-ММ-ДД и не из будущего", () => {
    const tomorrow = new Date(Date.now() + 86_400_000).toISOString().slice(0, 10);
    for (const page of PAGES) {
      const d = CONTENT_UPDATED_AT[page];
      expect(d, page).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(new Date(`${d}T00:00:00Z`).toISOString().slice(0, 10), page).toBe(d);
      expect(d <= tomorrow, `${page}: ${d}`).toBe(true);
    }
  });

  it("у каждой страницы есть файлы-источники, и все они существуют в репозитории", () => {
    for (const page of PAGES) {
      expect(CONTENT_SOURCES[page].length, page).toBeGreaterThan(0);
      for (const p of CONTENT_SOURCES[page]) {
        expect(existsSync(`${ROOT}${p}`), p).toBe(true);
      }
    }
  });
});

describe.skipIf(!HAS_HISTORY)("сторож дат по git (только на полной истории)", () => {
  it("дата страницы не старше последнего коммита в её источниках", () => {
    for (const page of PAGES) {
      const { date } = lastChange(CONTENT_SOURCES[page]);
      expect(
        isStale(CONTENT_UPDATED_AT[page], date),
        `${page}: дата ${CONTENT_UPDATED_AT[page]}, источники менялись ${date} — подними дату в content-dates.ts`,
      ).toBe(false);
    }
  });

  it("content-dates.ts правился в том же коммите, что и источники, или позже", () => {
    const dates = lastChange(["src/lib/content-dates.ts"]);
    /* файл ещё не закоммичен (рабочая копия) — сравнивать не с чем */
    if (!dates.sha) return;
    for (const page of PAGES) {
      const { sha } = lastChange(CONTENT_SOURCES[page]);
      expect(() => git(["merge-base", "--is-ancestor", sha, dates.sha]), page).not.toThrow();
    }
  });

  it("проба краснеет: дата 01.01.2026 для главной — устаревшая", () => {
    const { date } = lastChange(CONTENT_SOURCES.home);
    expect(isStale("2026-01-01", date)).toBe(true);
    expect(isStale(date, date)).toBe(false);
  });
});

describe("WebSite.alternateName", () => {
  it("запасные имена: «G-Track TMS», последним — домен строчными (справка Google site-names)", () => {
    expect([...SITE_ALTERNATE_NAMES]).toEqual(["G-Track TMS", "g-track.eu"]);
    expect(SITE_ALTERNATE_NAMES.at(-1)).toBe(new URL(SITE_ORIGIN).hostname.replace(/^www\./, ""));
  });

  it("JsonLd.tsx кладёт их в узел WebSite", () => {
    const src = readFileSync(`${ROOT}src/components/landing/JsonLd.tsx`, "utf8");
    const website = src.slice(src.indexOf('"@type": "WebSite"'), src.indexOf('"@type": "SoftwareApplication"'));
    expect(website).toContain("alternateName: [...SITE_ALTERNATE_NAMES]");
  });
});
