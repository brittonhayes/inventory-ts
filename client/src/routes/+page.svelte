<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>


<Breadcrumbs crumbs={data.crumbs}></Breadcrumbs>
<div class="grid gap-12 grid-cols-2">
	<div class="col-span-2">
		<h1 class="text-3xl font-bold">Dashboard</h1>
		<p class="text-base-300">Your farm's inventory</p>
	</div>
</div>

<divider class="divider mt-1">
		<h2 class="text-xl italic text-base-300">Insights</h2>
		
</divider>
<div class="stats mx-auto w-full">
	<div class="stat bg-base-100">
	  <div class="stat-figure text-primary">
		<i class="material-icons text-4xl">agriculture</i>
	  </div>
	  <div class="stat-title">Vehicles</div>
	  <div class="stat-value">18</div>
	  <div class="stat-desc">Jan 1st - Feb 1st</div>
	</div>
	
	<div class="stat bg-base-100">
		<div class="stat-figure text-primary">
		  <i class="material-icons text-4xl">home_repair_service</i>
		</div>
		<div class="stat-title">Vehicle Parts</div>
		<div class="stat-value">1,200</div>
		<div class="stat-desc">↘︎ 90 (14%)</div>
	  </div>

	<div class="stat bg-base-100">
	  <div class="stat-figure text-primary">
		<i class="material-icons text-4xl">work</i>
	  </div>
	  <div class="stat-title">Maintenance Jobs</div>
	  <div class="stat-value">13</div>
	  <div class="stat-desc">↗︎ 10</div>
	</div>
  </div>
  <divider class="divider mt-1"></divider>