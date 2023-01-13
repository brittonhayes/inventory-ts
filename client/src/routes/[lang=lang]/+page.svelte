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
			<div class="stat bg-base-200 transition-colors hover:shadow-xl hover:cursor-pointer hover:bg-secondary py-10">
				<div class="stat-figure">
					<i class="material-icons text-4xl text-secondary-content">{link.icon}</i>
				</div>
				<div class="stat-title text-2xl font-mono">{link.label}</div>
			</div>
		</div>
	{/each}
</div>

<!-- 
<div class="stats stats-vertical lg:stats-horizontal w-full">
	<div class="stat">
		<div class="stat-figure">
			<button class="btn btn-primary gap-1">
				<i class="material-icons">add</i>
				New vehicle
			</button>
		</div>
		<div class="stat-title">Vehicles</div>
		<div class="stat-value">18</div>
		<div class="stat-desc">Jan 1st - Feb 1st</div>
	</div>
	
	<div class="stat">
		<div class="stat-figure">
			<button class="btn btn-primary gap-1">
				<i class="material-icons">add</i>
				New part
			</button>
		</div>
		<div class="stat-title">Vehicle Parts</div>
		<div class="stat-value">1,200</div>
		<div class="stat-desc">&nbsp;</div>
	</div>

	<div class="stat">
		<div class="stat-figure">
			<button disabled class="btn btn-primary gap-1">
				<i class="material-icons">add</i>
				New job
			</button>
		</div>
		<div class="stat-title">Maintenance Jobs</div>
		<div class="stat-value">13</div>
		<div class="stat-desc">&nbsp;</div>
	</div>
</div> -->