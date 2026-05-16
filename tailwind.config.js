/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light mode defaults (Tailwind compiles these)
        primary: "#0ea5e9",
        "on-primary": "#ffffff",
        "primary-container": "#e0f2fe",
        "on-primary-container": "#0c4a6e",
        secondary: "#38bdf8",
        "on-secondary": "#ffffff",
        tertiary: "#8b5cf6",
        surface: "#f1f5f9",
        "on-surface": "#0f172a",
        "on-surface-variant": "#475569",
        background: "#f8fafc",
        "on-background": "#0f172a",
        "surface-variant": "#e2e8f0",
        outline: "#94a3b8",
        "outline-variant": "#cbd5e1",
        error: "#ef4444",
        "on-error": "#ffffff",
        "error-container": "#fee2e2",
        "on-error-container": "#450a0a",
        "inverse-surface": "#1e293b",
        "inverse-on-surface": "#f8fafc",
        "inverse-primary": "#7dd3fc",
      },
      borderRadius: {
        DEFAULT: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
        full: "9999px",
      },
      spacing: {
        "container-max": "1280px",
        "stack-lg": "32px",
        "stack-sm": "8px",
        "margin-desktop": "64px",
        "margin-mobile": "20px",
        gutter: "24px",
        "stack-md": "16px",
      },
      fontFamily: {
        "body-md": ["Inter", "sans-serif"],
        "code-sm": ["JetBrains Mono", "monospace"],
        "headline-lg": ["Inter", "sans-serif"],
        "headline-lg-mobile": ["Inter", "sans-serif"],
        "label-caps": ["JetBrains Mono", "monospace"],
        "headline-xl": ["Inter", "sans-serif"],
      },
      fontSize: {
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "code-sm": ["14px", { lineHeight: "20px", fontWeight: "450" }],
        "headline-lg": [
          "32px",
          { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        "headline-lg-mobile": ["28px", { lineHeight: "36px", fontWeight: "600" }],
        "label-caps": [
          "12px",
          { lineHeight: "16px", letterSpacing: "0.1em", fontWeight: "600" },
        ],
        "headline-xl": [
          "48px",
          { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};