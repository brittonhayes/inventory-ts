<script lang="ts">
	import { page } from '$app/stores';
	import AppDrawer from '$lib/components/AppDrawer.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import HeadHrefLangs from '$lib/components/HeadHrefLangs.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import { breadcrumbs } from '$lib/stores/navigation';
	import '../app.postcss';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<svelte:head>
	<title>{$page.data.title || 'Inventory'}</title>
	<HeadHrefLangs />
</svelte:head>

<AppDrawer links="{data.links}">
	<Navigation>
		<svelte:fragment slot="start">
			{#if $breadcrumbs}
				<BackButton />
			{/if}
		</svelte:fragment>

		<svelte:fragment slot="center">
			<Breadcrumbs crumbs={$breadcrumbs} maxItems="{2}" />
		</svelte:fragment>
	</Navigation>
	<slot />
	<BottomNav class="index-1000 lg:hidden" links="{data.links}" />
</AppDrawer>
