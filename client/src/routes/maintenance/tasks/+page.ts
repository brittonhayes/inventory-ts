import type { ListMaintenanceTasksResponse } from '$lib/types';
import { get } from '$lib/common/fetcher';
import type { PageLoad } from './$types';

export const load = (async () => {
	const response = await get<ListMaintenanceTasksResponse>('/api/maintenance/tasks');
	return {
		title: 'Maintenance Tasks',
		subtitle: 'List of maintenance tasks.',
		tasks: response,
		crumbs: [
			{ label: 'Home', href: '/' },
			{ label: 'Maintenance', href: '/maintenance' },
			{ label: 'Tasks', href: '/maintenance/tasks' }
		]
	};
}) satisfies PageLoad;
