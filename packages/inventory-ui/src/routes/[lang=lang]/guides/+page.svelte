<script lang="ts">
	import { goto } from '$app/navigation';
	import TitleBar from '$lib/components/TitleBar.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<section class="flex flex-col mx-auto w-full md:w-3/4">
	<TitleBar class="mb-10" title="{data.content.title}" subtitle="{data.content.subtitle}">
		<svelte:fragment slot="action">
			<a href="/{data.locale}/guides/create" class="btn btn-primary">
				<i class="material-icons">add</i>
				<span>{data.content.buttons.add}</span>
			</a>
		</svelte:fragment>
	</TitleBar>

	<div class="overflow-x-auto w-full">
		<table class="table table-compact xl:table-normal">
			<thead>
				<tr>
					<th class="w-full">{data.content.table.columns.name}</th>
					<th>{data.content.table.columns.vehicle}</th>
					<th class="w-full"></th>
				</tr>
			</thead>
			<tbody>
				{#each data.guides as guide}
					<tr
						class="hover hover:cursor-pointer"
						on:click="{() => {
							goto(`/${data.locale}/guides/${guide.id}`);
						}}"
					>
						<td>
							<div class="flex items-center space-x-3">
								<div>
									<div class="font-bold">{guide.name}</div>
									<div class="text-xs opacity-30">
										{data.content.lastUpdated}
										<span class="italic">{new Date(guide.updatedAt).toLocaleDateString()}</span>
									</div>
								</div>
							</div>
						</td>
						{#if guide.vehicle}
							<td class="link no-underline hover:text-primary">
								<a href="/{data.locale}/vehicles/{guide.vehicle?.id}">
									{guide.vehicle?.name}
								</a>
							</td>
						{:else}
							<td class="opacity-50">None</td>
						{/if}
						<td>
							<i class="material-icons">chevron_right</i>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>
