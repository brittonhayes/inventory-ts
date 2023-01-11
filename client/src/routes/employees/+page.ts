import { get } from '$lib/common/fetcher';
import type { ListEmployeesResponse } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async () => {
	const employees = await get<ListEmployeesResponse>('/api/employees');
	return {
		employees: employees,
		crumbs: [
			{ label: 'Home', href: '/' },
			{ label: 'Employees', href: '/employees' },
		],
	};
}) satisfies PageLoad;
