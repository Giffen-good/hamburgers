module.exports = function (config) {
  return {
    ".hamburger--collapse": {
      ".hamburger-inner": {
        top: "auto",
        bottom: "0",
        "transition-duration": "0.13s",
        "transition-delay": "0.13s",
        "transition-timing-function": "cubic-bezier(0.55, 0.055, 0.675, 0.19)",

        "&::after": {
          top: `${
            (parseInt(config.layerSpacing, 10) * 2 +
              parseInt(config.height, 10) * 2) *
            -1
          }px`,
          transition:
            "top 0.2s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1), opacity 0.1s linear",
        },

        "&::before": {
          transition:
            "top 0.12s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1), transform 0.13s cubic-bezier(0.55, 0.055, 0.675, 0.19)",
        },
      },

      "&.is-active": {
        ".hamburger-inner": {
          transform: `translate3d(0, ${
            (parseInt(config.layerSpacing, 10) + parseInt(config.height, 10)) *
            -1
          }, 0) rotate(-45deg)`,
          "transition-delay": "0.22s",
          "transition-timing-function": "cubic-bezier(0.215, 0.61, 0.355, 1)",

          "&::after": {
            top: "0",
            opacity: "0",
            transition: `top 0.2s cubic-bezier(0.33333, 0, 0.66667, 0.33333),
                        opacity 0.1s 0.22s linear`,
          },

          "&::before": {
            top: "0",
            transform: "rotate(-90deg)",
            transition: `top 0.1s 0.16s cubic-bezier(0.33333, 0, 0.66667, 0.33333),
                        transform 0.13s 0.25s cubic-bezier(0.215, 0.61, 0.355, 1)`,
          },
        },
      },
    },
  };
};
