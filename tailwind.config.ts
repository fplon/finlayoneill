import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        epilogue: ["var(--font-epilogue)"],
        livvic: ["var(--font-livvic)"],
        firaCode: ["var(--font-fira-code)"],
      },
      colors: {
        roughAsphalt: "#bebebe",
        cocosBlacks: "#1c1c1c",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        typewriter: "typing 1s steps(20)",
      },
    },
  },
  plugins: [],
};

export default config;
