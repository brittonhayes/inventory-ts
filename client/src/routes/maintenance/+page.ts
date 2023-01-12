import { breadcrumbs } from '$lib/stores/navigation';
import type { PageLoad } from './$types';

export const load = (async () => {
	breadcrumbs.set([
		{ label: 'Home', href: '/', icon: 'home' },
		{ label: 'Maintenance', href: '/maintenance', icon: '' },
	])
	return {
	};
}) satisfies PageLoad;
