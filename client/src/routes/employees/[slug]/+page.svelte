<script lang="ts">
    import type { PageData } from "./$types"
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import BackButton from "$lib/components/BackButton.svelte";
    
    export let data: PageData;
</script>

<div class="flex items-center">
	<BackButton to="/employees" class="pr-10" />
	<div>
		<h1 class="text-3xl font-bold">{data.employee.name}</h1>
		<p class="opacity-50"> 
			<span>Last updated {new Date(data.employee.updatedAt).toLocaleDateString()}</span>
		</p>
	</div>
</div>
<div class="divider"></div>