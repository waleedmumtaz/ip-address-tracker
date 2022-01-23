module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        cstm: {
          'very-dark-gray': 'hsl(0, 0%, 17%)',
          'dark-gray': 'hsl(0, 0%, 59%)',
        },
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
      },
    }
  },
  plugins: []
};