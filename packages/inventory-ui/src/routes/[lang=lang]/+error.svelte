<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { breadcrumbs } from '$lib/stores';
	breadcrumbs.set([]);
</script>

<section class="flex flex-col mx-auto justify-center items-center md:w-3/4">
	<div class="card bg-base-200 p-10">
		<div class="card-body">
			<h1 class="text-3xl  card-title">{$page?.error?.message}</h1>
			We're really sorry about that. This site is still under development and has lots of bugs :/
			<div class="card-actions mt-16 w-full">
				<div class="btn-group w-full">
					<button on:click="{() => goto(`/en/login`)}" class="btn btn-primary btn-wide w-full gap-2">
						<i class="material-icons">login</i>
						Login
					</button>
					<button class="btn">
						<i class="material-icons">help</i>
					</button>
				</div>
			</div>
		</div>
	</div>
</section>
