<script lang="ts">
	import { LocationsApi, type LocationResponse } from '$lib/api';
	import { loader } from '$lib/stores';
	import DataTable, { Body, Cell, Head, Row } from '@smui/data-table';
	import IconButton from '@smui/icon-button';
	import LinearProgress from '@smui/linear-progress';
	import Paper from '@smui/paper';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let client = new LocationsApi();
	let items: LocationResponse[] = [];

	let loaded = false;
	loader.subscribe((event) => {
		loaded = event;
	});

	async function requestData() {
		loader.set(false);
		return client.locationsControllerList().then((response) => {
			loader.set(true);
			return response;
		});
	}

	onMount(() => {
		items = data.locations;
		loader.set(true);
	});
</script>

<Paper variant="unelevated">
	<h1>{data.pageTitle}</h1>
	<DataTable table$aria-label="Equipment list" style="width: 100%;">
		<Head>
			<Row>
				<Cell style="width: 75%;">Name</Cell>
				<Cell>Created</Cell>
				<Cell>Updated</Cell>
			</Row>
		</Head>
		<Body>
			{#each items as item}
				<Row>
					<Cell>{item.name}</Cell>
					<Cell>{item.createdAt.toLocaleDateString()}</Cell>
					<Cell>{item.updatedAt.toLocaleDateString()}</Cell>
				</Row>
			{/each}
		</Body>

		<LinearProgress
			indeterminate
			color="primary"
			bind:closed="{loaded}"
			aria-label="Data is being loaded..."
			slot="progress"
		/>
	</DataTable>
</Paper>

<div style="margin-top: 1em; display: flex; align-items: center;">
	<IconButton color="primary" class="material-icons" on:click="{() => requestData()}">refresh</IconButton>&nbsp;Refresh
</div>
