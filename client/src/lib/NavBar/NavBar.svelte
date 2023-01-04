<script lang="ts">
	import { page } from '$app/stores';
	import Button, { Label } from '@smui/button';
	import IconButton from '@smui/icon-button';
	import List from '@smui/list';
	import Item from '@smui/list/src/Item.svelte';
	import Menu from '@smui/menu';
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';

  let menu: Menu;
  let currentPage: string;

  export let links: { href: string, label: string }[] = [];
  page.subscribe((value) => {
      if (value.route.id === '/') {
        currentPage = 'Home';
        return
      }

      currentPage = value.route.id?.replace('/', '') || '';
      currentPage = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
  });
</script>

<style>
  .top-app-bar-container {
    width: 100%;
    height: 100px;
    overflow: auto;
    display: inline-block;
    margin-left: 0;
  }

  .flexy {
    display: flex;
    flex-wrap: wrap;
  }
</style>

<div class="flexy">
    <div class="top-app-bar-container">
      <TopAppBar
        variant="short"
        color='primary'
      >
        <Row>
          <Section>
              <IconButton class="material-icons" on:click={()=> menu.setOpen(!menu.isOpen())}>menu</IconButton>
              <Menu bind:this={menu} color='secondary'>
              <List>
                {#each links as link}
                  <Item>
                    <Button variant={link.label.includes(currentPage) ? 'raised' : 'outlined'} href={link.href}>
                      <Label style={link.label.includes(currentPage) ? "color: white;" : 'color: #000;'}>{link.label}</Label>
                    </Button>
                  </Item>
                {/each}
              </List>
            </Menu>
            <Title>{currentPage}</Title>
          </Section>
        </Row>
      </TopAppBar>
    </div>
</div>
