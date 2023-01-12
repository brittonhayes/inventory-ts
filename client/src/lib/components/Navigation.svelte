<script lang="ts">
	import Lightswitch from "./Lightswitch.svelte";
</script>


<div class="navbar bg-transparent">
	<div class="navbar-start">
	  <div class="dropdown">
		<label for="sidebar-toggle" class="btn btn-ghost btn-circle drawer-button lg:hidden">
			<i class="material-icons">menu</i>
		</label>
	  </div>
	</div>
	<div class="navbar-center">
	</div>
	<div class="navbar-end">
	  <button class="btn btn-ghost btn-circle">
		<i class="material-icons">search</i>
	  </button>
	  <Lightswitch />
	</div>
</div>