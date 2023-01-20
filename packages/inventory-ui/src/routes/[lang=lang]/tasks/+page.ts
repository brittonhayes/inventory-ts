import type { ListMaintenanceTasksResponse } from '$lib/types';
import LL, { setLocale } from '$i18n/i18n-svelte';
import { Fetcher } from '$lib/common/fetcher';
import type { PageLoad } from './$types';
import { breadcrumbs } from '$lib/stores/navigation';
import { get } from 'svelte/store';

export const load = (async ({ parent }) => {
	const { locale } = await parent();
	setLocale(locale);

	const response = await Fetcher.get<ListMaintenanceTasksResponse>('/api/maintenance/tasks');
	const $LL = get(LL);
	breadcrumbs.set([
		{ label: $LL.home.title(), href: `/${locale}/home`, icon: '' },
		{ label: $LL.tasks.title(), href: `/${locale}/tasks`, icon: 'task_alt' }
	]);

	return {
		title: $LL.tasks.title(),
		content: {
			title: $LL.tasks.title(),
			subtitle: $LL.tasks.subtitle(),
			table: {
				columns: {
					name: $LL.tasks.table.columns.name(),
					assignee: $LL.tasks.table.columns.assignee(),
					dueDate: $LL.tasks.table.columns.dueDate()
				}
			},
			buttons: {
				add: $LL.tasks.button.add()
			},
			lastUpdated: $LL.lastUpdated()
		},
		tasks: response
	};
}) satisfies PageLoad;
