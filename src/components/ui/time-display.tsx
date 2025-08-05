"use client";

import { useEffect, useState } from "react";

interface AnimatedTextProps {
  text: string;
  shouldAnimate: boolean;
}

function AnimatedText({ text, shouldAnimate }: AnimatedTextProps) {
  return (
    <div className="relative w-[20ch]">
      <div
        className={`font-firaCode text-roughAsphalt overflow-hidden whitespace-nowrap
                    ${shouldAnimate ? "animate-typewriter" : "w-full"}`}
      >
        {text}
      </div>
    </div>
  );
}

export function TimeDisplay() {
  const [time, setTime] = useState("");
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Initial load - wait for animation to complete before starting updates
    const initialTime = new Date().toLocaleTimeString("en-GB", {
      timeZone: "Europe/London",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setTime(initialTime);

    // Start regular updates after initial animation
    const animationTimeout = setTimeout(() => {
      setHasAnimated(true);

      const updateTime = () => {
        const now = new Date().toLocaleTimeString("en-GB", {
          timeZone: "Europe/London",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        setTime(now);
      };

      // Start the interval after animation completes
      const interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
    }, 1000); // Match this with your animation duration

    return () => clearTimeout(animationTimeout);
  }, []);

  return (
    <AnimatedText text={`scotland_${time}`} shouldAnimate={!hasAnimated} />
  );
}
