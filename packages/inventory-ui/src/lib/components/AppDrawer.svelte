<script lang="ts">
	import { page } from '$app/stores';
	import type { Route } from '$lib/types';
	export let links: Route[];
</script>

<div class="drawer drawer-mobile bg-neutral">
	<input id="sidebar-toggle" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content px-5 pb-24">
		<slot />
	</div>
	<div class="drawer-side shadow-md">
		<label for="sidebar-toggle" class="drawer-overlay"></label>
		<ul class="menu p-4 w-20 bg-base-100">
			{#each links as link}
				<li>
					<a class:active="{$page.url.pathname === link.href}" class="btn btn-ghost btn-square mb-2" href="{link.href}">
						<i class="material-icons">{link.icon}</i>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
