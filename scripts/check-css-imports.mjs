// Сторож сборки: каждый файл из `@import` в src/styles/landing/index.css обязан дойти
// до итогового CSS в .next/static. Запускается после `next build` (package.json, "build"):
// красный выход роняет сборку на Vercel, и CSS без файла не уезжает на прод.
// Причина (12.10): превью ворот 1 на Vercel собралось из восстановленного кеша Turbopack
// без двух новых файлов из @import (hero-scenes.css, legal.css) — hero и юр-страницы
// без стилей, при зелёных тестах и зелёной локальной сборке.
// Проверка: доля имён классов файла, найденных в итоговом CSS, — не ниже порога.
// Выпавший файл даёт 0 %; порог ниже 100 %, потому что минификатор вправе выбросить
// пустое правило. Каталог CSS можно подменить: CSS_DIR=… node scripts/check-css-imports.mjs
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const INDEX = join(ROOT, "src/styles/landing/index.css");
const CSS_DIR = process.env.CSS_DIR || join(ROOT, ".next/static");
const MIN_SHARE = 0.9;

const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "");

function imports() {
  const src = stripComments(readFileSync(INDEX, "utf8"));
  return [...src.matchAll(/@import\s+"\.\/([^"]+\.css)"/g)].map((m) => m[1]);
}

function classNames(file) {
  const src = stripComments(readFileSync(join(dirname(INDEX), file), "utf8"))
    .replace(/url\([^)]*\)/g, "")
    .replace(/"[^"]*"|'[^']*'/g, "");
  return [...new Set([...src.matchAll(/\.(-?[a-zA-Z_][\w-]*)/g)].map((m) => m[1]))];
}

function builtCss(dir) {
  let out = "";
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out += builtCss(p);
    else if (name.endsWith(".css")) out += readFileSync(p, "utf8");
  }
  return out;
}

const css = builtCss(CSS_DIR);
if (!css) {
  console.error(`check-css-imports: в ${CSS_DIR} нет ни одного .css`);
  process.exit(1);
}
const has = (cls) => new RegExp(`\\.${cls.replace(/[-]/g, "\\-")}(?![\\w-])`).test(css);

let failed = false;
for (const file of imports()) {
  const names = classNames(file);
  if (names.length === 0) continue;
  const found = names.filter(has);
  const share = found.length / names.length;
  const ok = share >= MIN_SHARE;
  if (!ok) failed = true;
  const missing = ok ? "" : ` — нет, например: ${names.filter((n) => !has(n)).slice(0, 5).join(", ")}`;
  console.log(`${ok ? "ok  " : "FAIL"} ${file}: ${found.length}/${names.length} классов (${Math.round(share * 100)} %)${missing}`);
}
if (failed) {
  console.error("check-css-imports: файл из @import не дошёл до итогового CSS — сборка остановлена.");
  process.exit(1);
}
