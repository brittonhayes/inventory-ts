<script lang="ts">
    export let to: string;
    export let icon = 'chevron_left';
</script>

<div class={$$props.class}>
    <a href={to} class="btn btn-sm btn-ghost btn-square leading-5">
        <i class="material-icons inline-block text-md">{icon}</i>
    </a>
</div>