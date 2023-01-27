import { API } from '$lib/api';
import { isAuthenticated, user } from '$lib/stores';
import { get } from 'svelte/store';

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

			isAuthenticated.set(true);
			user.set({ username: username });
		} catch (e) {
			console.error(e);
			throw new Error('failed to login');
		}
	}

	static logout() {
		this.setToken('');
		this.setRefreshToken('');
		isAuthenticated.set(false);
		user.update((u) => ({ ...u, username: '' }));
	}

	static async refresh() {
		try {
			const client = API.client();
			const currentUser = get(user);
			const res = await client.post(`/api/auth/refresh`, {
				username: currentUser.username,
				refreshToken: this.getRefreshToken()
			});

			const { accessToken, refreshToken } = res.data;
			this.setToken(accessToken);
			this.setRefreshToken(refreshToken);
		} catch (e) {
			console.error(e);
			throw new Error('failed to refresh');
		}
	}

	// Short duration JWT token (5-10 min)
	static getToken() {
		return sessionStorage.getItem('jwt');
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
