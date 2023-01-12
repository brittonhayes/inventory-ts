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

<div class="stats w-full">
	<div class="stat">
		<div class="stat-figure">
			<i class="material-icons text-4xl">agriculture</i>
		</div>
		<div class="stat-title">Vehicles</div>
		<div class="stat-value">18</div>
		<div class="stat-desc">Jan 1st - Feb 1st</div>
		<div class="stat-actions">
			<button disabled class="btn btn-sm btn-primary gap-1">
				<i class="material-icons">add</i>
				New vehicle
			</button>
		</div>
	</div>
	
	<div class="stat">
		<div class="stat-figure">
		<i class="material-icons text-4xl">home_repair_service</i>
		</div>
		<div class="stat-title">Vehicle Parts</div>
		<div class="stat-value">1,200</div>
		<div class="stat-desc">&nbsp;</div>
		<div class="stat-actions">
			<button disabled class="btn btn-sm btn-primary gap-1">
				<i class="material-icons">add</i>
				New part
			</button>
		</div>
	</div>

	<div class="stat">
	<div class="stat-figure">
		<i class="material-icons text-4xl">work</i>
	</div>
	<div class="stat-title">Maintenance Jobs</div>
	<div class="stat-value">13</div>
	<div class="stat-desc">&nbsp;</div>
	<div class="stat-actions">
		<button disabled class="btn btn-sm btn-primary gap-1">
			<i class="material-icons">add</i>
			New job
		</button>
	</div>
	</div>
</div>