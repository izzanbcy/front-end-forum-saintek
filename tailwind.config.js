/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        strawberry: {
          50: '#fff5f7',
          100: '#ffe4e9',
          200: '#ffd1da',
          300: '#ffafbd',
          400: '#ff859b',
          500: '#ff5c7d',
          600: '#f03e61',
          700: '#d62d4e',
          800: '#b5223f',
          900: '#941b34',
        },
        matcha: {
          50: '#f4f7ed',
          100: '#e5ecd8',
          200: '#d1dab9',
          300: '#b6c38f',
          400: '#9da866',
          500: '#818d45',
          600: '#667035',
          700: '#4e5629',
          800: '#383d1d',
          900: '#242713',
        },
      },
    },
  },
  plugins: [],
}
