import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Core brand colors from branding kit
          purple:       "#38226C", // Core Purple - CTAs, primary actions
          indigo:       "#6A4DFB", // Electric Indigo - accents, AI interactions
          orange:       "#FFB252", // Warm Orange - alerts, progress, forward movement
          cream:        "#FFCD94", // Soft Cream - primary background
          grey:         "#F9F8F6", // Muted Grey - sections, dividers
          // Derived
          "purple-dark":  "#2A1754",
          "purple-light": "#4F3A8A",
          "indigo-light": "#8B72FC",
          "navy":         "#1A1528",
        },
      },
      fontFamily: {
        display: ["'DM Sans'", "sans-serif"],
        body:    ["'DM Sans'", "sans-serif"],
        sans:    ["'DM Sans'", "sans-serif"],
      },
      animation: {
        "fade-up":     "fadeUp 0.7s ease-out forwards",
        "fade-in":     "fadeIn 0.5s ease-out forwards",
        "slide-left":  "slideLeft 0.7s ease-out forwards",
        "slide-right": "slideRight 0.7s ease-out forwards",
        "float":       "float 6s ease-in-out infinite",
        "pulse-slow":  "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "gradient":    "gradientShift 8s ease infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideLeft: {
          "0%":   { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideRight: {
          "0%":   { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
      },
      backgroundSize: {
        "300%": "300%",
      },
      maxWidth: {
        "8xl": "1280px",
      },
      boxShadow: {
        "glow-purple": "0 0 40px rgba(106,77,251,0.25)",
        "glow-orange": "0 0 40px rgba(255,178,82,0.30)",
        "card":        "0 4px 24px rgba(56,34,108,0.08)",
        "card-hover":  "0 12px 48px rgba(56,34,108,0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
