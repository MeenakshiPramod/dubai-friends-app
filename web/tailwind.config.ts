import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/shared/src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', '-apple-system', 'sans-serif'],
      },
      colors: {
        marine: {
          950: '#062026',
          900: '#0B353D',
          800: '#114954',
          700: '#1B6370',
          600: '#278091',
        },
        mint: {
          50: '#F0FAF8',
          100: '#D5F3EE',
          200: '#A9E8DE',
          300: '#6AD8C8',
          400: '#32C6B2',
          500: '#1BB6A2',
          600: '#149685',
        },
        coral: {
          50: '#FFF4F1',
          100: '#FFE5E0',
          200: '#FFCBC2',
          300: '#FFA494',
          400: '#FF745F',
          500: '#FF573F',
          600: '#E4432C',
          700: '#BD301C',
        },
        peach: {
          50: '#FFF8F5',
          100: '#FDEEE8',
          200: '#FAD8CC',
          300: '#F5BEAC',
        },
        pastelBlue: {
          50: '#F2F8F9',
          100: '#DDEEF1',
          200: '#C2E1E6',
        },
        cream: {
          50: '#FDFBF7',
          100: '#F8F5EE',
          200: '#EFE9DE',
          300: '#E2D9C8',
        },
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'wiggle': 'wiggle 2s ease-in-out infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
