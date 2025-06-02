/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'neutra': ['Neutra Text', 'sans-serif'],
        'cormorant': ['Cormorant Garamond', 'serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      aspectRatio: {
        '3/4': '3 / 4',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}