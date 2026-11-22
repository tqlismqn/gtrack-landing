"use client";

/* ============================================================================
   CtaLink — ссылка «Зарегистрироваться» рекламной страницы /start, которая при
   клике пушит cta_register_click в dataLayer (lib/start-page/track.ts).
   Порядок обработчиков: метки рекламы к href дописывает слушатель
   LandingProvider на document в capture-фазе — он срабатывает РАНЬШЕ этого
   onClick (React слушает в bubble-фазе корня), так что к моменту пуша href уже
   полный. Здесь нет preventDefault и нет задержки: переход идёт как у обычного
   <a>, включая Cmd+click и «открыть в новой вкладке». Обычный <a>, не next/link —
   по той же причине, что у остальных ссылок на приложение (см. LandingProvider).
   ============================================================================ */

import type { ReactNode } from "react";
import { trackRegisterClick, type CtaLocation } from "@/lib/start-page/track";
import { useLanding } from "./LandingProvider";

export function CtaLink({
  href,
  location,
  className,
  children,
}: {
  href: string;
  location: CtaLocation;
  className?: string;
  children: ReactNode;
}) {
  const { lang } = useLanding();
  return (
    <a
      className={className}
      href={href}
      data-cta-location={location}
      onClick={() => trackRegisterClick(window, location, lang)}
    >
      {children}
    </a>
  );
}
