"use client";

/* ============================================================================
   viewport-media — ленивое включение тяжёлого медиа.

   Выставляет наружу ровно один булев ответ: «элемент сейчас в зоне видимости
   (с учётом запаса rootMargin)». Детали IntersectionObserver и поведение
   браузера без него спрятаны здесь.

   Фоллбэк без IntersectionObserver — намеренно `false`: тяжёлое медиа тогда
   не грузится вообще, и пользователь видит постер, а не пустоту и не 2,4 МБ,
   скачанных вслепую.

   Ответ живой: гаснет, когда элемент уходит из зоны. Защёлка «загрузить один
   раз» намеренно НЕ живёт здесь — она обычно нужна не на голом попадании
   во вьюпорт, а на совпадении нескольких условий (у видео это «близко И
   движение разрешено»), и потому собирается на стороне вызывающего.
   ============================================================================ */

import { useEffect, useState, type RefObject } from "react";

export interface InViewportOptions {
  /** Запас вокруг вьюпорта, синтаксис CSS-margin. Например "600px 0px" — сработает
   *  за 600 px до появления элемента. По умолчанию "0px". */
  rootMargin?: string;
}

/**
 * Следит, находится ли элемент в зоне видимости.
 *
 * @param ref  ссылка на наблюдаемый элемент
 * @param opts запас вокруг вьюпорта
 * @returns    `true`, пока элемент в зоне видимости
 */
export function useInViewport(
  ref: RefObject<Element | null>,
  { rootMargin = "0px" }: InViewportOptions = {},
): boolean {
  const [inViewport, setInViewport] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Старый браузер: наблюдателя нет — остаёмся на false, медиа не грузится, живёт постер.
    if (typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (entry) setInViewport(entry.isIntersecting);
      },
      { rootMargin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);

  return inViewport;
}
