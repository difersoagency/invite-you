// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'gold': '#CEAA72',
      'dark' : '#1F1717',
      'white' : '#fff',
      'cream' : '#FCF5ED',
      'gray' : '#a2aab0'
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};