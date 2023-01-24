import { PUBLIC_API_BASE_URL } from '$env/static/public';
import LL, { setLocale } from '$i18n/i18n-svelte';
import type { Locales } from '$i18n/i18n-types';
import { loadLocaleAsync } from '$i18n/i18n-util.async';
import axios from 'axios';
import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad<{ locale: Locales }> = async ({ data: { locale } }) => {
	// load dictionary into memory
	await loadLocaleAsync(locale);

	// if you need to output a localized string in a `load` function,
	// you always need to call `setLocale` right before you access the `LL` store
	setLocale(locale);

	axios.defaults.baseURL = PUBLIC_API_BASE_URL;
	// get the translation functions value from the store
	const $LL = get(LL);

	const links = [
		{ href: `/${locale}`, label: $LL.home.title(), icon: 'home' },
		{ href: `/${locale}/vehicles`, label: $LL.vehicles.title(), icon: 'agriculture' },
		{ href: `/${locale}/tasks`, label: $LL.tasks.title(), icon: 'task_alt' },
		{ href: `/${locale}/guides`, label: $LL.guides.title(), icon: 'menu_book' },
		{ href: `/${locale}/employees`, label: $LL.employees.title(), icon: 'groups' }
	];

	// pass locale to the "rendering context"
	return { locale, links };
};
