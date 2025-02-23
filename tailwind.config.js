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
        'hover-white': '#E8E8E8',
        darkWhite: '#C7C8CC',
        gray: '#999999',
        lightGray: '#A9A9A9',
        darkGray: '#555555',
        red: '#FF4C4C',
        green: '#38b000',
        lightGreen: '#B5C18E',
        lightBlue: '#DFF5FF',
      },
      screens: {
        xs: '520px',
        ml: '896px',
      },
      fontSize: {
        '2xs': ['0.7rem', '0.8rem'],
        '3xs': ['0.5rem', '0.8rem'],
        '2.5xl': ['1.8rem'],
      },
      fontFamily: {
        hakgyoansim: ['HakgyoansimBareonbatangB', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
