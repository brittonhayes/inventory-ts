<script lang="ts">
	import TitleBar from "$lib/components/TitleBar.svelte";
	import type { MaintenanceTaskStatus } from "$lib/types";
	import { toast } from '@zerodevx/svelte-toast';
	import type { PageData } from "./$types";

	let taskName: string = '';
	let taskDueDate = '';
	let taskStatus: MaintenanceTaskStatus = 'PENDING';

	export let data: PageData;

	const submit = async () => {
		toast.push('Creating task...')
		// return await Fetcher.post<CreateMaintenanceTaskRequest, CreateMaintenanceTaskResponse>('/api/maintenance/tasks', {
		// 	name: taskName,
		// 	status: taskStatus,
		// 	dueDate: new Date(taskDueDate).toISOString(),
		// });
	}
</script>

<TitleBar title={data.content.title} subtitle={data.content.subtitle} backButtonLink={`/${data.locale}/maintenance/tasks`} />

<div class="indented-page">
	<form on:submit|preventDefault="{submit}">
		<div class="mb-4">
			<label class="block text-lg mb-2" for="name">{data.content.form.name}</label>
			<input
				class="input input-bordered max-w-md w-full"
				id="name"
				type="text"
				bind:value={taskName}
			/>
		</div>
		<div class="mb-4">
			<label class="block text-lg mb-2" for="dueDate">{data.content.form.dueDate}</label>
			<input
				class="input input-bordered max-w-md w-full"
				id="name"
				type="date"
				bind:value={taskDueDate}
			/>
		</div>
		<div class="mb-4">
			<label class="block text-lg mb-2" for="status">{data.content.form.status}</label>
			<select 
				bind:value={taskStatus} 
				class="select max-w-xl input-bordered border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			>
				<option disabled selected>{data.content.form.selectStatus}</option>
				<option value="PENDING">{data.content.form.pending}</option>
				<option value="COMPLETE">{data.content.form.completed}</option>
				<option value="CANCELLED">{data.content.form.cancelled}</option>
			</select>
		</div>
		<button formaction="submit" class="btn btn-primary gap-2 mt-10">
			{data.content.buttons.create}	
		</button>
	</form>
</div>