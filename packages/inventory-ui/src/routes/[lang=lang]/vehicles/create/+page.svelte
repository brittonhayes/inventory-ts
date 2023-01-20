<script lang="ts">
	import TitleBar from '$lib/components/TitleBar.svelte';
	import type { PageData } from './$types';
	let vehicleName: string;

	export let data: PageData;
	const submit = () => {
		alert('submit');
	};
</script>

<section class="flex flex-col mx-auto w-full md:w-3/4">
	<TitleBar title="{data.content.title}" subtitle="{data.content.subtitle}" backButton />
	<form on:submit|preventDefault="{submit}">
		<div class="mb-4">
			<label class="block text-lg mb-2" for="name">Name</label>
			<input class="input input-bordered max-w-md w-full" id="name" type="text" bind:value="{vehicleName}" />
		</div>
		<button formaction="submit" class="btn btn-primary gap-2 mt-10"> Create </button>
	</form>
</section>
