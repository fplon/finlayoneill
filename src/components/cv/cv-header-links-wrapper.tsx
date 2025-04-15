"use client";

import { useEffect, useRef, useState } from "react";
import { CvHeaderLinks } from "./cv-header-links";

export function CvHeaderLinksWrapper(): JSX.Element {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Get the CV content element by ID after component mounts
    const contentElement = document.getElementById("cv-content");
    if (contentElement) {
      // Create a new ref with the element
      contentRef.current = contentElement as HTMLDivElement;
      setIsReady(true);
    }
  }, []);

  if (!isReady) {
    return <div className="max-w-4xl mx-auto mb-6 print:hidden"></div>;
  }

  return <CvHeaderLinks contentRef={contentRef} />;
}
