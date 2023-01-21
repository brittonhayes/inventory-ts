/**
 * @param path - the api path to hit
 * @param config - the request configuration
 * @returns the response from the api
 */
async function http<T>(path: string, config: RequestInit): Promise<T> {
	// create the request
	const request = new Request(path, {
		...config,
		headers: { 'Content-Type': 'application/json', ...config.headers }
	});

	// send the request
	const response = await fetch(request);

	// check the response was ok
	if (!response.ok) {
		throw new Error(response.statusText);
	}

	// may error if there is no body, return empty array
	return response.json().catch(() => ({}));
}

export class Fetcher {
	static get = get;
	static patch = patch;
	static post = post;

	public fetch = fetch;
	public baseUrl = window.location.origin;
}

/**
 * @param path - the api path to hit
 * @param config - the request configuration
 * @returns the response from the api
 */
async function get<T>(path: string, config?: RequestInit): Promise<T> {
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
async function patch<T, U>(path: string, body: T, config?: RequestInit): Promise<U> {
	// create the request
	const init = { method: 'patch', body: JSON.stringify(body), ...config };

	// send the request
	return await http<U>(path, init);
}

/**
 * @param path - the api path to hit
 * @param body - the body to send
 * @param config - the request configuration
 * @returns the response from the api
 */
async function post<T, U>(path: string, body: T, config?: RequestInit): Promise<U> {
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
export async function put<T, U>(path: string, body: T, config?: RequestInit): Promise<U> {
	// create the request
	const init = { method: 'put', body: JSON.stringify(body), ...config };

	// send the request
	return await http<U>(path, init);
}
