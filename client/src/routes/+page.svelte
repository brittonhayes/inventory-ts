<script lang="ts">
	import Paper, { Content } from '@smui/paper';
	import type { PageData } from './$types';

	export let data: PageData;
	let elevation = 0;
</script>

<Paper elevation="{elevation}">
	<h1 class="success">{data.pageTitle}</h1>
	<Content>
		<p>{data.pageSubtitle}</p>
	</Content>
</Paper>
