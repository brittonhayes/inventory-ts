<script lang="ts">
	import Editor from "$lib/components/Editor.svelte";
    import TitleBar from "$lib/components/TitleBar.svelte";
    import type { PageData } from "./$types";
    
    export let data: PageData = {} as PageData;
</script>

<TitleBar 
    title={data.guide.vehicle?.name || 'Instructions'} 
    subtitle={`Last updated ${new Date(data.guide.updatedAt).toLocaleDateString()}`} 
    backButton
/>

<div class="grid grid-cols-5 mx-auto grid-flow-rows-dense gap-10 w-full mt-10">
    <!-- <div class="col-span-4 lg:col-start-2 lg:col-span-1">
        <h2 class="card-title text-2xl lg:text-3xl italic">Task List</h2>
        <ol class="list-decimal">
            {#each data.tasks as task}
                <li>
                    <p class="text-lg">{task.name}</p>
                    {#if task.description}
                        <p class="text-gray-500">{task.description}</p>
                    {/if}
                </li>
            {/each}
        </ol>
    </div> -->
    <div class="col-span-6 md:col-span-3 col-start-1 md:col-start-2">
        <Editor class="mx-auto rounded-sm p-5 shadow-lg bg-base-100" content="{data.guide.content}"></Editor>
    </div>
</div>