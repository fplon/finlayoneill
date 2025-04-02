import type { Metadata } from "next";
import { Livvic, Epilogue, Fira_Code } from "next/font/google";
import "./globals.css";

const livvic = Livvic({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-livvic",
  weight: ["400", "500", "600", "700"],
});

const epilogue = Epilogue({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-epilogue",
  weight: ["400", "500", "600", "700"],
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Finlay O'Neill",
  description: "Finlay O'Neill's portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${livvic.variable} ${epilogue.variable} ${firaCode.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
