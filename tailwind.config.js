/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    minHeight: {
      '1/2': '50%',
    },
    minWidth: {
      '1/3': '300px',
    }
  },
  plugins: [],
}
