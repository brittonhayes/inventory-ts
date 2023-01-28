import LL, { setLocale } from '$i18n/i18n-svelte';
import { API } from '$lib/api';
import { breadcrumbs } from '$lib/stores/navigation';
import { error } from '@sveltejs/kit';
import axios from 'axios';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load: PageLoad = (async ({ parent }) => {
	const { locale } = await parent();
	let employees: Components.Schemas.Employee[] = [];

	try {
		const client = API.client();
		const res = await client.get<Components.Schemas.Employee[]>('/api/employees/');
		employees = res.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			throw error(err.response.status, err.response.statusText);
		}
	}

	setLocale(locale);
	const $LL = get(LL);

	breadcrumbs.set([
		{ label: $LL.home.title(), href: `/${locale}/`, icon: 'home' },
		{ label: $LL.employees.title(), href: `/${locale}/employees/`, icon: 'groups' }
	]);

	return {
		employees: employees,
		content: {
			title: $LL.employees.title(),
			subtitle: $LL.employees.subtitle(),
			table: {
				columns: {
					name: $LL.employees.table.columns.name(),
					lastUpdated: $LL.lastUpdated()
				}
			},
			buttons: {
				add: $LL.employees.button.add()
			}
		}
	};
}) satisfies PageLoad;
