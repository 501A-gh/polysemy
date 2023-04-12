/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        blurShowKeyframes: {
          '0%': { opacity: '0' },
          '50%': { filter: 'blur(10px)' },
        }
      },
      animation: {
        'blur-show-ani': 'blurShowKeyframes 2s linear',
      },
    },
  },
  plugins: [],
}
