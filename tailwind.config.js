// tailwind.config.js

module.exports = {
  purge: [
    "./storage/framework/views/*.php",
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],

  darkMode: false, // or 'media' or 'class'
  theme: {
    hamburger: (theme) => ({
      default: {
        color: "red",
      },
      blue: {
        color: "blue",
      },
    }),
    extend: {},
  },

  plugins: [
    require("./plugins/tailwind-hamburger"),
  ],
};
