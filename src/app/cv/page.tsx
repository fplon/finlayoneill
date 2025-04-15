import { CvEducation } from "@/components/cv/cv-education";
import { CvExperience } from "@/components/cv/cv-experience";
import { CvHeaderLinksWrapper } from "@/components/cv/cv-header-links-wrapper";
import { CvTitleLinks } from "@/components/cv/cv-title-links";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV | Finlay O'Neill",
  description: "View the CV of Finlay O'Neill.",
};

interface PageProps {
  searchParams: {
    print?: string;
  };
}

export default function CvPage({ searchParams }: PageProps): JSX.Element {
  const isPrintMode = searchParams.print === "true";

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
      {!isPrintMode && <CvHeaderLinksWrapper />}

      <div className={containerClasses} id="cv-content">
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
