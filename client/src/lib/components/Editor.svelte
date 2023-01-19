<script lang="ts">
    import { Editor } from '@tiptap/core';
    import { Paragraph } from '@tiptap/extension-paragraph';
    import StarterKit from '@tiptap/starter-kit';
    import { onDestroy, onMount } from 'svelte';
  
    let element: HTMLElement;
    let editor: Editor;

    export let editable: boolean = false;
    export let title: string = '';
    export let content: string = '';
  
    onMount(() => {
      editor = new Editor({
        element: element,
        extensions: [
          StarterKit,
        ],
        editorProps: {
          editable: ()=>{
            return editable;
          },
          attributes: {
            class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl m-5 focus:outline-none',
          },
        },
        content: `${title ? `<h1>${title}</h1>` : ''}${content}`,
        onTransaction: () => {
          // force re-render so `editor.isActive` works as expected
          editor = editor
        },
      })
    })

    onDestroy(() => {
      if (editor) {
        editor.destroy()
      }
    })
  </script>

{#if editor && editor.isEditable}
  <div class="mx-auto mt-5">
    <div class="btn-group btn-group-horizontal mb-4 p-2">
      <button
        on:click={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        class={`btn btn-sm` + (editor.isActive('bold') ? ' btn-active' : '')}
      >
        <i class="material-icons">format_bold</i>
      </button>
      <button
        on:click={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        class={`btn btn-sm` + (editor.isActive('italic') ? ' btn-active' : '')}
      >
        <i class="material-icons">format_italic</i>
      </button>
      <button
        on:click={() => editor.chain().focus().setParagraph().run()}
        class={`btn btn-sm` + (editor.isActive('paragraph') ? ' btn-active' : '')}
      >
        <i class="material-symbols-outlined">
          format_paragraph
        </i>
      </button>
      <button
        on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        class={`btn btn-sm` + (editor.isActive('heading', { level: 1 }) ? ' btn-active' : '')}
      >
        <i class="material-symbols-outlined">
          format_h1
        </i>
      </button>
      <button
        on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        class={`btn btn-sm` + (editor.isActive('heading', { level: 2 }) ? ' btn-active' : '')}
      >
        <i class="material-symbols-outlined">
          format_h2
        </i>
      </button>
      <button
        on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        class={`btn btn-sm`}
      >
        <i class="material-symbols-outlined">
          format_h3
        </i>
      </button>
      <button
        on:click={() => editor.chain().focus().toggleBulletList().run()}
        class={`btn btn-sm`}
      >
        <i class="material-symbols-outlined">
          format_list_bulleted
        </i>
      </button>
      <button
        on:click={() => editor.chain().focus().toggleOrderedList().run()}
        class={`btn btn-sm`}
      >
        <i class="material-symbols-outlined">
          format_list_numbered
        </i>
      </button>
      <button
        on:click={() => editor.chain().focus().toggleBlockquote().run()}
        class={`btn btn-sm`}
      >
        <i class="material-symbols-outlined">
          format_quote
        </i>
      </button>
      <button 
        on:click={() => editor.chain().focus().setHorizontalRule().run()}
        class={`btn btn-sm`}
      >
        <i class="material-symbols-outlined">
          horizontal_rule
        </i>
      </button>
    </div>
  </div>
{/if}
<article class="{$$props.class}" bind:this={element} />

<style lang="postcss">
  .format-btn {

  }
</style>