import { get } from '$lib/common/fetcher';
import { breadcrumbs } from '$lib/stores/navigation';
import type { FindVehicleResponse } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const response = await get<FindVehicleResponse>(`/api/vehicles/${params.slug}`);
	breadcrumbs.set([
			{ label: 'Home', href: '/', icon: 'home' },
			{ label: 'Vehicles', href: '/vehicles', icon: 'agriculture' },
			{ label: `${response.name}`, href: `/vehicles/${response.id}`, icon: '' }
	])
	return {
		vehicle: response,
	};
}) satisfies PageLoad;
