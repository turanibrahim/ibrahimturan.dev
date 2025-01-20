module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,vue}',
  ],
  theme: {
    borderRadius: {
      'none': '0',
      'sm': '0.25rem',
      DEFAULT: '0.50rem',
      'md': '0.75rem',
      'lg': '1rem',
      'xl': '1.5rem',
      '2xl': '2rem',
      '3xl': '3rem',
      'full': '9999px',
    },
    extend: {
      //
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1.2rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  variants: {},
  daisyui: {
    themes: [
      {
        light: {
          primary: '#2E4057',
          'primary-content': '#f5f5f4',
          secondary: '#E55812',
          'secondary-content': '#f5f5f4',
          accent: '#9A98B5',
          'accent-content': '#f5f5f4',
          neutral: '#191D24',
          'base-100': '#f5f5f4',
          info: '#3C91E6',
          'info-content': '#191D24',
          success: '#23967F',
          'success-content': '#f5f5f4',
          warning: '#FBBD23',
          'warning-content': '#191D24',
          error: '#BA1200',
          'error-content': '#f5f5f4',
          "--rounded-box": "2rem",
          "--rounded-btn": "1rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-text-case": "uppercase",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "1rem",
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
