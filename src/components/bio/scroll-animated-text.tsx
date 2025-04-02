"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface ScrollAnimatedTextProps {
  children: string[];
  className?: string;
}

export function ScrollAnimatedText({
  children,
  className = "",
}: ScrollAnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["0.3 1", "1 0.5"],
  });

  const allWords = children.flatMap((text) => text.split(" "));
  const characters = allWords.map((word) => word.split(""));
  const totalCharacters = characters.reduce(
    (acc, word) => acc + word.length,
    0
  );

  return (
    <div ref={textRef} className={className}>
      {children.map((paragraph, paragraphIndex) => (
        <div key={paragraphIndex} className="flex flex-wrap leading-[1.2] mb-8">
          {paragraph.split(" ").map((word, wordIndex) => {
            const prevParagraphsWords = children
              .slice(0, paragraphIndex)
              .reduce((acc, text) => acc + text.split(" ").length, 0);
            const absoluteWordIndex = prevParagraphsWords + wordIndex;

            return (
              <span key={wordIndex} className="whitespace-nowrap mr-[0.25em]">
                {word.split("").map((char, charIndex) => {
                  const prevCharacters = characters
                    .slice(0, absoluteWordIndex)
                    .reduce((acc, word) => acc + word.length, 0);
                  const charPosition = prevCharacters + charIndex;
                  const start = charPosition / totalCharacters;
                  const end = start + 1 / totalCharacters;

                  return (
                    <Character
                      key={`${wordIndex}_${charIndex}`}
                      char={char}
                      progress={scrollYProgress}
                      start={start}
                      end={end}
                    />
                  );
                })}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}

function Character({ char, progress, start, end }: CharacterProps) {
  const opacity = useTransform(progress, [start, end], [0.1, 1]);

  return (
    <motion.span style={{ opacity }} className="text-roughAsphalt">
      {char}
    </motion.span>
  );
}
