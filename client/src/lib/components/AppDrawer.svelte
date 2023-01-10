<script lang="ts">
	import type { Route } from "$lib/types";
  import { page } from '$app/stores';

  export let links: Route[];
</script>

<div class="drawer drawer-mobile">
    <input id="sidebar-toggle" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col container mx-auto mt-5 px-8">
        <slot></slot>
    </div>
    <div class="drawer-side">
      <label for="sidebar-toggle" class="drawer-overlay"></label> 
      <ul class="menu p-4 w-24 bg-base-100 text-base-content">
        {#each links as link}
        <li><a class:btn-primary={$page.url.pathname === link.href} class:text-white={$page.url.pathname === link.href}  class="btn btn-square mb-2" href="{link.href}" >
          <i class="material-icons">{link.icon}</i>
        </a></li>
      {/each}
      </ul>
    </div>
</div>