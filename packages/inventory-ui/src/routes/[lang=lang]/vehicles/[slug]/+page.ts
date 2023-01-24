import { PUBLIC_API_BASE_URL } from '$env/static/public';
import LL, { setLocale } from '$i18n/i18n-svelte';
import { breadcrumbs } from '$lib/stores/navigation';
import axios, { type AxiosResponse } from 'axios';
import request, { gql } from 'graphql-request';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { locale } = await parent();
	setLocale(locale);
	const $LL = get(LL);

	const query = gql`
	{
		vehicle(id: "${params.slug}", filters: {
			includeParts: true,
			includeGuides: true,
			includeAttachments: true,
		}) {
		  id,
		  name,
		  make,
		  model,
		  vehicleType,
		  guides {
			id,
			name
		  }
		  compatibleParts {
			id,
			name
		  }
		  compatibleImplements {
			id,
			name
		  }
		}
	}`;

	const response = await axios.post(PUBLIC_API_BASE_URL + '/graphql', {
		query
	});

	breadcrumbs.set([
		{ label: $LL.home.title(), href: `/${locale}/`, icon: 'home' },
		{ label: $LL.vehicles.title(), href: `/${locale}/vehicles/`, icon: 'agriculture' },
		{
			label: `${response.data.data.vehicle.name}`,
			href: `/${locale}/vehicles/${response.data.data.vehicle.id}/`,
			icon: ''
		}
	]);
	return {
		params: params,
		vehicle: response.data.data.vehicle,
		implements: response.data.data.compatibleImplements,
		parts: response.data.data.compatibleParts,
		guides: response.data.data.guides
	};
}) satisfies PageLoad;
