"use server";

// Define proper interfaces for type safety
interface Browser {
  newPage: () => Promise<Page>;
  close: () => Promise<void>;
}

interface Page {
  setViewport: (options: {
    width: number;
    height: number;
    deviceScaleFactor: number;
  }) => Promise<void>;
  goto: (
    url: string,
    options?: { waitUntil: string; timeout: number }
  ) => Promise<void>;
  addScriptTag: (options: { content: string }) => Promise<void>;
  waitForSelector: (
    selector: string,
    options?: { timeout: number }
  ) => Promise<void>;
  evaluate: (fn: () => void) => Promise<void>;
  addStyleTag: (options: { content: string }) => Promise<void>;
  pdf: (options: PDFOptions) => Promise<Uint8Array>;
}

interface PDFOptions {
  format: string;
  printBackground: boolean;
  margin: {
    top: string;
    bottom: string;
    left: string;
    right: string;
  };
  scale: number;
  displayHeaderFooter: boolean;
  preferCSSPageSize: boolean;
  omitBackground: boolean;
  timeout: number;
}

export async function generateCvPdf(): Promise<{
  pdfBuffer: Uint8Array;
  filename: string;
}> {
  let browser: Browser | null = null;

  try {
    // Add timestamp to filename in development to prevent caching
    const isDev = process.env.NODE_ENV === "development";
    const timestamp = isDev ? `-${Date.now()}` : "";
    const filename = `CV-Finlay-ONeill${timestamp}.pdf`;

    console.log("Launching browser...");

    // Check if the environment is development
    if (isDev) {
      // Use full puppeteer in development mode - with dynamic import
      const puppeteer = await import("puppeteer");
      browser = (await puppeteer.default.launch({
        headless: true,
        args: [
          "--hide-scrollbars",
          "--disable-web-security",
          "--ignore-certificate-errors",
        ],
      })) as unknown as Browser;
    } else {
      // Import the packages required on production - with dynamic import
      console.log("Running in production mode with @sparticuz/chromium");

      // Using Function constructor to avoid TypeScript errors with dynamic imports
      // This is a workaround for the missing type declarations
      const chromiumModule = new Function(
        'return import("@sparticuz/chromium")'
      )();
      const puppeteerCore = await import("puppeteer-core");

      const chromium = await chromiumModule;

      // Log chromium info to help debug
      console.log("Chromium args:", chromium.args);
      console.log("Chromium headless:", chromium.headless);

      // Assign the browser instance with the minimal configuration
      browser = (await puppeteerCore.default.launch({
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
        defaultViewport: chromium.defaultViewport,
        args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
      })) as unknown as Browser;
    }

    if (!browser) {
      throw new Error("Failed to launch browser");
    }

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
        .catch((error: Error) =>
          console.error("Error closing browser:", error)
        );
      console.log("Browser closed");
    }
  }
}
