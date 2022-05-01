const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    // textColor: {
    // 	'primary': '#ff3e00',
    // 	'secondary': '#ffed4a',
    // 	'danger': '#e3342f',
    // },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        gray: {
          ...colors.gray,
          850: "#151a24",
          950: "#13161c",
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
