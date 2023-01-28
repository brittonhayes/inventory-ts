import LL, { setLocale } from '$i18n/i18n-svelte';
import { API } from '$lib/api';
import { breadcrumbs } from '$lib/stores/navigation';
import { error } from '@sveltejs/kit';
import axios from 'axios';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (async ({ url, parent }) => {
	const { locale } = await parent();

	let vehicles: Components.Schemas.Vehicle[] = [];
	try {
		const client = API.client();
		const res = await client.get<Components.Schemas.Vehicle[]>('/api/vehicles/');
		vehicles = res.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			throw error(err.response.status, err.response.statusText);
		}
	}

	setLocale(locale);
	const $LL = get(LL);
	breadcrumbs.set([
		{ href: `/${locale}/`, label: $LL.home.title(), icon: 'home' },
		{ href: `/${locale}/vehicles`, label: $LL.vehicles.title(), icon: 'agriculture' }
	]);

	return {
		title: $LL.vehicles.title(),
		content: {
			title: $LL.vehicles.title(),
			subtitle: $LL.vehicles.subtitle(),
			lastUpdated: $LL.lastUpdated(),
			button: {
				add: $LL.vehicles.button.add()
			},
			table: {
				columns: {
					name: $LL.vehicles.table.columns.name(),
					make: $LL.vehicles.table.columns.make(),
					model: $LL.vehicles.table.columns.model(),
					hours: $LL.vehicles.table.columns.hours(),
					type: $LL.vehicles.table.columns.type()
				}
			}
		},
		vehicles: vehicles
	};
}) satisfies PageLoad;
