module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'text-fill': 'textFill 0.5s ease-in-out forwards'
      },
      keyframes: {
        textFill: {
          '0%': { fill: 'transparent' },
          '100%': { fill: '#fff' }
        }
      }
    },
  },
  plugins: [],
}