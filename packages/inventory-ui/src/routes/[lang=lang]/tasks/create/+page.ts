import LL, { setLocale } from '$i18n/i18n-svelte';
import { breadcrumbs } from '$lib/stores/navigation';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { locale } = await parent();
	setLocale(locale);

	const $LL = get(LL);
	breadcrumbs.set([
		{ label: $LL.home.title(), href: `/${locale}`, icon: 'home' },
		{ label: $LL.tasks.title(), href: `/${locale}/tasks`, icon: 'task_alt' },
		{ label: $LL.tasks.create.title(), href: `/${locale}/tasks/create`, icon: 'task_alt' }
	]);

	return {
		title: $LL.tasks.create.title(),
		content: {
			title: $LL.tasks.create.title(),
			subtitle: $LL.tasks.create.subtitle(),
			buttons: {
				create: $LL.create()
			},
			form: {
				name: $LL.tasks.create.form.name(),
				assignee: $LL.tasks.create.form.assignee(),
				dueDate: $LL.tasks.create.form.dueDate(),
				status: $LL.tasks.create.form.status(),
				selectStatus: $LL.tasks.create.form.selectStatus(),
				pending: $LL.tasks.create.form.pending(),
				completed: $LL.tasks.create.form.completed(),
				cancelled: $LL.tasks.create.form.cancelled()
			},
			lastUpdated: $LL.lastUpdated()
		}
	};
}) satisfies PageLoad;
