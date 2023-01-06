import { Configuration, VehiclesApi } from '$lib/api';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	let config = new Configuration({ fetchApi: fetch });
	let client = new VehiclesApi(config);
	return {
		pageTitle: 'Vehicles',
		vehicles: await client.vehiclesControllerList()
	};
}) satisfies PageLoad;
