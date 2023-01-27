<script lang="ts">
	import { page } from '$app/stores';
	import LL from '$i18n/i18n-svelte';
	import AppDrawer from '$lib/components/AppDrawer.svelte';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import HeadHrefLangs from '$lib/components/HeadHrefLangs.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import { isAuthenticated } from '$lib/stores';
	import '../app.postcss';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	let links = [
		{ href: `/${data.locale}`, label: $LL.home.title(), icon: 'home' },
		{ href: `/${data.locale}/vehicles`, label: $LL.vehicles.title(), icon: 'agriculture' },
		{ href: `/${data.locale}/tasks`, label: $LL.tasks.title(), icon: 'task_alt' },
		{ href: `/${data.locale}/guides`, label: $LL.guides.title(), icon: 'menu_book' },
		{ href: `/${data.locale}/employees`, label: $LL.employees.title(), icon: 'groups' }
	];
</script>

<!-- svelte-ignore missing-declaration -->
<svelte:head>
	<title>{$page.data.title || 'Inventory'}</title>
	<HeadHrefLangs />
</svelte:head>

<AppDrawer links="{links}">
	<Navigation redirectTo="{`/${$page.data.locale}/login`}" />
	<slot />

	<BottomNav class="index-1000 lg:hidden" links="{links}" />
</AppDrawer>
