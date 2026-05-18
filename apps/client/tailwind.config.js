/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Assistant', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'Consolas', 'monospace'],
      },
      colors: {
        surface: '#111118',
        'surface-elevated': '#1a1a28',
      },
    },
  },
  plugins: [],
}
