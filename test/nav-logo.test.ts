import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/* Лого шапки этапа 2 (Г50, 13.10): NavLogo.tsx + base.css (покой, рамка
   клипа) + fx.css §4 (проход). Связи между тремя файлами — отношения, а не
   значения: правка одного без другого ломает шапку молча (ни сборка, ни
   линтер кадр анимации не видят), поэтому сторожим отношения по исходникам. */

const LOGO_TSX = readFileSync(new URL("../src/components/landing/NavLogo.tsx", import.meta.url), "utf8");
const NAV_TSX = readFileSync(new URL("../src/components/landing/Nav.tsx", import.meta.url), "utf8");
const BASE_CSS = readFileSync(new URL("../src/styles/landing/base.css", import.meta.url), "utf8");
const FX_CSS = readFileSync(new URL("../src/styles/landing/fx.css", import.meta.url), "utf8");
const MOBILE_CSS = readFileSync(new URL("../src/styles/landing/mobile.css", import.meta.url), "utf8");

/* тело правила, чей селектор — ровно этот (сразу после «}» или начала файла;
   `.nav .gth-svg` не совпадёт с `.gth-svg`), без комментариев */
function rule(css: string, selector: string): string {
  const plain = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const esc = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const m = plain.match(new RegExp(`(?:^|\\})\\s*${esc}\\s*\\{([^}]*)\\}`));
  if (!m) throw new Error(`нет правила ${selector}`);
  return m[1];
}

function decl(body: string, prop: string): string {
  const m = body.match(new RegExp(`(?:^|;|\\s)${prop}\\s*:\\s*([^;]+)`));
  if (!m) throw new Error(`нет свойства ${prop}`);
  return m[1].trim();
}

const em = (v: string): number => {
  const m = v.match(/^([\d.]+)em$/);
  if (!m) throw new Error(`ожидалось значение в em: ${v}`);
  return Number(m[1]);
};

const seconds = (v: string): number => {
  const m = v.match(/([\d.]+)(m?s)\b/);
  if (!m) throw new Error(`нет длительности: ${v}`);
  return m[2] === "ms" ? Number(m[1]) / 1000 : Number(m[1]);
};

