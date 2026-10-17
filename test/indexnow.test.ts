import { describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import {
  ENDPOINT,
  HOST,
  MAX_URLS,
  buildPayload,
  findKey,
  keyLocation,
  parseSitemap,
} from "../scripts/indexnow.mjs";
import sitemap from "../src/app/sitemap";

/* ============================================================================
   IndexNow (GEO-аудит 18.10.2026, раздел 5 п. 3): ключ публичен по замыслу
   протокола, файл ключа лежит в public/, скрипт после выкатки сообщает Bing,
   Yandex, Seznam, Naver, Yep об обновлённых адресах. Сеть тест не трогает:
   сухой прогон читает локальный sitemap-файл и ничего не отправляет.
   Протокол — https://www.indexnow.org/documentation (ключ 8–128 знаков
   [A-Za-z0-9-], файл в корне хоста, до 10 000 адресов за запрос).
   ============================================================================ */

const PUBLIC_DIR = fileURLToPath(new URL("../public/", import.meta.url));
const SCRIPT = fileURLToPath(new URL("../scripts/indexnow.mjs", import.meta.url));
const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8")) as {
  scripts: Record<string, string>;
};

const SITEMAP_XML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.g-track.eu/</loc></url>
  <url><loc>https://www.g-track.eu/ru</loc></url>
  <url><loc>https://www.g-track.eu/cs?a=1&amp;b=2</loc></url>
  <url><loc>https://www.g-track.eu/ru</loc></url>
</urlset>`;

describe("IndexNow: файл ключа", () => {
  const keyFiles = readdirSync(PUBLIC_DIR).filter((f) => /^[0-9a-f]{32}\.txt$/.test(f));

  it("ровно один файл public/<32 hex>.txt, содержимое = имя, ключ подходит под протокол", () => {
    expect(keyFiles).toHaveLength(1);
    const key = keyFiles[0].replace(/\.txt$/, "");
    expect(readFileSync(`${PUBLIC_DIR}${keyFiles[0]}`, "utf8").trim()).toBe(key);
    expect(key).toMatch(/^[A-Za-z0-9-]{8,128}$/);
    expect(findKey()).toBe(key);
  });

  it("файл ключа не попадает в sitemap и не назван в llms.txt (это служебный файл)", () => {
    const key = findKey();
    const locs = sitemap().map((e) => e.url);
    expect(locs.some((u) => u.includes(key))).toBe(false);
    expect(readFileSync(`${PUBLIC_DIR}llms.txt`, "utf8")).not.toContain(key);
  });

  it("негативный контроль: пустая папка и несовпадение имени с содержимым — ошибка", () => {
    const empty = mkdtempSync(`${tmpdir()}/indexnow-empty-`);
    expect(() => findKey(empty)).toThrow(/ровно один файл ключа/);
    const bad = mkdtempSync(`${tmpdir()}/indexnow-bad-`);
    writeFileSync(`${bad}/${"a".repeat(32)}.txt`, "b".repeat(32));
    expect(() => findKey(bad)).toThrow(/не совпадает/);
  });
});

describe("IndexNow: тело запроса", () => {
  it("host, key, keyLocation, urlList — как в протоколе; хост — каноническое www", () => {
    expect(HOST).toBe("www.g-track.eu");
    expect(ENDPOINT).toBe("https://api.indexnow.org/indexnow");
    const key = findKey();
    const p = buildPayload({ key, urls: ["https://www.g-track.eu/", "https://www.g-track.eu/ru"] });
    expect(p).toEqual({
      host: "www.g-track.eu",
      key,
      keyLocation: `https://www.g-track.eu/${key}.txt`,
      urlList: ["https://www.g-track.eu/", "https://www.g-track.eu/ru"],
    });
    expect(keyLocation(key)).toBe(p.keyLocation);
  });

  it("sitemap: <loc> без повторов, &amp; раскрыт", () => {
    expect(parseSitemap(SITEMAP_XML)).toEqual([
      "https://www.g-track.eu/",
      "https://www.g-track.eu/ru",
      "https://www.g-track.eu/cs?a=1&b=2",
    ]);
  });

  it("настоящий sitemap сайта целиком проходит проверку хоста (36 страниц на www)", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls.length).toBeGreaterThanOrEqual(36);
    expect(() => buildPayload({ key: findKey(), urls })).not.toThrow();
    expect(urls.length).toBeLessThanOrEqual(MAX_URLS);
  });

  it("отказы: чужой хост, http, пустой список, больше 10 000, sitemap без <loc>", () => {
    const key = findKey();
    expect(() => buildPayload({ key, urls: ["https://app.g-track.eu/login"] })).toThrow(/не с https:\/\/www\.g-track\.eu/);
    expect(() => buildPayload({ key, urls: ["http://www.g-track.eu/"] })).toThrow();
    expect(() => buildPayload({ key, urls: ["not a url"] })).toThrow(/не адрес/);
    expect(() => buildPayload({ key, urls: [] })).toThrow(/пуст/);
    const many = Array.from({ length: MAX_URLS + 1 }, (_, i) => `https://www.g-track.eu/p${i}`);
    expect(() => buildPayload({ key, urls: many })).toThrow(/> 10000/);
    expect(() => parseSitemap("<urlset></urlset>")).toThrow(/ни одного/);
    expect(() => parseSitemap("<urlset><url><loc>https://example.com/</loc></url></urlset>")).toThrow(/не с https/);
  });
});

