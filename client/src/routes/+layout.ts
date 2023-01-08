import { application } from '$lib/stores';
import { page } from '$app/stores';
import type { Application } from '$lib/types';

export const ssr = false;

let app: Application = {} as Application;
application.subscribe((value) => {
	app = value;
});

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
			title: app.title,
			subtitle: app.subtitle
		},
		navigation: navigation,
	};
};
