import { writable } from 'svelte/store';

export const application = writable({
	title: 'Inventory',
	subtitle: 'A simple inventory management application.'
});
