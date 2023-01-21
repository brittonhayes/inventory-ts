declare namespace Components {
	namespace Schemas {
		export interface Attachment {
			id: string;
			createdAt: string; // date-time
			updatedAt: string; // date-time
			isOwned?: boolean;
			name: string;
			condition?: Condition;
			compatibleVehicles?: Vehicle[];
		}
		export type Condition = 'BROKEN' | 'POOR' | 'GOOD' | 'MINT';
		export interface CreateEmployeeDto {
			name: string;
		}
		export interface CreateImplementDto {
			createdAt: string; // date-time
			updatedAt: string; // date-time
			isOwned?: boolean;
			name: string;
			make: string;
			model: string;
			year?: number;
			condition?: Condition;
			implementType?: ImplementType;
		}
		export interface CreateMaintenanceGuideDto {
			name: string;
			content: string;
			vehicleId?: string;
		}
		export interface CreateMaintenanceTaskDto {
			status: TaskStatus;
			dueDate?: string; // date-time
			name: string;
			description?: string;
			machineHours?: number;
			assigneeId?: string;
			vehicleId?: string;
			guideId?: string;
		}
		export interface CreateToolDto {
			name: string;
		}
		export interface CreateVehicleDto {
			name?: string;
			createdAt: string; // date-time
			updatedAt: string; // date-time
			isOwned?: boolean;
			year?: number;
			condition?: Condition;
			vehicleType: VehicleType;
			make: string;
			model: string;
			machineHours?: number;
			link?: string;
			power: PowerType;
		}
		export interface CreateVehiclePartDto {
			name: string;
		}
		export interface Employee {
			id: string;
			createdAt: string; // date-time
			updatedAt: string; // date-time
			name: string;
			tasks?: MaintenanceTask[];
		}
		export interface EmployeeResponse {
			id: string;
			createdAt: string; // date-time
			updatedAt: string; // date-time
			name: string;
		}
		export interface Implement {
			id: string;
			createdAt: string; // date-time
			updatedAt: string; // date-time
			isOwned?: boolean;
			name: string;
			make: string;
			model: string;
			year?: number;
			condition?: Condition;
			implementType?: ImplementType;
			compatibleVehicles?: Vehicle[];
			compatibleAttachments?: Attachment[];
		}
		export interface ImplementResponse {
			id: string;
			createdAt: string; // date-time
			updatedAt: string; // date-time
			isOwned?: boolean;
			name: string;
			make: string;
			model: string;
			year?: number;
			condition?: Condition;
			implementType?: ImplementType;
		}
		export type ImplementType =
			| 'SPRAYER'
			| 'HARROW'
			| 'DRILL'
			| 'MOWER'
			| 'CULTIVATOR'
			| 'CHISEL'
			| 'RODWEEDER'
			| 'TRAILER'
			| 'OTHER';
		export interface MaintenanceGuide {
			id: string;
			createdAt: string; // date-time
			updatedAt: string; // date-time
			name: string;
			content: string;
			tasks?: MaintenanceTask[];
			vehicle?: Vehicle;
			vehicleId?: string;
		}
		export interface MaintenanceTask {
			id: string;
			createdAt: string; // date-time
			updatedAt: string; // date-time
			status: TaskStatus;
			dueDate?: string; // date-time
			name: string;
			description?: string;
			machineHours?: number;
			tools?: Tool[];
			assigneeId?: string;
			assignee?: Employee;
			vehicle?: Vehicle;
			vehicleId?: string;
			guide?: MaintenanceGuide;
			guideId?: string;
		}
		export type PowerType = 'GAS' | 'DIESEL' | 'HYBRID' | 'ELECTRIC';
		export type TaskStatus = 'INCOMPLETE' | 'COMPLETED' | 'CANCELLED';
		export interface Tool {
			id: string;
			name: string;
			tasks?: MaintenanceTask[];
		}
		export interface ToolResponse {
			id: string;
			name: string;
			tasks?: MaintenanceTask[];
		}
		export interface UpdateEmployeeDto {
			name?: string;
		}
		export interface UpdateImplementDto {
			createdAt?: string; // date-time
			updatedAt?: string; // date-time
			isOwned?: boolean;
			name?: string;
			make?: string;
			model?: string;
			year?: number;
			condition?: Condition;
			implementType?: ImplementType;
		}
		export interface UpdateMaintenanceGuideDto {
			vehicleId?: string;
		}
		export interface UpdateMaintenanceTaskDto {
			status?: TaskStatus;
			dueDate?: string; // date-time
			name?: string;
			description?: string;
			machineHours?: number;
			assigneeId?: string;
			vehicleId?: string;
			guideId?: string;
		}
		export interface UpdateToolDto {
			name?: string;
		}
		export interface UpdateVehicleDto {
			name?: string;
			createdAt?: string; // date-time
			updatedAt?: string; // date-time
			isOwned?: boolean;
			year?: number;
			condition?: Condition;
			vehicleType?: VehicleType;
			make?: string;
			model?: string;
			machineHours?: number;
			link?: string;
			power?: PowerType;
		}
		export interface UpdateVehiclePartDto {
			name?: string;
		}
		export interface Vehicle {
			id: string;
			name?: string;
			createdAt: string; // date-time
			updatedAt: string; // date-time
			isOwned?: boolean;
			year?: number;
			condition?: Condition;
			vehicleType: VehicleType;
			make: string;
			model: string;
			machineHours?: number;
			link?: string;
			power: PowerType;
			guides?: MaintenanceGuide[];
			compatibleParts?: VehiclePart[];
			compatibleAttachments?: VehiclePart[];
			compatibleImplements?: Implement[];
		}
		export interface VehiclePart {
			id: string;
			createdAt: string; // date-time
			updatedAt: string; // date-time
			name: string;
			compatibleVehicles?: Vehicle[];
		}
		export interface VehiclePartResponse {
			id: string;
			createdAt: string; // date-time
			updatedAt: string; // date-time
			name: string;
		}
		export interface VehicleResponse {
			id: string;
			name?: string;
			createdAt: string; // date-time
			updatedAt: string; // date-time
			isOwned?: boolean;
			year?: number;
			condition?: Condition;
			vehicleType: VehicleType;
			make: string;
			model: string;
			machineHours?: number;
			link?: string;
			power: PowerType;
			compatibleImplements?: Implement[];
		}
		export type VehicleType = 'TRACTOR' | 'SPRAYER' | 'COMBINE' | 'TRUCK' | 'ATV' | 'UTV' | 'SEMITRUCK' | 'OTHER';
	}
}
declare namespace Paths {
	namespace EmployeesControllerCreateEmployee {
		export type RequestBody = Components.Schemas.CreateEmployeeDto;
		namespace Responses {
			export type $200 = Components.Schemas.EmployeeResponse;
		}
	}
	namespace EmployeesControllerDeleteEmployee {
		namespace Parameters {
			export type Id = string;
		}
		export interface PathParameters {
			id: Parameters.Id;
		}
		namespace Responses {
			export type $200 = Components.Schemas.EmployeeResponse;
		}
	}
	namespace EmployeesControllerFindEmployeeById {
		namespace Parameters {
			export type Id = string;
		}
		export interface PathParameters {
			id: Parameters.Id;
		}
		namespace Responses {
			export type $200 = Components.Schemas.EmployeeResponse;
		}
	}
	namespace EmployeesControllerListEmployees {
		namespace Parameters {
			export type Name = string;
			export type Sort = 'asc' | 'desc';
		}
		export interface QueryParameters {
			name?: Parameters.Name;
			sort?: Parameters.Sort;
		}
		namespace Responses {
			export type $200 = Components.Schemas.Employee[];
		}
	}
	namespace EmployeesControllerUpdateEmployee {
		namespace Parameters {
			export type Id = string;
		}
		export interface PathParameters {
			id: Parameters.Id;
		}
		export type RequestBody = Components.Schemas.UpdateEmployeeDto;
		namespace Responses {
			export type $200 = Components.Schemas.EmployeeResponse;
		}
	}
	namespace ImplementsControllerCreateImplement {
		export type RequestBody = Components.Schemas.CreateImplementDto;
		namespace Responses {
			export type $200 = Components.Schemas.ImplementResponse;
		}
	}
	namespace ImplementsControllerDeleteImplement {
		namespace Parameters {
			export type Id = string;
		}
		export interface PathParameters {
			id: Parameters.Id;
		}
		namespace Responses {
			export type $200 = Components.Schemas.ImplementResponse;
		}
	}
	namespace ImplementsControllerFindImplementById {
		namespace Parameters {
			export type Id = string;
		}
		export interface PathParameters {
			id: Parameters.Id;
		}
		namespace Responses {
			export type $200 = Components.Schemas.ImplementResponse;
		}
	}
	namespace ImplementsControllerListImplements {
		namespace Parameters {
			export type Limit = number;
			export type Name = string;
			export type OrderBy =
				| 'id'
				| 'createdAt'
				| 'updatedAt'
				| 'name'
				| 'make'
				| 'model'
				| 'isOwned'
				| 'year'
				| 'condition'
				| 'implementType';
			export type Sort = 'asc' | 'desc';
		}
		export interface QueryParameters {
			name?: Parameters.Name;
			limit?: Parameters.Limit;
			orderBy?: Parameters.OrderBy;
			sort?: Parameters.Sort;
		}
		namespace Responses {
			export type $200 = Components.Schemas.ImplementResponse[];
		}
	}
	namespace ImplementsControllerUpdateImplement {
		namespace Parameters {
			export type Id = string;
		}
		export interface PathParameters {
			id: Parameters.Id;
		}
		export type RequestBody = Components.Schemas.UpdateImplementDto;
		namespace Responses {
			export type $200 = Components.Schemas.ImplementResponse;
		}
	}
	namespace MaintenanceControllerCreateGuide {
		export type RequestBody = Components.Schemas.CreateMaintenanceGuideDto;
		namespace Responses {
			export type $200 = Components.Schemas.MaintenanceGuide;
		}
	}
	namespace MaintenanceControllerCreateTask {
		export type RequestBody = Components.Schemas.CreateMaintenanceTaskDto;
		namespace Responses {
			export type $200 = Components.Schemas.MaintenanceTask;
		}
	}
	namespace MaintenanceControllerDeleteGuide {
		namespace Parameters {
			export type Id = string;
		}
		export interface PathParameters {
			id: Parameters.Id;
		}
		namespace Responses {
			export type $200 = Components.Schemas.MaintenanceGuide;
		}
	}
	namespace MaintenanceControllerDeleteTask {
		namespace Parameters {
			export type Id = string;
		}
		export interface PathParameters {
			id: Parameters.Id;
		}
		namespace Responses {
			export type $200 = Components.Schemas.MaintenanceTask;
		}
	}
	namespace MaintenanceControllerFindByTaskId {
		namespace Parameters {
			export type Id = string;
		}
		export interface PathParameters {
			id: Parameters.Id;
		}
		namespace Responses {
			export type $200 = Components.Schemas.MaintenanceTask;
		}
	}
	namespace MaintenanceControllerFindGuideById {
		namespace Parameters {
			export type Id = string;
		}
		export interface PathParameters {
			id: Parameters.Id;
		}
		namespace Responses {
			export type $200 = Components.Schemas.MaintenanceGuide;
		}
	}
	namespace MaintenanceControllerFindGuideByVehicle {
		namespace Parameters {
			export type Id = string;
		}
		export interface PathParameters {
			id: Parameters.Id;
		}
		namespace Responses {
			export type $200 = Components.Schemas.MaintenanceGuide[];
		}
	}
	namespace MaintenanceControllerFindGuideTasks {
		namespace Parameters {
			export type Id = string;
		}
		export interface PathParameters {
			id: Parameters.Id;
		}
		namespace Responses {
			export type $200 = Components.Schemas.MaintenanceTask[];
		}
	}
	namespace MaintenanceControllerListGuides {
		namespace Parameters {
			export type Name = string;
			export type OrderBy =
				| 'id'
				| 'createdAt'
				| 'updatedAt'
				| 'name'
				| 'content'
				| 'manual'
				| 'machineHours'
				| 'vehicleId';
			export type Sort = 'asc' | 'desc';
		}
		export interface QueryParameters {
			name?: Parameters.Name;
			orderBy?: Parameters.OrderBy;
			sort?: Parameters.Sort;
		}
		namespace Responses {
			export type $200 = Components.Schemas.MaintenanceGuide[];
		}
	}
	namespace MaintenanceControllerListTasks {
		namespace Parameters {
			export type Name = string;
			export type OrderBy =
				| 'id'
				| 'createdAt'
				| 'updatedAt'
				| 'status'
				| 'dueDate'
				| 'name'
				| 'description'
				| 'assigneeId'
				| 'guideId';
			export type Sort = 'asc' | 'desc';
		}
		export interface QueryParameters {
			name?: Parameters.Name;
			orderBy?: Parameters.OrderBy;
			sort?: Parameters.Sort;
		}
		namespace Responses {
			export type $200 = Components.Schemas.MaintenanceTask[];
		}
	}
	namespace MaintenanceControllerUpdateGuide {
		namespace Parameters {
			export type Id = string;
		}
		export interface PathParameters {
			id: Parameters.Id;
		}
		export type RequestBody = Components.Schemas.UpdateMaintenanceGuideDto;
		namespace Responses {
			export type $200 = Components.Schemas.MaintenanceGuide;
		}
	}
	namespace MaintenanceControllerUpdateTask {
		namespace Parameters {
			export type Id = string;
		}
		export interface PathParameters {
			id: Parameters.Id;
		}
		export type RequestBody = Components.Schemas.UpdateMaintenanceTaskDto;
		namespace Responses {
			export type $200 = Components.Schemas.MaintenanceTask;
		}
	}
	namespace ToolsControllerCreateTool {
		export type RequestBody = Components.Schemas.CreateToolDto;
		namespace Responses {
			export type $200 = Components.Schemas.ToolResponse;
		}
	}
	namespace ToolsControllerDeleteTool {
		namespace Parameters {
			export type Id = string;
		}
		export interface PathParameters {
			id: Parameters.Id;
		}
		namespace Responses {
			export type $200 = Components.Schemas.ToolResponse;
		}
	}
	namespace ToolsControllerFindToolById {
		namespace Parameters {
			export type Id = string;
		}
		export interface PathParameters {
			id: Parameters.Id;
		}
		namespace Responses {
			export type $200 = Components.Schemas.ToolResponse;
		}
	}
	namespace ToolsControllerListTools {
		namespace Parameters {
			export type Name = string;
			export type OrderBy = 'id' | 'createdAt' | 'updatedAt' | 'name';
			export type Sort = 'asc' | 'desc';
		}
		export interface QueryParameters {
			name?: Parameters.Name;
			orderBy?: Parameters.OrderBy;
			sort?: Parameters.Sort;
		}
		namespace Responses {
			export type $200 = Components.Schemas.ToolResponse[];
		}
	}
	namespace ToolsControllerUpdateTool {
		namespace Parameters {
			export type Id = string;
		}
		export interface PathParameters {
			id: Parameters.Id;
		}
		export type RequestBody = Components.Schemas.UpdateToolDto;
		namespace Responses {
			export type $200 = Components.Schemas.ToolResponse;
		}
	}
	namespace VehiclesControllerCreatePart {
		export type RequestBody = Components.Schemas.CreateVehiclePartDto;
		namespace Responses {
			export type $200 = Components.Schemas.VehiclePart;
		}
	}
	namespace VehiclesControllerCreateVehicle {
		export type RequestBody = Components.Schemas.CreateVehicleDto;
		namespace Responses {
			export type $200 = Components.Schemas.VehicleResponse;
		}
	}
	namespace VehiclesControllerDeletePart {
		namespace Parameters {
			export type Id = string;
		}
		export interface PathParameters {
			id: Parameters.Id;
		}
		namespace Responses {
			export type $200 = Components.Schemas.VehiclePart;
		}
	}
	namespace VehiclesControllerDeleteVehicle {
		namespace Parameters {
			export type Id = string;
		}
		export interface PathParameters {
			id: Parameters.Id;
		}
		namespace Responses {
			export type $200 = Components.Schemas.VehicleResponse;
		}
	}
	namespace VehiclesControllerFindPartById {
		namespace Parameters {
			export type Id = string;
		}
		export interface PathParameters {
			id: Parameters.Id;
		}
		namespace Responses {
			export type $200 = Components.Schemas.VehiclePart;
		}
	}
	namespace VehiclesControllerFindVehicleById {
		namespace Parameters {
			export type Id = string;
		}
		export interface PathParameters {
			id: Parameters.Id;
		}
		namespace Responses {
			export type $200 = Components.Schemas.VehicleResponse;
		}
	}
	namespace VehiclesControllerGetCompatibleImplements {
		namespace Parameters {
			export type Id = string;
		}
		export interface PathParameters {
			id: Parameters.Id;
		}
		namespace Responses {
			export type $200 = Components.Schemas.ImplementResponse[];
		}
	}
	namespace VehiclesControllerGetCompatibleParts {
		namespace Parameters {
			export type Id = string;
		}
		export interface PathParameters {
			id: Parameters.Id;
		}
		namespace Responses {
			export type $200 = Components.Schemas.VehiclePartResponse[];
		}
	}
	namespace VehiclesControllerListParts {
		namespace Parameters {
			export type Name = string;
			export type OrderBy = 'id' | 'createdAt' | 'updatedAt' | 'name';
			export type Sort = 'asc' | 'desc';
		}
		export interface QueryParameters {
			name?: Parameters.Name;
			orderBy?: Parameters.OrderBy;
			sort?: Parameters.Sort;
		}
		namespace Responses {
			export type $200 = Components.Schemas.VehiclePart[];
		}
	}
	namespace VehiclesControllerListVehicles {
		namespace Parameters {
			export type Limit = number;
			export type Name = string;
			export type OrderBy =
				| 'id'
				| 'name'
				| 'createdAt'
				| 'updatedAt'
				| 'isOwned'
				| 'year'
				| 'condition'
				| 'vehicleType'
				| 'make'
				| 'model'
				| 'machineHours'
				| 'link'
				| 'power';
			export type Sort = 'asc' | 'desc';
		}
		export interface QueryParameters {
			name?: Parameters.Name;
			limit?: Parameters.Limit;
			orderBy?: Parameters.OrderBy;
			sort?: Parameters.Sort;
		}
		namespace Responses {
			export type $200 = Components.Schemas.VehicleResponse[];
		}
	}
	namespace VehiclesControllerUpdatePart {
		namespace Parameters {
			export type Id = string;
		}
		export interface PathParameters {
			id: Parameters.Id;
		}
		export type RequestBody = Components.Schemas.UpdateVehiclePartDto;
		namespace Responses {
			export type $200 = Components.Schemas.VehiclePart;
		}
	}
	namespace VehiclesControllerUpdateVehicle {
		namespace Parameters {
			export type Id = string;
		}
		export interface PathParameters {
			id: Parameters.Id;
		}
		export type RequestBody = Components.Schemas.UpdateVehicleDto;
		namespace Responses {
			export type $200 = Components.Schemas.VehicleResponse;
		}
	}
}
