import { breadcrumbs } from '$lib/stores/navigation';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	breadcrumbs.set([]);

	return {};
}) satisfies PageLoad;
