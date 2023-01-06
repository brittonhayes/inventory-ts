<script lang="ts">
	import type { Route } from '$lib/types';
	import Drawer, { AppContent, Content, Header, Subtitle, Title } from '@smui/drawer';
	import IconButton, { Icon } from '@smui/icon-button';
	import List, { Graphic, Item, Text } from '@smui/list';
	import { writable } from 'svelte/store';

	let open = true;
	let active = 'Home';

	const setActive = (value: string) => {
		active = value;
	};

	const routes = writable<Route[]>([
		{
			label: 'Home',
			href: '/',
			icon: 'home',
			active: true
		},
		{
			label: 'Vehicles',
			href: '/vehicles',
			icon: 'agriculture',
			active: false
		},
		{
			label: 'Locations',
			href: '/locations',
			icon: 'pin_drop',
			active: false
		}
	]);

	export let title: string = '';
	export let subtitle: string = '';
</script>

<div class="drawer">
	<Drawer variant="dismissible" fixed="{true}" bind:open="{open}">
		{#if title || subtitle}
			<Header>
				{#if title}<Title>{title}</Title>{/if}
				{#if subtitle}<Subtitle>{subtitle}</Subtitle>{/if}
			</Header>
		{/if}
		<Content>
			<List>
				{#each $routes as link}
					<Item on:click="{() => setActive(link.label)}" href="{link.href}" activated="{active === link.label}">
						<Graphic class="material-icons" aria-hidden="true">{link.icon}</Graphic>
						<Text>{link.label}</Text>
					</Item>
				{/each}
			</List>
		</Content>
	</Drawer>

	<AppContent class="main-content">
		<main>
			<div class="drawer-button">
				<IconButton toggle bind:pressed="{open}" on:click="{() => (open = !open)}">
					<Icon class="material-icons" on>chevron_left</Icon>
					<Icon class="material-icons">chevron_right</Icon>
				</IconButton>
			</div>
			<slot />
		</main>
	</AppContent>
</div>

<style>
	* :global(.app-content) {
		flex: auto;
		overflow: auto;
		position: relative;
		flex-grow: 1;
	}

	.drawer-button {
		padding-top: 5px;
		padding-left: 4px;
	}

	.drawer {
		margin-top: 64px;
	}
</style>
