import type { PageLoad } from './$types';
import LL, { setLocale } from '$i18n/i18n-svelte';
import { get } from 'svelte/store';
import { breadcrumbs } from '$lib/stores/navigation';

export const load: PageLoad = async ({ parent }) => {
	// wait for `+layout.ts` to load dictionary and pass locale information
	const { locale } = await parent();

	// if you need to output a localized string in a `load` function,
	// you always need to call `setLocale` right before you access the `LL` store
	setLocale(locale);
	// get the translation functions value from the store
	const $LL = get(LL);

	breadcrumbs.set([{ href: `/${locale}`, label: $LL.home.title(), icon: 'home' }]);

	return {
		title: $LL.home.title(),
		subtitle: $LL.home.subtitle(),
		links: [
			{ href: `/${locale}`, label: $LL.home.title(), icon: 'home' },
			{ href: `/${locale}/vehicles`, label: $LL.vehicles.title(), icon: 'agriculture' },
			{ href: `/${locale}/tasks`, label: $LL.tasks.title(), icon: 'task_alt' },
			{ href: `/${locale}/guides`, label: $LL.guides.title(), icon: 'menu_book' },
			{ href: `/${locale}/employees`, label: $LL.employees.title(), icon: 'groups' }
		]
	};
};
