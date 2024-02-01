/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      // 'sans': ['Geist-Variable'],
      // 'serif': ['ui-serif', 'Georgia'],
      // 'mono': ['ui-monospace', 'SFMono-Regular'],
      // 'display': ['Oswald'],
      // 'body': ['"Open Sans"'],
    },
    extend: {
      fontSize: {
        'body-lg': '1rem',
        'body': '.875rem',
      }
    },
  },
  darkMode: 'class',
  plugins: []
}
