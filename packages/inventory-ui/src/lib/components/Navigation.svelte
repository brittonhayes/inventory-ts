<script lang="ts">
	import { JWT } from '$lib/auth/jwt';
	import { avatar } from '$lib/common/avatar';
	import { isAuthenticated, user } from '$lib/stores/auth';
	import { breadcrumbs } from '$lib/stores/navigation';
	import { redirect } from '@sveltejs/kit';
	import BackButton from './BackButton.svelte';
	import Breadcrumbs from './Breadcrumbs.svelte';
	import Lightswitch from './Lightswitch.svelte';

	export let redirectTo: string;

	function logout() {
		JWT.logout();
	}
</script>

<div class="{$$props.class + ' navbar mb-2 md:mb-10 mt-2'}">
	<div class="navbar-start">
		{#if $breadcrumbs && $breadcrumbs.length > 1}
			<BackButton />
		{/if}
	</div>
	<div class="navbar-center">
		{#if $breadcrumbs.length > 1}
			<Breadcrumbs maxItems="{2}" />
		{/if}
	</div>
	<div class="navbar-end">
		{#if $isAuthenticated}
			<div class="dropdown dropdown-end">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label tabindex="0" class="btn btn-ghost rounded-btn">
					<div class="avatar">
						<div class="w-8 round rounded-xl">
							{#await avatar($user.username) then src}
								<img alt="Avatar" src="{src}" />
							{/await}
						</div>
					</div>
				</label>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul tabindex="0" class="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
					<li>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-missing-attribute -->
						<span>
							<i class="material-icons">logout</i>
							<a class="link" on:click="{() => logout()}">Logout</a>
						</span>
					</li>
				</ul>
			</div>
		{/if}
		<Lightswitch />
	</div>
</div>
