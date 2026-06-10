"use client";

/* ============================================================================
   Порт landing/landing.js — глобальный motion-контроллер лендинга.
   - html.motion-ok гейтит ВСЮ анимацию; без него всё статично и видимо.
   - reveal / count-up — rAF/scroll-проверки (надёжно в headless/iframe);
     правило «не прятать above-the-fold» + committed-фиксация конечного
     состояния (см. оригинальные комментарии).
   - pain-collage --decay, nav .scrolled, прокси на window.__gtScrolly.
   Pricing-переключатель из landing.js живёт в Pricing.tsx (React-state).
   Монтируется ПОСЛЕДНИМ на странице: к моменту его эффекта секции уже
   подписались на 'gt-motion-applied' и выставили window.__gtScrolly.
   ============================================================================ */

import { useEffect } from "react";
import { formatNum } from "@/lib/landing-i18n";

declare global {
  interface Window {
    __gtScrolly?: () => void;
  }
}

export function MotionRoot() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timeouts = new Set<number>();
    let disposed = false;

    function later(fn: () => void, ms: number) {
      const id = window.setTimeout(() => {
        timeouts.delete(id);
        if (!disposed) fn();
      }, ms);
      timeouts.add(id);
    }

    function motionAllowed() {
      return !reduceMQ.matches && !root.classList.contains("rm-sim");
    }

    /* ---- viewport test ---- */
    function topVisible(el: Element, frac: number) {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || root.clientHeight;
      return r.top < vh * frac && r.bottom > 0;
    }
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

    /* ---- reveals ---- */
    let reveals: Element[] = [];
    function checkReveals() {
      if (!reveals.length) return;
      const still: Element[] = [];
      reveals.forEach((el) => {
        if (topVisible(el, 0.92)) {
          const delay = parseInt(el.getAttribute("data-delay") || "0", 10);
          later(() => {
            el.classList.add("is-in");
            /* commit: гарантируем конечное состояние даже при замороженном рендере */
            later(() => el.classList.add("committed"), 780);
          }, delay);
        } else still.push(el);
      });
      reveals = still;
    }
    function armReveals() {
      reveals = Array.prototype.slice.call(
        document.querySelectorAll(".reveal:not(.is-in)"),
      );
      checkReveals();
    }
    function revealAllNow() {
      document.querySelectorAll(".reveal").forEach((el) => {
        el.classList.add("is-in");
        el.classList.add("committed");
      });
      reveals = [];
    }

    /* ---- count-up (once, expo-out). Финальные значения уже в разметке. ---- */
    let counters: Element[] = [];
    function runCountUp(el: Element) {
      const target = parseInt(el.getAttribute("data-target") || "0", 10);
      const numEl = el.querySelector(".cnum") || el;
      const dur = 1400;
      let start: number | null = null;
      requestAnimationFrame(function step(ts: number) {
        if (disposed) return;
        if (start === null) start = ts;
        const p = clamp((ts - start) / dur, 0, 1);
        numEl.textContent = formatNum(Math.round(target * easeOutExpo(p)));
        if (p < 1) requestAnimationFrame(step);
        else numEl.textContent = formatNum(target);
      });
    }
    function checkCounters() {
      if (!counters.length) return;
      const still: Element[] = [];
      counters.forEach((el) => {
        if (topVisible(el, 0.88)) {
          el.classList.add("counted");
          runCountUp(el);
        } else still.push(el);
      });
      counters = still;
    }
    function armCounters() {
      counters = Array.prototype.slice.call(
        document.querySelectorAll("[data-target]:not(.counted)"),
      );
      checkCounters();
    }

    /* ---- pain collage decay ---- */
    let collage: HTMLElement | null = null;
    function updateCollage() {
      if (!collage) return;
      const r = collage.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = clamp((vh * 0.86 - r.top) / (vh * 0.95), 0, 1);
      collage.style.setProperty("--decay", p.toFixed(4));
    }

    /* ---- nav ---- */
    const nav = document.querySelector(".nav");
    function updateNav() {
      if (!nav) return;
      nav.classList.toggle("scrolled", (window.scrollY || 0) > 12);
    }

    /* ---- scroll loop: синхронно (без rAF) — дёшево и надёжно даже при
       замороженном rAF в троттленных iframe ---- */
    function onScroll() {
      if (!root.classList.contains("motion-ok")) {
        updateNav();
        return;
      }
      checkReveals();
      checkCounters();
      updateCollage();
      updateNav();
      if (window.__gtScrolly) window.__gtScrolly();
    }

    /* ---- motion mode switch ---- */
    let booted = false;
    function applyMotionMode() {
      const ok = motionAllowed();
      root.classList.toggle("motion-ok", ok);
      if (ok) {
        if (booted) {
          /* re-enabling after load: ничего не прячем задним числом */
          revealAllNow();
        } else {
          armReveals();
          armCounters();
        }
        collage = document.querySelector<HTMLElement>(".pain-collage");
        if (collage) collage.style.removeProperty("--decay");
        updateCollage();
      } else {
        revealAllNow();
        collage = document.querySelector<HTMLElement>(".pain-collage");
        if (collage) collage.style.removeProperty("--decay"); /* CSS static fallback = 0.78 */
      }
      updateNav();
      window.dispatchEvent(new CustomEvent("gt-motion-applied", { detail: { ok } }));
      booted = true;
    }

    reduceMQ.addEventListener("change", applyMotionMode);
    window.addEventListener("gt-motion-change", applyMotionMode);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    /* ---- boot ---- */
    applyMotionMode();
    updateNav();
    onScroll();
    /* поздняя страховка: всё, что так и не открылось (нестандартные вьюпорты) */
    later(() => {
      if (root.classList.contains("motion-ok")) {
        checkReveals();
        checkCounters();
      }
    }, 300);

    return () => {
      disposed = true;
      timeouts.forEach((id) => clearTimeout(id));
      timeouts.clear();
      reduceMQ.removeEventListener("change", applyMotionMode);
      window.removeEventListener("gt-motion-change", applyMotionMode);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      root.classList.remove("motion-ok");
    };
  }, []);

  return null;
}
