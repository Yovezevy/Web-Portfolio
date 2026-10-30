/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#0d0d0d',
        'surface-elevated': '#141414',
        border: 'rgba(242, 242, 238, 0.1)',
        'border-strong': 'rgba(242, 242, 238, 0.25)',
        text: {
          primary: '#f2f2ee',
          secondary: '#8a8a86',
          muted: '#52524e',
        },
        network: {
          active: '#22c55e',
          latency: '#10b981',
          router: '#38bdf8',
          gateway: '#a855f7',
        }
      },
      fontFamily: {
        display: ['"Big Shoulders Display"', 'system-ui', 'sans-serif'],
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.2em',
      }
    },
  },
  plugins: [],
};
