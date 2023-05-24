/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontSize: {
        'body-lg': '1rem',
        'body': '.875rem',
      }
    },
  },
  plugins: []
}
