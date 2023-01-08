<script lang="ts">
	import type { Route } from '$lib/types';
	import { AppRail } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';

	let open = true;
	let active = 'Home';

	const setActive = (value: string) => {
		active = value;
	};

	const routes = writable<Route[]>([
		{
			label: 'Home',
			href: '/',
			icon: 'home',
		},
		{
			label: 'Vehicles',
			href: '/vehicles',
			icon: 'agriculture',
		},
		{
			label: 'Locations',
			href: '/locations',
			icon: 'pin_drop',
		}
	]);

	const selectedNavItem = writable(0);

</script>

<AppRail selected={selectedNavItem}>
	<svelte:fragment slot="lead">(lead)</svelte:fragment>
	<!-- (AppRailTiles Here) -->
	<svelte:fragment slot="trail">(trail)</svelte:fragment>
</AppRail>
