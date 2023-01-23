import LL, { setLocale } from '$i18n/i18n-svelte';
import { breadcrumbs } from '$lib/stores/navigation';
import axios, { type AxiosResponse } from 'axios';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load: PageLoad = (async ({ parent, route }) => {
	const { locale } = await parent();

	setLocale(locale);
	const $LL = get(LL);

	console.log(route);

	breadcrumbs.set([
		{ label: $LL.home.title(), href: `/${locale}/`, icon: 'home' },
		{ label: $LL.employees.title(), href: `/${locale}/employees/`, icon: 'groups' }
	]);

	const employees: AxiosResponse<Components.Schemas.Employee[]> = await axios.get('/api/employees/');

	return {
		employees: employees.data,
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
