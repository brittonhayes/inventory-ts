import LL, { setLocale } from '$i18n/i18n-svelte';
import { Fetcher } from '$lib/common/fetcher';
import { breadcrumbs } from '$lib/stores/navigation';
import type { ListMaintenanceGuidesResponse } from '$lib/types';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { locale } = await parent();
	setLocale(locale);

	const guides = await Fetcher.get<ListMaintenanceGuidesResponse>('/api/maintenance/guides');

	const $LL = get(LL);
	breadcrumbs.set([
		{ label: $LL.home.title(), href: `/${locale}`, icon: 'home' },
		{ label: $LL.maintenance.title(), href: `/${locale}/maintenance`, icon: '' },
		{ label: $LL.guides.title(), href: `/${locale}/maintenance/guides`, icon: 'menu_book' }
	]);

	return {
		content: {
			title: $LL.guides.title(),
			subtitle: $LL.guides.subtitle(),
			table: {
				columns: {
					name: $LL.guides.table.columns.name(),
					vehicle: $LL.guides.table.columns.vehicle()
				}
			},
			buttons: {
				add: $LL.guides.button.add()
			},
			lastUpdated: $LL.lastUpdated()
		},
		guides: guides
	};
}) satisfies PageLoad;
