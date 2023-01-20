<script lang="ts">
	import { breadcrumbs } from '$lib/stores/navigation';
	import type { Route } from '$lib/types';

	let crumbs: Route[] = [];
	export let maxItems = 5;

	breadcrumbs.subscribe((value) => {
		crumbs = value.length > maxItems ? (crumbs = value.slice(Math.max(value.length - maxItems, 1))) : value;
	});
</script>

{#if crumbs}
	<div class="{$$props.class + ' text-sm breadcrumbs'}">
		<ul>
			{#each crumbs as crumb}
				<li>
					<a href="{crumb.href}" class="opacity-50 link-hover">{crumb.label}</a>
				</li>
			{/each}
		</ul>
	</div>
{/if}
