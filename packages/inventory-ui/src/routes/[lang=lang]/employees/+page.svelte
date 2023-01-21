<script lang="ts">
	import { goto } from '$app/navigation';
	import TitleBar from '$lib/components/TitleBar.svelte';
	import { initials } from '@dicebear/collection';
	import { createAvatar } from '@dicebear/core';
	import type { PageData } from './$types';

	const avatar = async (employee: string) => {
		return createAvatar(initials, {
			seed: employee
		}).toDataUri();
	};

	export let data: PageData;
</script>

<section class="flex flex-col mx-auto w-full md:w-3/4">
	<TitleBar class="mb-10" title="{data.content.title}" subtitle="{data.content.subtitle}">
		<svelte:fragment slot="action">
			<button
				on:click="{() => goto(`/${data.locale}/employees/create`)}"
				aria-disabled
				disabled
				class="btn btn-primary"
			>
				<i class="material-icons">add</i>
				<span>{data.content.buttons.add}</span>
			</button>
		</svelte:fragment>
	</TitleBar>

	<div class="overflow-x-auto">
		<table class="table table-compact xl:table-normal">
			<thead>
				<tr>
					<th class="w-full">{data.content.table.columns.name}</th>
					<th class=""></th>
				</tr>
			</thead>
			<tbody>
				{#each data.employees as employee}
					<tr
						class="hover hover:cursor-pointer"
						on:click="{() => {
							goto(`/${data.locale}/employees/${employee.id}`);
						}}"
					>
						<td class="w-full">
							<div class="flex items-center space-x-3">
								<div class="avatar">
									<div class="mask mask-squircle w-12 h-12">
										{#await avatar(employee.name) then value}
											<img src="{value}" alt="{employee.name}" />
										{/await}
									</div>
								</div>
								<div>
									<div class="font-bold">{employee.name}</div>
									<div class="text-xs opacity-30">
										{data.content.table.columns.lastUpdated}
										<span class="italic">{new Date(employee.updatedAt).toLocaleDateString(data.locale)}</span>
									</div>
								</div>
							</div>
						</td>
						<td class="custom-table-row">
							<button class="btn btn-ghost btn-square">
								<i class="material-icons">chevron_right</i>
							</button>
						</td>
					</tr><tr></tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>
