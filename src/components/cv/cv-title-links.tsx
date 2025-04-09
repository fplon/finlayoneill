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
    <header className="mb-8 border-b border-gray-200 pb-6 print:border-b print:pb-3 print:mb-4">
      <h1 className="text-3xl text-center font-epilogue sm:text-4xl font-bold text-gray-800 print:text-2xl">
        FINLAY O&apos;NEILL
      </h1>

      <div className="text-sm text-gray-600 mt-3 print:text-xs print:mt-2 w-full flex justify-center items-center flex-wrap gap-x-2 gap-y-1">
        <span className="inline-flex items-center gap-1">
          <FaMapMarkerAlt className="h-4 w-4 flex-shrink-0" /> Perth, Scotland
        </span>
        <span className="text-gray-400 print:text-gray-400">|</span>
        <a
          href="mailto:me@finlayoneill.dev"
          className="hover:underline print:no-underline inline-flex items-center gap-1"
        >
          <FaEnvelope className="h-4 w-4 flex-shrink-0" /> me@finlayoneill.dev
        </a>
        <span className="text-gray-400 print:text-gray-400">|</span>
        <a
          href="tel:+447528065773"
          className="hover:underline print:no-underline inline-flex items-center gap-1"
        >
          <FaPhoneAlt className="h-4 w-4 flex-shrink-0" /> +44 7528 065773
        </a>
      </div>

      <div className="text-sm text-gray-600 mt-1 print:text-xs w-full flex justify-center items-center flex-wrap gap-x-2 gap-y-1">
        <a
          href="https://www.linkedin.com/in/finlay-o-neill-cfa-25655574/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline print:no-underline inline-flex items-center gap-1"
          aria-label="LinkedIn Profile"
        >
          <FaLinkedin className="h-4 w-4 flex-shrink-0" />{" "}
          finlay-o-neill-cfa-25655574
        </a>
        <span className="text-gray-400 print:text-gray-400">|</span>
        <a
          href="https://github.com/fplon"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline print:no-underline inline-flex items-center gap-1"
          aria-label="GitHub Profile"
        >
          <FaGithub className="h-4 w-4 flex-shrink-0" /> fplon
        </a>
        <span className="text-gray-400 print:text-gray-400">|</span>
        <a
          href="https://finlayoneill.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline print:no-underline inline-flex items-center gap-1"
          aria-label="Portfolio Website"
        >
          <FaLink className="h-4 w-4 flex-shrink-0" /> finlayoneill.dev
        </a>
      </div>
    </header>
  );
}
