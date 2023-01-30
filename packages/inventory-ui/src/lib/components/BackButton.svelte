<script lang="ts">
	import { backButtonLink, breadcrumbs } from '$lib/stores/navigation';

	let to = '';
	export let icon = 'arrow_back';
	export let text = 'Back';

	$: backButtonLink.subscribe((link) => {
		to = link;
	});
</script>

{#if $breadcrumbs.length > 2}
	<div class="{$$props.class} hidden">
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
