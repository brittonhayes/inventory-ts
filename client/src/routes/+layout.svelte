<script>
    import { links } from "$lib/NavBar/NavBar";
	import NavBar from "$lib/NavBar/NavBar.svelte";
	import LayoutGrid, { Cell } from "@smui/layout-grid";
</script>
<main>
    <NavBar links={links}></NavBar>
    <LayoutGrid>
        <Cell span={1}/>
        <Cell span={9}>
          <slot></slot> 
        </Cell>
        <Cell span={2} />
    </LayoutGrid>
</main>