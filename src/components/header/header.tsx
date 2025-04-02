"use client";

import { ScrambleText } from "@/components/ui/scramble-text";
import { TimeDisplay } from "@/components/ui/time-display";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 backdrop-blur-md bg-opacity-100">
      <nav className="flex justify-between items-center mx-auto">
        <TimeDisplay />
        <ScrambleText text="let's talk" />
      </nav>
    </header>
  );
}
