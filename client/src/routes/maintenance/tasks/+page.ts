import type { ListMaintenanceTasksResponse } from '$lib/types';
import { get } from '$lib/common/fetcher';
import type { PageLoad } from './$types';
import { breadcrumbs } from '$lib/stores/navigation';

export const load = (async () => {
	const response = await get<ListMaintenanceTasksResponse>('/api/maintenance/tasks');
	breadcrumbs.set([
		{ label: 'Home', href: '/', icon: 'home' },
		{ label: 'Maintenance', href: '/maintenance', icon: '' },
		{ label: 'Tasks', href: '/maintenance/tasks', icon: 'task_alt' },
	])
	return {
		title: 'Maintenance Tasks',
		subtitle: 'List of maintenance tasks.',
		tasks: response,
	};
}) satisfies PageLoad;
