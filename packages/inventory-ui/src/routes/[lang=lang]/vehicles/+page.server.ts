import LL, { setLocale } from '$i18n/i18n-svelte';
import { breadcrumbs } from '$lib/stores/navigation';
import axios, { type AxiosResponse } from 'axios';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (async ({ url, parent }) => {
	const { locale } = await parent();

	setLocale(locale);
	const $LL = get(LL);

	breadcrumbs.set([
		{ href: `/${locale}/`, label: $LL.home.title(), icon: 'home' },
		{ href: `/${locale}/vehicles`, label: $LL.vehicles.title(), icon: 'agriculture' }
	]);

	const vehicles: AxiosResponse<Components.Schemas.VehicleResponse[]> = await axios.get(`/api/vehicles`);

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
		vehicles: vehicles.data
	};
}) satisfies PageLoad;
