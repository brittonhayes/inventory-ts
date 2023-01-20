<script lang="ts">
	export let title: string;
	export let subtitle: string;
</script>

<div class="flex items-center">
	<div class="{$$props.class + ' flex flex-wrap gap-5 justify-between w-full'}">
		<div>
			<h1 class="text-4xl text-neutral-content font-bold">{title}</h1>
			<p class="text-sm opacity-50">{subtitle}</p>
			<div class="pt-2">
				<slot />
			</div>
		</div>
		<div class="justify-items-end">
			<slot name="action" class="w-full lg:w-1/3" />
		</div>
	</div>
</div>
