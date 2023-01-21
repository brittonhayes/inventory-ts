import LL, { setLocale } from '$i18n/i18n-svelte';
import { breadcrumbs } from '$lib/stores/navigation';
import axios, { type AxiosResponse } from 'axios';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (async ({ parent, params }) => {
	const { locale } = await parent();
	setLocale(locale);

	const $LL = get(LL);

	const employee: AxiosResponse<Components.Schemas.Employee> = await axios.get('/api/employees/' + params.slug);

	breadcrumbs.set([
		{ label: $LL.home.title(), href: `/${locale}`, icon: 'home' },
		{ label: $LL.employees.title(), href: `/${locale}/employees`, icon: 'groups' },
		{ label: employee.data.name, href: `/${locale}/employees/${employee.data.name}`, icon: '' }
	]);
	return {
		content: {
			lastUpdated: $LL.lastUpdated()
		},
		employee: employee.data
	};
}) satisfies PageLoad;
