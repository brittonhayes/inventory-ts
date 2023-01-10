<script lang="ts">
  import type { PageData } from './$types';
  export let data:PageData; 
</script>

<div class="grid gap-24 grid-cols-2">
    <div class="col-span-1">
        <h1 class="text-3xl font-bold">Vehicles</h1>
        <p class="text-gray-500">List of vehicles</p>
    </div>
    <div class="col-span-1">
        <div class="flex justify-end">
            <a href="/vehicles/create" class="btn btn-primary">
                <i class="material-icons">add</i>
                <span>Add Vehicle</span>
            </a>
        </div>
    </div>
</div>

<section class="mt-10">
    <div>
        <table class="table table-compact w-full">
          <thead>
            <tr>
              <th>Name</th> 
              <th>Make</th> 
              <th>Model</th> 
              <th>Power</th> 
            </tr>
          </thead> 
          <tbody>
            {#each data.vehicles as vehicle}
              <tr>
                <td>{vehicle.name}</td> 
                <td>{vehicle.make}</td> 
                <td>{vehicle.model}</td> 
                <td>{vehicle.power}</td> 
              </tr>
            {/each}
          </tbody>  
        </table>
      </div>
</section>