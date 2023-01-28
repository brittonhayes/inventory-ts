import LL, { setLocale } from '$i18n/i18n-svelte';
import { API } from '$lib/api';
import { breadcrumbs } from '$lib/stores/navigation';
import { error } from '@sveltejs/kit';
import axios from 'axios';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { locale } = await parent();
	setLocale(locale);

	let task: Components.Schemas.MaintenanceTask = {} as Components.Schemas.MaintenanceTask;

	try {
		const client = API.client();
		const taskResponse = await client.get<Components.Schemas.MaintenanceTask>('/api/maintenance/tasks/' + params.slug);
		task = taskResponse.data;
	} catch (e) {
		if (axios.isAxiosError(e) && e.response) {
			throw error(e.response.status, e.response.statusText);
		}

		throw error(500, 'Internal Server Error');
	}

	const $LL = get(LL);
	breadcrumbs.set([
		{ label: $LL.home.title(), href: `/${locale}`, icon: 'home' },
		{ label: $LL.tasks.title(), href: `/${locale}/tasks`, icon: 'task_alt' },
		{ label: task.name, href: `/${locale}/tasks/${task.id}`, icon: 'task_alt' }
	]);

	return {
		task: task
	};
}) satisfies PageLoad;
