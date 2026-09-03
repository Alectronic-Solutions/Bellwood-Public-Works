import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: "var(--gov-navy)",
          blue: "var(--gov-blue)",
          slate: "var(--gov-slate)",
          border: "var(--gov-border)",
          bg: "var(--gov-bg)",
          surface: "var(--gov-surface)",
          alert: "var(--gov-alert)",
          "alert-bg": "var(--gov-alert-bg)",
          "alert-border": "var(--gov-alert-border)",
          success: "var(--gov-success)",
          "control-border": "var(--gov-control-border)",
        },
      },
      fontFamily: {
        sans: ["var(--font-public-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        xs: ["0.875rem", { lineHeight: "1.5" }],
        sm: ["1rem", { lineHeight: "1.55" }],
        base: ["1.0625rem", { lineHeight: "1.6" }],
        lg: ["1.1875rem", { lineHeight: "1.6" }],
        xl: ["1.375rem", { lineHeight: "1.5" }],
        "2xl": ["1.625rem", { lineHeight: "1.4" }],
        "3xl": ["1.9375rem", { lineHeight: "1.3" }],
        "4xl": ["2.375rem", { lineHeight: "1.2" }],
        "5xl": ["3rem", { lineHeight: "1.15" }],
      },
      borderRadius: {
        DEFAULT: "4px",
        none: "0px",
        sm: "4px",
        md: "6px",
        lg: "8px",
        xl: "8px",
        full: "9999px",
      },
      boxShadow: {
        none: "none",
        card: "0 1px 3px rgba(27, 58, 92, 0.12), 0 1px 2px rgba(27, 58, 92, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
