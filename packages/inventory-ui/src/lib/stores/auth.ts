import type { Auth0Client, User } from '@auth0/auth0-spa-js';
import { writable } from 'svelte/store';

export const isAuthenticated = writable(false);
export const user = writable({} as User);
export const popupOpen = writable(false);
export const error = writable('');
export const auth0Client = writable({} as Auth0Client);
