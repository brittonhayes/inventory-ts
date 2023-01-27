import LL, { setLocale } from '$i18n/i18n-svelte';
import { API } from '$lib/api';
import { breadcrumbs } from '$lib/stores/navigation';
import { error } from '@sveltejs/kit';
import axios from 'axios';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (async ({ parent, params }) => {
	let employee: Components.Schemas.Employee = {} as Components.Schemas.Employee;

	try {
		const client = API.client();
		const res = await client.get<Components.Schemas.Employee>('/api/employees/' + params.slug);
		employee = res.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			throw error(err.response.status, err.response.statusText);
		}
	}

	const { locale } = await parent();
	setLocale(locale);

	const $LL = get(LL);

	breadcrumbs.set([
		{ label: $LL.home.title(), href: `/${locale}`, icon: 'home' },
		{ label: $LL.employees.title(), href: `/${locale}/employees`, icon: 'groups' },
		{ label: employee.name, href: `/${locale}/employees/${employee.id}`, icon: '' }
	]);
	return {
		content: {
			lastUpdated: $LL.lastUpdated()
		},
		employee: employee
	};
}) satisfies PageLoad;
