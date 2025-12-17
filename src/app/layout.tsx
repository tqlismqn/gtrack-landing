import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "G-Track - Transport Management System",
  description:
    "Modern transport management system for fleet operators. Track drivers, manage documents, and optimize operations.",
  keywords: [
    "TMS",
    "transport management",
    "fleet management",
    "driver tracking",
    "logistics",
    "G-Track",
  ],
  authors: [{ name: "G-Track" }],
  openGraph: {
    title: "G-Track",
    description: "Cloud-based transport management system for fleet operators. Manage drivers, documents, and vehicle compliance.",
    url: "https://g-track.eu",
    siteName: "G-Track",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "G-Track",
    description: "Cloud-based transport management system for fleet operators. Manage drivers, documents, and vehicle compliance.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors`}
      >
        {children}
      </body>
    </html>
  );
}
