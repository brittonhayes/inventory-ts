import { writable } from 'svelte/store';

export const loader = writable<boolean>(false);
