import { breadcrumbs } from '$lib/stores/navigation';
import type { ListEmployeesResponse } from '$lib/types';
import type { PageLoad } from './$types';
import LL, { setLocale } from '$i18n/i18n-svelte';
import { get } from 'svelte/store';
import { Fetcher } from '$lib/common/fetcher';

export const load: PageLoad = (async ({ parent }) => {
	const { locale } = await parent();

	setLocale(locale);
	const $LL = get(LL);

	breadcrumbs.set([
		{ label: $LL.home.title(), href: `/${locale}/`, icon: 'home' },
		{ label: $LL.employees.title(), href: `/${locale}/employees/`, icon: 'groups' }
	]);

	const employees = await Fetcher.get<ListEmployeesResponse>('/api/employees');

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
