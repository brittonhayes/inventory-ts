<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { breadcrumbs } from '$lib/stores/navigation';
	export let data: PageData;

	breadcrumbs.set([
		{ href: '/', label: 'Home', icon: 'home' },
		{ href: '/vehicles', label: 'Vehicles', icon: 'agriculture' },
	])
</script>

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

<div class="overflow-x-auto w-full mt-10">
	<table class="custom-table">
		<thead>
			<tr>
				<th class="custom-table-head">Name</th>
				<th class="custom-table-head">Make & Model</th>
				<th class="custom-table-head">Machine Hours</th>
				<th class="custom-table-head">Type</th>
				<th class="custom-table-head"></th>
			</tr>
		</thead>
		<tbody>
			{#each data.vehicles as vehicle}
				<tr class="hover hover:cursor-pointer" on:click={()=> { goto(`/vehicles/${vehicle.id}`)}}>
					<td>
						<div class="flex items-center space-x-3">
							<div>
								<div class="font-bold">{vehicle.name}</div>
								<div class="text-xs opacity-30">Last updated <span class="italic">{new Date(vehicle.updatedAt).toLocaleDateString()}</span></div>
							</div>
						</div>
					</td>
					<td>
						<div class="flex items-center space-x-3">
							<div>
								<div class="font-bold">{vehicle.make}</div>
								<div class="text-xs opacity-50"><span>{vehicle.model}</span></div>
							</div>
						</div>
					</td>
					<td class="custom-table-row">{vehicle.machineHours}</td>
					<td class="custom-table-row">
						<span class:badge-ghost="{vehicle.vehicleType === 'VEHICLE'}" class="badge">{vehicle.vehicleType.toLowerCase()}</span>
					</td>
					<td class="custom-table-row">
						<i class="material-icons">chevron_right</i>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="postcss">
	
	.custom-table {
		@apply table w-full table-compact;
	}


	.custom-table-head {
		
	}
	.custom-table-row {
	}
</style>