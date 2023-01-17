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
					primary: "#f9bc60",
					"primary-content": "#001e1d",
					secondary: "#002927",
					"secondary-content": "#abd1c6",
					accent: "#0f3433",
					neutral: "#004643",
					"neutral-content": "#fffffe",
					"neutral-focus": "#0f3433",
					"base-100": "#001e1d",
					"base-200": "#0f3433",
					"base-300": "#006661",
					"base-content": "#fffffe",
					"base-300-content": "#001E1D",
					info: "#119DA4",
					success: "#79C99E", 
					warning: "#F25C54",
					error: "#A22C29",
					"error-content": "#FCDBD9",
					"--rounded-btn": "1.9rem",
				},
				light: {
					primary: "#397F3E",
					"primary-content": "#fffffe",
					secondary: "#72C077",
					accent: "#D8973C",
					neutral: "#F0F4EF",
					"info": "#009F93",
					"base-100": "#EEF0EB",
					"base-200": "#D2DECF",
					"base-content": "#182225",
					"error": "#A4243B",
				}
			}
		]
	},
	theme: {
		colors: {
			yellow: {
				100: "#fef2df",
				200: "#fde4bf",
				300: "#fbd7a0",
				400: "#fac980",
				500: "#f9bc60",
				600: "#c7964d",
				700: "#95713a",
				800: "#644b26",
				900: "#322613"
			},
		}
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
