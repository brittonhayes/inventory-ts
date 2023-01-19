import LL, { setLocale } from '$i18n/i18n-svelte';
import { Fetcher } from '$lib/common/fetcher';
import { breadcrumbs } from '$lib/stores/navigation';
import type {
	FindMaintenanceGuideForVehicleResponse,
	FindVehicleImplementsResponse,
	FindVehiclePartsResponse,
	FindVehicleResponse
} from '$lib/types';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { locale } = await parent();
	setLocale(locale);
	const $LL = get(LL);
	const vehicle = await Fetcher.get<FindVehicleResponse>(`/api/vehicles/${params.slug}`);
	const compatibleImplements = await Fetcher.get<FindVehicleImplementsResponse>(
		`/api/vehicles/${params.slug}/implements`
	);
	const compatibleParts = await Fetcher.get<FindVehiclePartsResponse>(`/api/vehicles/${params.slug}/parts`);
	const relatedGuides = await Fetcher.get<FindMaintenanceGuideForVehicleResponse>(
		`/api/maintenance/guides/vehicle/${params.slug}`
	);

	breadcrumbs.set([
		{ label: $LL.home.title(), href: `/${locale}/`, icon: 'home' },
		{ label: $LL.vehicles.title(), href: `/${locale}/vehicles/`, icon: 'agriculture' },
		{ label: `${vehicle.name}`, href: `/${locale}/vehicles/${vehicle.id}/`, icon: '' }
	]);
	return {
		params: params,
		vehicle: vehicle,
		implements: compatibleImplements,
		parts: compatibleParts,
		guides: relatedGuides
	};
}) satisfies PageLoad;
