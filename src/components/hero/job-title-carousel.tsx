"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const jobTitles = [
  "data_engineer",
  "quant_developer",
  "machine_learning_engineer",
  "web_developer",
  "api_developer",
  "data_scientist",
  "data_consultant",
  // "solopreneur",
];

export function JobTitleCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(50);

  useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(() => {
      const currentTitle = jobTitles[currentIndex];

      if (!isDeleting) {
        setText(currentTitle.substring(0, text.length + 1));

        if (text === currentTitle) {
          setIsDeleting(true);
          setDelta(1000);
        }
      } else {
        setText(currentTitle.substring(0, text.length - 1));
        setDelta(50);

        if (text === "") {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % jobTitles.length);
          setDelta(200);
        }
      }
    }, delta);

    return () => clearTimeout(timeout);
  }, [text, currentIndex, isDeleting, delta]);

  return (
    <div className="font-firaCode text-lg text-roughAsphalt/80 md:text-xl lg:text-2xl">
      <div className="flex items-center">
        {text.split("").map((char, idx) => (
          <motion.span
            key={`${currentIndex}-${idx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className={char === " " ? "w-[0.4em]" : undefined}
          >
            {char}
          </motion.span>
        ))}
        <span className="animate-blink">|</span>
      </div>
    </div>
  );
}
