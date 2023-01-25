<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { breadcrumbs } from '$lib/stores/navigation';

	export let to = '';
	export let icon = 'chevron_left';
	export let text = 'Back';

	afterNavigate(({ from }) => {
		to = from?.url.pathname || '/';
	});
</script>

{#if $breadcrumbs.length > 2}
	<div class="{$$props.class}">
		<a href="{to}" class="btn bg-base-100 gap-2 flex flex-row justify-center items-center">
			<i class="material-icons">{icon}</i>
			{#if text}
				{text}
			{/if}
		</a>
	</div>
{/if}
