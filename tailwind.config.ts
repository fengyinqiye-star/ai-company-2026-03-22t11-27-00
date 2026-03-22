import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        travel: {
          bg:            '#F9F7F4',
          'bg-alt':      '#F3F0EB',
          cream:         '#EDE8E0',
          'text-primary':   '#1E1B16',
          'text-secondary': '#6B6459',
          'text-muted':     '#9C9389',
          border:        '#DDD8CF',
        },
        stone: {
          50:  '#FAF9F7',
          100: '#F5F2EE',
          200: '#E8E2D9',
          300: '#D4C9BB',
          400: '#B09A85',
          500: '#7A6450',
          600: '#5E4B3A',
          700: '#473928',
          800: '#2A2018',
          900: '#1A130E',
        },
        jade: {
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
      },
      fontFamily: {
        'heading-en': ['var(--font-cormorant)', 'serif'],
        'heading-ja': ['var(--font-noto-serif)', 'serif'],
        body:         ['var(--font-noto-sans)',  'sans-serif'],
      },
      fontSize: {
        hero:         ['3rem',    { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'hero-sp':    ['1.875rem',{ lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'section':    ['1.75rem', { lineHeight: '1.4',  letterSpacing: '0.04em'  }],
        'section-sp': ['1.375rem',{ lineHeight: '1.4',  letterSpacing: '0.04em'  }],
      },
      spacing: {
        section:    '5rem',
        'section-sp': '3rem',
      },
      maxWidth: {
        content: '1200px',
        narrow:  '800px',
      },
      borderRadius: {
        card: '0.875rem',
      },
      boxShadow: {
        card:       '0 2px 16px rgba(30, 27, 22, 0.08)',
        'card-hover':'0 8px 32px rgba(30, 27, 22, 0.14)',
        header:     '0 2px 8px rgba(30, 27, 22, 0.06)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in':    'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
