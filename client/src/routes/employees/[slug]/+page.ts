import { get } from '$lib/common/fetcher';
import { breadcrumbs } from '$lib/stores/navigation';
import type { FindEmployeeResponse, FindMaintenanceTaskResponse } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const response = await get<FindEmployeeResponse>(`/api/employees/${params.slug}`);
	breadcrumbs.set([
		{ label: 'Home', href: '/', icon: 'home' },
		{ label: 'Employees', href: '/employees', icon: 'groups' },
		{ label: response.name, href: `/employees/${response.name}`, icon: ''}
	])
	return {
		employee: response,
	};
}) satisfies PageLoad;
