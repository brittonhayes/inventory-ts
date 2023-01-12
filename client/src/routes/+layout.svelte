<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import AppDrawer from '$lib/components/AppDrawer.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast'
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import '../app.postcss';
	let links = [
		{ href: '/', label: 'home', icon: 'home' },
		{ href: '/vehicles', label: 'vehicles', icon: 'agriculture' },
		{ href: '/maintenance/tasks', label: 'tasks', icon: 'task_alt' },
		{ href: '/employees', label: 'employees', icon: 'groups'}
		// { href: '/maintenance', label: 'maintenance', icon: 'home_repair_service' }
	];
</script>

<Navigation />
<AppDrawer links="{links}">
	<Breadcrumbs />
	<section>
		<slot />
	</section>
</AppDrawer>
<SvelteToast />