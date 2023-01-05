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
 * @interface VehicleResponse
 */
export interface VehicleResponse {
    /**
     * 
     * @type {string}
     * @memberof VehicleResponse
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof VehicleResponse
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof VehicleResponse
     */
    make?: string;
    /**
     * 
     * @type {string}
     * @memberof VehicleResponse
     */
    model: string;
    /**
     * 
     * @type {number}
     * @memberof VehicleResponse
     */
    year: number;
    /**
     * 
     * @type {number}
     * @memberof VehicleResponse
     */
    hours: number;
    /**
     * 
     * @type {boolean}
     * @memberof VehicleResponse
     */
    active?: boolean;
    /**
     * 
     * @type {string}
     * @memberof VehicleResponse
     */
    power?: VehicleResponsePowerEnum;
    /**
     * 
     * @type {string}
     * @memberof VehicleResponse
     */
    locationId?: string;
    /**
     * 
     * @type {string}
     * @memberof VehicleResponse
     */
    tagName?: string;
    /**
     * 
     * @type {Date}
     * @memberof VehicleResponse
     */
    createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof VehicleResponse
     */
    updatedAt: Date;
}


/**
 * @export
 */
export const VehicleResponsePowerEnum = {
    Gas: 'GAS',
    Diesel: 'DIESEL',
    Electric: 'ELECTRIC',
    Hybrid: 'HYBRID'
} as const;
export type VehicleResponsePowerEnum = typeof VehicleResponsePowerEnum[keyof typeof VehicleResponsePowerEnum];


/**
 * Check if a given object implements the VehicleResponse interface.
 */
export function instanceOfVehicleResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "model" in value;
    isInstance = isInstance && "year" in value;
    isInstance = isInstance && "hours" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "updatedAt" in value;

    return isInstance;
}

export function VehicleResponseFromJSON(json: any): VehicleResponse {
    return VehicleResponseFromJSONTyped(json, false);
}

export function VehicleResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): VehicleResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'make': !exists(json, 'make') ? undefined : json['make'],
        'model': json['model'],
        'year': json['year'],
        'hours': json['hours'],
        'active': !exists(json, 'active') ? undefined : json['active'],
        'power': !exists(json, 'power') ? undefined : json['power'],
        'locationId': !exists(json, 'locationId') ? undefined : json['locationId'],
        'tagName': !exists(json, 'tagName') ? undefined : json['tagName'],
        'createdAt': (new Date(json['createdAt'])),
        'updatedAt': (new Date(json['updatedAt'])),
    };
}

export function VehicleResponseToJSON(value?: VehicleResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'make': value.make,
        'model': value.model,
        'year': value.year,
        'hours': value.hours,
        'active': value.active,
        'power': value.power,
        'locationId': value.locationId,
        'tagName': value.tagName,
        'createdAt': (value.createdAt.toISOString()),
        'updatedAt': (value.updatedAt.toISOString()),
    };
}

