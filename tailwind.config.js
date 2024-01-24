/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.vue",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0c0c1a',
        light: '#d8d8d8'
      }
    },
  },
  plugins: [],
}

