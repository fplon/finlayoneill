"use client";

import { motion, MotionValue } from "framer-motion";
import { useRef } from "react";

interface TimelineProps {
  progress: MotionValue<number>;
}

export function Timeline({ progress }: TimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={timelineRef} className="relative h-full">
      <div className="absolute left-0 w-[1px] md:w-[2px] h-full bg-roughAsphalt/20" />
      <motion.div
        className="absolute left-0 w-[1px] md:w-[2px] bg-roughAsphalt origin-top"
        style={{
          scaleY: progress,
          height: "100%",
        }}
      />
      <motion.div
        className="absolute left-[-3.5px] md:left-[-4px] w-[8px] md:w-[10px] h-[8px] md:h-[10px] rounded-full bg-roughAsphalt"
        style={{
          top: "100%",
          y: "-50%",
          scale: progress,
        }}
      />
    </div>
  );
}
