import LL, { setLocale } from '$i18n/i18n-svelte';
import { Fetcher } from '$lib/common/fetcher';
import { breadcrumbs } from '$lib/stores/navigation';
import type { ListMaintenanceGuidesResponse } from '$lib/types';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { locale } = await parent();
	setLocale(locale);

	const $LL = get(LL);
	breadcrumbs.set([
		{ label: $LL.home.title(), href: `/${locale}`, icon: 'home' },
		{ label: $LL.guides.title(), href: `/${locale}/guides`, icon: 'menu_book' },
		{ label: $LL.guides.create.title(), href: `/${locale}/guides/create`, icon: 'add' }
	]);

	return {
		content: {
			title: $LL.guides.create.title(),
			subtitle: $LL.guides.create.subtitle()
		}
	};
}) satisfies PageLoad;
