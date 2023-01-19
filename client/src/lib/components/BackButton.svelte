<script lang="ts">
    export let to: string;
    export let icon = 'arrow_back';
    let text = 'Back';
</script>

<div class={$$props.class}>
    <div class="flex flex-row">
        <a href={to} class="btn rounded-xl btn-sm btn-ghost gap-2">
            <i class="material-icons text-xl">{icon}</i>
            {#if text}
                {text}
            {/if}
        </a>
    </div>
</div>