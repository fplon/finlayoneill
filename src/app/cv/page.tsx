import { CvEducation } from "@/components/cv/cv-education";
import { CvExperience } from "@/components/cv/cv-experience";
import { CvHeaderLinks } from "@/components/cv/cv-header-links";
import { CvTitleLinks } from "@/components/cv/cv-title-links";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV | Finlay O'Neill",
  description: "View the CV of Finlay O'Neill.",
};

export default function CvPage(): JSX.Element {
  // Container classes for styling
  const containerClasses =
    "max-w-4xl mx-auto bg-white p-8 sm:p-12 shadow-lg print:shadow-none print:rounded-none font-epilogue print:w-[210mm] print:h-[297mm] print:mx-0";
  const mainClasses =
    "min-h-screen bg-cocosBlacks p-4 sm:p-8 print:bg-white print:p-0";

  return (
    <main className={mainClasses}>
      <CvHeaderLinks />

      <div className={containerClasses} id="cv-content">
        <CvTitleLinks />
        <CvExperience />
        <CvEducation />
      </div>
    </main>
  );
}
