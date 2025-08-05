"use client";

import { AnimatedName } from "./animated-name";
import { JobTitleCarousel } from "./job-title-carousel";
import { SocialLinks } from "@/components/shared/social-links";

export function Hero() {
  return (
    <section className="relative bg-cocosBlacks min-h-screen w-full px-4 md:px-8">
      <div className="grid h-screen grid-cols-12 gap-4">
        {/* Content starts from 6th column on desktop */}
        <div className="col-span-12 flex flex-col justify-center md:col-start-6 md:col-span-6">
          <AnimatedName />
          <JobTitleCarousel />
          <SocialLinks />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="animate-bounce text-roughAsphalt/90">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
