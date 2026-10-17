#!/usr/bin/env node
/* ============================================================================
   IndexNow: сообщить Bing, Yandex, Seznam, Naver и Yep, что страницы www
   обновились. Запускается ВРУЧНУЮ после выкатки в прод (GEO-аудит 18.10.2026,
   раздел 5 п. 3); из сборки и из CI не вызывается — сборка не должна ходить
   в сеть к поисковикам.

   Ключ IndexNow публичен по замыслу протокола: поисковик скачивает
   https://www.g-track.eu/<ключ>.txt и сверяет содержимое. Секретов в
   репозитории нет. Ключ — единственный файл `public/<32 hex>.txt`, имя файла
   и его содержимое совпадают; смена ключа = заменить файл, скрипт найдёт новый.
   Протокол: https://www.indexnow.org/documentation (проверено 18.10.2026:
   ключ 8–128 знаков [A-Za-z0-9-], файл в корне хоста, до 10 000 адресов
   в одном POST, 200/202 — принято, 403 — ключ не найден, 422 — адреса не
   с этого хоста).

   Использование:
     npm run indexnow:dry                  показать тело запроса, ничего не отправлять
     npm run indexnow                      проверить ключ на живом сайте и отправить все
                                           адреса из https://www.g-track.eu/sitemap.xml
     node scripts/indexnow.mjs --url https://www.g-track.eu/ru --url https://www.g-track.eu/cs
                                           отправить только перечисленные адреса
     node scripts/indexnow.mjs --sitemap ./sitemap.xml --dry-run
                                           взять адреса из локального файла (или другого URL)
   Код выхода: 0 — принято (или сухой прогон), 1 — отказ, ошибка сети или данных.
   Не гонять повторно в тот же день без правок страниц: IndexNow отвечает 429 на частые повторы
   одних и тех же адресов.
   ============================================================================ */

import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

export const HOST = "www.g-track.eu";
export const ENDPOINT = "https://api.indexnow.org/indexnow";
export const DEFAULT_SITEMAP = `https://${HOST}/sitemap.xml`;
export const MAX_URLS = 10000;
/* что значит отказ (протокол, проверено 18.10.2026) */
const REFUSAL_HINTS = {
  403: "403 — ключ не отдаётся на проде (файл не выкачен или содержимое не совпадает с ключом)",
  422: "422 — адрес не с www.g-track.eu или ключ не по схеме протокола",
  429: "429 — слишком часто: тот же адрес повторяли много раз за день",
};
const PUBLIC_DIR = new URL("../public/", import.meta.url);
const KEY_FILE_RE = /^[0-9a-f]{32}\.txt$/;

/**
 * Ключ из единственного `public/<32 hex>.txt`; имя и содержимое обязаны совпасть.
 * @param {string | URL} [publicDir] папка с файлом ключа (по умолчанию `public/` репозитория)
 * @returns {string}
 */
export function findKey(publicDir = PUBLIC_DIR) {
  const dir = typeof publicDir === "string" ? publicDir : fileURLToPath(publicDir);
  const files = readdirSync(dir).filter((f) => KEY_FILE_RE.test(f));
  if (files.length !== 1) {
    throw new Error(`в ${dir} должен лежать ровно один файл ключа <32 hex>.txt, найдено: ${files.length}`);
  }
  const key = files[0].slice(0, -".txt".length);
  const body = readFileSync(`${dir.replace(/\/$/, "")}/${files[0]}`, "utf8");
  if (body.trim() !== key) throw new Error(`содержимое ${files[0]} не совпадает с его именем`);
  return key;
}

/**
 * Адреса `<loc>` из sitemap.xml (без повторов, &amp; раскрыт); чужой хост — ошибка: IndexNow ответит 422 на всю пачку.
 * @param {string} xml
 * @returns {string[]}
 */
export function parseSitemap(xml) {
  const urls = [];
  for (const m of xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)) {
    const u = m[1].replace(/&amp;/g, "&");
    if (!urls.includes(u)) urls.push(u);
  }
  if (urls.length === 0) throw new Error("в sitemap нет ни одного <loc>");
  assertOwnHost(urls);
  return urls;
}

/** @param {string[]} urls */
export function assertOwnHost(urls) {
  for (const u of urls) {
    let parsed;
    try {
      parsed = new URL(u);
    } catch {
      throw new Error(`не адрес: ${u}`);
    }
    if (parsed.protocol !== "https:" || parsed.host !== HOST) throw new Error(`адрес не с https://${HOST}: ${u}`);
  }
}

/** @param {string} key */
export function keyLocation(key) {
  return `https://${HOST}/${key}.txt`;
}

/**
 * Тело POST по протоколу IndexNow.
 * @param {{ key: string, urls: string[] }} args
 */
export function buildPayload({ key, urls }) {
  if (urls.length === 0) throw new Error("список адресов пуст");
  if (urls.length > MAX_URLS) throw new Error(`адресов ${urls.length} > ${MAX_URLS}: разбить на несколько запросов`);
  assertOwnHost(urls);
  return { host: HOST, key, keyLocation: keyLocation(key), urlList: urls };
}

/**
 * Строки для stderr при отказе: тело ответа (если есть) и что означает код.
 * @param {number} status
 * @param {string} body
 * @returns {string[]}
 */
export function explainRefusal(status, body) {
  if (status < 400) return [];
  const lines = [];
  if (body.trim()) lines.push(body.trim());
  const hint = /** @type {Record<number, string>} */ (REFUSAL_HINTS)[status];
  if (hint) lines.push(hint);
  return lines;
}

function parseArgs(argv) {
  const opts = { dryRun: false, sitemap: DEFAULT_SITEMAP, urls: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") opts.dryRun = true;
    else if (a === "--sitemap") opts.sitemap = argv[++i];
    else if (a === "--url") opts.urls.push(argv[++i]);
    else throw new Error(`неизвестный параметр: ${a}`);
  }
  return opts;
}

async function readText(source) {
  if (/^https?:\/\//.test(source)) {
    const res = await fetch(source);
    if (!res.ok) throw new Error(`${source} → HTTP ${res.status}`);
    return res.text();
  }
  return readFileSync(source, "utf8");
}

export async function main(argv) {
  const opts = parseArgs(argv);
  const key = findKey();
  const urls = opts.urls.length > 0 ? opts.urls : parseSitemap(await readText(opts.sitemap));
  const payload = buildPayload({ key, urls });

  if (opts.dryRun) {
    console.log(`DRY RUN — POST ${ENDPOINT}, ничего не отправлено`);
    console.log(JSON.stringify(payload, null, 2));
    return 0;
  }

  /* ключ должен уже отвечать на проде: иначе поисковик вернёт 403 и пачка потеряна */
  const live = await fetch(payload.keyLocation, { redirect: "manual" });
  const liveBody = live.ok ? (await live.text()).trim() : "";
  if (liveBody !== key) {
    console.error(`ключ ещё не доступен на ${payload.keyLocation} (HTTP ${live.status}) — сначала выкатка в прод`);
    return 1;
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  console.log(`IndexNow: ${urls.length} адресов → HTTP ${res.status}`);
  if (res.status >= 400) {
    for (const line of explainRefusal(res.status, await res.text())) console.error(line);
  }
  return res.status === 200 || res.status === 202 ? 0 : 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main(process.argv.slice(2)).then(
    (code) => process.exit(code),
    (err) => {
      console.error(`indexnow: ${err.message}`);
      process.exit(1);
    },
  );
}
