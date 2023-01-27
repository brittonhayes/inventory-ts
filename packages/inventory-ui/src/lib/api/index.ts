import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { JWT } from '$lib/auth/jwt';
import axios, { type Axios, type AxiosError, type AxiosResponse } from 'axios';

export class API {
	static client(): Axios {
		const client = axios.create();
		client.interceptors.request.use(
			(config) => {
				config.baseURL = PUBLIC_API_BASE_URL;
				config.headers['Authorization'] = `Bearer ${JWT.getToken()}`;
				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);

		// client.interceptors.response.use(
		// 	(response: AxiosResponse) => {
		// 		return response;
		// 	},
		// 	(err: AxiosError) => {
		// 		if (err.response?.status == 403) {
		// 			// JWT.refresh();
		// 		}
		// 	}
		// );

		return client;
	}
}
