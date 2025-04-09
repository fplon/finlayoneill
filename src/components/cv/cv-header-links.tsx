"use client";

import { ScrambleLink } from "@/components/ui/scramble-link";
import React, { useState } from "react";

export function CvHeaderLinks(): JSX.Element {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async (
    event: React.MouseEvent<HTMLAnchorElement>
  ): Promise<void> => {
    event.preventDefault();

    if (isGenerating) return;

    try {
      setError(null);
      setIsGenerating(true);

      // Add cache-busting query parameter
      const cacheBuster = `?t=${Date.now()}`;

      // Fetch from the API endpoint with a timeout to track when generation is complete
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60-second timeout

      const response = await fetch(`/api/download-cv${cacheBuster}`, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Get the PDF data as a blob
      const pdfBlob = await response.blob();

      // Create a download link for the blob
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "CV-Finlay-ONeill.pdf";
      document.body.appendChild(link);
      link.click();

      // Clean up
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      }, 100);
    } catch (error) {
      console.error("Error downloading CV:", error);
      setError("Failed to generate CV. Please try again later.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Retry handler
  const handleRetry = (): void => {
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto mb-6 print:hidden flex flex-col">
      <div className="flex justify-between items-center">
        <ScrambleLink href="/" text="< return_home" />
        <ScrambleLink
          href="#"
          text={isGenerating ? "generating_pdf..." : "download_cv >"}
          onClick={handleDownload}
          className="text-right"
          disabled={isGenerating}
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
