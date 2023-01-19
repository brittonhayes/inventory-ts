<script lang="ts">
	import Editor from "$lib/components/Editor.svelte";
	let title = 'New guide';
	let subtitle = 'Use the editor below to create a new guide.';
	let content = '<i>Start typing here...</i>';
</script>

<!-- <TitleBar 
    title={title} 
    subtitle={subtitle} 
    backButtonLink={`/${data.locale}/maintenance/guides`}
/> -->

<div class="grid grid-cols-6 mx-auto mt-10">
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
    <div class="col-span-6 md:col-span-4 col-start-1 md:col-start-2">
        <Editor class="mx-auto rounded-sm p-5 bg-base-100 " editable title="{title}" content="{content}"></Editor>
    </div>
</div>
