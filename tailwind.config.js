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
      '1/4': '300px',
    }
  },
  plugins: [],
}
