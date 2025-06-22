/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#4A90A4', // Trustworthy Mediterranean blue - blue-600
        'primary-50': '#EBF4F6', // Light blue tint - blue-50
        'primary-100': '#D7E9ED', // Lighter blue - blue-100
        'primary-200': '#B0D3DB', // Light blue - blue-200
        'primary-300': '#88BDC9', // Medium light blue - blue-300
        'primary-400': '#66A6B6', // Medium blue - blue-400
        'primary-500': '#4A90A4', // Base primary - blue-500
        'primary-600': '#3E7A8A', // Darker blue - blue-600
        'primary-700': '#326470', // Dark blue - blue-700
        'primary-800': '#264E56', // Very dark blue - blue-800
        'primary-900': '#1A383C', // Darkest blue - blue-900

        // Secondary Colors
        'secondary': '#7BA05B', // Natural sage green - green-600
        'secondary-50': '#F2F6EE', // Light green tint - green-50
        'secondary-100': '#E5EDDD', // Lighter green - green-100
        'secondary-200': '#CBDBBB', // Light green - green-200
        'secondary-300': '#B1C999', // Medium light green - green-300
        'secondary-400': '#96B577', // Medium green - green-400
        'secondary-500': '#7BA05B', // Base secondary - green-500
        'secondary-600': '#68874D', // Darker green - green-600
        'secondary-700': '#556E3F', // Dark green - green-700
        'secondary-800': '#425531', // Very dark green - green-800
        'secondary-900': '#2F3C23', // Darkest green - green-900

        // Accent Colors
        'accent': '#E8B86D', // Warm golden tone - amber-400
        'accent-50': '#FDF8F0', // Light amber tint - amber-50
        'accent-100': '#FBF1E1', // Lighter amber - amber-100
        'accent-200': '#F7E3C3', // Light amber - amber-200
        'accent-300': '#F3D5A5', // Medium light amber - amber-300
        'accent-400': '#EFC787', // Medium amber - amber-400
        'accent-500': '#E8B86D', // Base accent - amber-500
        'accent-600': '#D4A55C', // Darker amber - amber-600
        'accent-700': '#B8924B', // Dark amber - amber-700
        'accent-800': '#9C7F3A', // Very dark amber - amber-800
        'accent-900': '#806C29', // Darkest amber - amber-900

        // Background Colors
        'background': '#FDFCFA', // Soft off-white - neutral-50
        'surface': '#F8F6F3', // Elevated surface - neutral-100
        'surface-hover': '#F3F1EE', // Surface hover state - neutral-200

        // Text Colors
        'text-primary': '#2D3748', // Deep charcoal - gray-800
        'text-secondary': '#718096', // Balanced gray - gray-500
        'text-muted': '#A0AEC0', // Muted text - gray-400
        'text-inverse': '#FFFFFF', // White text - white

        // Status Colors
        'success': '#68A063', // Harmonious green - green-600
        'success-light': '#C6F6D5', // Light success - green-100
        'warning': '#D69E2E', // Earthy amber - yellow-600
        'warning-light': '#FEFCBF', // Light warning - yellow-100
        'error': '#C53030', // Clear red - red-600
        'error-light': '#FED7D7', // Light error - red-100

        // Border Colors
        'border': 'rgba(113, 128, 150, 0.2)', // Subtle border - gray-500 with opacity
        'border-light': 'rgba(113, 128, 150, 0.1)', // Lighter border - gray-500 with opacity
        'border-focus': '#4A90A4', // Focus border - primary
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Nunito Sans', 'system-ui', 'sans-serif'],
        'caption': ['Source Sans Pro', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'lg': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'xl': '0 12px 32px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'gentle-bounce': 'gentleBounce 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'pulse-gentle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gentleBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        slideUp: {
          'from': { 
            opacity: '0',
            transform: 'translateY(10px)'
          },
          'to': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
      },
      transitionTimingFunction: {
        'gentle': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '350': '350ms',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}