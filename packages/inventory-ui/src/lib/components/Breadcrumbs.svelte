<script lang="ts">
	import type { Route } from '$lib/types';
	export let crumbs: Route[];
</script>

<div class="{$$props.class + ' text-sm breadcrumbs'}">
	<ul>
		{#each crumbs as crumb}
			<li>
				<a href="{crumb.href}" class="opacity-50 link-hover">{crumb.label}</a>
			</li>
		{/each}
	</ul>
</div>