describe("лого шапки: разметка", () => {
  it("Nav рендерит NavLogo, прежнего .wm-морфа нет", () => {
    expect(NAV_TSX).toContain("<NavLogo />");
    expect(NAV_TSX).not.toMatch(/className="wm\b|wmRef|morph\(/);
  });

  it("SVG — картинка с именем «G-Track»; TMS — HTML-бейдж, не часть SVG", () => {
    expect(LOGO_TSX).toMatch(/<svg className="gth-svg"[^>]*role="img"[^>]*aria-label="G-Track"/);
    expect(LOGO_TSX).not.toContain("gth-chip");
    const svgEnd = LOGO_TSX.indexOf("</svg>");
    expect(LOGO_TSX.indexOf('<span className="logo-tms">TMS</span>')).toBeGreaterThan(svgEnd);
  });

  it("режим движения — только от MotionRoot: своего matchMedia нет", () => {
    expect(LOGO_TSX.replace(/\/\*[\s\S]*?\*\//g, "")).not.toContain("matchMedia");
    expect(LOGO_TSX).toContain('classList.contains("motion-ok")');
    expect(LOGO_TSX).toContain('"gt-motion-applied"');
  });
});

describe("лого шапки: геометрия", () => {
  const vb = LOGO_TSX.match(/<svg className="gth-svg" viewBox="(-?[\d.]+) (-?[\d.]+) ([\d.]+) ([\d.]+)"/);
  if (!vb) throw new Error("нет viewBox у .gth-svg");
  const [minY, w, h] = [Number(vb[2]), Number(vb[3]), Number(vb[4])];

  it("aspect-ratio .gth-svg = пропорция viewBox", () => {
    expect(decl(rule(BASE_CSS, ".gth-svg"), "aspect-ratio")).toBe(`${w} / ${h}`);
  });

  it("высота SVG и рамка клипа шапки — одна переменная --gth-h", () => {
    expect(decl(rule(BASE_CSS, ".gth-svg"), "height")).toMatch(/^var\(--gth-h\b/);
    expect(decl(rule(BASE_CSS, ".nav .logo"), "max-height")).toBe("var(--gth-h)");
  });

  it("знак GT (32 ед. viewBox) в каждом размере --gth-h — в диапазоне брифа 24–40 px", () => {
    const sizes = [BASE_CSS, MOBILE_CSS].flatMap((css) =>
      [...css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/--gth-h:\s*([\d.]+)px/g)].map((m) => Number(m[1])),
    );
    expect(sizes).toEqual([40, 32.5]);
    for (const hPx of sizes) {
      const mark = (32 * hPx) / h;
      expect(mark).toBeGreaterThanOrEqual(24);
      expect(mark).toBeLessThanOrEqual(40);
    }
  });

  it("поле клипа меньше зазора строки — перенесённый бейдж не выглядывает", () => {
    const body = rule(BASE_CSS, ".nav .logo");
    expect(em(decl(body, "overflow-clip-margin"))).toBeLessThan(em(decl(body, "row-gap")));
    expect(decl(body, "overflow")).toBe("visible clip");
  });

  it("пробег грузовика: исходник этапа 2 на десктопе; на телефоне гаснет у начала плашки TMS", () => {
    const desk = rule(BASE_CSS, ".gth-truck");
    expect(decl(desk, "--x0")).toBe("-25.58px");
    expect(decl(desk, "--x1")).toBe("120.42px");
    expect(LOGO_TSX.replace(/\/\*[\s\S]*?\*\//g, "")).not.toMatch(/--x[01]/);
    const phoneX1 = Number(decl(rule(MOBILE_CSS, ".nav .gth-truck"), "--x1").replace("px", ""));
    // грузовик 43,6 ед.; плашка начинается через зазор 8 px после правого края SVG
    expect(phoneX1 + 43.6).toBeLessThanOrEqual(w + 8);
  });

  it("бокс симметричен вокруг оси знака (y = 16) — бейдж по центру встаёт на ось", () => {
    expect(minY + h / 2).toBe(16);
  });

  it("полоса грузовика внутри бокса SVG — клип шапки её не режет", () => {
    const t = LOGO_TSX.match(/<g transform="translate\(0 ([\d.]+)\) scale\(([\d.]+)\)">/);
    if (!t) throw new Error("нет группы грузовика");
    expect(Number(t[1])).toBeLessThan(minY + h);
    expect(Number(t[1])).toBeGreaterThan(minY);
  });
});

describe("лого шапки: проход", () => {
  const plainFx = FX_CSS.replace(/\/\*[\s\S]*?\*\//g, "");

  it("анимации прохода только под html.motion-ok", () => {
    const selectors = [...plainFx.matchAll(/([^{}]*\.gth\.is-playing[^{}]*)\{/g)].map((m) => m[1].trim());
    expect(selectors).toHaveLength(3);
    for (const s of selectors) expect(s.startsWith("html.motion-ok ")).toBe(true);
  });

  it("конец прохода = конец самой длинной анимации, и это gth-a", () => {
    const end = LOGO_TSX.match(/NAV_LOGO_RUN_END = "([\w-]+)"/);
    expect(end?.[1]).toBe("gth-a");
    const runs = Object.fromEntries(
      ["gth-truck", "gth-a", "gth-u"].map((cls) => {
        const anim = decl(rule(FX_CSS, `html.motion-ok .gth.is-playing .${cls}`), "animation");
        return [anim.split(/\s+/)[0], seconds(anim)];
      }),
    );
    expect(Object.keys(runs).sort()).toEqual(["gth-a", "gth-drive", "gth-u"]);
    expect(runs["gth-a"]).toBe(Math.max(...Object.values(runs)));
    for (const name of Object.keys(runs)) expect(plainFx).toContain(`@keyframes ${name} {`);
  });
});
