"use client";

import { motion } from "framer-motion";
import { ProjectItem } from "./project-item";
import { FEATURED_PROJECTS } from "@/lib/constants/projects";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function ProjectsList() {
  return (
    <motion.div
      className="col-start-4 col-span-9 flex flex-col group/list"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {FEATURED_PROJECTS.map((project, index) => (
        <ProjectItem
          key={project.title}
          project={project}
          isLast={index === FEATURED_PROJECTS.length - 1}
        />
      ))}
    </motion.div>
  );
}
