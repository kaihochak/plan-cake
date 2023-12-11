/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme")

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xl': '380px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      fontFamily: {
        'Urbanist': ['"Urbanist"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#1E1E1E',
        secondary: '#FFFFFF',
        default: '#FFFFFF',
        error: 'oklch(54% 0.22 29)'
      },
      spacing: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px'
      },
      screens: {
        'sm': '640px',
        'md': '768px'
      },y: 'oklch(45% 0.2 270)',
      fontSize: {
        'm-s': ['0.75rem', {
          // lineHeight: '1rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        }],
        'm-xl': ['1.75rem', {
          lineHeight: '2rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        }],
        'm-2xl': ['2.25rem', {
          lineHeight: '2rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        }],
        '3xl': ['1.875rem', {
          lineHeight: '2.25rem',
          letterSpacing: '-0.02em',
          fontWeight: '700',
        }],
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

