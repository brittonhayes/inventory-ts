import type { PageLoad } from './$types';

export const load = (async () => {
	return {
		crumbs: [
			{ label: 'Home', href: '/' },
			{ label: 'Maintenance', href: '/maintenance' },
		],
	};
}) satisfies PageLoad;
