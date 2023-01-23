import type { Route } from '$lib/types';
import { writable } from 'svelte/store';

export const breadcrumbs = writable<Route[]>();
