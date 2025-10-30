"use client";

import { ArrowIcon } from "@/components/icons/arrow-icon";
import { EXPERIENCE } from "@/lib/constants/experience";
import { useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { TypewriterEffect } from "../shared/typewriter-effect";
import { ExperienceItem } from "./experience-item";
import { Timeline } from "./timeline";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const displayExperience = EXPERIENCE.slice(0, 4);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(displayExperience.length).fill(false)
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0.2 1", "1 0.6"],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Update visibility of items based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      setVisibleItems(
        displayExperience.map(
          (_, index) =>
            value >= (index + 0.2) / (displayExperience.length + 0.2)
        )
      );
    });

    return () => unsubscribe();
  }, [scrollYProgress, displayExperience]);

  return (
    <section className="min-h-screen bg-cocosBlacks text-roughAsphalt py-24">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
          {/* Section Header */}
          <div className="col-span-1 md:col-span-4 mb-8 md:mb-0">
            <TypewriterEffect
              text="experience"
              className="font-firaCode text-sm"
            />
          </div>

          {/* Experience Content */}
          <div className="col-span-1 md:col-span-8" ref={containerRef}>
            <div className="relative">
              {/* Timeline */}
              <div className="absolute left-0 top-0 h-full w-6 md:w-12">
                <Timeline progress={progress} />
              </div>

              {/* Experience Items */}
              <div className="ml-12 md:ml-24">
                {displayExperience.map((exp, index) => (
                  <ExperienceItem
                    key={`${exp.company}-${exp.startDate}`}
                    experience={exp}
                    isVisible={visibleItems[index]}
                  />
                ))}

                {/* CV Link */}
                <Link
                  href="/cv"
                  className="inline-flex items-center gap-1 mt-8 font-firaCode text-sm text-roughAsphalt/60 hover:text-roughAsphalt transition-colors"
                >
                  see_full_experience <ArrowIcon className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
