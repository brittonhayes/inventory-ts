<script lang="ts">
	import TitleBar from '$lib/components/TitleBar.svelte';
	import type { PageData } from './$types';

	let taskName = '';
	let taskDueDate = '';
	let taskStatus: Components.Schemas.TaskStatus = 'INCOMPLETE';

	export let data: PageData;
</script>

<TitleBar title="{data.content.title}" subtitle="{data.content.subtitle}" backButtonLink="{`/${data.locale}/tasks`}" />

<div class="indented-page">
	<form>
		<div class="mb-4">
			<label class="block text-lg mb-2" for="name">{data.content.form.name}</label>
			<input class="input input-bordered max-w-md w-full" id="name" type="text" bind:value="{taskName}" />
		</div>
		<div class="mb-4">
			<label class="block text-lg mb-2" for="dueDate">{data.content.form.dueDate}</label>
			<input class="input input-bordered max-w-md w-full" id="name" type="date" bind:value="{taskDueDate}" />
		</div>
		<div class="mb-4">
			<label class="block text-lg mb-2" for="status">{data.content.form.status}</label>
			<select
				bind:value="{taskStatus}"
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
