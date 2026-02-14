import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Healthcare color palette
        clinical: {
          navy: '#1B2A4A',
          'navy-light': '#2A3F6B',
          blue: '#0077B6',
          'blue-light': '#00B4D8',
          teal: '#007A7A',
          'teal-light': '#00A3A3',
        },
        medical: {
          red: '#DC2626',
          'red-light': '#FEE2E2',
          amber: '#F59E0B',
          'amber-light': '#FEF3C7',
          green: '#059669',
          'green-light': '#D1FAE5',
        },
        ehr: {
          bg: '#F8FAFC',
          border: '#E2E8F0',
          text: '#334155',
          muted: '#64748B',
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
