/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7f7',
          100: '#b3e6e6',
          200: '#80d5d5',
          300: '#4dc4c4',
          400: '#1ab3b3',
          500: '#00A6A6', // Main teal blue
          600: '#009999',
          700: '#008080',
          800: '#006666',
          900: '#004d4d',
        },
        secondary: {
          50: '#fff9e6',
          100: '#ffecb3',
          200: '#ffdf80',
          300: '#ffd24d',
          400: '#ffc51a',
          500: '#FFD166', // Warm yellow
          600: '#e6bc5c',
          700: '#cca752',
          800: '#b39247',
          900: '#997d3d',
        },
        accent: {
          50: '#fdeef2',
          100: '#f9c8d4',
          200: '#f5a2b6',
          300: '#f17c98',
          400: '#ed567a',
          500: '#EF476F', // Coral pink
          600: '#d73f63',
          700: '#bf3757',
          800: '#a72f4b',
          900: '#8f273f',
        },
        background: {
          primary: '#F5F9FA', // Light off-white
          secondary: '#ffffff',
          muted: '#f8fafb',
        },
        text: {
          primary: '#2D2D2D', // Charcoal gray
          secondary: '#555555', // Muted gray
          light: '#888888',
          white: '#ffffff',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-5px)' },
          '60%': { transform: 'translateY(-3px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
