<script lang="ts">
	import TitleBar from "$lib/components/TitleBar.svelte";
	import type { PageData } from "./$types";
	let vehicleName: string;

	export let data: PageData;
	const submit = ()=>{
		alert('submit');
	}
</script>


<TitleBar title={data.content.title} subtitle={data.content.subtitle} backButtonLink={`/${data.locale}/vehicles`} />

<div class="grid gap-5 grid-cols-2">
	<div class="col-span-2 rounded">
		<form on:submit|preventDefault="{submit}">
			<div class="mb-4">
				<label class="block text-lg mb-2" for="name">Name</label>
				<input
					class="input input-bordered max-w-md w-full"
					id="name"
					type="text"
					bind:value={vehicleName}
				/>
			</div>
			<button formaction="submit" class="btn btn-primary gap-2 mt-10">
				Create
			</button>
		</form>
	</div>
</div>