import LL, { setLocale } from '$i18n/i18n-svelte';
import { Fetcher } from '$lib/common/fetcher';
import { breadcrumbs } from '$lib/stores/navigation';
import type { FindMaintenanceGuideResponse } from '$lib/types';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { locale } = await parent();
	setLocale(locale);

	const response = await Fetcher.get<FindMaintenanceGuideResponse>(`/api/maintenance/guides/${params.slug}`);
	const $LL = get(LL)
	breadcrumbs.set([
		{ label: $LL.home.title(), href: `/${locale}`, icon: 'home' },
		{ label: $LL.maintenance.title(), href: `/${locale}/maintenance`, icon: '' },
		{ label: $LL.guides.title(), href: `/${locale}/maintenance/guides`, icon: '' },
		{ label: response.name, href: `/${locale}/maintenance/guides/${response.id}`, icon: '' },
	])

	return {
		locale: locale,
		guide: response,
	};
}) satisfies PageLoad;
