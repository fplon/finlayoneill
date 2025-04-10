"use client";

import { CvEducation } from "@/components/cv/cv-education";
import { CvExperience } from "@/components/cv/cv-experience";
import { CvHeaderLinks } from "@/components/cv/cv-header-links";
import { CvTitleLinks } from "@/components/cv/cv-title-links";
// import { Metadata } from "next";
import { useRef } from "react";

// export const metadata: Metadata = {
//   title: "CV | Finlay O'Neill",
//   description: "View the CV of Finlay O'Neill.",
// };

interface PageProps {
  searchParams: {
    print?: string;
  };
}

export default function CvPage({ searchParams }: PageProps): JSX.Element {
  const isPrintMode = searchParams.print === "true";
  const contentRef = useRef<HTMLDivElement>(null);

  // ensure optimal PDF rendering
  const containerClasses = isPrintMode
    ? "max-w-4xl mx-auto bg-white p-8 sm:p-12 shadow-none rounded-none"
    : "max-w-4xl mx-auto bg-white p-8 sm:p-12 shadow-lg print:shadow-none print:rounded-none print:p-0 print:m-0";

  // main container in print mode
  const mainClasses = isPrintMode
    ? "bg-white p-0"
    : "min-h-screen bg-cocosBlacks p-4 sm:p-8 print:bg-white";

  return (
    <main className={mainClasses}>
      {!isPrintMode && <CvHeaderLinks contentRef={contentRef} />}

      <div className={containerClasses} ref={contentRef}>
        <CvTitleLinks />
        <CvExperience />
        <CvEducation />
      </div>

      {isPrintMode && (
        <div className="hidden">
          <meta name="author" content="Finlay O'Neill" />
          <meta name="keywords" content="CV, Resume, Finlay O'Neill" />
        </div>
      )}
    </main>
  );
}
