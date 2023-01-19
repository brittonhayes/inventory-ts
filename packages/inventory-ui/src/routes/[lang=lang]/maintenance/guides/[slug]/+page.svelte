<script lang="ts">
	import BackButton from "$lib/components/BackButton.svelte";
	import Editor from "$lib/components/Editor.svelte";
	import type { PageData } from "./$types";
    export let data: PageData = {} as PageData;
    let meta = {
        Vehicle: {
            icon: 'agriculture',
            text: data.guide.vehicle?.name || 'No vehicle',
        },
        Created: {
            icon: 'today',
            text: new Date(data.guide.createdAt).toLocaleDateString(),
        },
        Updated: {
            icon: 'edit_calendar',
            text: new Date(data.guide.updatedAt).toLocaleDateString(),
        },
    } satisfies Record<string, { icon?: string, text: string }>;
</script>

<BackButton class="w-24" />

<div class="justify-center items-center w-full md:w-4/5 xl:w-1/2 mt-10 mx-auto">
    <Editor 
        class="rounded-sm p-5" 
        title={data.guide.name} 
        subitle={data.guide.vehicle?.name || 'No vehicle'}
        content="{data.guide.content}" 
        {meta}
    />
</div>