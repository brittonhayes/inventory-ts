<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="grid gap-24 grid-cols-2">
	<div class="col-span-1">
		<h1 class="text-3xl font-bold">{data.title}</h1>
		<p class="text-gray-500">{data.subtitle}</p>
	</div>
	<div class="col-span-1">
		<div class="flex justify-end">
			<a href="/maintenance/tasks/create" class="btn btn-primary">
				<i class="material-icons">add</i>
				<span>Add Task</span>
			</a>
		</div>
	</div>
</div>

<section class="mt-10">
	<div>
		<table class="table table-compact w-full">
			<thead>
				<tr>
					<th>Name</th>
					<th>Assignee</th>
					<th>Due Date</th>
				</tr>
			</thead>
			<tbody>
				{#each data.tasks as task}
					<tr>
						<td class="link no-underline hover:text-primary">
							<a href="/maintenance/tasks/{task.id}">
								{task.name}
							</a>
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
						<td>{ new Date(task.dueDate).toLocaleDateString()}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>
