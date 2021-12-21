module.exports = function (config) {
  return {
    "&.hamburger--arrow.is-active": {
      ".hamburger-inner": {
        "&::before": {
          transform: `translate3d(${
            config.widthInt * -0.2 + "px"
          }, 0, 0) rotate(-45deg) scale(0.7, 1)`,
        },

        "&::after": {
          transform: `translate3d(${
            config.widthInt * -0.2 + "px"
          }, 0, 0) rotate(45deg) scale(0.7, 1)`,
        },
      },
    },
  };
};
