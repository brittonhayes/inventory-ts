
  <DataTable table$aria-label="Equipment list" style="width: 100%;">
    <Head>
      <Row>
        <Cell numeric>ID</Cell>
        <Cell style="width: 100%;">Name</Cell>
      </Row>
    </Head>
    <Body>
      {#each items as item}
        <Row>
          <Cell numeric>{item.id}</Cell>
          <Cell>{item.name}</Cell>
        </Row>
      {/each}
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
    import { LocationsApi, type LocationResponse } from '$lib/api';
    import DataTable, { Body, Cell, Head, Row } from '@smui/data-table';
    import IconButton from '@smui/icon-button';
    import LinearProgress from '@smui/linear-progress';
    
      let client = new LocationsApi();
      let items: LocationResponse[] = [];
      let loaded = false;
    
      requestData();
    
      async function requestData() {
        client.locationsControllerList().then((response) => {
          items = response.data.length > 0 ? response.data : [{
            id: '1',
            name: 'No locations found',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
          }];
          loaded = true;
        });
      }
  </script>
  