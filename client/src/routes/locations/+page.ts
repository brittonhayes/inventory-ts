import { Configuration, LocationsApi } from '$lib/api';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	let config = new Configuration({ fetchApi: fetch });
	let client = new LocationsApi(config);

	return {
		pageTitle: 'Locations',
		locations: await client.locationsControllerList()
	};
}) satisfies PageLoad;