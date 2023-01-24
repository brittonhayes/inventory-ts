import { PUBLIC_API_BASE_URL } from '$env/static/public';
import LL, { setLocale } from '$i18n/i18n-svelte';
import { ListVehiclesDocument } from '$lib/gql/graphql';
import { breadcrumbs } from '$lib/stores/navigation';
import { GraphQLClient } from 'graphql-request';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const prerender = false;
export const load = (async ({ parent }) => {
	const { locale } = await parent();

	setLocale(locale);
	const $LL = get(LL);

	const client = new GraphQLClient(PUBLIC_API_BASE_URL + '/graphql');
	const response = await client.request(ListVehiclesDocument, {
		includeAttachments: false,
		includeImplements: false,
		includeParts: false
	});

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
		vehicles: response.vehicles
	};
}) satisfies PageLoad;
