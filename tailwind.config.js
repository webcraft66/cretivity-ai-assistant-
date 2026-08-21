/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      colors: {
        // "canvas" = page background, "ink" = text-on-light. CerevityAI's
        // real identity is dark-navy-first (see the proposal deck), so the
        // dark tokens below are the primary look; light mode is a toggle.
        canvas: {
          DEFAULT: "#F5F7FB",
          soft: "#E9EDF6",
          dark: "#070A14",
          darksoft: "#0F1626",
        },
        ink: {
          DEFAULT: "#0B1220",
          soft: "#49546B",
          faint: "#8994AC",
        },
        // "coral" key kept for minimal component churn; now CerevityAI blue.
        coral: {
          DEFAULT: "#2F6FED",
          light: "#5B8CFF",
          dark: "#1E4FC2",
          50: "#EEF3FF",
          100: "#DCE6FF",
        },
        // "cobalt" key kept; now the cyan glow accent from the deck.
        cobalt: {
          DEFAULT: "#22D3EE",
          light: "#67E8F9",
          dark: "#0E92A8",
          50: "#ECFEFF",
        },
        // "lime" key kept; used sparingly for the online-status dot.
        lime: {
          DEFAULT: "#34D399",
          dark: "#0F9D6B",
        },
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #2F6FED 0%, #5B8CFF 45%, #22D3EE 100%)",
        "brand-gradient-soft": "linear-gradient(135deg, rgba(47,111,237,0.12) 0%, rgba(34,211,238,0.12) 100%)",
        "mesh-light":
          "radial-gradient(at 15% 10%, rgba(47,111,237,0.14) 0px, transparent 55%), radial-gradient(at 85% 15%, rgba(34,211,238,0.14) 0px, transparent 55%), radial-gradient(at 50% 90%, rgba(52,211,153,0.10) 0px, transparent 50%)",
        "mesh-dark":
          "radial-gradient(at 15% 8%, rgba(47,111,237,0.30) 0px, transparent 55%), radial-gradient(at 88% 18%, rgba(34,211,238,0.26) 0px, transparent 55%), radial-gradient(at 50% 96%, rgba(52,211,153,0.10) 0px, transparent 50%)",
      },
      borderRadius: {
        blob: "42% 58% 63% 37% / 41% 42% 58% 59%",
      },
      keyframes: {
        "blob-float": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(3%, -4%) scale(1.05)" },
          "66%": { transform: "translate(-3%, 3%) scale(0.97)" },
        },
        "blob-float-slow": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-4%, 4%) scale(1.08)" },
        },
        "bounce-dot": {
          "0%, 80%, 100%": { transform: "scale(0.6)", opacity: "0.4" },
          "40%": { transform: "scale(1)", opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "blob-float": "blob-float 16s ease-in-out infinite",
        "blob-float-slow": "blob-float-slow 22s ease-in-out infinite",
        "bounce-dot": "bounce-dot 1.4s infinite ease-in-out both",
        "fade-in-up": "fade-in-up 0.28s ease-out",
        "pop-in": "pop-in 0.18s ease-out",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};
