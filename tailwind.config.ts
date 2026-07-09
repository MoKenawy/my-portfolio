import type { Config } from "tailwindcss";

// Manuscript design system — tokens map to the CSS custom properties in
// globals.css so light/dark stays a single source of truth (design.md Rev B).
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ground: "var(--ground)",
        paper: "var(--paper)",
        mid: "var(--mid)",
        hairline: "var(--hairline)",
        accent: "var(--accent)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        arabic: ["var(--font-arabic)", "Segoe UI", "Tahoma", "sans-serif"],
      },
      maxWidth: {
        measure: "var(--measure)",
      },
      letterSpacing: {
        label: "0.1em",
      },
    },
  },
  // Dark/light is driven by the data-theme attribute on <html>, not a class.
  darkMode: ["selector", '[data-theme="dark"]'],
  plugins: [],
};
export default config;
