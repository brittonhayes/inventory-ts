import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import axios from 'axios';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals: { locale, LL }, params: { lang } }) => {
	axios.defaults.baseURL = PUBLIC_API_BASE_URL;

	if (!lang) {
		throw redirect(307, locale);
	}

	// pass locale information from "server-context" to "shared server + client context"
	return { locale };
};
