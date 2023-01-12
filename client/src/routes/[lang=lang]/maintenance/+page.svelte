<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="grid gap-12 grid-cols-2">
	<div class="col-span-2">
		<h1 class="text-3xl font-bold">{data.content.title}</h1>
		<p class="text-gray-500">{data.content.title}</p>
		<divider class="divider"></divider>
	</div>
</div>
