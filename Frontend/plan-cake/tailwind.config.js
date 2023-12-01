/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
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
    },y: 'oklch(45% 0.2 270)'
  },
  plugins: [],
}

