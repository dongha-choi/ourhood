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
        white: '#FFFFFF',
        red: '#FF4C4C',
        lightGreen: '#B5C18E',
        gray: '#808080',
        lightGray: '#A9A9A9',
        lightBlue: '#DFF5FF',
      },
      screens: {
        xs: '520px',
      },
      fontSize: {
        '2xs': ['0.5rem', '0.8rem'],
      },
    },
  },
  plugins: [],
};
