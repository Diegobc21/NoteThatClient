/** @type {import('tailwindcss').Config} */

const {environment} = require("./src/environments/environment");
import animations from '@midudev/tailwind-animations'

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
  darkMode: 'class',
  mode: 'jit',
  plugins: [animations],
  ...(environment.production ? { cssnano: {} } : {})
}
