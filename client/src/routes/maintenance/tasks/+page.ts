import { Configuration,  EmployeesApi, MaintenanceApi } from '$lib/api';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
    const config = new Configuration({
        fetchApi: fetch,
    });
    const maintenanceClient = new MaintenanceApi(config);
    let tasks = await maintenanceClient.maintenanceControllerListTasks();
    return {
      tasks: tasks,
    };
  }) satisfies PageLoad;