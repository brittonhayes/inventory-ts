<script lang="ts">
	import { goto } from '$app/navigation';
	import TitleBar from '$lib/components/TitleBar.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<section class="flex flex-col mx-auto w-3/4">
	<TitleBar
		class="mx-auto flex justify-center items-center"
		title="{data.vehicle.name || data.vehicle.model}"
		subtitle="{'Last updated ' + new Date(data.vehicle.updatedAt).toLocaleDateString()}"
	>
		<p class="text-md">
			<span class="badge badge-secondary">{data.vehicle.vehicleType.toLowerCase()}</span>
		</p>
		<br />
	</TitleBar>

	<div class="grid grid-cols-4 gap-4">
		<div class="col-span-4 mb-10">
			<h2 class="text-2xl flex items-center gap-2">
				<i class="material-icons">menu_book</i>
				Maintenance Guides
			</h2>
			{#if data.guides.length > 0}
				<div class="flex flex-wrap flex-col md:flex-row gap-4 mt-4">
					{#each data.guides as guide}
						<div class="card card-bordered bg-base-300 p-5 md:w-1/3 w-full">
							<h4 class="card-title md:text-lg text-sm">
								{guide.name}
								<div class="badge badge-secondary">NEW</div>
							</h4>
							<p class="card-subtitle text-sm">Last updated {new Date(guide.updatedAt).toLocaleDateString()}</p>
							<div class="card-actions mt-2">
								<button
									on:click="{() => goto(`/${data.locale}/guides/${guide.id}/`)}"
									class="btn btn-sm btn-primary w-full md:btn-block"
								>
									View
								</button>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="card card-accent bg-base-200 mt-2">
					<div class="card-body">
						<p class="text-center">No guides found.</p>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<div class="grid grid-cols-4 gap-4">
		<div class="col-span-4 lg:col-span-2 mb-5">
			<h2 class="text-2xl flex items-center gap-2">
				<i class="material-icons">rv_hookup</i>
				Compatible Implements
			</h2>
			{#if data.implements.length > 0}
				<div class="flex flex-wrap flex-col gap-4 mt-4">
					<table class="table xl:table-normal table-compact w-full">
						<thead>
							<tr>
								<th class="w-12"></th>
								<th>Make</th>
								<th>Model</th>
								<th>Type</th>
							</tr>
						</thead>
						<tbody>
							{#each data.implements as implement}
								<tr
									class="hover hover:cursor-pointer"
									on:click="{() => {
										goto(`/${data.locale}/implements/${implement.id}/`);
									}}"
								>
									<td>
										{data.implements.indexOf(implement) + 1}
									</td>
									<td>
										{implement.make}
									</td>
									<td>
										{implement.model}
									</td>
									<td>
										<span class="badge">{implement.implementType}</span>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{:else}
				<div class="card card-accent bg-base-200 mt-4">
					<div class="card-body">
						<p class="text-center">No compatible implements found.</p>
					</div>
				</div>
			{/if}
		</div>

		<div class="col-span-4 lg:col-span-2">
			<h2 class="text-2xl flex items-center gap-2">
				<i class="material-icons">home_repair_service</i>
				Compatible Parts
			</h2>
			{#if data.parts.length > 0}
				<div class="flex flex-wrap flex-col gap-4 mt-4">
					<table class="table xl:table-normal table-compact w-full">
						<thead>
							<tr>
								<th class="w-12"></th>
								<th>Name</th>
							</tr>
						</thead>
						<tbody>
							{#each data.parts as part}
								<tr
									class="hover hover:cursor-pointer"
									on:click="{() => {
										goto(`/${data.locale}/parts/${part.id}`);
									}}"
								>
									<td>
										{data.parts.indexOf(part) + 1}
									</td>
									<td>
										{part.name}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{:else}
				<div class="card card-accent bg-base-200 mt-4">
					<div class="card-body">
						<p class="text-center">No compatible parts found.</p>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>