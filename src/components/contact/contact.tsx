"use client";

import { SocialLinks } from "@/components/shared/social-links";
import { CopyrightText } from "@/components/contact/copyright-text";
import { SlidingText } from "@/components/contact/sliding-text";

export function Contact() {
  return (
    <section className="relative min-h-screen w-full bg-cocosBlacks px-4 pb-8 pt-32 md:px-8 md:pb-12">
      <div className="grid h-[calc(100vh-10rem)] grid-cols-12 gap-4">
        <div className="col-span-12">
          <SlidingText />
        </div>

        <div className="col-span-12 flex h-full flex-col md:col-span-6 md:col-start-7">
          <div className="mt-8">
            <SocialLinks
              startDelay={1000}
              textColor="text-roughAsphalt/60"
              hoverTextColor="text-roughAsphalt"
            />
          </div>
          <div className="mt-10 mb-4">
            <CopyrightText />
          </div>
        </div>
      </div>
    </section>
  );
}
