<script lang="ts">
	import Editor from '$lib/components/Editor.svelte';
	let title = 'New guide';
	let content = '<i>Start typing here...</i>';
	let meta = {
		Created: {
			icon: 'calendar_today',
			text: new Date().toLocaleDateString(),
		},
		Updated: {
			icon: 'calendar_today',
			text: new Date().toLocaleDateString(),
		}
	}
</script>

<div class="justify-center items-center w-full md:w-4/5 xl:w-1/2 mt-10 mx-auto">
	<Editor class="rounded-sm p-5" {meta} editable {title} {content} />
</div>
