import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        w4y: {
          blue: "#4285F4",
          "blue-hover": "#3367D6",
          dark: "#121317",
          secondary: "#555861",
          soft: "#F8F8FB",
          cool: "#EDF2FA",
          border: "#E2E5EA",
          // Pastels
          "pastel-blue": "#E8F0FE",
          "pastel-green": "#E6F4EA",
          "pastel-amber": "#FEF7E0",
          "pastel-lavender": "#F3E8FD",
          // Status
          success: "#0F9D58",
          warning: "#F4B400",
          error: "#EA4335",
          // Dark palette
          "dark-bg": "#0C0D0F",
          "dark-surface": "#16181D",
          "dark-surface-elevated": "#1F222A",
          "dark-border": "#282C35",
          "dark-text": "#F1F3F5",
          "dark-muted": "#9AA0A6",
        },
      },
      borderRadius: {
        card: "12px",
        input: "8px",
        btn: "8px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1240px",
      },
    },
  },
  plugins: [],
};

export default config;
