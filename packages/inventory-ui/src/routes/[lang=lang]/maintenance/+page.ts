import LL, { setLocale } from '$i18n/i18n-svelte';
import { breadcrumbs } from '$lib/stores/navigation';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { locale } = await parent();

	setLocale(locale)
	const $LL = get(LL)

	breadcrumbs.set([
		{ label: $LL.home.title(), href: `/${locale}`, icon: 'home' },
		{ label: $LL.maintenance.title(), href: `/${locale}/maintenance`, icon: '' },
	])

	return {
		content: {
			title: $LL.maintenance.title(),
			subtitle: $LL.maintenance.subtitle(),
		}
	};
}) satisfies PageLoad;
