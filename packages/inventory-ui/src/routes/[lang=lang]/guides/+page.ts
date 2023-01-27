import LL, { setLocale } from '$i18n/i18n-svelte';
import { API } from '$lib/api';
import { breadcrumbs } from '$lib/stores/navigation';
import { error } from '@sveltejs/kit';
import axios from 'axios';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { locale } = await parent();
	let guides: Components.Schemas.MaintenanceGuide[] = [];

	try {
		const client = API.client();
		const res = await client.get<Components.Schemas.MaintenanceGuide[]>('/api/maintenance/guides/');
		guides = res.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			throw error(err.response.status, err.response.statusText);
		}
	}

	setLocale(locale);
	const $LL = get(LL);
	breadcrumbs.set([
		{ label: $LL.home.title(), href: `/${locale}`, icon: '' },
		{ label: $LL.guides.title(), href: `/${locale}/guides`, icon: 'menu_book' }
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
