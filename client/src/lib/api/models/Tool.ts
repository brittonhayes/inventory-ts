/* tslint:disable */
/* eslint-disable */
/**
 * Open Farms Inventory Service
 * Agriculture inventory management service.
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { MaintenanceTask } from './MaintenanceTask';
import {
    MaintenanceTaskFromJSON,
    MaintenanceTaskFromJSONTyped,
    MaintenanceTaskToJSON,
} from './MaintenanceTask';

/**
 * 
 * @export
 * @interface Tool
 */
export interface Tool {
    /**
     * 
     * @type {string}
     * @memberof Tool
     */
    id: string;
    /**
     * The name of the tool.
     * @type {string}
     * @memberof Tool
     */
    name?: string;
    /**
     * 
     * @type {MaintenanceTask}
     * @memberof Tool
     */
    maintenanceTask?: MaintenanceTask;
    /**
     * 
     * @type {string}
     * @memberof Tool
     */
    maintenanceTaskId?: string;
}

/**
 * Check if a given object implements the Tool interface.
 */
export function instanceOfTool(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;

    return isInstance;
}

export function ToolFromJSON(json: any): Tool {
    return ToolFromJSONTyped(json, false);
}

export function ToolFromJSONTyped(json: any, ignoreDiscriminator: boolean): Tool {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'maintenanceTask': !exists(json, 'maintenanceTask') ? undefined : MaintenanceTaskFromJSON(json['maintenanceTask']),
        'maintenanceTaskId': !exists(json, 'maintenanceTaskId') ? undefined : json['maintenanceTaskId'],
    };
}

export function ToolToJSON(value?: Tool | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'maintenanceTask': MaintenanceTaskToJSON(value.maintenanceTask),
        'maintenanceTaskId': value.maintenanceTaskId,
    };
}

