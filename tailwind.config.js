/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Green Primary (Emerald)
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        // Warm Neutrals
        warm: {
          50: '#fefdfb',
          100: '#faf8f5',
          200: '#f0ebe3',
          300: '#e2d9cc',
          400: '#c4b5a0',
          500: '#a69478',
          600: '#8b7355',
          700: '#6b5a45',
          800: '#4a3f31',
          900: '#2d2620',
        },
        // Accent Colors
        accent: {
          gold: '#f59e0b',
          coral: '#f87171',
          sky: '#38bdf8',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Merriweather', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #fefdfb 100%)',
        'gradient-primary': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
        'gradient-accent': 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      },
      boxShadow: {
        'elegant': '0 4px 20px rgba(16, 185, 129, 0.1)',
        'elegant-lg': '0 10px 40px rgba(16, 185, 129, 0.15)',
        'green-soft': '0 4px 15px rgba(16, 185, 129, 0.08)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}
