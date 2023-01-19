<script lang="ts">
    import BackButton from "$lib/components/BackButton.svelte";
	import TitleBar from "$lib/components/TitleBar.svelte";
    import type { PageData } from "./$types";
    
    export let data: PageData;
</script>

<TitleBar 
	title={data.employee.name} 
	subtitle={`${data.content.lastUpdated} ${new Date(data.employee.updatedAt).toLocaleDateString()}`} 
	backButton
/>