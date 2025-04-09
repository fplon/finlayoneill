"use server";

import puppeteer from "puppeteer";

export async function generateCvPdf(): Promise<{
  pdfBuffer: Uint8Array;
  filename: string;
}> {
  let browser;
  try {
    // Add timestamp to filename in development to prevent caching
    const isDev = process.env.NODE_ENV === "development";
    const timestamp = isDev ? `-${Date.now()}` : "";
    const filename = `CV-Finlay-ONeill${timestamp}.pdf`;

    // Launch Puppeteer with appropriate settings for Vercel
    const options = {
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--hide-scrollbars",
        "--disable-web-security",
        "--font-render-hinting=none", // Improve font rendering
        "--single-process", // Recommended for serverless environments
      ],
      ignoreHTTPSErrors: true,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    };

    // In production, we need to explicitly install the browser first
    if (!isDev) {
      try {
        // Only try to install Chrome if we're in a serverless environment
        // and there's no custom executable path provided
        if (!process.env.PUPPETEER_EXECUTABLE_PATH) {
          // Dynamically import for better code splitting
          const { execSync } = await import("child_process");

          // Use Chrome stable version
          console.log("Installing Chrome in serverless environment...");
          execSync("npx puppeteer browsers install chrome@stable");
        }
      } catch (installError) {
        console.error("Error installing Chrome:", installError);
        // Continue anyway - Chrome might be available from the vercel.json installCommand
      }
    }

    console.log("Launching browser...");
    browser = await puppeteer.launch(options);
    console.log("Browser launched successfully");

    const page = await browser.newPage();

    // Set viewport for consistent rendering
    await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

    // Navigate to the CV page
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    console.log(`Using base URL: ${baseUrl}`);

    // First navigate to a blank page to load fonts
    await page.goto("about:blank");

    // Add font preloading
    console.log("Adding font preloading...");
    await page.addScriptTag({
      content: `
        // Preload Epilogue font files
        const fontUrls = [
          'https://fonts.gstatic.com/s/epilogue/v17/O4ZRFGj5hxF0EhjimlIrsgg4lWmc.woff2',
          'https://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjKngomvni0.woff2',
          'https://fonts.gstatic.com/s/epilogue/v17/O4ZSFGj5hxF0EhjilIHX16HMcng.woff2'
        ];

        fontUrls.forEach(url => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = url;
          link.as = 'font';
          link.type = 'font/woff2';
          link.crossOrigin = 'anonymous';
          document.head.appendChild(link);
        });
      `,
    });

    // Additional console logs for debugging
    console.log("Navigating to CV page...");

    // Now navigate to the actual CV page
    await page.goto(`${baseUrl}/cv?print=true`, {
      waitUntil: "networkidle0",
      timeout: 30000, // 30 second timeout
    });
    console.log("CV page loaded");

    // Wait for specific content to ensure it's fully loaded
    await page.waitForSelector(".max-w-4xl", { timeout: 5000 });

    // Preload and force Epilogue font application
    console.log("Applying fonts...");
    await page.evaluate(() => {
      // Load the actual font files
      const fontFiles = [
        "https://fonts.gstatic.com/s/epilogue/v17/O4ZRFGj5hxF0EhjimlIrsgg4lWmc.woff2",
        "https://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjKngomvni0.woff2",
      ];

      // Preload the font files
      fontFiles.forEach((url) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, false); // Synchronous loading
        xhr.send();
      });

      // Force Epilogue on all elements
      const allElements = document.querySelectorAll("*");
      allElements.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.fontFamily = "Epilogue, sans-serif";
        }
      });
    });

    // Add a delay to ensure fonts apply
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Inject Epilogue font directly to ensure it's available
    await page.addStyleTag({
      content: `
        @import url('https://fonts.googleapis.com/css2?family=Epilogue:wght@400;500;600;700&display=swap');
      `,
    });

    // Add print CSS to ensure formatting is correct
    await page.addStyleTag({
      content: `
        @media print {
          @font-face {
            font-family: 'Epilogue';
            font-style: normal;
            font-weight: 400;
            src: url(https://fonts.gstatic.com/s/epilogue/v17/O4ZRFGj5hxF0EhjimlIrsgg4lWmc.woff2) format('woff2');
          }
          @font-face {
            font-family: 'Epilogue';
            font-style: normal;
            font-weight: 500;
            src: url(https://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjKngomvni0.woff2) format('woff2');
          }
          @font-face {
            font-family: 'Epilogue';
            font-style: normal;
            font-weight: 600;
            src: url(https://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjKngomvni0.woff2) format('woff2');
          }
          @font-face {
            font-family: 'Epilogue';
            font-style: normal;
            font-weight: 700;
            src: url(https://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjKngomvni0.woff2) format('woff2');
          }

          body {
            -webkit-print-color-adjust: exact;
            margin: 0;
            padding: 0;
            min-height: 0 !important;
            height: auto !important;
            background-color: white !important;
            font-family: 'Epilogue', sans-serif !important;
          }
          .print\\:hidden { display: none !important; }
          html, body {
            min-height: 0 !important;
          }
          /* Fix font sizing to match web display */
          h1 {
            font-size: 2.5rem !important;
            line-height: 1.2 !important;
            letter-spacing: -0.025em !important;
            text-transform: uppercase !important;
            font-weight: bold !important;
            font-family: 'Epilogue', sans-serif !important;
          }
          h2 {
            font-size: 1.25rem !important;
            line-height: 1.3 !important;
            font-weight: 600 !important;
            text-transform: uppercase !important;
            font-family: 'Epilogue', sans-serif !important;
          }
          /* Job title (role) */
          h3 {
            font-size: 1.125rem !important;
            line-height: 1.4 !important;
            font-weight: 600 !important;
            font-family: 'Epilogue', sans-serif !important;
          }
          /* Company name */
          .text-md {
            font-size: 1rem !important;
            font-weight: 500 !important;
            font-family: 'Epilogue', sans-serif !important;
          }
          /* Remove print size adjustments */
          .print\\:text-2xl {
            font-size: 2.5rem !important;
          }
          .print\\:text-lg, .print\\:text-base {
            font-size: 1.125rem !important;
          }
          .print\\:text-sm {
            font-size: 1rem !important;
          }
          .print\\:text-xs {
            font-size: 0.875rem !important;
          }
          /* Ensure consistent font */
          * {
            font-family: 'Epilogue', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          }
        }
      `,
    });
    console.log("CV content loaded and fonts applied");

    // Generate PDF with settings for optimal readability and return as buffer
    console.log("Generating PDF...");
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "10px",
        bottom: "10px",
        left: "10px",
        right: "10px",
      },
      scale: 1.0,
      displayHeaderFooter: false,
      preferCSSPageSize: true,
      omitBackground: false,
      timeout: 60000,
    });
    console.log("PDF generated successfully");

    return { pdfBuffer, filename };
  } catch (error) {
    console.error(
      "Error generating PDF:",
      error instanceof Error ? error.message : String(error)
    );
    throw new Error("Failed to generate CV PDF");
  } finally {
    // Ensure browser is always closed, even in case of errors
    if (browser) {
      console.log("Closing browser...");
      await browser
        .close()
        .catch((err) => console.error("Error closing browser:", err));
      console.log("Browser closed");
    }
  }
}
