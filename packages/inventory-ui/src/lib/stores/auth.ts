import { writable } from 'svelte/store';

export interface User {
	id?: string;
	username: string;
	name?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export const isAuthenticated = writable(false);
export const user = writable({} as User);
