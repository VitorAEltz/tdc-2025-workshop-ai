/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{astro,html,md,mdx,js,vue}', 'node_modules/**/*.{html,vue}'],
  plugins: [require('@tailwindcss/typography')],
  important: true,
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: 'Roboto Mono'
      },
      animation: {
        blink: 'blink 1.4s infinite both'
      },
      keyframes: {
        blink: {
          '0%, 100% ': { opacity: '0.2' },
          '20%': { opacity: '1' }
        }
      }
    }
  }
}
