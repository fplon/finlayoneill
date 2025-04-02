"use client";

import { Experience } from "@/lib/constants/experience";
import { motion } from "framer-motion";

interface ExperienceItemProps {
  experience: Experience;
  isVisible: boolean;
}

export function ExperienceItem({ experience, isVisible }: ExperienceItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5 }}
      className="mb-8 md:mb-12"
    >
      <div className="flex flex-col">
        <h3 className="text-2xl md:text-3xl font-epilogue mb-2">
          {experience.role}
        </h3>
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 font-firaCode text-xs md:text-sm text-roughAsphalt/70">
          <span>{experience.company}</span>
          <span className="hidden md:inline">•</span>
          <span>
            {experience.startDate} - {experience.endDate || "Present"}
          </span>
        </div>
        <p className="mt-4 text-sm md:text-base text-roughAsphalt/80">
          {experience.description}
        </p>
        <div className="flex flex-wrap gap-1.5 md:gap-2 mt-4 font-mono">
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 md:px-3 py-1 bg-roughAsphalt/10 rounded-full text-xs md:text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
