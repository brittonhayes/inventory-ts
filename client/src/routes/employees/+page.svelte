<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	let title = "Employees"
	let subtitle = "List of employees"
</script>

<Breadcrumbs crumbs={data.crumbs}/>
<div class="grid gap-24 grid-cols-2">
	<div class="col-span-1">
		<h1 class="text-3xl font-bold">{title}</h1>
		<p class="text-gray-500">{subtitle}</p>
	</div>
	<div class="col-span-1">
		<div class="flex justify-end">
			<a href="/employees/create" class="btn btn-primary">
				<i class="material-icons">add</i>
				<span>Add Employee</span>
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
				</tr>
			</thead>
			<tbody>
				{#each data.employees as employee}
					<td class="link no-underline hover:text-primary">
						<a href="/employees/{employee.id}">
							{employee.name}
						</a>
					</td>
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