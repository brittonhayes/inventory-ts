<script lang="ts">
	import Lightswitch from './Lightswitch.svelte';
</script>

<div class="{$$props.class + ' navbar mb-10 mt-2'}">
	<div class="navbar-start">
		<slot name="start" />
	</div>
	<div class="navbar-center">
		<slot name="center" />
	</div>
	<div class="navbar-end">
		<Lightswitch />
	</div>
</div>
