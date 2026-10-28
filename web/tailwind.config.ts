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
        cream: {
          50: '#FAF8F4',
          100: '#F5F2EB',
          200: '#EDE8DE',
          300: '#DFD8C9',
          400: '#C7BDAB',
        },
        forest: {
          50: '#F2F6F3',
          100: '#E2ECE5',
          200: '#C5D9CD',
          300: '#9FBFA9',
          600: '#2A5C46',
          700: '#1F4735',
          800: '#173628',
          900: '#10271D',
          950: '#0A1B13',
        },
        terracotta: {
          50: '#FDF6F3',
          100: '#FAE8E2',
          200: '#F4D2C5',
          500: '#D96B47',
          600: '#C55532',
          700: '#A44224',
        },
        pastel: {
          mint: '#D8EDE2',
          sage: '#E3ECE7',
          peach: '#FBE8DF',
          sand: '#F6F3EC',
          coral: '#F7C5B8',
          sky: '#E5F0F5',
        }
      }
    },
  },
  plugins: [],
};
export default config;
