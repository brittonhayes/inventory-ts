import LL, { setLocale } from '$i18n/i18n-svelte';
import { breadcrumbs } from '$lib/stores/navigation';
import axios, { type AxiosResponse } from 'axios';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { locale } = await parent();
	setLocale(locale);

	const guide: AxiosResponse<Components.Schemas.MaintenanceGuide> = await axios.get(
		'/api/maintenance/guides/' + params.slug
	);

	const tasks: AxiosResponse<Components.Schemas.MaintenanceTask[]> = await axios.get(
		'/api/maintenance/guides/' + params.slug + '/tasks'
	);

	const $LL = get(LL);
	breadcrumbs.set([
		{ label: $LL.home.title(), href: `/${locale}`, icon: 'home' },
		{ label: $LL.guides.title(), href: `/${locale}/guides`, icon: '' },
		{ label: guide.data.name, href: `/${locale}/guides/${guide.data.id}`, icon: '' }
	]);

	return {
		locale: locale,
		guide: guide.data,
		tasks: tasks.data
	};
}) satisfies PageLoad;
