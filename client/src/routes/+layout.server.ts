import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = ({ locals: { locale, LL }, params: { lang } }) => {
	if (!lang) {
		throw redirect(307, locale)
	}

	// pass locale information from "server-context" to "shared server + client context"
	return { locale }
}