import LL, { setLocale } from '$i18n/i18n-svelte';
import { breadcrumbs } from '$lib/stores/navigation';
import axios, { type AxiosResponse } from 'axios';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { locale } = await parent();
	setLocale(locale);

	const $LL = get(LL);
	breadcrumbs.set([
		{ label: $LL.home.title(), href: `/${locale}/home`, icon: '' },
		{ label: $LL.tasks.title(), href: `/${locale}/tasks`, icon: 'task_alt' }
	]);

	const tasks: AxiosResponse<Components.Schemas.MaintenanceTask[]> = await axios.get('/api/maintenance/tasks');

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
		tasks: tasks.data
	};
}) satisfies PageLoad;
