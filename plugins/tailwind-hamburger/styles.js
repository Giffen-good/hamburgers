const types = require("./types");

const defaultConfig = {
  padding: "1rem",
  width: "40px",
  height: "4px",
  layerSpacing: "6px",
  color: "currentColor",
  layerBorderRadius: "4px",
  hoverOpacity: "0.7",
  useHoverFilter: "false",
  hoverFilter: "opacity(50%)",
};
defaultConfig.activeColor = `${defaultConfig.color}`;
defaultConfig.activeHoverOpacity = `${defaultConfig.hoverOpacity}`;
defaultConfig.activeHoverFilter = defaultConfig.hoverFilter;

const buildPluginUtilityObject = (config) => {
  ({
    padding,
    width,
    height,
    layerSpacing,
    color,
    layerBorderRadius,
    hoverOpacity,
    activeColor,
    activeHoverOpacity,
    useHoverFilter,
    hoverFilter,
    activeHoverFilter,
  } = config);
  config.layerSpacingInt = parseInt(layerSpacing, 10);
  config.heightInt = parseInt(height, 10);
  config.widthInt = parseInt(width, 10);
  const innerBeforeAfter = {
    width: `${width}`,
    height: `${height}`,
    "background-color": `${color}`,
    "border-radius": `${layerBorderRadius}`,
    position: "absolute",
    "transition-property": "transform",
    "transition-duration": "0.15s",
    "transition-timing-function": "ease",
  };
  const onlyBeforeAfter = {
    content: "''",
    display: "block",
  };
  const activeBgColor = {
    "background-color": `${
      color !== activeColor && activeColor == "currentColor"
        ? color
        : activeColor
    }`,
  };
  let hFilter = useHoverFilter
    ? { filter: `${hoverFilter}` }
    : { opacity: `${hoverOpacity}` };
  let activeHFilter = useHoverFilter
    ? { filter: `${hoverFilter}` }
    : { opacity: `${hoverOpacity}` };

  const typeComponents = types(config);

  const styles = {
    padding: `${padding}`,
    display: "inline-block",
    cursor: "pointer",
    "transition-property": "opacity, filter",
    "transition-duration": "0.15s",
    "transition-timing-function": "linear",
    font: "inherit",
    color: "inherit",
    "text-transform": "none",
    "background-color": "transparent",
    border: "0",
    margin: "0",
    overflow: "visible",
    "&:hover": hFilter,
    "&.is-active": {
      "&:hover": activeHFilter,
      ".hamburger-inner": {
        "&::before": activeBgColor,
        "&::after": activeBgColor,
      },
    },
    ".hamburger-box": {
      width: `${width}`,
      height: `${config.heightInt * 3 + config.layerSpacingInt * 2 + "px"}`,
      display: "inline-block",
      position: "relative",
    },
    ".hamburger-inner": {
      display: "block",
      top: "50%",
      ...innerBeforeAfter,

      "margin-top": config.heightInt / -2 + "px",
      "&::before": {
        ...innerBeforeAfter,
        ...onlyBeforeAfter,
        top: (config.layerSpacingInt + config.heightInt) * -1 + "px",
      },
      "&::after": {
        ...innerBeforeAfter,
        ...onlyBeforeAfter,
        bottom: (config.layerSpacingInt + config.heightInt) * -1 + "px",
      },
    },
    ...typeComponents,
  };
  return styles;
};

module.exports = { buildPluginUtilityObject, defaultConfig };
