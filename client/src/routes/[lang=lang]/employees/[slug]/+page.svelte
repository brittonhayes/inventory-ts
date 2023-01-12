<script lang="ts">
    import BackButton from "$lib/components/BackButton.svelte";
    import type { PageData } from "./$types";
    
    export let data: PageData;
</script>

<div class="flex items-center">
	<BackButton to="/{data.locale}/employees" class="pr-10" />
	<div>
		<h1 class="text-3xl font-bold">{data.employee.name}</h1>
		<p class="opacity-50"> 
			<span>{data.content.lastUpdated} {new Date(data.employee.updatedAt).toLocaleDateString()}</span>
		</p>
	</div>
</div>
<div class="divider"></div>