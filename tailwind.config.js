/** @type {import('tailwindcss').Config} */

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
        blurShowKeyframes: {
          "0%": { opacity: "0" },
          "50%": { filter: "blur(10px)" },
        },
      },
      animation: {
        "blur-show-ani": "blurShowKeyframes 2s linear infinite",
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
  plugins: [],
};
