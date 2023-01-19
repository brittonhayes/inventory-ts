<script lang="ts">
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { onDestroy, onMount } from 'svelte';
	import { dataset_dev } from 'svelte/internal';
	import { fade, fly } from 'svelte/transition';

	let element: HTMLElement;
	let editor: Editor;

	$: editable = false;
	export let title = '';
	export let subitle = '';
	export let content = '';
	export let meta: Record<string, { icon?: string; text: string }> = {};

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			editorProps: {
				editable: () => {
					return editable;
				},
				attributes: {
					class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl m-5 focus:outline-none'
				}
			},
			content: content,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
	});

	const toggleEditMode = () => {
		editable = !editable;
		editor.setOptions({ editable: editable });
		console.log('editable', editor.isEditable);
	};

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div class="mb-5 flex flex-col justify-center items-center gap-2">
	<h1 class="text-5xl font-bold font-serif w-full text-center">{title}</h1>
	<h2 class="text-xl font-sans opacity-80 w-full text-center">{subitle}</h2>
</div>

{#if editor && editable}
	<div class="flex mt-5 justify-center w-full" in:fly="{{ x: 20, duration: 220 }}">
		<div class="p-2 ">
			<button
				on:click="{() => editor.chain().focus().toggleBold().run()}"
				disabled="{!editor.can().chain().focus().toggleBold().run()}"
				class="{`btn btn-sm` + (editor.isActive('bold') ? ' btn-primary' : '')}"
			>
				<i class="material-icons">format_bold</i>
			</button>
			<button
				on:click="{() => editor.chain().focus().toggleItalic().run()}"
				disabled="{!editor.can().chain().focus().toggleItalic().run()}"
				class="{`btn btn-sm` + (editor.isActive('italic') ? ' btn-primary' : '')}"
			>
				<i class="material-icons">format_italic</i>
			</button>
			<button
				on:click="{() => editor.chain().focus().setParagraph().run()}"
				class="{`btn btn-sm` + (editor.isActive('paragraph') ? ' btn-primary' : '')}"
			>
				<i class="material-symbols-outlined"> format_paragraph </i>
			</button>
			<button
				on:click="{() => editor.chain().focus().toggleHeading({ level: 1 }).run()}"
				class="{`btn btn-sm` + (editor.isActive('heading', { level: 1 }) ? ' btn-primary' : '')}"
			>
				<i class="material-symbols-outlined"> format_h1 </i>
			</button>
			<button
				on:click="{() => editor.chain().focus().toggleHeading({ level: 2 }).run()}"
				class="{`btn btn-sm` + (editor.isActive('heading', { level: 2 }) ? ' btn-primary' : '')}"
			>
				<i class="material-symbols-outlined"> format_h2 </i>
			</button>
			<button on:click="{() => editor.chain().focus().toggleHeading({ level: 3 }).run()}" class="{`btn btn-sm`}">
				<i class="material-symbols-outlined"> format_h3 </i>
			</button>
			<button on:click="{() => editor.chain().focus().toggleBulletList().run()}" class="{`btn btn-sm`}">
				<i class="material-symbols-outlined"> format_list_bulleted </i>
			</button>
			<button on:click="{() => editor.chain().focus().toggleOrderedList().run()}" class="{`btn btn-sm`}">
				<i class="material-symbols-outlined"> format_list_numbered </i>
			</button>
			<button on:click="{() => editor.chain().focus().toggleBlockquote().run()}" class="{`btn btn-sm`}">
				<i class="material-symbols-outlined"> format_quote </i>
			</button>
			<button on:click="{() => editor.chain().focus().setHorizontalRule().run()}" class="{`btn btn-sm`}">
				<i class="material-symbols-outlined"> horizontal_rule </i>
			</button>
		</div>
	</div>
{/if}

<article class="{$$props.class}" bind:this="{element}">
	<span class="flex flex-wrap gap-2 px-5">
		<span class="mr-auto">
			{#each Object.entries(meta) as key}
				<span class="my-3 grid grid-cols-2">
					<p class="opacity-50 text-sm flex justify-start items-center gap-1">
						{#if key[1].icon}
							<i class="material-icons text-sm">{key[1].icon}</i>
						{/if}
						{key[0]}
					</p>
					<p class="text-sm">{key[1].text}</p>
				</span>
			{/each}
		</span>
		<div class="btn-group btn-group-vertical">
			<button
				class:btn-disabled="{!editable}"
				on:click="{() => toggleEditMode()}"
				class="btn btn-ghost btn-lg gap-2 flex flex-row justify-center"
			>
				<i class="material-icons">save</i>
			</button>
			<button on:click="{() => toggleEditMode()}" class="btn btn-ghost btn-lg gap-2 flex flex-row justify-center">
				<i class="material-icons">edit</i>
			</button>
		</div>
	</span>
	<div class="divider px-5 mt-0 opacity-70"></div>
</article>
