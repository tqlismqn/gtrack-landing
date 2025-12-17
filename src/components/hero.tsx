"use client";

import Image from "next/image";
import Link from "next/link";
import { ContainerScroll } from "./container-scroll";
import { AnimatedGradient } from "./animated-gradient";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <AnimatedGradient />

      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center">
            {/* Logo Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="text-blue-500 font-semibold">G-Track</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-600 to-slate-900 dark:from-white dark:via-blue-400 dark:to-white bg-clip-text text-transparent">
              Transport Management
              <br />
              <span className="text-blue-500">Simplified</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
              G-Track is a cloud-based Transport Management System designed for fleet operators.
              Manage your drivers, track documents and licenses, monitor vehicle compliance,
              and streamline your transport operations — all from one intuitive dashboard.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="https://app.g-track.eu"
                className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-500/25"
              >
                Go to Application
              </Link>
              <Link
                href="mailto:it@g-track.eu"
                className="px-8 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-xl transition-all hover:scale-105"
              >
                Contact Us
              </Link>
            </div>
          </div>
        }
      >
        <Image
          src="/app-screenshot.png"
          alt="G-Track Application Screenshot"
          fill
          className="object-cover object-top"
          draggable={false}
        />
      </ContainerScroll>

      {/* Footer links */}
      <div className="flex gap-6 justify-center text-sm text-slate-500 dark:text-slate-500 pb-16 -mt-32 relative z-10">
        <Link href="/privacy" className="hover:text-blue-500 transition-colors">
          Privacy Policy
        </Link>
        <Link href="/terms" className="hover:text-blue-500 transition-colors">
          Terms of Service
        </Link>
      </div>
    </section>
  );
}
