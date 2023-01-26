import { createAuth0Client } from '@auth0/auth0-spa-js';
import type { Auth0Client, PopupLoginOptions } from '@auth0/auth0-spa-js';
import { user, isAuthenticated, popupOpen } from '$lib/stores';
import { PUBLIC_AUTH0_CLIENT_ID, PUBLIC_AUTH0_DOMAIN } from '$env/static/public';
import axios from 'axios';

async function createClient(): Promise<Auth0Client> {
	const auth0Client = await createAuth0Client({
		domain: PUBLIC_AUTH0_DOMAIN,
		clientId: PUBLIC_AUTH0_CLIENT_ID,
		cacheLocation: 'localstorage'
	});
	return auth0Client;
}

async function loginWithPop(clientId: Auth0Client, options?: PopupLoginOptions): Promise<void> {
	popupOpen.set(true);
	try {
		await clientId.loginWithPopup(options);
		const clientUser = await clientId.getUser();
		if (!clientUser) {
			throw new Error('No user found');
		}
		user.set(clientUser);
		isAuthenticated.set(true);
	} catch (e) {
		console.error(e);
	} finally {
		popupOpen.set(false);
	}
}

function logout(clientId: Auth0Client): Promise<void> {
	return clientId.logout();
}

const auth = {
	createClient,
	loginWithPop,
	logout
};

export default auth;
