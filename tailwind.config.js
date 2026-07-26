/** @type {import('tailwindcss').Config} */
module.exports = {
  // NativeWind content scan — covers all source files
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // ─── Colors ────────────────────────────────────────────────────────────
      // Derived directly from DESIGN.md
      colors: {
        // Brand / Action
        primary: "#292524",
        "primary-active": "#0c0a09",
        ink: "#0c0a09",

        // Text
        body: "#4e4e4e",
        "body-strong": "#292524",
        muted: "#777169",
        "muted-soft": "#a8a29e",

        // Hairlines / Dividers
        hairline: "#e7e5e4",
        "hairline-soft": "#f0efed",
        "hairline-strong": "#d6d3d1",

        // Surfaces / Canvas
        canvas: "#f5f5f5",
        "canvas-soft": "#fafafa",
        "canvas-deep": "#0c0a09",
        "surface-card": "#ffffff",
        "surface-strong": "#f0efed",
        "surface-dark": "#0c0a09",
        "surface-dark-elevated": "#1c1917",

        // On-surface text
        "on-primary": "#ffffff",
        "on-dark": "#ffffff",
        "on-dark-soft": "#a8a29e",

        // Atmospheric gradient orbs (decoration only — never CTA fills)
        "gradient-mint": "#a7e5d3",
        "gradient-peach": "#f4c5a8",
        "gradient-lavender": "#c8b8e0",
        "gradient-sky": "#a8c8e8",
        "gradient-rose": "#e8b8c4",

        // Semantic
        "semantic-error": "#dc2626",
        "semantic-success": "#16a34a",
      },

      // ─── Typography ────────────────────────────────────────────────────────
      fontFamily: {
        // Display serif — EB Garamond is the open-source substitute for Waldenburg Light
        display: ["EBGaramond_300Light", "Times New Roman", "serif"],
        // Body / UI — Inter
        sans: ["Inter_400Regular", "sans-serif"],
        "sans-medium": ["Inter_500Medium", "sans-serif"],
        "sans-semibold": ["Inter_600SemiBold", "sans-serif"],
      },

      fontSize: {
        // Display scale (Waldenburg Light equivalents)
        "display-mega": ["64px", { lineHeight: "1.05", letterSpacing: "-1.92px" }],
        "display-xl": ["48px", { lineHeight: "1.08", letterSpacing: "-0.96px" }],
        "display-lg": ["36px", { lineHeight: "1.17", letterSpacing: "-0.36px" }],
        "display-md": ["32px", { lineHeight: "1.13", letterSpacing: "-0.32px" }],
        "display-sm": ["24px", { lineHeight: "1.2", letterSpacing: "0" }],
        // Inter scale
        "title-md": ["20px", { lineHeight: "1.35", letterSpacing: "0" }],
        "title-sm": ["18px", { lineHeight: "1.44", letterSpacing: "0.18px" }],
        "body-md": ["16px", { lineHeight: "1.5", letterSpacing: "0.16px" }],
        "body-strong": ["16px", { lineHeight: "1.5", letterSpacing: "0.16px" }],
        "body-sm": ["15px", { lineHeight: "1.47", letterSpacing: "0.15px" }],
        caption: ["14px", { lineHeight: "1.5", letterSpacing: "0" }],
        "caption-upper": ["12px", { lineHeight: "1.4", letterSpacing: "0.96px" }],
        btn: ["15px", { lineHeight: "1.0", letterSpacing: "0" }],
        "nav-link": ["15px", { lineHeight: "1.4", letterSpacing: "0" }],
      },

      fontWeight: {
        light: "300",
        regular: "400",
        medium: "500",
        semibold: "600",
      },

      // ─── Border Radius ─────────────────────────────────────────────────────
      borderRadius: {
        none: "0px",
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        xxl: "24px",
        pill: "9999px",
        full: "9999px",
      },

      // ─── Spacing ───────────────────────────────────────────────────────────
      // Extends the default Tailwind spacing scale with named Atlas tokens
      spacing: {
        xxs: "4px",
        xs: "8px",
        sm: "12px",
        base: "16px",
        md: "20px",
        lg: "24px",
        xl: "32px",
        xxl: "48px",
        section: "96px",
      },

      // ─── Box Shadow ────────────────────────────────────────────────────────
      boxShadow: {
        card: "0 4px 16px rgba(0, 0, 0, 0.04)",
        "card-hover": "0 8px 24px rgba(0, 0, 0, 0.08)",
      },

      // ─── Component heights ─────────────────────────────────────────────────
      height: {
        "btn-primary": "40px",
        "text-input": "44px",
        "top-nav": "64px",
        "voice-icon": "32px",
      },

      width: {
        "voice-icon": "32px",
      },
    },
  },
  plugins: [],
};
