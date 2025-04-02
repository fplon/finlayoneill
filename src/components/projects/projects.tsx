"use client";

import { motion } from "framer-motion";
import { ProjectsList } from "./projects-list";

export function Projects() {
  return (
    <section className="min-h-[80vh] grid grid-cols-12 gap-4 px-4 bg-cocosBlacks text-roughAsphalt overflow-hidden">
      {/* Section Header */}
      <div className="col-span-12 grid grid-cols-12 gap-4 my-auto py-24">
        <div className="col-start-1 col-span-3">
          <motion.h2
            className="font-firaCode text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, type: "keyframes" }}
          >
            project_spotlight
          </motion.h2>
        </div>
        <div className="col-start-4 col-span-9">
          <ProjectsList />
        </div>
      </div>
    </section>
  );
}
