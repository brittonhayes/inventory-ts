
import LL, { setLocale } from '$i18n/i18n-svelte';
import { Fetcher } from '$lib/common/fetcher';
import { breadcrumbs } from '$lib/stores/navigation';
import type { FindVehicleResponse } from '$lib/types';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { locale } = await parent();
	setLocale(locale);
	const $LL = get(LL)
	const response = await Fetcher.get<FindVehicleResponse>(`/api/vehicles/${params.slug}`);
	breadcrumbs.set([
			{ label: $LL.home.title(), href: `/${locale}/`, icon: 'home' },
			{ label: $LL.vehicles.title(), href: `/${locale}/vehicles/`, icon: 'agriculture' },
			{ label: `${response.name}`, href: `/${locale}/vehicles/${response.id}/`, icon: '' }
	])
	return {
		params: params,
		vehicle: response,
	};
}) satisfies PageLoad;
