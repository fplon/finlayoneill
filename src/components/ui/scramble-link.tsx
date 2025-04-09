"use client";

import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface ScrambleLinkProps {
  text: string;
  href: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  disabled?: boolean;
}

const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!<>-_/[]{}—=+*^?#";
const SCRAMBLE_SPEED_MS = 50;
const REVEAL_SPEED_MS = 70;
const HOVER_SCRAMBLE_DURATION_MS = 500;

export function ScrambleLink({
  text,
  href,
  className = "",
  onClick,
  disabled = false,
}: ScrambleLinkProps): JSX.Element {
  const [displayText, setDisplayText] = useState(text);
  const mountIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hoverIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const scrambleOnMount = () => {
      let iteration = 0;
      const targetLength = text.length;

      if (mountIntervalRef.current) clearInterval(mountIntervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      setDisplayText(
        text
          .split("")
          .map(() => CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)])
          .join("")
      );

      mountIntervalRef.current = setInterval(() => {
        const revealedChars = Math.floor(
          iteration / (REVEAL_SPEED_MS / SCRAMBLE_SPEED_MS)
        );

        setDisplayText(
          text
            .split("")
            .map((_char, index) => {
              if (index < revealedChars) {
                return text[index];
              }
              return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            })
            .join("")
        );

        iteration++;

        if (revealedChars >= targetLength) {
          if (mountIntervalRef.current) clearInterval(mountIntervalRef.current);
          setDisplayText(text);
          setIsMounted(true);
        }
      }, SCRAMBLE_SPEED_MS);
    };

    timeoutRef.current = setTimeout(scrambleOnMount, 150);

    return () => {
      if (mountIntervalRef.current) clearInterval(mountIntervalRef.current);
      if (hoverIntervalRef.current) clearInterval(hoverIntervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsMounted(false);
      setDisplayText(text);
    };
  }, [text]);

  const handleMouseEnter = useCallback(() => {
    if (!isMounted || hoverIntervalRef.current || disabled) return;

    let hoverIterations = 0;
    const totalHoverSteps = HOVER_SCRAMBLE_DURATION_MS / SCRAMBLE_SPEED_MS;

    hoverIntervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map(() => CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)])
          .join("")
      );

      hoverIterations++;

      if (hoverIterations >= totalHoverSteps) {
        if (hoverIntervalRef.current) clearInterval(hoverIntervalRef.current);
        hoverIntervalRef.current = null;
        setDisplayText(text);
      }
    }, SCRAMBLE_SPEED_MS);
  }, [isMounted, text, disabled]);

  const handleMouseLeave = useCallback(() => {
    if (hoverIntervalRef.current) {
      clearInterval(hoverIntervalRef.current);
      hoverIntervalRef.current = null;
      setDisplayText(text);
    }
  }, [text]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    },
    [onClick, disabled]
  );

  return (
    <Link
      href={disabled ? "#" : href}
      className={`text-sm font-mono ${
        disabled
          ? "text-gray-400 cursor-not-allowed"
          : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 cursor-pointer"
      } transition-colors duration-300 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      aria-disabled={disabled}
    >
      {displayText}
    </Link>
  );
}
