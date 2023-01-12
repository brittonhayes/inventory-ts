import { get } from '$lib/common/fetcher';
import { breadcrumbs } from '$lib/stores/navigation';
import type { ListEmployeesResponse } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async () => {
	const employees = await get<ListEmployeesResponse>('/api/employees');
	breadcrumbs.set([
		{ label: 'Home', href: '/', icon: 'home' },
		{ label: 'Employees', href: '/employees', icon: 'groups' },
	])
	return {
		employees: employees,
	};
}) satisfies PageLoad;
