"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import Link from "next/link";
import { AnimatedGradient } from "./animated-gradient";

export function Hero() {
  return (
    <div className="flex flex-col overflow-hidden relative pt-[200px] pb-[100px]">
      <AnimatedGradient />

      <ContainerScroll
        titleComponent={
          <>
            {/* Logo Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="text-blue-500 font-semibold">G-Track</span>
            </div>

            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Transport Management <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-blue-500">
                Simplified
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mt-8 mb-8 max-w-2xl mx-auto">
              G-Track is a cloud-based Transport Management System designed for fleet operators.
              Manage your drivers, track documents and licenses, monitor vehicle compliance,
              and streamline your transport operations — all from one intuitive dashboard.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
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
          </>
        }
      >
        <Image
          src="/app-screenshot.png"
          alt="G-Track Application"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>

      {/* Footer links */}
      <div className="flex gap-6 justify-center text-sm text-slate-500 pb-8">
        <Link href="/privacy" className="hover:text-blue-500 transition-colors">
          Privacy Policy
        </Link>
        <Link href="/terms" className="hover:text-blue-500 transition-colors">
          Terms of Service
        </Link>
      </div>
    </div>
  );
}
