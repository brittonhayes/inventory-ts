import LL, { setLocale } from '$i18n/i18n-svelte';
import { breadcrumbs } from '$lib/stores/navigation';
import axios from 'axios';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { locale } = await parent();
	setLocale(locale);

	const $LL = get(LL);

	const task = await axios.get('/api/maintenance/tasks/' + params.slug);

	breadcrumbs.set([
		{ label: $LL.home.title(), href: `/${locale}`, icon: 'home' },
		{ label: $LL.tasks.title(), href: `/${locale}/tasks`, icon: 'task_alt' },
		{ label: task.data.name, href: `/${locale}/tasks/${task.data.id}`, icon: 'task_alt' }
	]);

	return {
		task: task.data
	};
}) satisfies PageLoad;
