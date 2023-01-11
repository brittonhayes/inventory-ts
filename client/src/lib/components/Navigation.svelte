<script lang="ts">
	import Lightswitch from "./Lightswitch.svelte";
</script>


<div class="navbar text-neutral-content bg-transparent">
	<div class="navbar-start">
	  <div class="dropdown">
		<label for="sidebar-toggle" class="btn btn-ghost btn-circle drawer-button lg:hidden">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
		</label>
	  </div>
	</div>
	<div class="navbar-center">
	</div>
	<div class="navbar-end">
	  <button class="btn btn-ghost btn-circle">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
	  </button>
	  <Lightswitch />
	</div>
</div>