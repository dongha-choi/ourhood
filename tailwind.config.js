/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#365E32',
        black: '#252A34',
        red: '#FF4C4C',
      },
    },
  },
  plugins: [],
};
