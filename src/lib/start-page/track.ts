/* ============================================================================
   Событие «клик по Зарегистрироваться» на рекламной странице /start.
   Приложение исключено из пикселя Meta, поэтому конверсию «дошёл до регистрации»
   считаем здесь, на сайте: клик пушит событие в dataLayer, а что с ним делать
   (Meta, GA4), решает GTM — как с generate_lead формы /demo. Согласие тут не
   проверяется: до выбора посетителя теги контейнера держит Consent Mode.
   В событии нет ни личных данных, ни адреса ссылки (в нём метки рекламы).
   Чистый модуль: window передаётся аргументом, тест — test/start.test.ts.
   ============================================================================ */

import type { Lang } from "../landing-i18n";

export const REGISTER_CLICK_EVENT = "cta_register_click";

/** Место кнопки на странице: шапка, первый экран, низ. */
export type CtaLocation = "start_nav" | "start_hero" | "start_footer";

export interface RegisterClickEvent {
  event: typeof REGISTER_CLICK_EVENT;
  cta_location: CtaLocation;
  page_lang: Lang;
}

export function registerClickEvent(location: CtaLocation, lang: Lang): RegisterClickEvent {
  return { event: REGISTER_CLICK_EVENT, cta_location: location, page_lang: lang };
}

/** Пушит событие в dataLayer окна; никогда не бросает — клик не должен ломать переход. */
export function trackRegisterClick(
  target: { dataLayer?: unknown[] },
  location: CtaLocation,
  lang: Lang,
): void {
  try {
    target.dataLayer = target.dataLayer ?? [];
    target.dataLayer.push(registerClickEvent(location, lang));
  } catch {
    /* аналитика не должна мешать навигации */
  }
}
