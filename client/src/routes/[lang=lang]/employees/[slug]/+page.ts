import LL, { setLocale } from '$i18n/i18n-svelte';
import { Fetcher } from '$lib/common/fetcher';
import { breadcrumbs } from '$lib/stores/navigation';
import type { FindEmployeeResponse } from '$lib/types';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (async ({ parent, params }) => {
	const { locale } = await parent();
	setLocale(locale);
	const response = await Fetcher.get<FindEmployeeResponse>(`/api/employees/${params.slug}`);
	const $LL = get(LL)
	breadcrumbs.set([
		{ label: $LL.home.title(), href: `/${locale}`, icon: 'home' },
		{ label: $LL.employees.title(), href: `/${locale}/employees`, icon: 'groups' },
		{ label: response.name, href: `/${locale}/employees/${response.name}`, icon: ''}
	])
	return {
		content: {
			lastUpdated: $LL.lastUpdated(),
		},
		employee: response,
	};
}) satisfies PageLoad;
