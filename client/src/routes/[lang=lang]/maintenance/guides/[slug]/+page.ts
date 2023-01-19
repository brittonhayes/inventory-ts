import LL, { setLocale } from '$i18n/i18n-svelte';
import { Fetcher } from '$lib/common/fetcher';
import { breadcrumbs } from '$lib/stores/navigation';
import type { FindMaintenanceGuideResponse, FindMaintenanceGuideTasksResponse } from '$lib/types';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { locale } = await parent();
	setLocale(locale);

	const guide = await Fetcher.get<FindMaintenanceGuideResponse>(`/api/maintenance/guides/${params.slug}`);
	const tasks = await Fetcher.get<FindMaintenanceGuideTasksResponse>(`/api/maintenance/guides/${params.slug}/tasks`);

	const $LL = get(LL)
	breadcrumbs.set([
		{ label: $LL.home.title(), href: `/${locale}`, icon: 'home' },
		{ label: $LL.maintenance.title(), href: `/${locale}/maintenance`, icon: '' },
		{ label: $LL.guides.title(), href: `/${locale}/maintenance/guides`, icon: '' },
		{ label: guide.name, href: `/${locale}/maintenance/guides/${guide.id}`, icon: '' },
	])

	return {
		locale: locale,
		guide: guide,
		tasks: tasks,
	};
}) satisfies PageLoad;
