import LL, { setLocale } from '$i18n/i18n-svelte';
import { breadcrumbs } from '$lib/stores/navigation';
import axios, { type AxiosResponse } from 'axios';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { locale } = await parent();
	setLocale(locale);
	const $LL = get(LL);

	const vehicle: AxiosResponse<Components.Schemas.VehicleResponse> = await axios.get(`/api/vehicles/${params.slug}`);

	const compatibleParts: AxiosResponse<Components.Schemas.VehiclePart[]> = await axios.get(
		`/api/vehicles/${params.slug}/parts`
	);

	const compatibleImplements: AxiosResponse<Components.Schemas.Implement[]> = await axios.get(
		`/api/vehicles/${params.slug}/implements`
	);

	const relatedGuides: AxiosResponse<Components.Schemas.MaintenanceGuide[]> = await axios.get(
		`/api/maintenance/guides/vehicle/${params.slug}`
	);

	breadcrumbs.set([
		{ label: $LL.home.title(), href: `/${locale}/`, icon: 'home' },
		{ label: $LL.vehicles.title(), href: `/${locale}/vehicles/`, icon: 'agriculture' },
		{ label: `${vehicle.data.name}`, href: `/${locale}/vehicles/${vehicle.data.id}/`, icon: '' }
	]);
	return {
		params: params,
		vehicle: vehicle.data,
		implements: compatibleImplements.data,
		parts: compatibleParts.data,
		guides: relatedGuides.data
	};
}) satisfies PageLoad;
