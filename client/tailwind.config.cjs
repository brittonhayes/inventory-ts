/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class", '[data-mode="dark"]'] ,
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		darkTheme: "dark",
		themes: [
			"emerald",
			"forest",
			{
				dark: {
					...require("daisyui/src/colors/themes")["[data-theme=forest]"],
					primary: '#458063',
					neutral: '#458063',
					'base-100': '#09121F'
				},
				light: {
					...require("daisyui/src/colors/themes")["[data-theme=garden]"],
					primary: '#6D9C6D',
					// secondary: '#606C38',
					accent: '#DDA15E',
					'base-100': '#EDEDE8',
					warning: '#FCBF49',
					error: '#D62828'
				}
			}
		]
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
