module.exports = {
  content: ["*.{html,js}"],

  theme: {
    extend: {
      colors: {
        'dark-blue': '#12151e',  // 这是 dark-blue 的基础色值，你可以根据实际情况进行调整。
      },
      backgroundColor: {
        'dark-blue': '#12151e',
        'medium-blue': '#2c3349',
        'medium-blueHover': '#303850',
        'dark-medium-blue': '#222839',
        'orange': '#cc5514',
        'orangeHover': '#df5c16',
        'grey': '#8f94a3'
      },
      gradientColorStops: theme => ({
        'from-dark-blue-0': theme('colors.dark-blue.0', 'rgba(#12151e, 0)'),
        'to-dark-blue-80': theme('colors.dark-blue.80', 'rgba(#12151e, 0.8)')
      }),
      borderColor: {
        'grey': '#8f94a3',
        'orange': '#cc5514',
        'medium-blue': '#2c3349'
      },
      textColor: {
        'grey': '#8f94a3',
        'orange': '#cc5514'
      },
      boxShadow: {
        'button-secondary': '0px 2px 3px 0px rgba(0,0,0,.16), inset 0px 1px 2px 0px rgba(242,242,242,.16), inset 0px -1px 2px 0px rgba(0,0,0,.2)',
        'button-primary': 'inset 0px 1px 2px 0px rgba(242,176,140,1), 0px 2px 3px 0px rgba(0,0,0,.16), inset 0px -1px 2px 0px rgba(0,0,0,.4)',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    function ({ addBase }) {
      addBase({
        'input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
          margin: '0',
        },
        'input[type="number"]': {
          '-moz-appearance': 'textfield',
        },
      });
    },
  ],
}