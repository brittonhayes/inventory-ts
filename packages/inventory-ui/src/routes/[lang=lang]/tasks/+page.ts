import LL, { setLocale } from '$i18n/i18n-svelte';
import { API } from '$lib/api';
import { breadcrumbs } from '$lib/stores/navigation';
import { error } from '@sveltejs/kit';
import axios from 'axios';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { locale } = await parent();

	let tasks: Components.Schemas.MaintenanceTask[] = [];
	try {
		const client = API.client();
		const res = await client.get<Components.Schemas.MaintenanceTask[]>('/api/maintenance/tasks/');
		tasks = res.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			throw error(err.response.status, err.response.statusText);
		}
	}

	setLocale(locale);
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
		tasks: tasks
	};
}) satisfies PageLoad;
