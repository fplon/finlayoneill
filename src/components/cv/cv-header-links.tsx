"use client";

import { ScrambleLink } from "@/components/ui/scramble-link";

export function CvHeaderLinks(): JSX.Element {
  return (
    <div className="max-w-4xl mx-auto mb-6 print:hidden flex flex-col">
      <div className="flex justify-between items-center">
        <ScrambleLink href="/" text="< return_home" />
        <ScrambleLink
          href="#"
          text="print_cv >"
          onClick={() => window.print()}
          className="text-right"
        />
      </div>
    </div>
  );
}
