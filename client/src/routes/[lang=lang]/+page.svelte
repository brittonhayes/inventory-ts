<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="grid gap-12 grid-cols-2">
	<div class="col-span-2">
		<h1 class="text-3xl font-bold">{data.title}</h1>
		<p class="text-base-300">{data.subtitle}</p>
	</div>
</div>

<div class="grid grid-flow-dense grid-cols-2 grid-rows-3 gap-5 pt-10">
	{#each data.links as link}
		<div class="col-span-2 md:col-span-1">
			<div class="stat bg-base-100 text-base-content hover:shadow-xl hover:cursor-pointer hover:text-base-content hover:bg-base-300 py-10">
				<div class="stat-figure">
					<i class="material-icons text-4xl">{link.icon}</i>
				</div>
				<div class="stat-title text-2xl font-mono">{link.label}</div>
			</div>
		</div>
	{/each}
</div>