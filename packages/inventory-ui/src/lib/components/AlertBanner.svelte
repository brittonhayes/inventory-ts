<script lang="ts">
	export let text: string;
	export let icon = 'construction';
</script>

<div class="alert alert-warning my-10 shadow-md shadow-warning/30 w-2/3 mx-auto">
	<div>
		<i class="material-icons">{icon}</i>
		<span>{text}</span>
	</div>
</div>
