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

export type ListMaintenanceGuidesResponse =
	paths['/api/maintenance/guides']['get']['responses']['200']['content']['application/json'];
export type FindMaintenanceGuideResponse =
	paths['/api/maintenance/guides/{id}']['get']['responses']['200']['content']['application/json'];
export type FindMaintenanceGuideForVehicleResponse =
	paths['/api/maintenance/guides/vehicle/{id}']['get']['responses']['200']['content']['application/json'];
export type CreateMaintenanceGuideRequest = components['schemas']['CreateMaintenanceGuideDto'];
export type CreateMaintenanceGuideResponse =
	paths['/api/maintenance/guides']['post']['responses']['200']['content']['application/json'];
export type FindMaintenanceGuideTasksResponse =
	paths['/api/maintenance/guides/{id}/tasks']['get']['responses']['200']['content']['application/json'];

export type MaintenanceTaskStatus = components['schemas']['CreateMaintenanceTaskDto']['status'];
export type FindMaintenanceTaskResponse =
	paths['/api/maintenance/tasks/{id}']['get']['responses']['200']['content']['application/json'];
export type CreateMaintenanceTaskRequest = components['schemas']['CreateMaintenanceTaskDto'];
export type ListMaintenanceTasksResponse =
	paths['/api/maintenance/tasks']['get']['responses']['200']['content']['application/json'];
export type CreateMaintenanceTaskResponse =
	paths['/api/maintenance/tasks']['post']['responses']['200']['content']['application/json'];

export type ListVehiclesResponse = paths['/api/vehicles']['get']['responses']['200']['content']['application/json'];
export type FindVehicleResponse = paths['/api/vehicles/{id}']['get']['responses']['200']['content']['application/json'];
export type FindVehicleImplementsResponse =
	paths['/api/vehicles/{id}/implements']['get']['responses']['200']['content']['application/json'];
export type FindVehiclePartsResponse =
	paths['/api/vehicles/{id}/parts']['get']['responses']['200']['content']['application/json'];

export type ListEmployeesResponse = paths['/api/employees']['get']['responses']['200']['content']['application/json'];
export type FindEmployeeResponse =
	paths['/api/employees/{id}']['get']['responses']['200']['content']['application/json'];
