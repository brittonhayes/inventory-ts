<script lang="ts">
	import { VehiclesApi, VehiclesControllerListOrderByEnum, type VehicleResponse } from '$lib/api';
	import { loader } from '$lib/stores';
	import DataTable, { Body, Cell, Head, Label, Row } from '@smui/data-table';
	import IconButton from '@smui/icon-button';
	import LinearProgress from '@smui/linear-progress';
	import Paper, { Content } from '@smui/paper';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let client = new VehiclesApi();
	let vehicles: VehicleResponse[] = [];
	let orderBy: VehiclesControllerListOrderByEnum = 'name';

	let loaded = false;
	let isAscending = true;
	loader.subscribe((event) => {
		loaded = event;
	});

	async function requestData() {
		loader.set(false);
		return client
			.vehiclesControllerList({
				sort: isAscending ? 'asc' : 'desc',
				orderBy: orderBy
			})
			.then((response) => {
				loader.set(true);
				return response;
			});
	}

	function handleSort() {
		client
			.vehiclesControllerList({
				sort: isAscending ? 'asc' : 'desc',
				orderBy: orderBy
			})
			.then((response) => {
				vehicles = response;
			});
	}

	onMount(() => {
		vehicles = data.vehicles;
		loader.set(true);
	});
</script>

<Paper variant="unelevated">
	<h1>{data.pageTitle}</h1>
	<Content>
		<DataTable
			sortable
			stickyHeader
			on:SMUIDataTable:sorted="{() => {
				handleSort;
			}}"
			table$aria-label="Vehicles list"
			style="width: 100%;"
		>
			<Head>
				<Row>
					<Cell style="width: 50%;">
						<IconButton color="primary" class="material-icons">arrow_upward</IconButton>
						<Label>Name</Label>
					</Cell>
					<Cell>Make</Cell>
					<Cell>Model</Cell>
					<Cell>Year</Cell>
					<Cell>Created</Cell>
					<Cell>Updated</Cell>
				</Row>
			</Head>
			<Body>
				{#if vehicles.length === 0}
					<Row>
						<Cell>No vehicles found.</Cell>
						<Cell />
						<Cell />
						<Cell />
					</Row>
				{:else}
					{#each vehicles as item (item.id)}
						<Row>
							<Cell>{item.name}</Cell>
							<Cell>{item.make}</Cell>
							<Cell>{item.model}</Cell>
							<Cell>{item.year}</Cell>
							<Cell>{item.createdAt.toLocaleDateString()}</Cell>
							<Cell>{item.updatedAt.toLocaleDateString()}</Cell>
						</Row>
					{/each}
				{/if}
			</Body>

			<LinearProgress
				indeterminate
				color="primary"
				bind:closed="{loaded}"
				aria-label="Data is being loaded..."
				slot="progress"
			/>
		</DataTable>
	</Content>
</Paper>

<div style="margin-top: 1em; display: flex; align-items: center;">
	<IconButton color="primary" class="material-icons" on:click="{() => requestData()}">refresh</IconButton>&nbsp;Refresh
</div>
