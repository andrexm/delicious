/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
		extend: {
			colors: {
				'primary': colors.yellow,
				'secondary': colors.amber,
				'danger': colors.rose,
				'light': colors.zinc,
				'dark': colors.stone,
				...colors
			},
		},
		pulse: theme => ({
			colors: theme('colors'),
		}),
	},
  plugins: [],
}
