/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class", '[data-mode="dark"]'] ,
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		darkTheme: "dark",
		themes: [
			{
				dark: {
					...require("daisyui/src/colors/themes")["[data-theme=forest]"],
				},
				light: {
					primary: '#10b981',
					secondary: '#1FD65F',
					accent: '#D99330',
					neutral: '#f3f4f6',
					'base-100': '#f5f5f4',
					info: '#3ABFF8',
					success: '#16a34a',
					warning: '#FBBD23',
					error: '#F87272'
				}
			}
		]
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
