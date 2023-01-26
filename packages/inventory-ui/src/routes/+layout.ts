import { browser } from '$app/environment';
import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { setLocale } from '$i18n/i18n-svelte';
import type { Locales } from '$i18n/i18n-types';
import { loadLocaleAsync } from '$i18n/i18n-util.async';
import auth from '$lib/auth/service';
import { auth0Client, breadcrumbs, isAuthenticated, user } from '$lib/stores';
import { redirect } from '@sveltejs/kit';
import axios from 'axios';
import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad<{ locale: Locales }> = async ({ url, data: { locale } }) => {
	axios.defaults.baseURL = PUBLIC_API_BASE_URL;

	// load dictionary into memory
	await loadLocaleAsync(locale);

	// if you need to output a localized string in a `load` function,
	// you always need to call `setLocale` right before you access the `LL` store
	setLocale(locale);
	breadcrumbs.set([]);

	if (browser) {
		// Create auth client
		const client = await auth.createClient();
		auth0Client.set(client);

		// Check if user is authenticated
		isAuthenticated.set(await client.isAuthenticated());

		// Get user
		const currentUser = await client.getUser();
		if (currentUser) {
			user.set(currentUser);
		}
	}

	// pass locale to the "rendering context"
	return { locale };
};
