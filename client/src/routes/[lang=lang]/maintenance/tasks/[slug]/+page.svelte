<script lang="ts">
    import type { PageData } from "./$types";
    
    export let data: PageData = {} as PageData;
</script>

<div class="grid gap-24 grid-cols-2">
	<div class="col-span-2">
		<h1 class="text-3xl font-bold">{data.task.name}</h1>
		<p class="text-gray-500"> 
            <span>{new Date(data.task.dueDate).toLocaleDateString()}</span>
        </p>
	</div>
</div>