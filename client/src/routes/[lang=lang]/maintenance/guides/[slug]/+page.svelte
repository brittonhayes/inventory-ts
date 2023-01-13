<script lang="ts">
	import TitleBar from "$lib/components/TitleBar.svelte";
    import type { PageData } from "./$types";
    
    export let data: PageData = {} as PageData;
</script>

<TitleBar 
    title={data.guide.name} 
    subtitle={`Last updated ${new Date(data.guide.updatedAt).toLocaleDateString()}`} 
    backButtonLink={`/${data.locale}/maintenance/guides`}
/>

<div class="pl-6 flex gap-5 flex-wrap">
    <div class="card p-5 flex-grow">
        <h2 class="card-title text-3xl pl-7 italic">Guide</h2>
        <div class="card-body prose">
            {data.guide.content}
        </div>
    </div>
    <div class="card card-bordered p-5 px-16">
        <h2 class="card-title text-3xl italic">Task List</h2>
        <ul class="list">
            list
        </ul>
    </div>
</div>