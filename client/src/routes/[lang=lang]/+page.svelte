<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	let pages = data.links.filter((link)=>{
		return link.label !== 'Home'
	})
</script>

<div class="grid gap-12 grid-cols-2">
	<div class="col-span-2">
		<h1 class="text-4xl font-bold">{data.title}</h1>
		<p class="text-base-300">{data.subtitle}</p>
	</div>
</div>

<div class="grid grid-cols-4 gap-4 lg:w-1/3 md:w-1/2 w-full">
	{#each pages as link}
		<div class="lg:col-span-4 col-span-4">
			<a href="{link.href}">
				<div class="stat flex justify-start items-center border-2 lg:h-36 bg-base-100 hover:cursor-pointer hover:text-primary-content hover:bg-primary">
					<div class="stat-figure">
							<i class="material-icons text-3xl">{link.icon}</i>
					</div>
					<div class="stat-title text-2xl w-full">{link.label}</div>
					<button class="btn btn-ghost">
						<i class="material-icons text-3xl">chevron_right</i>
					</button>
				</div>
			</a>
		</div>
	{/each}
</div>