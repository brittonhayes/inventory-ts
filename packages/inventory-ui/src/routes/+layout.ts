import { browser } from '$app/environment';
import { setLocale } from '$i18n/i18n-svelte';
import type { Locales } from '$i18n/i18n-types';
import { loadLocaleAsync } from '$i18n/i18n-util.async';
import { JWT } from '$lib/auth/jwt';
import { breadcrumbs, isAuthenticated } from '$lib/stores';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad<{ locale: Locales }> = async ({ url, data: { locale } }) => {
	// load dictionary into memory
	await loadLocaleAsync(locale);

	// if you need to output a localized string in a `load` function,
	// you always need to call `setLocale` right before you access the `LL` store
	setLocale(locale);
	breadcrumbs.set([]);

	if (browser) {
		isAuthenticated.set(JWT.getToken() !== '' || JWT.getRefreshToken() !== '');
	}

	// pass locale to the "rendering context"
	return { locale };
};
