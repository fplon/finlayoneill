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
  return (
    <main className="min-h-screen bg-cocosBlacks p-4 sm:p-8 print:bg-white">
      <CvHeaderLinks />

      {/* A4-like container */}
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 shadow-lg print:shadow-none print:rounded-none print:p-0 print:m-0">
        <CvTitleLinks />
        <CvExperience />
        <CvEducation />
      </div>
    </main>
  );
}
