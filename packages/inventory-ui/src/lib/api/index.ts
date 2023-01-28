import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { JWT } from '$lib/auth/jwt';
import { error, redirect } from '@sveltejs/kit';
import axios, { type Axios, type AxiosError } from 'axios';

export class API {
	static client(): Axios {
		const client = axios.create({
			baseURL: PUBLIC_API_BASE_URL,
			headers: {
				Authorization: `Bearer ${JWT.getToken()}`
			}
		});

		return client;
	}
}
