const _ = require("lodash");
const flatten = require("flat");
const plugin = require("tailwindcss/plugin");

const { defaultConfig, buildPluginUtilityObject } = require("./styles");
const FLATTEN_CONFIG = { delimiter: "-", maxDepth: 2 };
const handleName = (name, className) => {
  const split = name.split(`${className}-`);
  const prefixedName = `${split[0]}${prefixNegativeModifiers(
    className,
    split[1]
  )}`;

  return prefixedName.split("-default").join("");
};
const prefixNegativeModifiers = function (base, modifier) {
  return _.startsWith(modifier, "-")
    ? `-${base}-${modifier.slice(1)}`
    : `${base}-${modifier}`;
};

function pluginFactory(burgerConfig = {}) {
  return function ({
    addUtilities,
    addComponents,
    addBase,
    addVariant,
    e,
    prefix,
    theme,
    variants,
    config,
  }) {
    const buildConfig = (themeKey, ...fallbackKeys) => {
      return (
        buildConfigFromTheme(themeKey, ...fallbackKeys) ||
        buildConfigFromArray(themeKey)
      );
    };
    const buildConfigFromTheme = (themeKey, ...fallbackKeys) => {
      const buildObject = ([modifier, value]) => [
        modifier,
        { [themeKey]: value },
      ];
      const getThemeSettings = (themeKey, fallbackKeys) => {
        const [newThemeKey, ...newFallbackKeys] = fallbackKeys || [];

        return (
          theme(themeKey, false) ||
          (fallbackKeys.length &&
            getThemeSettings(newThemeKey, [...newFallbackKeys]))
        );
      };

      const themeSettings = getThemeSettings(themeKey, fallbackKeys);
      const themeObject = _.isArray(themeSettings)
        ? _.zipObject(themeSettings, themeSettings)
        : themeSettings;
      const themeEntries =
        themeSettings &&
        Object.entries(flatten(themeObject, FLATTEN_CONFIG)).map((entry) =>
          buildObject(entry)
        );

      return themeSettings ? _.fromPairs(themeEntries) : false;
    };
    const buildConfigFromArray = (property) => {
      const defaultSettings = defaultValues[property];
      const defaultEntries =
        defaultSettings &&
        defaultSettings.map((value) => [value, { [property]: value }]);

      return defaultSettings ? _.fromPairs(defaultEntries) : false;
    };

    // Creates default theme settings for the burger based on the specified theme key
    const buildDefaultValuesObject = (
      defaultConfig,
      themeKey,
      ...fallbackKeys
    ) => {
      const defaultEntries = Object.entries(
        theme(themeKey, { default: defaultConfig })
      ).map(([modifier, config]) => [
        modifier,
        buildPluginUtilityObject({ ...defaultConfig, ...config }),
      ]);
      return _.fromPairs(defaultEntries);
    };

    // Define Default styles
    const defaultValues = {};

    // Class and theme key defaults if none are defined during instantiation
    const baseClassName = burgerConfig.className || "hamburger";
    const themeKey = burgerConfig.themeKey || "hamburger";

    const pluginUtilities = {
      [baseClassName]: buildDefaultValuesObject(defaultConfig, themeKey),
    };
    Object.entries(pluginUtilities)
      .filter(([modifier, values]) => !_.isEmpty(values))
      .forEach(([modifier, values]) => {
        const className = _.kebabCase(modifier);
        const variantName = Object.keys(Object.entries(values)[0][1])[0];
        const utilities = flatten(
          { [`.${e(`${className}`)}`]: values },
          FLATTEN_CONFIG
        );

        addUtilities(
          _.mapKeys(utilities, (value, key) => handleName(key, className)),
          variants(variantName, ["responsive"])
        );
      });
  };
}
module.exports = plugin.withOptions(pluginFactory);
