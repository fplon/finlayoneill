"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TypewriterEffectProps {
  text: string;
  className?: string;
}

export function TypewriterEffect({
  text,
  className = "",
}: TypewriterEffectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <motion.span
        initial={{ width: 0 }}
        animate={{ width: isInView ? "auto" : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ display: "inline-block" }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
}
