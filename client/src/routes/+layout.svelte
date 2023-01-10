<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import AppDrawer from '$lib/components/AppDrawer.svelte';
	import '../app.postcss';

	import { page } from '$app/stores';
	let links = [
		{ href: '/', label: 'home', icon: 'home' },
		{ href: '/vehicles', label: 'vehicles', icon: 'agriculture' },
		{ href: '/maintenance/tasks', label: 'tasks', icon: 'task' }
	];
</script>

<Navigation/>
<AppDrawer links={links}>
	<section>
		<slot></slot>
	</section>	
</AppDrawer>