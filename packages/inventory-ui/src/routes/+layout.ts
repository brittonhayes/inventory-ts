import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { setLocale } from '$i18n/i18n-svelte';
import type { Locales } from '$i18n/i18n-types';
import { loadLocaleAsync } from '$i18n/i18n-util.async';
import axios from 'axios';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad<{ locale: Locales }> = async ({ data: { locale } }) => {
	axios.defaults.baseURL = PUBLIC_API_BASE_URL;

	// load dictionary into memory
	await loadLocaleAsync(locale);

	// if you need to output a localized string in a `load` function,
	// you always need to call `setLocale` right before you access the `LL` store
	setLocale(locale);

	// pass locale to the "rendering context"
	return { locale };
};
