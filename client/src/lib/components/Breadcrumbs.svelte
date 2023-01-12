<script lang="ts">
	import type { Route } from "$lib/types";
    import { breadcrumbs } from "$lib/stores/navigation";

    let crumbs: Route[] = [];
    breadcrumbs.subscribe((value)=>{
        crumbs = value
    })
</script>

{#if crumbs}
    <div class="text-sm breadcrumbs mt-0 mb-10">
        <ul>
            {#each crumbs as crumb}
                <li>
                    <a href="{crumb.href}" class="opacity-80 link-hover">{crumb.label}</a>
                </li>
            {/each}
        </ul>
    </div>
{/if}