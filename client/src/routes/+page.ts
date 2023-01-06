import type { PageLoad } from './$types';

export const load = (async ({}) => {
	return {
		pageTitle: 'Dashboard',
		pageSubtitle: 'Work in progress - this is a placeholder for the dashboard.'
	};
}) satisfies PageLoad;
