"use client";

import { ScrambleLink } from "@/components/ui/scramble-link";
import React from "react";

export function CvHeaderLinks(): JSX.Element {
  const handleDownload = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto mb-6 print:hidden flex justify-between items-center">
      <ScrambleLink href="/" text="< return_home" />
      <ScrambleLink
        href="#"
        text="download_cv >"
        onClick={handleDownload}
        className="text-right"
      />
    </div>
  );
}
