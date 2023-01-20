<script lang="ts">
	import { goto } from '$app/navigation';
	import TitleBar from '$lib/components/TitleBar.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>


<section class="flex flex-col mx-auto w-full md:w-3/4">
	<TitleBar class="mb-10" title="{data.content.title}" subtitle="{data.content.subtitle}">
		<svelte:fragment slot="action">
			<a href="/{data.locale}/vehicles/create" class="btn btn-primary gap-1">
				<i class="material-icons">add</i>
				<span>{data.content.button.add}</span>
			</a>
		</svelte:fragment>
	</TitleBar>

<div class="overflow-x-auto pb-24">
	<table class="table table-compact xl:table-normal">
		<thead>
			<tr>
				<th class="w-full">{data.content.table.columns.name}</th>
				<th>{data.content.table.columns.make}</th>
				<th>{data.content.table.columns.hours}</th>
				<th class="w-full">{data.content.table.columns.type}</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each data.vehicles as vehicle}
				<tr
					class="hover:cursor-pointer hover"
					on:click="{() => {
						goto(`/${data.locale}/vehicles/${vehicle.id}`);
					}}"
				>
					<td>
						<div class="flex items-center space-x-3">
							<div>
								<div class="font-bold">{vehicle.name}</div>
								<div class="text-xs opacity-30">
									{data.content.lastUpdated}
									<span class="italic">{new Date(vehicle.updatedAt).toLocaleDateString()}</span>
								</div>
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
					<td>{vehicle.machineHours}</td>
					<td>
						<span class="badge">{vehicle.vehicleType.toLowerCase()}</span>
					</td>
					<td>
						<i class="material-icons">chevron_right</i>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
</section>

<style lang="postcss">
</style>

