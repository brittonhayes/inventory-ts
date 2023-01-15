<script lang="ts">
	import { goto } from '$app/navigation';
	import TitleBar from '$lib/components/TitleBar.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<TitleBar class="mb-10" title={data.content.title} subtitle={data.content.subtitle}>
	<svelte:fragment slot="action">
		<a href="/{data.locale}/maintenance/tasks/create" class="btn btn-primary">
			<i class="material-icons">add</i>
			<span>{data.content.buttons.add}</span>
		</a>
	</svelte:fragment>
</TitleBar>

<div class="overflow-x-auto ">
	<table class="table table-compact xl:table-normal">
		<thead>
			<tr>
				<th class="w-full">{data.content.table.columns.name}</th>
				<th>{data.content.table.columns.assignee}</th>
				<th class="w-full"></th>
			</tr>
		</thead>
		<tbody>
			{#each data.tasks as task}
				<tr class="hover hover:cursor-pointer" on:click={()=>{ goto(`/${data.locale}/maintenance/tasks/${task.id}`)}}>
					<td>
						<div class="flex items-center space-x-3">
							<div>
								<div class="font-bold">{task.name}</div>
								<div class="text-xs opacity-30">{data.content.lastUpdated} <span class="italic">{new Date(task.updatedAt).toLocaleDateString()}</span></div>
							</div>
						</div>
					</td>
					{#if task.assignee}
						<td class="link no-underline hover:text-primary">
							<a href="/employees/{task.assignee.id}">
								{task.assignee.name}
							</a>
						</td>
					{:else}
						<td class="opacity-50">Nobody</td>
					{/if}
					<td>
						<i class="material-icons">chevron_right</i>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>