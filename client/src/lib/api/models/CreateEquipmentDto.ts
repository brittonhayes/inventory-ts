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
 * @interface CreateEquipmentDto
 */
export interface CreateEquipmentDto {
	/**
	 *
	 * @type {string}
	 * @memberof CreateEquipmentDto
	 */
	name: string;
	/**
	 *
	 * @type {object}
	 * @memberof CreateEquipmentDto
	 */
	condition?: object;
	/**
	 *
	 * @type {string}
	 * @memberof CreateEquipmentDto
	 */
	locationId?: string;
	/**
	 *
	 * @type {string}
	 * @memberof CreateEquipmentDto
	 */
	tagName?: string;
}

/**
 * Check if a given object implements the CreateEquipmentDto interface.
 */
export function instanceOfCreateEquipmentDto(value: object): boolean {
	let isInstance = true;
	isInstance = isInstance && 'name' in value;

	return isInstance;
}

export function CreateEquipmentDtoFromJSON(json: any): CreateEquipmentDto {
	return CreateEquipmentDtoFromJSONTyped(json, false);
}

export function CreateEquipmentDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateEquipmentDto {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		name: json['name'],
		condition: !exists(json, 'condition') ? undefined : json['condition'],
		locationId: !exists(json, 'locationId') ? undefined : json['locationId'],
		tagName: !exists(json, 'tagName') ? undefined : json['tagName']
	};
}

export function CreateEquipmentDtoToJSON(value?: CreateEquipmentDto | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		name: value.name,
		condition: value.condition,
		locationId: value.locationId,
		tagName: value.tagName
	};
}
