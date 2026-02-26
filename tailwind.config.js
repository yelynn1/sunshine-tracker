/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-in': {
          '0%': { opacity: '0', transform: 'scale(0.8) translateY(20px)' },
          '60%': { opacity: '1', transform: 'scale(1.03) translateY(-4px)' },
          '100%': { transform: 'scale(1) translateY(0)' },
        },
        'pulse-sun': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'float-1': {
          '0%': { transform: 'translateX(-10%)' },
          '100%': { transform: 'translateX(110vw)' },
        },
        'float-2': {
          '0%': { transform: 'translateX(-8%)' },
          '100%': { transform: 'translateX(110vw)' },
        },
        'float-3': {
          '0%': { transform: 'translateX(-5%)' },
          '100%': { transform: 'translateX(110vw)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'bounce-in': 'bounce-in 0.6s ease-out',
        'pulse-sun': 'pulse-sun 2s ease-in-out infinite',
        sway: 'sway 3s ease-in-out infinite',
        'float-1': 'float-1 35s linear infinite',
        'float-2': 'float-2 25s linear infinite',
        'float-3': 'float-3 18s linear infinite',
      },
    },
  },
  plugins: [],
}
