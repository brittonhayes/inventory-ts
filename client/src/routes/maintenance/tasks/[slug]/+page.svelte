<script lang="ts">
    import type { PageData } from "./$types"
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
    
    export let data: PageData = {} as PageData;
</script>

<Breadcrumbs crumbs={data.crumbs}></Breadcrumbs>
<div class="grid gap-24 grid-cols-2">
	<div class="col-span-2">
		<h1 class="text-3xl font-bold">{data.task.name}</h1>
		<p class="text-gray-500"> 
            <span>{new Date(data.task.dueDate).toDateString()}</span>
        </p>
	</div>
</div>