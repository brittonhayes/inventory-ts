import { application } from '$lib/stores';
import type { Application } from '$lib/types';

export const ssr = false;

let app: Application = {} as Application;

application.subscribe((value) => {
	app = value;
});

export const load = async () => {
	return {
		application: {
			title: app.title,
			subtitle: app.subtitle
		}
	};
};
