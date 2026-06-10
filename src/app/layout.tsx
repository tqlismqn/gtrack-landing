import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Mono, Onest } from "next/font/google";
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

export const metadata: Metadata = {
  title: "G-Track — EU-compliance и планирование рейсов для перевозчиков",
  description:
    "Водители, документы, планирование и парк — в одном браузерном приложении. Разворачивается за день. Цены — на этой странице.",
  keywords: [
    "TMS",
    "transport management",
    "fleet management",
    "driver tracking",
    "logistics",
    "EU compliance",
    "G-Track",
  ],
  authors: [{ name: "G-Track" }],
  openGraph: {
    title: "G-Track — EU-compliance и планирование рейсов для перевозчиков",
    description:
      "Водители, документы, планирование и парк — в одном браузерном приложении. Разворачивается за день. Цены — на этой странице.",
    url: "https://g-track.eu",
    siteName: "G-Track",
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "G-Track — EU-compliance и планирование рейсов для перевозчиков",
    description:
      "Водители, документы, планирование и парк — в одном браузерном приложении. Разворачивается за день. Цены — на этой странице.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* применяем сохранённую тему до первой отрисовки (без flash);
   дефолт — dark, как в прототипе */
const themeInit = `try{if(localStorage.getItem('gt-landing-theme')==='light'){document.documentElement.setAttribute('data-theme','light')}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${onest.variable} ${plexMono.variable} antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {children}
      </body>
    </html>
  );
}
