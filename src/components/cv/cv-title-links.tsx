import {
  FaEnvelope,
  FaGithub,
  FaLink,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

export function CvTitleLinks(): JSX.Element {
  return (
    <header className="mb-8 border-b border-gray-200 pb-6 print:mb-4 print:pb-3">
      <h1 className="text-3xl text-start sm:text-center font-epilogue sm:text-4xl font-bold text-gray-800 print:text-2xl">
        FINLAY O&apos;NEILL
      </h1>

      {/* Contact Info Row */}
      <div className="text-sm text-gray-600 mt-3 w-full flex flex-col items-start gap-y-1 print:mt-1 print:text-xs print:gap-x-1.5 sm:flex-row sm:justify-center sm:flex-wrap sm:gap-x-2">
        <span className="inline-flex items-center gap-1 print:gap-0.5">
          <FaMapMarkerAlt className="h-4 w-4 flex-shrink-0 print:h-3 print:w-3" />{" "}
          Perth, Scotland
        </span>
        <span className="text-gray-400 print:hidden hidden sm:inline">|</span>
        <a
          href="mailto:me@finlayoneill.dev"
          className="hover:underline print:no-underline inline-flex items-center gap-1 print:gap-0.5"
        >
          <FaEnvelope className="h-4 w-4 flex-shrink-0 print:h-3 print:w-3" />{" "}
          me@finlayoneill.dev
        </a>
        <span className="text-gray-400 print:hidden hidden sm:inline">|</span>
        <a
          href="tel:+447528065773"
          className="hover:underline print:no-underline inline-flex items-center gap-1 print:gap-0.5"
        >
          <FaPhoneAlt className="h-4 w-4 flex-shrink-0 print:h-3 print:w-3" />{" "}
          +44 7528 065773
        </a>
      </div>

      {/* Social/Website Links Row */}
      <div className="text-sm text-gray-600 mt-1 w-full flex flex-col items-start gap-y-1 print:text-xs print:gap-x-1.5 sm:mt-1 sm:flex-row sm:justify-center sm:flex-wrap sm:gap-x-2">
        <a
          href="https://github.com/fplon"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline print:no-underline inline-flex items-center gap-1 print:gap-0.5"
          aria-label="GitHub Profile"
        >
          <FaGithub className="h-4 w-4 flex-shrink-0 print:h-3 print:w-3" />{" "}
          fplon
        </a>
        <span className="text-gray-400 print:hidden hidden sm:inline">|</span>
        <a
          href="https://www.linkedin.com/in/finlay-o-neill-cfa-25655574/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline print:no-underline inline-flex items-center gap-1 print:gap-0.5"
          aria-label="LinkedIn Profile"
        >
          <FaLinkedin className="h-4 w-4 flex-shrink-0 print:h-3 print:w-3" />{" "}
          finlay-o-neill-cfa-25655574
        </a>
        <span className="text-gray-400 print:hidden hidden sm:inline">|</span>
        <a
          href="https://finlayoneill.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline print:no-underline inline-flex items-center gap-1 print:gap-0.5"
          aria-label="Portfolio Website"
        >
          <FaLink className="h-4 w-4 flex-shrink-0 print:h-3 print:w-3" />{" "}
          finlayoneill.dev
        </a>
      </div>
    </header>
  );
}
