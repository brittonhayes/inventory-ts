<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { breadcrumbs } from '$lib/stores/navigation';
	import type { NavigationTarget } from '@sveltejs/kit';

	export let to = '';
	export let icon = 'arrow_back';
	let text = 'Back';

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

<div class="{$$props.class}">
	<div class="flex flex-row">
		<a href="{to}" class="btn rounded-xl btn-sm btn-ghost gap-2">
			<i class="material-icons text-xl">{icon}</i>
			{#if text}
				{text}
			{/if}
		</a>
	</div>
</div>
