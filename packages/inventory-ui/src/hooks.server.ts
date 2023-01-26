import { detectLocale, i18n, isLocale } from '$i18n/i18n-util';
import { loadAllLocales } from '$i18n/i18n-util.sync';
import { isAuthenticated } from '$lib/stores';
import type { Handle, RequestEvent } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';

loadAllLocales();
const L = i18n();

export const handle: Handle = async ({ event, resolve }) => {
	// read language slug
	const [, lang] = event.url.pathname.split('/');
	const authenticated = get(isAuthenticated);

	// redirect to base locale if no locale slug was found
	if (!lang) {
		const locale = getPreferredLocale(event);
		const destination = get(isAuthenticated) ? `/${locale}` : `/${locale}/login`;
		return new Response(null, {
			status: 302,
			headers: { Location: destination }
		});
	}

	// if slug is not a locale, use base locale (e.g. api endpoints)
	const locale = isLocale(lang) ? (lang as Locales) : getPreferredLocale(event);
	const LL = L[locale];

	// bind locale and translation functions to current request
	event.locals.locale = locale;
	event.locals.LL = LL;

	// Redirect to login if not authenticated
	if (!authenticated && event.url.pathname !== `/${locale}/login`) {
		const destination = get(isAuthenticated) ? `/${locale}` : `/${locale}/login`;
		return new Response(null, {
			status: 302,
			headers: { Location: destination }
		});
	}

	if (authenticated && event.url.pathname === `/${locale}/login`) {
		const destination = get(isAuthenticated) ? `/${locale}` : `/${locale}/login`;
		return new Response(null, {
			status: 302,
			headers: { Location: destination }
		});
	}

	// replace html lang attribute with correct language
	return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', locale) });
};

const getPreferredLocale = ({ request }: RequestEvent) => {
	// detect the preferred language the user has configured in his browser
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
	const acceptLanguageDetector = initAcceptLanguageHeaderDetector(request);

	return detectLocale(acceptLanguageDetector);
};
