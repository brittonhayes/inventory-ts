<script lang="ts">
	import { AppBar, AppRail, AppRailTile, AppShell, LightSwitch } from '@skeletonlabs/skeleton';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '@skeletonlabs/skeleton/themes/theme-seasonal.css';
	import { writable, type Writable } from 'svelte/store';
	import '../app.postcss';
	import type { LayoutData } from './$types';
	export let data: LayoutData;

	let selectedNavigation: Writable<number> = writable(1);
</script>

<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl">Inventory</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<AppRail>
			{#each data.navigation as link}
				<AppRailTile bind:selected={selectedNavigation} value={data.navigation.indexOf(link) + 1} label="{link.label}" href="{link.href}">
					<span class="material-icons">{link.icon}</span>
				</AppRailTile>
			{/each}
			
		</AppRail>
	</svelte:fragment>
	<slot />
</AppShell>

