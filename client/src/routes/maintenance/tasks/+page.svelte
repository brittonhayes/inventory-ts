<script lang="ts">
    import type { PageData } from './$types';
    export let data:PageData; 
  </script>
  
  <div class="grid gap-24 grid-cols-2">
      <div class="col-span-1">
          <h1 class="text-3xl font-bold">Maintenance Tasks</h1>
          <p class="text-gray-500">List of maintenance tasks</p>
      </div>
      <div class="col-span-1">
          <div class="flex justify-end">
              <a href="/maintenance/tasks/create" class="btn btn-primary">
                  <i class="material-icons">add</i>
                  <span>Add Task</span>
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
                <th>Assignee</th> 
                <th>Due Date</th> 
              </tr>
            </thead> 
            <tbody>
              {#each data.tasks as task}
                <tr>
                  <td>{task.name}</td>
                  <td>{task.assignee?.name}</td>
                  <td>{task.dueDate.toDateString()}</td> 
                </tr>
              {/each}
            </tbody>  
          </table>
        </div>
  </section>