<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { breadcrumbs } from '$lib/stores/navigation';
	import type { NavigationTarget } from '@sveltejs/kit';

	export let to = '';
	export let icon = 'chevron_left';
	export let text = 'Back';

	/**
	 * Minumum depth of nested navigation required to show the back button
	 */
	export let minumumDepth = 1;

	const getPreviousPage = (from: NavigationTarget | null): string => {
		if (!from) {
			return $breadcrumbs[$breadcrumbs.length - 2].href;
		}

		return from.url.pathname;
	};

	afterNavigate(({ from }) => {
		to = getPreviousPage(from);
	});
</script>

{#if $breadcrumbs.length > minumumDepth}
	<div class="{$$props.class}">
		<a href="{to}" class="btn bg-base-100 gap-2 flex flex-row justify-center items-center">
			<i class="material-icons">{icon}</i>
			{#if text}
				{text}
			{/if}
		</a>
	</div>
{/if}
