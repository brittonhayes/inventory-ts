<script lang="ts">
    import TitleBar from "$lib/components/TitleBar.svelte";
    import type { PageData } from "./$types";
	export let data: PageData;
</script>

<TitleBar 
	title={data.vehicle.name || data.vehicle.make} 
	subtitle={"Last updated " + new Date(data.vehicle.updatedAt).toLocaleDateString()} 
	backButtonLink={`/${data.params.lang}/vehicles/`} 
>
	<p class="text-md">
		<span class="badge badge-secondary">{data.vehicle.vehicleType.toLowerCase()}</span>
	</p>
</TitleBar>

<!-- <section class="indented-page pt-10">
	<h2 class="text-lg md:text-3xl text-secondary font-bold">
		Vehicle Insights
	</h2>
</section> -->
<!-- 
<section class="indented-page flex flex-wrap items-center w-full justify-start gap-5">
	<div class="stats stats-vertical bg-base-300 text-base-content xl:stats-horizontal border-secondary border-b-2 border-opacity-70 rounded-lg">
		<div class="stat">
			<div class="stat-title italic text-sm md:text-lg">Make</div>
			<div class="stat-value text-sm md:text-xl">{data.vehicle.make}</div>
			<div class="stat-figure text-secondary">
				<i class="material-icons">factory</i>
			</div>
		</div>
		<div class="stat">
			<div class="stat-title italic text-sm md:text-lg">Model</div>
			<div class="stat-value text-sm md:text-xl">{data.vehicle.model}</div>
			<div class="stat-figure text-secondary">
				<i class="material-icons text-xl">agriculture</i>
			</div>
		</div>
		<div class="stat">
			<div class="stat-title italic text-sm md:text-lg">Machine Hours</div>
			<div class="stat-value text-sm md:text-xl">{data.vehicle.machineHours}</div>
			<div class="stat-figure text-secondary">
				<i class="material-icons text-xl">schedule</i>
			</div>
		</div>
		<div class="stat">
			<div class="stat-title italic text-sm md:text-lg">Power Type</div>
			<div class="stat-value text-sm md:text-xl">{data.vehicle.power}</div>
			<div class="stat-figure text-secondary">
				<i class="material-icons text-xl">local_gas_station</i>
			</div>
		</div>
	</div>

	<div class="stats stats-vertical bg-base-300 text-base-content lg:stats-horizontal shadow-sm rounded-lg">
		
	</div>
</section> -->