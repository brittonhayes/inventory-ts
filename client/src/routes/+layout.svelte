<script lang="ts">
	import { page } from '$app/stores';
	import LL, { locale, setLocale } from '$i18n/i18n-svelte';
	import AppDrawer from '$lib/components/AppDrawer.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import HeadHrefLangs from '$lib/components/HeadHrefLangs.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import '../app.postcss';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	let links = [
		{ href: `/${data.locale}`, label: $LL.home.title() , icon: 'home' },
		{ href: `/${data.locale}/vehicles`, label: $LL.vehicles.title(), icon: 'agriculture' },
		{ href: `/${data.locale}/maintenance/tasks`, label: $LL.tasks.title(), icon: 'task_alt' },
		{ href: `/${data.locale}/employees`, label: $LL.employees.title(), icon: 'groups'}
		// { href: '/maintenance', label: 'maintenance', icon: 'home_repair_service' }
	];
</script>

<Navigation />
<AppDrawer links="{links}">
	<Breadcrumbs />
	<slot />
</AppDrawer>

<svelte:head>
	<title>{$page.data.title || 'Inventory'}</title>
	<HeadHrefLangs />
</svelte:head>