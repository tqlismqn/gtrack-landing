/* ============================================================================
   Общая оболочка обоих root-layout'ов.

   Почему два root-layout'а: атрибут `<html lang>` обязан соответствовать языку
   страницы (иначе Google понижает локали как несоответствующие hreflang, а
   скринридеры читают немецкий текст английской фонетикой). В App Router `<html>`
   рендерит только root-layout, а он не получает динамический сегмент `[locale]`.
   Официальное решение — несколько root-layout'ов через route groups
   (`app/(en)` и `app/(intl)`), при этом корневой `app/layout.tsx` не существует,
   а домашний роут `/` живёт внутри одной из групп.

   Переход между группами (например `/` → `/de`) = полная перезагрузка страницы.
   Для лендинга это норма: смена языка и так меняет весь контент.
   ============================================================================ */

import { GoogleTagManager } from "@next/third-parties/google";
import { Geist, Geist_Mono, IBM_Plex_Mono, Onest } from "next/font/google";
import {
  CONSENT_DEFAULT_SCRIPT,
  COOKIESCRIPT_SRC,
  GTM_ID,
} from "@/lib/analytics";
import "./globals.css";
import "../styles/landing/index.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* шрифты лендинга (прототип: Onest 300–700 + IBM Plex Mono 400–600) */
const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

/* применяем сохранённую тему до первой отрисовки (без flash);
   дефолт — dark, как в прототипе */
const themeInit = `try{if(localStorage.getItem('gt-landing-theme')==='light'){document.documentElement.setAttribute('data-theme','light')}}catch(e){}`;

export function LandingHtml({
  lang,
  children,
}: Readonly<{ lang: string; children: React.ReactNode }>) {
  return (
    <html lang={lang} data-theme="dark" suppressHydrationWarning>
      {/* Явный <head> — официально поддерживаемый способ положить скрипт,
          который обязан выполниться до гидратации и в заданном порядке
          (дока Next: preventing-flash-before-hydration). Metadata API
          продолжает работать: свои теги она добавляет сюда же и дедуплицирует.
          Через next/script порядок «consent → CMP» не гарантирован. */}
      <head>
        <script
          id="gt-consent-default"
          dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SCRIPT }}
        />
        {/* eslint-disable-next-line @next/next/no-sync-scripts -- CMP обязан
            отработать до GTM: async дал бы гонку, в которой теги стартуют
            раньше баннера. */}
        <script src={COOKIESCRIPT_SRC} charSet="UTF-8" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${onest.variable} ${plexMono.variable} antialiased`}
      >
        <GoogleTagManager gtmId={GTM_ID} />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {children}
      </body>
    </html>
  );
}
