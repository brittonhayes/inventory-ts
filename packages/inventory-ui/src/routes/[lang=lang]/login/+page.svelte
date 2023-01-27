<script lang="ts">
	import { goto } from '$app/navigation';
	import { JWT } from '$lib/auth/jwt';
	import { error } from '@sveltejs/kit';
	import type { PageData } from './$types';

	export let data: PageData;

	$: username = '';
	$: password = '';

	const login = async () => {
		try {
			await JWT.login(username, password);
			goto(`/${data.locale}`);
		} catch (e) {
			throw error(401, 'Login failed');
		}
	};
</script>

<section class="flex flex-col mx-auto w-full max-w-xl md:w-3/4">
	<h2 class="card-title text-3xl">Hey there</h2>
	<p>Let's get you logged in.</p>

	<div class="card bg-base-200 shadow-2xl">
		<div class="card-body items-center text-center">
			<div class="flex flex-col text-left">
				<label for="username" class="text-lg">Username</label>
				<input class="input mb-5" name="username" bind:value="{username}" />

				<label for="password" class="text-lg">Password</label>
				<input class="input mb-5" type="password" name="password" bind:value="{password}" />
				<button class="btn btn-primary" on:click="{login}">Login</button>
			</div>

			<!-- <div class="card-actions justify-center mt-16">
				<div class="btn-group">
					<button on:click="{login}" class="btn btn-primary btn-wide gap-2">
						<i class="material-icons">login</i>
						Login with Google
					</button>
					<button class="btn">
						<i class="material-icons">help</i>
					</button>
				</div>
			</div> -->
		</div>
	</div>
</section>
