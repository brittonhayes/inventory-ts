<script lang="ts">
	import TitleBar from '$lib/components/TitleBar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="flex flex-col mx-auto w-full md:w-3/4">
	<TitleBar
		title="{data.employee.name}"
		subtitle="{`${data.content.lastUpdated} ${new Date(data.employee.updatedAt).toLocaleDateString()}`}"
	/>
</section>
