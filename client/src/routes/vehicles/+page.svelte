<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<Breadcrumbs crumbs={data.crumbs}/>
<div class="grid gap-24 grid-cols-2">
	<div class="col-span-1">
		<h1 class="text-3xl font-bold">Vehicles</h1>
		<p class="text-gray-500">List of vehicles</p>
	</div>
	<div class="col-span-1">
		<div class="flex justify-end">
			<a href="/vehicles/create" class="btn btn-primary">
				<i class="material-icons">add</i>
				<span>Add Vehicle</span>
			</a>
		</div>
	</div>
</div>

<section class="mt-10">
	<div>
		<table class="custom-table">
			<thead>
				<tr>
					<th class="custom-table-head">Name</th>
					<th class="custom-table-head">Make</th>
					<th class="custom-table-head">Model</th>
					<th class="custom-table-head">Power</th>
				</tr>
			</thead>
			<tbody>
				{#each data.vehicles as vehicle}
					<tr>
						<td class="custom-table-row">{vehicle.name}</td>
						<td class="custom-table-row">{vehicle.make}</td>
						<td class="custom-table-row">{vehicle.model}</td>
						<td class="custom-table-row">{vehicle.power}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<style lang="postcss">
	
	.custom-table {
		@apply table table-compact w-full shadow-md;
	}


	.custom-table-head {
		
	}
	.custom-table-row {
		@apply p-2;
	}
</style>