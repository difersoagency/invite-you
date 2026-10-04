// tailwind.config.js
const {nextui} = require("@nextui-org/react");
const defaultColors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#CEAA72",
          50: "#FBF6EE",
          100: "#F5EAD8",
          200: "#EBD5B1",
          300: "#DFBF8D",
          400: "#CEAA72",
          500: "#B88F52",
          600: "#9A7440",
          700: "#7A5B33",
        },
        dark: "#1F1717",
        ink: { DEFAULT: "#121010", 800: "#1C1919", 700: "#2A2626", 600: "#3A3535" },
        line: "#E7E1D8",
        cream: "#FCF5ED",
        ivory: "#FBF8F3",
        gray: { ...defaultColors.gray, DEFAULT: "#a2aab0" },
      },
      fontFamily: {
        sans: ["Montserrat", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["'Playfair Display'", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 1px 0 rgba(18,16,16,0.04)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FBF8F3",
            foreground: "#121010",
            primary: { DEFAULT: "#121010", foreground: "#FFFFFF" },
            focus: "#121010",
          },
        },
      },
    }),
  ],
};
