import type { MaintenanceTask } from '$lib/api';
import { Configuration, MaintenanceApi } from '$lib/api';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
    // const config = new Configuration({
    //     fetchApi: fetch,
    // });
    // const client = new MaintenanceApi(config);
    const tasks = await fetch('http://localhost:5000/api/maintenance/tasks')
    return {
      tasks: tasks.json() as Promise<MaintenanceTask[]>,
    };
  }) satisfies PageLoad;