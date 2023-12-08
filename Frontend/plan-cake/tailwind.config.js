/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme")

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Urbanist': ['"Urbanist"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#1E1E1E',
        secondary: 'oklch(40% 0.23 283)',
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
        'xl': ['1.5rem', {
          lineHeight: '2rem',
          letterSpacing: '-0.01em',
          fontWeight: '500',
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
  plugins: [],
}

