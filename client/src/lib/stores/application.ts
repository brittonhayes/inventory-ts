import type { Route } from '$lib/types';
import { writable } from 'svelte/store';

export const application = writable({
	title: 'Inventory',
	subtitle: 'A simple inventory management application.'
});

export const navigation = writable<Route[]>();