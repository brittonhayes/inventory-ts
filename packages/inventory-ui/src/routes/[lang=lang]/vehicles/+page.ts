import LL, { setLocale } from '$i18n/i18n-svelte';
import { Fetcher } from '$lib/common/fetcher';
import { breadcrumbs } from '$lib/stores/navigation';
import type { ListVehiclesResponse } from '$lib/types';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (async ({ url, parent }) => {
	const { locale } = await parent();

	setLocale(locale)
	const $LL = get(LL)

	url.searchParams.get('limit') ?? url.searchParams.set('limit', '10')
	const params = url.searchParams.toString() ?? '';
	const vehicles = await Fetcher.get<ListVehiclesResponse>('/api/vehicles' + `?${params}` );

	breadcrumbs.set([
		{ href: `/${locale}/`, label: $LL.home.title(), icon: 'home' },
		{ href: `/${locale}/vehicles`, label: $LL.vehicles.title(), icon: 'agriculture' },
	])
	
	return {
		title: $LL.vehicles.title(),
		content: {
			title: $LL.vehicles.title(),
			subtitle: $LL.vehicles.subtitle(),
			lastUpdated: $LL.lastUpdated(),
			button: {
				add: $LL.vehicles.button.add(),
			},
			table: {
				columns: {
					name: $LL.vehicles.table.columns.name(),
					make: $LL.vehicles.table.columns.make(),
					model: $LL.vehicles.table.columns.model(),
					hours: $LL.vehicles.table.columns.hours(),
					type: $LL.vehicles.table.columns.type(),
				},
			}
		},
		vehicles: vehicles,
	};
}) satisfies PageLoad;
