// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withTV } = require('tailwind-variants/transformer');

/** @type {import('tailwindcss').Config} */
module.exports = withTV({
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './views/**/*.{js,ts,jsx,tsx}'
  ],
  future: {
    hoverOnlyWhenSupported: true
  },
  theme: {
    extend: {
      colors: {
        'purple1': '#6E62EE',
        'pink': '#D36CFF',
        'purple2': '#D06CF7',
        'purple3':'#5f57f2',
        'Grey': '#27272A',
        'GreyWord': '#747474',
        'textGrey':'rgba(116, 116, 116, 1)'
      }
    }
  },
  plugins: []
});
