import LL, { setLocale } from '$i18n/i18n-svelte';
import { breadcrumbs } from '$lib/stores/navigation';
import axios from 'axios';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { locale } = await parent();
	setLocale(locale);
	const $LL = get(LL);

	const vehicle = await axios.get<Components.Schemas.Vehicle>('/api/vehicles/' + params.slug);
	const vehicleParts = await axios.get<Components.Schemas.VehiclePart[]>('/api/vehicles/' + params.slug + '/parts/');
	const vehicleImplements = await axios.get<Components.Schemas.Implement[]>(
		'/api/vehicles/' + params.slug + '/implements'
	);
	const vehicleGuides = await axios.get<Components.Schemas.MaintenanceGuide[]>(
		'/api/maintenance/guides/vehicle/' + params.slug
	);

	breadcrumbs.set([
		{ label: $LL.home.title(), href: `/${locale}/`, icon: 'home' },
		{ label: $LL.vehicles.title(), href: `/${locale}/vehicles/`, icon: 'agriculture' },
		{
			label: vehicle.data.name || vehicle.data.model,
			href: `/${locale}/vehicles/${vehicle.data.id}/`,
			icon: ''
		}
	]);
	return {
		params: params,
		vehicle: vehicle.data,
		implements: vehicleImplements.data,
		parts: vehicleParts.data,
		guides: vehicleGuides.data
	};
}) satisfies PageLoad;
