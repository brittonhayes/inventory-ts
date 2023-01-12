<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	export let data: PageData;

	import { createAvatar } from '@dicebear/core';
	import { initials } from '@dicebear/collection';

	const avatar = async (employee: string)=>{
		return createAvatar(initials, {
			seed: employee,
		}).toDataUri();
	}

	let title = "Employees"
	let subtitle = "List of employees"
</script>

<div class="grid gap-24 grid-cols-2">
	<div class="col-span-1">
		<h1 class="text-3xl font-bold">{title}</h1>
		<p class="text-gray-500">{subtitle}</p>
	</div>
	<div class="col-span-1">
		<div class="flex justify-end">
			<button on:click={()=> goto('/employees/create')} aria-disabled disabled class="btn btn-primary">
				<i class="material-icons">add</i>
				<span>Add Employee</span>
			</button>
		</div>
	</div>
</div>

<section class="mt-10">
	<div>
		<table class="custom-table">
			<thead>
				<tr>
					<th class="custom-table-head">Name</th>
					<th class="custom-table-head"></th>
				</tr>
			</thead>
			<tbody>
				{#each data.employees as employee}
				<tr class="hover hover:cursor-pointer" on:click={()=> { goto(`/employees/${employee.id}`)}}>
					<td>
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
									<div class="text-xs opacity-30">Last updated <span class="italic">{new Date(employee.updatedAt).toLocaleDateString()}</span></div>
								</div>
							</div>
						</td>
						<td class="custom-table-row">
							<button class="btn btn-ghost btn-square">
								<i class="material-icons">chevron_right</i>
							</button>
						</td>
					<tr/>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<style lang="postcss">
	.custom-table {
		@apply table table-compact w-full shadow-md;
	}
</style>