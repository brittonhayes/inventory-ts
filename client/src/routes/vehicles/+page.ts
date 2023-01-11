import { get } from '$lib/common/fetcher';
import type { VehiclesResponse } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async () => {
	const vehicles = await get<VehiclesResponse>('/api/vehicles');
	return {
		vehicles: vehicles,
		crumbs: [
			{ label: 'Home', href: '/' },
			{ label: 'Vehicles', href: '/vehicles' },
		],
	};
}) satisfies PageLoad;
