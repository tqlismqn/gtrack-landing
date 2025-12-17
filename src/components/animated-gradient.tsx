"use client";

import { motion } from "framer-motion";

export function AnimatedGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-500/20 via-blue-500/20 to-indigo-500/20 dark:from-cyan-500/10 dark:via-blue-500/10 dark:to-indigo-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
