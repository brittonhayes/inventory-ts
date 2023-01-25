<script lang="ts">
	import { breadcrumbs } from '$lib/stores/navigation';
</script>

{#if $breadcrumbs.length > 0}
	<div class="{$$props.class + ' text-sm breadcrumbs hidden sm:block'}">
		<ul>
			{#each $breadcrumbs as crumb}
				<li>
					<a href="{crumb.href}" class="opacity-50 link-hover">{crumb.label}</a>
				</li>
			{/each}
		</ul>
	</div>
{/if}
