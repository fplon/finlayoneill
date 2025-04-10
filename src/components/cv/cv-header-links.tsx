"use client";

import { ScrambleLink } from "@/components/ui/scramble-link";
import React, { useState } from "react";
import { useReactToPrint } from "react-to-print";

interface CvHeaderLinksProps {
  contentRef: React.RefObject<HTMLDivElement>;
}

export function CvHeaderLinks({ contentRef }: CvHeaderLinksProps): JSX.Element {
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: "CV-Finlay-ONeill",
    onBeforePrint: () => {
      setIsPrinting(true);
      setError(null);
      return Promise.resolve();
    },
    onAfterPrint: () => {
      setIsPrinting(false);
    },
    onPrintError: () => {
      setError("Failed to generate CV. Please try again later.");
      setIsPrinting(false);
    },
    // Comment out custom print function
    /*
    print: (printIframe) => {
      return new Promise<void>((resolve, reject) => {
        try {
          const doc = printIframe.contentDocument || printIframe.contentWindow?.document;
          if (!doc) {
            throw new Error("Could not find print document");
          }

          // Add a preconnect hint to Google Fonts
          const preconnect = doc.createElement('link');
          preconnect.rel = 'preconnect';
          preconnect.href = 'https://fonts.googleapis.com';
          doc.head.appendChild(preconnect);

          const preconnect2 = doc.createElement('link');
          preconnect2.rel = 'preconnect';
          preconnect2.href = 'https://fonts.gstatic.com';
          preconnect2.crossOrigin = 'anonymous';
          doc.head.appendChild(preconnect2);

          // Add the Google Fonts stylesheet
          const fontLink = doc.createElement('link');
          fontLink.rel = 'stylesheet';
          fontLink.href = 'https://fonts.googleapis.com/css2?family=Epilogue:wght@400;500;600;700&display=swap';
          doc.head.appendChild(fontLink);

          // Create a local backup of the font using data URI
          const style = doc.createElement('style');
          style.textContent = `
            @font-face {
              font-family: 'Epilogue';
              src: url('https://fonts.gstatic.com/s/epilogue/v17/O4ZRFGj5hxF0EhjimlIrsgg4lWmc.woff2') format('woff2');
              font-weight: normal;
              font-style: normal;
              font-display: block;
            }

            * {
              font-family: 'Epilogue', sans-serif !important;
            }

            body, h1, h2, h3, p, div, span {
              font-family: 'Epilogue', sans-serif !important;
            }
          `;
          doc.head.appendChild(style);

          // Preload the actual font files
          const preloadLink = doc.createElement('link');
          preloadLink.rel = 'preload';
          preloadLink.as = 'font';
          preloadLink.type = 'font/woff2';
          preloadLink.href = `https://fonts.gstatic.com/s/epilogue/v17/O4ZRFGj5hxF0EhjimlIrsgg4lWmc.woff2`;
          preloadLink.crossOrigin = 'anonymous';
          doc.head.appendChild(preloadLink);

          // Delay printing to allow fonts to load
          setTimeout(() => {
            try {
              // Force apply fonts to all elements
              Array.from(doc.getElementsByTagName('*')).forEach((el) => {
                if (el instanceof HTMLElement) {
                  el.style.setProperty('font-family', 'Epilogue, sans-serif', 'important');
                }
              });

              // Print
              if (printIframe.contentWindow) {
                printIframe.contentWindow.print();
                setTimeout(resolve, 100);
              } else {
                reject(new Error('No content window found'));
              }
            } catch (e) {
              reject(e);
            }
          }, 1500); // Increased delay to ensure font loading
        } catch (error) {
          console.error('Print error:', error);
          reject(error);
        }
      });
    },
    */
    // Simplified pageStyle with minimal print settings
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }

      /* Comment out font-related styles
      @import url('https://fonts.googleapis.com/css2?family=Epilogue:wght@400;500;600;700&display=swap');

      @font-face {
        font-family: 'Epilogue';
        src: url('https://fonts.gstatic.com/s/epilogue/v17/O4ZRFGj5hxF0EhjimlIrsgg4lWmc.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
        font-display: block;
      }

      html, body {
        font-family: 'Epilogue', sans-serif !important;
        -webkit-print-color-adjust: exact;
        color-adjust: exact;
        print-color-adjust: exact;
      }

      * {
        font-family: 'Epilogue', sans-serif !important;
      }
      */

      .print\\:hidden {
        display: none !important;
      }

      .max-w-4xl {
        max-width: 100% !important;
        width: 100% !important;
        margin: 0 !important;
        padding: 1.5rem !important;
      }
    `,
  });

  // Retry handler
  const handleRetry = (): void => {
    setError(null);
  };

  // Wrapper for handlePrint to properly type the event
  const handleDownloadClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ): void => {
    event.preventDefault();
    if (contentRef.current) {
      handlePrint();
    }
  };

  return (
    <div className="max-w-4xl mx-auto mb-6 print:hidden flex flex-col">
      <div className="flex justify-between items-center">
        <ScrambleLink href="/" text="< return_home" />
        <ScrambleLink
          href="#"
          text={isPrinting ? "generating_pdf..." : "download_cv >"}
          onClick={handleDownloadClick}
          className="text-right"
          disabled={isPrinting}
        />
      </div>

      {error && (
        <div className="mt-2 text-red-600 text-sm font-mono flex justify-end items-center">
          <span>{error}</span>
          <button
            onClick={handleRetry}
            className="ml-2 underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
