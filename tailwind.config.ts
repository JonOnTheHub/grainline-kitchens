import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "base":        "#F5F2ED",
        "ink":         "#111111",
        "ink-muted":   "rgba(17,17,17,0.55)",
        "ink-faint":   "rgba(17,17,17,0.12)",
        "ochre":       "#C8953A",
        "ochre-dark":  "#A8751A",
        "terracotta":  "#B35C44",
        "white":       "#FFFFFF",
      },
      fontFamily: {
        display:  ["var(--font-space-grotesk)", "sans-serif"],
        body:     ["var(--font-work-sans)",    "sans-serif"],
        mono:     ["ui-monospace", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(3.5rem,8vw,7rem)",   { lineHeight: "0.9",  letterSpacing: "-0.04em", fontWeight: "700" }],
        "display-xl":  ["clamp(2.5rem,5vw,5rem)",   { lineHeight: "0.95", letterSpacing: "-0.03em", fontWeight: "700" }],
        "headline-lg": ["clamp(1.75rem,3vw,3rem)",  { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-md": ["clamp(1.25rem,2vw,2rem)",  { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "700" }],
        "label-caps":  ["0.7rem",  { lineHeight: "1", letterSpacing: "0.12em", fontWeight: "600" }],
        "data-sm":     ["0.75rem", { lineHeight: "1.4", fontWeight: "400" }],
        "body-sm":     ["0.875rem",{ lineHeight: "1.6" }],
        "body-md":     ["1rem",    { lineHeight: "1.65" }],
        "body-lg":     ["1.125rem",{ lineHeight: "1.7" }],
      },
      borderRadius: {
        DEFAULT: "0px",
        none:    "0px",
        sm:      "0px",
        md:      "0px",
        lg:      "0px",
        xl:      "0px",
        full:    "0px",
      },
      borderColor: {
        DEFAULT: "#111111",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "nav": "5rem",
      },
    },
  },
  plugins: [],
};

export default config;