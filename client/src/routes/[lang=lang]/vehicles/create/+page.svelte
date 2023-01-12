<script lang="ts">
	let title = "Create a new vehicle"
	let subtitle = "Add a new vehicle to the system"

	let vehicleName: string;

	const submit = ()=>{
		alert('submit');
	}
</script>


<div class="grid gap-5 grid-cols-2">
	<div class="col-span-2">
		<h1 class="text-3xl font-bold">{title}</h1>
		<p class="text-gray-500">{subtitle}</p>
		<div class="divider m-0 p-0"></div>
	</div>	
	<div class="col-span-2 rounded">
		<form on:submit|preventDefault="{submit}">
			<div class="mb-4">
				<label class="block text-lg mb-2" for="name">Name</label>
				<input
					class="input input-bordered max-w-md w-full"
					id="name"
					type="text"
					bind:value={vehicleName}
				/>
			</div>
			<button formaction="submit" class="btn btn-primary gap-2 mt-10">
				Create
			</button>
		</form>
	</div>
</div>