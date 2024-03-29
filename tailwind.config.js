/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#13151b',
        'custom-light': '#1a1d24',
        'custom-green': '#36c0ae',
        'custom-blue': '#00b8d1',
        'custom-text': '#9ea0a2',
        'custom-hover': '#fbfbfb',
      },
      keyframes: {
        shake: {
          '0%': { transform: 'translateX(1px)' },
          '10%': { transform: 'translateX(-1px)' },
          '20%': { transform: 'translateX(1px)' },
          '30%': { transform: 'translateX(-1px)' },
          '40%': { transform: 'translateX(1px)' },
          '50%': { transform: 'translateX(-1px)' },
          '60%': { transform: 'translateX(1px)' },
          '70%': { transform: 'translateX(-1px)' },
          '80%': { transform: 'translateX(1px)' },
          '90%': { transform: 'translateX(-1px)' },
          '100%': { transform: 'translateX(0px)' },
        },
      },
      animation: {
        shake: 'shake 0.3s cubic-bezier(.36,.07,.19,.97) both',
      },
    },
  },
  plugins: [],
}