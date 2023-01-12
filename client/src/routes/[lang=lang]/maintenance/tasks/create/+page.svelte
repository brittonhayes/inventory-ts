<script lang="ts">
	import { post } from "$lib/common/fetcher";
	import { toast } from '@zerodevx/svelte-toast'
	import type { CreateMaintenanceTaskRequest, CreateMaintenanceTaskResponse, MaintenanceTaskStatus } from "$lib/types";

	let title = "Create a task"
	let subtitle = "Add a new maintenance task to the database."

	let taskName: string = '';
	let taskDueDate = '';
	let taskStatus: MaintenanceTaskStatus = 'PENDING';

	const submit = async () => {
		toast.push('Creating task...')
		return await post<CreateMaintenanceTaskRequest, CreateMaintenanceTaskResponse>('/api/maintenance/tasks', {
			name: taskName,
			status: taskStatus,
			dueDate: new Date(taskDueDate).toISOString(),
		});
	}
</script>

<div class="grid gap-5 grid-cols-2">
	<div class="col-span-2">
		<h1 class="text-3xl font-bold">{title}</h1>
		<p class="text-gray-500">{subtitle}</p>
		<div class="divider m-0 p-0"></div>
	</div>	
	<div class="col-span-2 rounded">
		<form on:submit|preventDefault="{submit}">
			<div class="mb-4">
				<label class="block text-lg mb-2" for="name">Name</label>
				<input
					class="input input-bordered max-w-md w-full"
					id="name"
					type="text"
					bind:value={taskName}
				/>
			</div>
			<div class="mb-4">
				<label class="block text-lg mb-2" for="dueDate">Due Date</label>
				<input
					class="input input-bordered max-w-md w-full"
					id="name"
					type="date"
					bind:value={taskDueDate}
				/>
			</div>
			<div class="mb-4">
				<label class="block text-lg mb-2" for="status">Status</label>
				<select bind:value={taskStatus} class="select max-w-xl input-bordered border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
					<option disabled selected>Select a status</option>
					<option value="PENDING">Pending</option>
					<option value="COMPLETE">Complete</option>
					<option value="CANCELLED">Cancelled</option>
				</select>
			</div>
			<button formaction="submit" class="btn btn-primary gap-2 mt-10">
				Create
			</button>
		</form>
	</div>
</div>

