/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          50: '#faf5ff',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        }
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.6s ease-out forwards',
        'slideInLeft': 'slideInLeft 0.6s ease-out forwards',
        'slideInRight': 'slideInRight 0.6s ease-out forwards',
        'scaleIn': 'scaleIn 0.5s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 2s ease-in-out infinite',
        'idle-wobble': 'idle-wobble 4s ease-in-out infinite',
        'aurora-1': 'aurora-1 20s ease-in-out infinite',
        'aurora-2': 'aurora-2 25s ease-in-out infinite',
        'aurora-3': 'aurora-3 30s ease-in-out infinite',
      },
      backdropBlur: {
        'xs': '2px',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      perspective: {
        '1000': '1000px',
      },
      rotate: {
        'y-180': '180deg',
      }
    },
  },
  plugins: [],
};