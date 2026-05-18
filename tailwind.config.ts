import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        black: 'rgb(var(--black-rgb) / <alpha-value>)',
        cream: 'rgb(var(--cream-rgb) / <alpha-value>)',
        red: 'rgb(var(--red-rgb) / <alpha-value>)',
        gold: 'rgb(var(--gold-rgb) / <alpha-value>)',
        gray: 'rgb(var(--gray-rgb) / <alpha-value>)',
      },
      fontFamily: {
        fd: ['var(--font-fd)', 'system-ui', 'sans-serif'],
        fs: ['var(--font-fs)', 'Georgia', 'serif'],
        fb: ['var(--font-fb)', 'Impact', 'sans-serif'],
      },
      maxWidth: {
        '7xl': '80rem',
      },
    },
  },
  plugins: [],
};

export default config;
