module.exports = function (config) {
  const yOffset = (config.layerSpacingInt + config.heightInt) + 'px'
  return {
    '.hamburger--slider': {
    '.hamburger-inner': {
      top: $hamburger-layer-height / 2,
      '&::before': {
        top: `${yOffset}`,
        'transition-property': 'transform, opacity',
        'transition-timing-function': 'ease',
        'transition-duration':'0.15s',
      },
      '&::after': {
        top: `${((config.heightInt * 2) + (config.layerSpacingInt * 2)) + 'px'}`,
      }
    },

    '&.is-active': {
      '.hamburger-inner': {


        transform: `translate3d(0, ${yOffset}, 0) rotate(45deg)`,

        '&::before': {
          transform: `rotate(-45deg) translate3d(${config.widthInt / -7, config.layerSpacingInt * -1 + 'px'}, 0)`,
          opacity: 0,
        },
       '&::after': {
          transform: 'translate3d(0, $y-offset * -2, 0) rotate(-90deg)',
        }
      }
    }
}
