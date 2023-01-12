import { get } from '$lib/common/fetcher';
import type { ListVehiclesResponse } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
	url.searchParams.get('limit') ?? url.searchParams.set('limit', '10')
	const params = url.searchParams.toString() ?? '';

	const vehicles = await get<ListVehiclesResponse>('/api/vehicles' + `?${params}` );
	return {
		vehicles: vehicles,
		crumbs: [
			{ label: 'Home', href: '/' },
			{ label: 'Vehicles', href: '/vehicles' },
		],
	};
}) satisfies PageLoad;
