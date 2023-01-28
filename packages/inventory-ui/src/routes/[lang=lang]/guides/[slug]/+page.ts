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

	let guide: Components.Schemas.MaintenanceGuide = {} as Components.Schemas.MaintenanceGuide;
	let tasks: Components.Schemas.MaintenanceTask[] = [];

	try {
		const client = API.client();
		const guideResponse = await client.get<Components.Schemas.MaintenanceGuide>(
			'/api/maintenance/guides/' + params.slug
		);
		const tasksResponse = await client.get<Components.Schemas.MaintenanceTask[]>(
			'/api/maintenance/guides/' + params.slug + '/tasks'
		);

		guide = guideResponse.data;
		tasks = tasksResponse.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			throw error(err.response.status, err.response.statusText);
		}
	}

	const $LL = get(LL);
	breadcrumbs.set([
		{ label: $LL.home.title(), href: `/${locale}`, icon: 'home' },
		{ label: $LL.guides.title(), href: `/${locale}/guides`, icon: '' },
		{ label: guide.name, href: `/${locale}/guides/${guide.id}`, icon: '' }
	]);

	return {
		locale: locale,
		guide: guide,
		tasks: tasks
	};
}) satisfies PageLoad;
