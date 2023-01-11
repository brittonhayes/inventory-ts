import type { paths } from '$lib/api';
import { PUBLIC_API_BASE_URL } from '$env/static/public';

/**
 * Allowing strings until this issue is fixed
 * @see https://github.com/drwpow/openapi-typescript/issues/1003
 */
type TypedRequestPath = keyof paths | string;

/**
 * @param path - the api path to hit
 * @param config - the request configuration
 * @returns the response from the api
 */
async function http<T>(path: TypedRequestPath, config: RequestInit): Promise<T> {
	// create the request
	const request = new Request(PUBLIC_API_BASE_URL + path, {...config, headers: { 'Content-Type': 'application/json', ...config.headers }});

	// send the request
	const response = await fetch(request);

	// check the response was ok
	if (!response.ok) {
		throw new Error(response.statusText);
	}

	// may error if there is no body, return empty array
	return response.json().catch(() => ({}));
}

/**
 * @param path - the api path to hit
 * @param config - the request configuration
 * @returns the response from the api
 */
export async function get<T>(path: TypedRequestPath, config?: RequestInit): Promise<T> {
	// create the request
	const init = { method: 'get', ...config };

	// send the request
	return await http<T>(path, init);
}

/**
 * @param path - the api path to hit
 * @param body - the body to send
 * @param config - the request configuration
 * @returns the response from the api
 */
export async function post<T, U>(path: TypedRequestPath, body: T, config?: RequestInit): Promise<U> {
	// create the request
	const init = { method: 'post', body: JSON.stringify(body), ...config };

	// send the request
	return await http<U>(path, init);
}

/**
 * @param path - the api path to hit
 * @param body - the body to send
 * @param config - the request configuration
 * @returns the response from the api
 */
export async function put<T, U>(path: TypedRequestPath, body: T, config?: RequestInit): Promise<U> {
	// create the request
	const init = { method: 'put', body: JSON.stringify(body), ...config };

	// send the request
	return await http<U>(path, init);
}
