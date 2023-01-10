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
/**
 * 
 * @export
 * @interface CreateMaintenanceGuideDto
 */
export interface CreateMaintenanceGuideDto {
    /**
     * 
     * @type {string}
     * @memberof CreateMaintenanceGuideDto
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof CreateMaintenanceGuideDto
     */
    content: string;
    /**
     * 
     * @type {string}
     * @memberof CreateMaintenanceGuideDto
     */
    vehicleId?: string;
}

/**
 * Check if a given object implements the CreateMaintenanceGuideDto interface.
 */
export function instanceOfCreateMaintenanceGuideDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "content" in value;

    return isInstance;
}

export function CreateMaintenanceGuideDtoFromJSON(json: any): CreateMaintenanceGuideDto {
    return CreateMaintenanceGuideDtoFromJSONTyped(json, false);
}

export function CreateMaintenanceGuideDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateMaintenanceGuideDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'content': json['content'],
        'vehicleId': !exists(json, 'vehicleId') ? undefined : json['vehicleId'],
    };
}

export function CreateMaintenanceGuideDtoToJSON(value?: CreateMaintenanceGuideDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'content': value.content,
        'vehicleId': value.vehicleId,
    };
}

