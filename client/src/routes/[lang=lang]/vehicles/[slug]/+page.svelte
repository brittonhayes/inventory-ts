<script lang="ts">
    import BackButton from "$lib/components/BackButton.svelte";
    import type { PageData } from "./$types";
    export let data: PageData;

	let to = `/${data.params.lang}/vehicles/`;
</script>

<div class="flex items-center">
	<BackButton to={to} class="pr-10" />
	<div>
		<h1 class="text-3xl font-bold">{data.vehicle.name}</h1>
		<p class="opacity-50"> 
			<span>Last updated {new Date(data.vehicle.updatedAt).toLocaleDateString()}</span>
		</p>
	</div>
</div>
<div class="divider"></div>