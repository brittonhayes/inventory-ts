<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import AppDrawer from '$lib/components/AppDrawer.svelte';
	import '../app.postcss';
</script>

<Navigation titleText="Inventory" titleURL="/" />
<AppDrawer>
	<svelte:fragment slot="sidebar">
		<li><a class="btn btn-square btn-primary text-white mb-2" href="/" >
			<i class="material-icons">home</i>
		</a></li>
		<li><a class="btn btn-square btn-ghost mb-2" href="/vehicles">
			<i class="material-icons">agriculture</i>
		</a></li>
		<li><a class="btn btn-square btn-ghost mb-2" href="/maintenance">
			<i class="material-icons">home_repair_service</i>
		</a></li>
	</svelte:fragment>

	<section class="overflow-auto">
		<slot></slot>
	</section>
	
</AppDrawer>