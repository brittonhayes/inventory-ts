import LL, { setLocale } from '$i18n/i18n-svelte';
import { breadcrumbs } from '$lib/stores/navigation';
import axios, { type AxiosResponse } from 'axios';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';
import { gql, request } from 'graphql-request';
import { PUBLIC_API_BASE_URL } from '$env/static/public';

export const load: PageLoad = (async ({ parent, route }) => {
	const { locale } = await parent();

	setLocale(locale);
	const $LL = get(LL);

	breadcrumbs.set([
		{ label: $LL.home.title(), href: `/${locale}/`, icon: 'home' },
		{ label: $LL.employees.title(), href: `/${locale}/employees/`, icon: 'groups' }
	]);

	// const employees: AxiosResponse<Components.Schemas.Employee[]> = await axios.get('/api/employees/');

	const query = gql`
		{
			employees {
				id
				name
				updatedAt
				createdAt
			}
		}
	`;

	const response = await request(PUBLIC_API_BASE_URL + '/graphql', query);
	console.log(response);

	return {
		employees: response.employees,
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
