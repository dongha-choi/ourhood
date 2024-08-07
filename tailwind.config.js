/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // brand: '#365E32',
        brand: '#008DDA',
        line: '#ECECEC',
        black: '#252A34',
        red: '#FF4C4C',
        lightGreen: '#B5C18E',
        gray: '#808080',
        lightGray: '#A9A9A9',
        lightBlue: '#DFF5FF',
      },
    },
  },
  plugins: [],
};
