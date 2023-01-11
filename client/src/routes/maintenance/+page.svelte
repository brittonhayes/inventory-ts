<script lang="ts">
	import type { PageData } from "./$types";
	import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";

	export let data: PageData;

	let title = 'Maintenance';
	let subtitle = 'Vehicle maintenance tasks and guides.';
</script>

<Breadcrumbs crumbs={data.crumbs}></Breadcrumbs>
<div class="grid gap-12 grid-cols-2">
	<div class="col-span-2">
		<h1 class="text-3xl font-bold">{title}</h1>
		<p class="text-gray-500">{subtitle}</p>
		<divider class="divider"></divider>
	</div>
</div>
