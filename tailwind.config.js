/** @type {import('tailwindcss').Config} */

const { default: plugin } = require("tailwindcss");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        showAni: {
          "0%": {
            opacity: "0",
            transform: "scale(0.5)",
          },
          "40%": {
            filter: "blur(2px)",
            transform: " scale(1.01)",
          },
        },
        slideFromAbove: {
          "0%": {
            opacity: "0",
            transform: "translateY(-50%)",
          },
          "40%": {
            filter: "blur(2px)",
            transform: "translateY(10%)",
          },
        },
      },
      animation: {
        show: "showAni 0.5s ease",
        "slide-from-above": "slideFromAbove 0.6s ease",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-spaceMono)"],
        serif: ["var(--font-playfairDisplay)"],
      },
      boxShadow: {
        "gray-700-highlight": `inset 0 1px 0 0 #374151`,
        "gray-600-highlight": `inset 0 1px 0 0 #4b5563`,
        "gray-500-highlight": `inset 0 1px 0 0 #6b7280`,
        "gray-400-highlight": `inset 0 1px 0 0 #9ca3af`,
        "gray-300-highlight": `inset 0 1px 0 0 #d1d5db`,
        "gray-200-highlight": `inset 0 1px 0 0 #e5e7eb`,
        "gray-100-highlight": `inset 0 1px 0 0 #f3f4f6`,
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("hocus", ["&:hover", "&:focus"]);
    },
  ],
};
