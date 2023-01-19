import LL, { setLocale } from '$i18n/i18n-svelte';
import { Fetcher } from '$lib/common/fetcher';
import { breadcrumbs } from '$lib/stores/navigation';
import type { FindMaintenanceTaskResponse } from '$lib/types';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { locale } = await parent();
	setLocale(locale);

	const response = await Fetcher.get<FindMaintenanceTaskResponse>(`/api/maintenance/tasks/${params.slug}`);
	const $LL = get(LL)
	breadcrumbs.set([
		{ label: $LL.home.title(), href: `/${locale}`, icon: 'home' },
		{ label: $LL.maintenance.title(), href: `/${locale}/maintenance`, icon: '' },
		{ label: $LL.tasks.title(), href: `/${locale}/maintenance/tasks`, icon: 'task_alt' },
		{ label: response.name, href: `/${locale}/maintenance/tasks/${response.id}`, icon: 'task_alt' },
	])

	return {
		task: response,
	};
}) satisfies PageLoad;
