<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { breadcrumbs } from '$lib/stores/navigation';

	export let to = '';
	export let icon = 'arrow_back';
	export let text = 'Back';

	afterNavigate(({ from }) => {
		to = from?.url.pathname || $breadcrumbs.at(-2)?.href || '/';
	});
</script>

{#if $breadcrumbs.length > 2}
	<div class="{$$props.class}">
		<a href="{to}" class="btn bg-base-100 gap-2 flex flex-row justify-center items-center">
			<i class="material-icons">{icon}</i>
			<span class="hidden md:block">
				{#if text}
					{text}
				{/if}
			</span>
		</a>
	</div>
{/if}
