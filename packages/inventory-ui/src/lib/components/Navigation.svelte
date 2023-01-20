<script lang="ts">
	import BackButton from './BackButton.svelte';
import Breadcrumbs from './Breadcrumbs.svelte';
	import Lightswitch from './Lightswitch.svelte';
</script>

<div class="{$$props.class + ' navbar mb-10 mt-2'}">
	<div class="navbar-start">
		<BackButton />
	</div>
	<div class="navbar-center">
		<Breadcrumbs maxItems="{2}" />
	</div>
	<div class="navbar-end">
		<Lightswitch class="" />
	</div>
</div>
