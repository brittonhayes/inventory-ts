<script lang="ts">
	import TitleBar from '$lib/components/TitleBar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<TitleBar title="{data.task.name}" subtitle="{new Date(data.task.dueDate).toLocaleDateString()}" backButton />

<div class="indented-page"></div>
