<script lang="ts">
	import TitleBar from '$lib/components/TitleBar.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<TitleBar title={data.content.title} subtitle={data.content.subtitle} />