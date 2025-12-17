"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AnimatedGradient } from "./animated-gradient";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <AnimatedGradient />

      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="text-blue-500 font-semibold">G-Track</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-600 to-slate-900 dark:from-white dark:via-blue-400 dark:to-white bg-clip-text text-transparent"
        >
          Transport Management
          <br />
          <span className="text-blue-500">Simplified</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto"
        >
          G-Track is a cloud-based Transport Management System designed for fleet operators.
          Manage your drivers, track documents and licenses, monitor vehicle compliance,
          and streamline your transport operations — all from one intuitive dashboard.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
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
        </motion.div>

        {/* Footer links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 flex gap-6 justify-center text-sm text-slate-500 dark:text-slate-500"
        >
          <Link href="/privacy" className="hover:text-blue-500 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-blue-500 transition-colors">
            Terms of Service
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
