/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FAF8F5',
          100: '#F5F0E8',
          200: '#E8DCC9',
          300: '#D4C4A8',
          400: '#B8A284',
          500: '#8B7355',
          600: '#6E5A43',
          700: '#544333',
          800: '#3D3126',
          900: '#2A231C',
        },
        accent: {
          50: '#E8F5F0',
          100: '#B8E6D5',
          200: '#8AD7BA',
          300: '#5CC89F',
          400: '#40B98A',
          500: '#2D6A4F',
          600: '#255A42',
          700: '#1D4935',
          800: '#163828',
          900: '#0E271B',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
