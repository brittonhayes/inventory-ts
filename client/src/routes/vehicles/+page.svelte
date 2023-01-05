
 <h2>Vehicle Inventory</h2>
 <DataTable table$aria-label="Vehicles list" style="width: 100%;">
    <Head>
      <Row>
        <Cell style="width: 50%;">Name</Cell>
        <Cell>Make</Cell>
        <Cell>Model</Cell>
        <Cell>Year</Cell>
      </Row>
    </Head>
    <Body>
      {#if items.length === 0}
        <Row>
          <Cell>No vehicles found.</Cell>
          <Cell></Cell>
          <Cell></Cell>
          <Cell></Cell>
        </Row>
      {:else}      
        {#each items as item (item.id)}
          <Row>
            <Cell>{item.name}</Cell>
            <Cell>{item.make}</Cell>
            <Cell>{item.model}</Cell>
            <Cell>{item.year}</Cell>
          </Row>
        {/each}
      {/if}
    </Body>
  
    <LinearProgress
      indeterminate
      color="primary"
      bind:closed={loaded}
      aria-label="Data is being loaded..."
      slot="progress"
    />
  </DataTable>

  <div style="margin-top: 1em; display: flex; align-items: center;">
    <IconButton color="primary" class="material-icons" on:click={() => requestData()}>refresh</IconButton>&nbsp;Refresh
  </div>
  
  
  <script lang="ts">
    import { VehiclesApi } from '$lib/api';
    import DataTable, { Body, Cell, Head, Row } from '@smui/data-table';
    import IconButton from '@smui/icon-button';
    import LinearProgress from '@smui/linear-progress';
    
      let items: any[] = [
        {
          id: 1,
          name: 'Vehicle 1',
          make: 'Make 1',
          model: 'Model 1',
          year: 2021
        },
        {
          id: 2,
          name: 'Vehicle 2',
          make: 'Make 2',
          model: 'Model 2',
          year: 2021
        }
      ];
      let loaded = false;
    
      requestData();
    
      async function requestData() {
        const client = new VehiclesApi(); 
        await client.vehiclesControllerList({}).then((response) => {
          items = response;
          loaded = true;
        });
      }
  </script>
  