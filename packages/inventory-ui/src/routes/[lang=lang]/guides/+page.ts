import LL, { setLocale } from '$i18n/i18n-svelte';
import { breadcrumbs } from '$lib/stores/navigation';
import axios, { type AxiosResponse } from 'axios';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { locale } = await parent();
	setLocale(locale);

	const $LL = get(LL);
	breadcrumbs.set([
		{ label: $LL.home.title(), href: `/${locale}/home`, icon: '' },
		{ label: $LL.guides.title(), href: `/${locale}/guides`, icon: 'menu_book' }
	]);

	const guides: AxiosResponse<Components.Schemas.MaintenanceGuide[]> = await axios.get('/api/maintenance/guides/');

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
		guides: guides.data
	};
}) satisfies PageLoad;
