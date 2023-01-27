<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
</script>

<section class="flex flex-col mx-auto justify-center items-center md:w-3/4">
	<div class="card bg-base-200 p-10">
		<div class="card-body">
			<h1 class="text-3xl  card-title">{$page?.error?.message}</h1>
			<div class="card-actions mt-16">
				<div class="btn-group">
					<button on:click="{() => goto(`/en/login`)}" class="btn btn-primary btn-wide gap-2">
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
