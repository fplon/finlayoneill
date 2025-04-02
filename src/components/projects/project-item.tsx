"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/lib/constants/projects";

interface ProjectItemProps {
  project: Project;
  isLast: boolean;
}

export function ProjectItem({ project, isLast }: ProjectItemProps) {
  return (
    <motion.div
      className="border-t border-roughAsphalt/20"
      variants={projectVariants}
    >
      <Link
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group/item block pt-6"
      >
        <motion.h3
          className="font-epilogue text-3xl md:text-4xl lg:text-5xl 
                    group-hover/list:opacity-30 
                    group-hover/item:!opacity-100
                    transform transition-all duration-150 ease-in-out"
          whileHover={{ x: 16 }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
        >
          {project.title}
        </motion.h3>
      </Link>
      {isLast && <div className="border-b border-roughAsphalt/20" />}
    </motion.div>
  );
}

const projectVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};
