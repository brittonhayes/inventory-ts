<script lang="ts">
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
	import Topbar from '$lib/components/Topbar/Topbar.svelte';
	import { Scrim } from '@smui/drawer';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

<Topbar title="{data.application.title}" />
<Sidebar>
	<Scrim fixed="{false}" />
	<LayoutGrid>
		<Cell span="{1}" />
		<Cell span="{10}">
			<slot />
		</Cell>
		<Cell span="{1}" />
	</LayoutGrid>
</Sidebar>
