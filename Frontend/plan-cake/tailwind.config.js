/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'Urbanist': ['"Urbanist"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // Off White
        default: '#D9D9D9',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // ShadCN colors
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        accent2: {
          DEFAULT: "hsl(var(--accent2))",
          foreground: "hsl(var(--accent2-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      spacing: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px'
      },
      screens: {
        'xs': '380px', // SE not included
        'sm': '640px', // large sc
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },y: 'oklch(45% 0.2 270)',
      fontSize: {
        'm-s': ['0.75rem', {
          // lineHeight: '1rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        }],
        'm-m': ['1rem', {
          lineHeight: '1.5rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        }],
        'm-l': ['1.25rem', {
          lineHeight: '1.25rem',
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'slide-down': 'slide-down 0.2s ease-out',
        'slide-up': 'slide-up 0.2s ease-out', 
      },
      keyframes: {
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '1' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-20px)', opacity: '1' }, 
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/aspect-ratio'),
  ],
}