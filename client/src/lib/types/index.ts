import type { components, paths } from '$lib/api';

export interface Route {
	href: string;
	label: string;
	icon: string;
}

export interface Application {
	title: string;
	subtitle: string;
}


export type MaintenanceTaskStatus = components['schemas']['CreateMaintenanceTaskDto']['status'];

export type FindMaintenanceTaskResponse = paths['/api/maintenance/tasks/{id}']['get']['responses']['200']['content']['application/json'];

export type CreateMaintenanceTaskRequest = components['schemas']['CreateMaintenanceTaskDto'];

export type ListMaintenanceTasksResponse =
	paths['/api/maintenance/tasks']['get']['responses']['200']['content']['application/json'];

export type CreateMaintenanceTaskResponse = paths['/api/maintenance/tasks']['post']['responses']['200']['content']['application/json'];

export type VehiclesResponse = paths['/api/vehicles']['get']['responses']['200']['content']['application/json'];
