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
        // Deep Blue Primary
        primary: {
          50: '#eef2f7',
          100: '#d4e1f0',
          200: '#a9c3e1',
          300: '#7fa5d2',
          400: '#5487c3',
          500: '#3182ce',
          600: '#2c5282',
          700: '#1a365d',
          800: '#142a47',
          900: '#0f1f35',
        },
        // Gold/Amber Secondary
        secondary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#f6e05e',
          500: '#ecc94b',
          600: '#d69e2e',
          700: '#b7791f',
          800: '#975a16',
          900: '#744210',
        },
        // Emerald Accent
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#48bb78',
          500: '#38a169',
          600: '#276749',
          700: '#22543d',
          800: '#1c4532',
          900: '#163828',
        },
        // Elegant Neutrals
        neutral: {
          50: '#f7fafc',
          100: '#e2e8f0',
          200: '#a0aec0',
          300: '#718096',
          400: '#4a5568',
          500: '#2d3748',
          600: '#1a202c',
          700: '#171923',
          800: '#0f172a',
          900: '#0a0e1a',
        },
        // Background colors
        'bg-light': {
          primary: '#ffffff',
          secondary: '#f8fafc',
          tertiary: '#fffbeb',
        },
        'bg-dark': {
          primary: '#0f172a',
          secondary: '#1e293b',
          tertiary: '#334155',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Merriweather', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #1a365d 0%, #553c9a 100%)',
        'gradient-primary': 'linear-gradient(135deg, #3182ce 0%, #2c5282 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #d69e2e 0%, #ecc94b 100%)',
        'gradient-accent': 'linear-gradient(135deg, #276749 0%, #48bb78 100%)',
      },
      boxShadow: {
        'elegant': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'elegant-lg': '0 10px 40px rgba(0, 0, 0, 0.12)',
        'elegant-dark': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'elegant-dark-lg': '0 10px 40px rgba(0, 0, 0, 0.4)',
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
