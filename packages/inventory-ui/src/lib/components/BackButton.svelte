<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	
	let to = '';
	export let icon = 'chevron_left';

	afterNavigate(({ from }) => {
		to = from?.url.pathname || '/';
	});
</script>

<div class="{$$props.class}">
	<a href="{to}" class="btn bg-base-100 gap-2 flex flex-row justify-center items-center">
		<i class="material-icons">{icon}</i>
		<span>Back</span>
	</a>
</div>