describe("IndexNow: запуск", () => {
  const run = (args: string[]) =>
    execFileSync(process.execPath, [SCRIPT, ...args], { encoding: "utf8", cwd: fileURLToPath(new URL("../", import.meta.url)) });

  it("сухой прогон по локальному sitemap печатает тело запроса и ничего не отправляет", () => {
    const dir = mkdtempSync(`${tmpdir()}/indexnow-sm-`);
    const file = `${dir}/sitemap.xml`;
    writeFileSync(file, SITEMAP_XML);
    const out = run(["--dry-run", "--sitemap", file]);
    expect(out).toContain("DRY RUN");
    const body = JSON.parse(out.slice(out.indexOf("{")));
    expect(body.host).toBe("www.g-track.eu");
    expect(body.key).toBe(findKey());
    expect(body.keyLocation).toBe(`https://www.g-track.eu/${findKey()}.txt`);
    expect(body.urlList).toHaveLength(3);
  });

  it("сухой прогон с явным --url не ходит ни за sitemap, ни в сеть", () => {
    const out = run(["--dry-run", "--url", "https://www.g-track.eu/ru", "--url", "https://www.g-track.eu/cs"]);
    expect(JSON.parse(out.slice(out.indexOf("{"))).urlList).toEqual(["https://www.g-track.eu/ru", "https://www.g-track.eu/cs"]);
  });

  it("неизвестный параметр и чужой хост — код выхода 1, до сети дело не доходит", () => {
    expect(() => run(["--dry-run", "--nope"])).toThrow();
    expect(() => run(["--dry-run", "--url", "https://example.com/"])).toThrow();
  });

  it("в package.json: indexnow и indexnow:dry есть, а сборка скрипт НЕ вызывает", () => {
    expect(pkg.scripts.indexnow).toBe("node scripts/indexnow.mjs");
    expect(pkg.scripts["indexnow:dry"]).toBe("node scripts/indexnow.mjs --dry-run");
    for (const name of ["build", "start", "test", "lint"]) expect(pkg.scripts[name], name).not.toMatch(/indexnow/);
  });

  it("в скрипте нет секретов и нет вызова API вне main()", () => {
    const src = readFileSync(SCRIPT, "utf8");
    expect(src).not.toMatch(/process\.env/);
    // fetch только внутри main/readText; на уровне модуля (при импорте) сети нет
    const topLevel = src.split("\n").filter((l) => /^\s{0,0}(await\s+)?fetch\(/.test(l));
    expect(topLevel).toHaveLength(0);
  });
});
