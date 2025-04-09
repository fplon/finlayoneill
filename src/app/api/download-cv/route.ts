import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { generateCvPdf } from "@/lib/actions/cv.action";

export async function GET(request: NextRequest): Promise<Response> {
  try {
    // Generate the PDF on demand
    const { pdfBuffer, filename } = await generateCvPdf();

    // Determine if we're in development mode
    const isDev = process.env.NODE_ENV === "development";

    // ETag for caching - only use in production
    const etag = crypto.createHash("md5").update(pdfBuffer).digest("hex");

    // Only check ETag in production
    if (!isDev) {
      const ifNoneMatch = request.headers.get("if-none-match");
      if (ifNoneMatch === etag) {
        return new Response(null, { status: 304 }); // Not Modified
      }
    }

    // Set cache headers based on environment
    const cacheControl = isDev
      ? "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
      : "private, max-age=300";

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": pdfBuffer.byteLength.toString(),
        ...(isDev ? {} : { ETag: etag }), // Only include ETag in production
        "Cache-Control": cacheControl,
        Pragma: isDev ? "no-cache" : "",
        Expires: isDev ? "0" : "",
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "default-src 'self'",
      },
    });
  } catch (error) {
    console.error(
      "Error serving PDF:",
      error instanceof Error ? error.message : String(error)
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
