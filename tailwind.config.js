module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#E0F2F1',
          100: '#B2DFDB',
          200: '#80CBC4',
          300: '#4DB6AC',
          400: '#26A69A',
          500: '#009688',
          600: '#00897B',
          700: '#00796B',
          800: '#00695C',
          900: '#004D40',
        },
      },
      gridTemplateColumns: {
        ' -2': 'repeat(2, 200px)',
        'books-3': 'repeat(3, 200px)',
        'books-4': 'repeat(4, 200px)',
        'books-5': 'repeat(5, 200px)',
        'books-6': 'repeat(6, 200px)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
