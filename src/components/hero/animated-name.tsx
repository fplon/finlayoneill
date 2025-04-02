"use client";

import { motion } from "framer-motion";

export function AnimatedName() {
  const firstName = "FINLAY";
  const lastName = "O'NEILL";

  const getRandomDirection = () => {
    const directions = [
      { x: -20, y: -20 },
      { x: 20, y: -20 },
      { x: -20, y: 20 },
      { x: 20, y: 20 },
    ];
    return directions[Math.floor(Math.random() * directions.length)];
  };

  const letterVariants = {
    initial: () => ({
      opacity: 0,
      ...getRandomDirection(),
    }),
    animate: (delay: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
    hover: {
      color: "transparent",
      WebkitTextStroke: "1px rgb(245, 245, 240)",
      transition: { duration: 0.2 },
    },
  };

  const createLetterSpans = (text: string) => {
    return text.split("").map((char, index) => {
      const randomDelay = Math.random() * 2;
      return (
        <motion.span
          key={index}
          custom={randomDelay}
          variants={letterVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="inline-block"
        >
          {char}
        </motion.span>
      );
    });
  };

  return (
    <h1 className="font-epilogue text-7xl font-bold text-roughAsphalt md:text-8xl lg:text-9xl">
      <div className="mb-2">{createLetterSpans(firstName)}</div>
      <div>{createLetterSpans(lastName)}</div>
    </h1>
  );
}
