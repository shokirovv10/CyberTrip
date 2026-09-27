import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: '#0B0F14',
        card: '#111827',
        elevated: '#1F2937',
        subtle: '#1F2937',
        primary: '#F9FAFB',
        secondary: '#9CA3AF',
        muted: '#6B7280',
        accent: {
          green: '#10B981',
          blue: '#3B82F6',
          purple: '#8B5CF6',
          yellow: '#F59E0B',
          red: '#EF4444',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
