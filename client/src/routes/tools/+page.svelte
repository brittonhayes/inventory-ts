
  <DataTable table$aria-label="Tools list" style="width: 100%;">
    <Head>
      <Row>
        <Cell numeric>ID</Cell>
        <Cell style="width: 100%;">Name</Cell>
      </Row>
    </Head>
    <Body>
      {#each items as item (item.id)}
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
    <IconButton color="primary" class="material-icons" on:click={() => loadThings(true)}>refresh</IconButton>&nbsp;Refresh
  </div>
  
  
  <script lang="ts">
    import DataTable, { Body, Cell, Head, Row } from '@smui/data-table';
    import IconButton from '@smui/icon-button';
    import LinearProgress from '@smui/linear-progress';
  
    type Tool = {
      id: number;
      name: string;
    };
    let items: Tool[] = [];
    let loaded = false;
  
    loadThings(false);
  
    function loadThings(wait: boolean) {
      if (typeof fetch !== 'undefined') {
        loaded = false;
  
        fetch(
          'https://gist.githubusercontent.com/hperrin/e24a4ebd9afdf2a8c283338ae5160a62/raw/dcbf8e6382db49b0dcab70b22f56b1cc444f26d4/users.json'
        )
          .then((response) => response.json())
          .then((json) =>
            setTimeout(
              () => {
                items = json;
                loaded = true;
              },
              // Simulate a long load time.
              wait ? 2000 : 0
            )
          );
      }
    }
  </script>
  