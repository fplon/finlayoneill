"use client";

import { ArrowIcon } from "@/components/icons/arrow-icon";
import { scrambleText } from "@/lib/utils/text-effects";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SocialLink {
  name: string;
  url: string;
}

interface SocialLinksProps {
  className?: string;
  textColor?: string;
  hoverTextColor?: string;
  startDelay?: number;
  typingSpeed?: number;
}

const socialLinks: SocialLink[] = [
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/finlay-oneill/",
  },
  {
    name: "github",
    url: "https://github.com/fplon",
  },
  // {
  //   name: "read_cv",
  //   url: "https://read.cv/finlayoneill",
  // },
];

export function SocialLinks({
  className = "",
  textColor = "text-roughAsphalt/60",
  hoverTextColor = "text-roughAsphalt",
  startDelay = 0,
  typingSpeed = 100,
}: SocialLinksProps) {
  const [displayTexts, setDisplayTexts] = useState<string[]>(
    Array(socialLinks.length).fill("")
  );
  const [isTyping, setIsTyping] = useState(true);
  const [completedLinks, setCompletedLinks] = useState<boolean[]>(
    Array(socialLinks.length).fill(false)
  );

  useEffect(() => {
    socialLinks.forEach((link, index) => {
      let i = 0;
      const text = link.name;
      const typingDelay = startDelay + index * 500;

      setTimeout(() => {
        const interval = setInterval(() => {
          setDisplayTexts((prev) => {
            const newTexts = [...prev];
            newTexts[index] = text.slice(0, i + 1);
            return newTexts;
          });
          i++;
          if (i === text.length) {
            clearInterval(interval);
            setCompletedLinks((prev) => {
              const newCompleted = [...prev];
              newCompleted[index] = true;
              return newCompleted;
            });
            if (index === socialLinks.length - 1) {
              setIsTyping(false);
            }
          }
        }, typingSpeed);
      }, typingDelay);
    });
  }, [startDelay, typingSpeed]);

  const handleMouseEnter = (index: number) => {
    if (isTyping) return;
    const text = socialLinks[index].name;
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayTexts((prev) => {
        const newTexts = [...prev];
        newTexts[index] = scrambleText(text);
        return newTexts;
      });
      iterations++;
      if (iterations > 10) {
        clearInterval(interval);
        setDisplayTexts((prev) => {
          const newTexts = [...prev];
          newTexts[index] = text;
          return newTexts;
        });
      }
    }, 50);
  };

  return (
    <div
      className={`mt-8 flex flex-col space-y-2 font-firaCode text-sm md:text-base ${className}`}
    >
      {socialLinks.map((link, index) => (
        <div key={link.name} className="h-6">
          <motion.a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex w-fit items-center space-x-2 ${textColor} hover:${hoverTextColor}`}
            onMouseEnter={() => handleMouseEnter(index)}
            whileHover={{ x: 10 }}
            style={{ opacity: displayTexts[index] ? 1 : 0 }}
          >
            <span className="w-[97px]">{displayTexts[index]}</span>
            {completedLinks[index] && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowIcon className="h-4 w-4" />
              </motion.div>
            )}
          </motion.a>
        </div>
      ))}
    </div>
  );
}
