<script lang="ts">
    import { page } from '$app/stores';
    import type { Route } from '$lib/types';
    export let links: Route[];
</script>
<div class={ $$props.class + " bg-base-100 text-base-content btm-nav btm-nav-md"}>
    {#each links as link}
        <li>
            <a
                class:btn-primary="{$page.url.pathname === link.href}"
                class:text-primary="{$page.url.pathname === link.href}"
                class="btn btn-ghost"
                href="{link.href}"
            >
                <i class="material-icons">{link.icon}</i>
            </a>
        </li>
    {/each}
</div>