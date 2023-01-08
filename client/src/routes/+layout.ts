import { application } from '$lib/stores';
import { page } from '$app/stores';
import type { Application } from '$lib/types';

export const ssr = false;

let navigation = [
	{
		label: 'Home',
		href: '/',
		icon: 'home',
	},
	{
		label: 'Vehicles',
		href: '/vehicles',
		icon: 'agriculture'
	},
	{
		label: 'Locations',
		href: '/locations',
		icon: 'pin_drop'
	}
];

export const load = async () => {
	return {
		application: {
			title: "Farmer's Hand",
			subtitle: "Manage your farm's vehicles from anywhere."
		},
		navigation: navigation,
	};
};
