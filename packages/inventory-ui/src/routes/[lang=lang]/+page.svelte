<script lang="ts">
	import AlertBanner from '$lib/components/AlertBanner.svelte';
	import TitleBar from '$lib/components/TitleBar.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	let pages = data.links.filter((link) => {
		return link.label !== 'Home';
	});
</script>

<section class="flex flex-col mx-auto w-full md:w-3/4">
	<TitleBar title="{data.title}" subtitle="{data.subtitle}" />
	<div class="flex flex-row flex-wrap gap-10 justify-center items-center h-full">
		{#each pages as link}
			<a
				href="{link.href}"
				class="card transition-colors hover:bg-base-200/30 border-2 flex-grow rounded-none min-w-[24rem] min-h-[12rem] bg-base-100 shadow-lg col-span-1"
			>
				<div class="card-body flex justify-center items-center">
					<h2 class="card-title text-3xl">{link.label}</h2>
				</div>
			</a>
		{/each}
	</div>
	<AlertBanner text="Page under construction" />
</section>
