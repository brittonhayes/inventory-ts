<script lang="ts">
	import { VehiclesApi, VehiclesControllerListOrderByEnum, VehiclesControllerListSortEnum, type VehicleResponse } from '$lib/api';
	import { loader } from '$lib/stores';
	import Button, { Icon, Label } from '@smui/button';
	import DataTable, { Body, Cell, Head, Row } from '@smui/data-table';
	import IconButton from '@smui/icon-button';
	import LinearProgress from '@smui/linear-progress';
	import Paper, { Content } from '@smui/paper';
	import Select, { Option } from '@smui/select';
	import Textfield from '@smui/textfield';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let client = new VehiclesApi();
	let vehicles: VehicleResponse[] = [];

	let loaded = false;

	let orderByValue: VehiclesControllerListOrderByEnum = 'updatedAt';
	let orderByOptions: VehiclesControllerListOrderByEnum[] = Object.values(VehiclesControllerListOrderByEnum).filter((option)=>{
		return option !== 'id';
	});

	let sortByOptions: VehiclesControllerListSortEnum[] = Object.values(VehiclesControllerListSortEnum);
	let sortByValue: VehiclesControllerListSortEnum = 'desc';

	let searchValue: string = '';

	loader.subscribe((event) => {
		loaded = event;
	});

	document.addEventListener('keydown', async (event) => {
		let searchBox = document.getElementById('search-box');

		if (event.key === '/') {
			event.preventDefault();
			searchBox?.focus();
		}

		if (event.key === 'Enter') {
			event.preventDefault();
			vehicles = await requestData();
		}
	});

	async function requestData() {
		loader.set(false);
		return client
			.vehiclesControllerList({
				name: searchValue.length > 0 ? searchValue : undefined,
				sort: sortByValue,
				orderBy: orderByValue
			})
			.then((response) => {
				loader.set(true);
				return response;
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
		<div class="select-container">
			<Textfield id="search-box" bind:value={searchValue} label="Search" />
			<Select bind:value={orderByValue} label="Order by">
				{#each orderByOptions as orderOption}
					<Option value={orderOption}>{orderOption}</Option>
				{/each}
			</Select>
			<Select bind:value={sortByValue} label="Sort">
				{#each sortByOptions as sortOption}
					<Option value={sortOption}>{sortOption}</Option>
				{/each}
			</Select>
			<Button
				on:click={async ()=> vehicles = await requestData()}
				variant="unelevated"
				class="button-shaped-round"
				style="margin-left: auto;"
			>
				<Icon class="material-icons">search</Icon>
				<Label>Search</Label>
			</Button>
		</div>

		<DataTable
			stickyHeader
			table$aria-label="Vehicles list"
			style="width: 100%;"
		>
			<Head>
				<Row>
					<Cell style="width: 50%;">Name</Cell>
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

<style>
	.search-box {
		align-items: center;
		width: 50%;
		flex-basis: 2;
	}

	.select-container {
		width: 100%;
		align-items: center;
		justify-content: flex-start;
		padding: 20px 20px 20px 0px;
		display: flex; 
		flex-direction: row;
	}
</style>