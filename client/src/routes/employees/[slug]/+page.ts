import { get } from '$lib/common/fetcher';
import type { FindMaintenanceTaskResponse } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const response = await get<FindMaintenanceTaskResponse>(`/api/maintenance/tasks/${params.slug}`);
	return {
		task: response,
		crumbs: [
			{ label: 'Home', href: '/' },
			{ label: 'Maintenance', href: '/maintenance' },
			{ label: 'Tasks', href: '/maintenance/tasks' },
			{ label: response.name, href: `/maintenance/tasks/${response.name}` }
		],
	};
}) satisfies PageLoad;
