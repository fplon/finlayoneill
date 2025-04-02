"use client";

import { motion } from "framer-motion";

export function SlidingText() {
  return (
    <div className="relative overflow-hidden whitespace-nowrap py-16 md:py-24">
      <div className="inline-flex">
        <motion.a
          href="mailto:me@finlayoneill.dev"
          style={{ WebkitTextStroke: "1px rgb(190,190,190)" }}
          className="cursor-mail font-epilogue text-[200px] font-bold text-roughAsphalt transition-colors hover:text-transparent md:text-[300px] leading-none"
          animate={{
            x: ["0%", "-30%"],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          Let&apos;s work together • Let&apos;s work together •&nbsp;
        </motion.a>
        <a
          href="mailto:me@finlayoneill.dev"
          style={{ WebkitTextStroke: "1px rgb(245,245,240)" }}
          className="absolute left-full cursor-mail font-epilogue text-7xl font-bold text-roughAsphalt transition-colors hover:text-transparent md:text-[300px] leading-none"
          aria-hidden="true"
        >
          Let&apos;s work together • Let&apos;s work together •&nbsp;
        </a>
      </div>
    </div>
  );
}
