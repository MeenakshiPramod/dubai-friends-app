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
      colors: {
        dubai: {
          gold: '#D4AF37',
          deepGold: '#AA820A',
          sand: '#F7F4EE',
          dark: '#0F172A',
          navy: '#1E293B'
        }
      }
    },
  },
  plugins: [],
};
export default config;
