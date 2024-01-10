/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#24344c',
        'custom-green': '#36c0ae',
        'custom-blue': '#00b8d1',
        'custom-text': '#afb9c9',
        'custom-hover': '#deeaff',
      },
    },
  },
  plugins: [],
}