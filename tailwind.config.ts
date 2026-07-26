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
          success: "var(--gov-success)",
        },
      },
      fontFamily: {
        sans: ["var(--font-public-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
