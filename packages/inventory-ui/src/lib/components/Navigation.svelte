<script lang="ts">
	import { breadcrumbs } from '$lib/stores/navigation';
	import BackButton from './BackButton.svelte';
	import Breadcrumbs from './Breadcrumbs.svelte';
	import Lightswitch from './Lightswitch.svelte';
</script>

<div class="{$$props.class + ' navbar mb-10 mt-2'}">
	<div class="navbar-start">
		{#if $breadcrumbs.length > 1}
			<BackButton />
		{/if}
	</div>
	<div class="navbar-center">
		{#if $breadcrumbs.length > 1}
			<Breadcrumbs maxItems="{2}" />
		{/if}
	</div>
	<div class="navbar-end">
		<Lightswitch class="" />
	</div>
</div>
