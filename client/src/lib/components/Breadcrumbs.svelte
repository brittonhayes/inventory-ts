<script lang="ts">
	import type { Route } from "$lib/types";
    export let crumbs: Omit<Route, 'icon'>[] = [];
</script>

{#if crumbs.length > 0}
<div class="text-sm text-gray-500 breadcrumbs mt-0 mb-10">
    <ul>
        {#each crumbs as crumb}
            <li>
                <a href="{crumb.href}" class="text-gray-500 hover:text-gray-700">{crumb.label}</a>
            </li>
        {/each}
    </ul>
</div>
{/if}