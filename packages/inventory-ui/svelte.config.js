import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],
	kit: {
		adapter: adapter(),
		alias: {
			$components: './src/components',
			$i18n: './src/i18n'
		}
	}
};

export default config;
