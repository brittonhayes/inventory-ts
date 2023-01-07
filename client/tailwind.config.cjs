/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'),
    './src/**/*.{html,js,svelte,ts}',
  ],
  theme: {},
  plugins: [require('@skeletonlabs/skeleton/tailwind/theme.cjs')]
};
