import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { API } from '$lib/api';
import jwt_decode from 'jwt-decode';
import { isAuthenticated, user, type User } from '$lib/stores';
import { error } from '@sveltejs/kit';
import axios, { AxiosError, isAxiosError } from 'axios';

export class JWT {
	static async login(username: string, password: string) {
		try {
			const client = API.client();
			const res = await client.post(`/api/auth/login`, {
				username,
				password
			});
			if (res.status !== 201) {
				throw new Error('Failed to login');
			}

			const { accessToken, refreshToken } = res.data;
			this.setToken(accessToken);
			this.setRefreshToken(refreshToken);
			this.setUser();
			isAuthenticated.set(true);
		} catch (e) {
			if (isAxiosError(e)) {
				throw new AxiosError(e.message, e.code);
			}
			throw new Error('failed to login');
		}
	}

	static async logout() {
		try {
			await axios.get(`/api/auth/logout`, {
				baseURL: PUBLIC_API_BASE_URL,
				headers: {
					Authorization: `Bearer ${this.getToken()}`
				}
			});

			this.setToken('');
			this.setRefreshToken('');
			this.unsetUser();
			isAuthenticated.set(false);
		} catch (e) {
			if (isAxiosError(e)) {
				throw new AxiosError(e.message, e.code);
			}
		}
	}

	static async refresh() {
		try {
			const storedRefreshToken = this.getRefreshToken();
			if (!storedRefreshToken) {
				console.warn('refresh token unavailable or expired');
			}

			const res = await axios.get(`/api/auth/refresh`, {
				baseURL: PUBLIC_API_BASE_URL,
				headers: {
					Authorization: `Bearer ${this.getRefreshToken()}`
				}
			});
			const { accessToken, refreshToken } = res.data;
			this.setToken(accessToken);
			this.setRefreshToken(refreshToken);
			isAuthenticated.set(true);
		} catch (e) {
			if (isAxiosError(e)) {
				throw new AxiosError(e.message, e.code);
			}
			throw error(403, 'refresh token unavailable or expired');
		}
	}

	// Short duration JWT token (5-10 min)
	static getToken() {
		return sessionStorage.getItem('jwt');
	}

	static setUser() {
		const token = this.getToken();
		if (token) {
			const payload = jwt_decode<{ sub: string; username: string }>(token);
			user.set({ id: payload.sub, username: payload.username });
		}
	}

	static unsetUser() {
		user.set({ id: '', username: '' });
	}

	static setToken(token: string) {
		sessionStorage.setItem('jwt', token);
	}

	// Longer duration refresh token (30-60 min)
	static getRefreshToken() {
		return sessionStorage.getItem('refreshToken');
	}

	static setRefreshToken(token: string) {
		sessionStorage.setItem('refreshToken', token);
	}
}
