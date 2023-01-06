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
 * @interface CreateToolDto
 */
export interface CreateToolDto {
	/**
	 *
	 * @type {string}
	 * @memberof CreateToolDto
	 */
	name: string;
	/**
	 *
	 * @type {object}
	 * @memberof CreateToolDto
	 */
	condition?: object;
	/**
	 *
	 * @type {string}
	 * @memberof CreateToolDto
	 */
	locationId?: string;
	/**
	 *
	 * @type {string}
	 * @memberof CreateToolDto
	 */
	tagName?: string;
}

/**
 * Check if a given object implements the CreateToolDto interface.
 */
export function instanceOfCreateToolDto(value: object): boolean {
	let isInstance = true;
	isInstance = isInstance && 'name' in value;

	return isInstance;
}

export function CreateToolDtoFromJSON(json: any): CreateToolDto {
	return CreateToolDtoFromJSONTyped(json, false);
}

export function CreateToolDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateToolDto {
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

export function CreateToolDtoToJSON(value?: CreateToolDto | null): any {
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
