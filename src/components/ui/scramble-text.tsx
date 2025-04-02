"use client";

import { scrambleText } from "@/lib/utils/text-effects";
import { useState } from "react";

interface ScrambleTextProps {
  text: string;
}

export function ScrambleText({ text }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);

  const handleMouseEnter = () => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(scrambleText(text));
      iterations++;
      if (iterations > 10) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 50);
  };

  return (
    <div className="w-[97px] items-center">
      <a
        href="mailto:me@finlayoneill.dev"
        onMouseEnter={handleMouseEnter}
        className="font-firaCode text-center
                   text-roughAsphalt bg-transparent
                   hover:bg-roughAsphalt hover:text-gray-900
                   transition-all duration-300
                   w-full
                   overflow-hidden whitespace-nowrap
                   animate-typewriter
                   block"
      >
        {displayText}
      </a>
    </div>
  );
}
