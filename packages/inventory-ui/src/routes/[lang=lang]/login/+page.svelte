<script lang="ts">
	import { goto } from "$app/navigation";
	import auth from "$lib/auth/service";
	import { auth0Client, isAuthenticated, user } from "$lib/stores";
	import { onMount } from "svelte";
	import type { PageData } from "./$types";

    export let data: PageData;

	function login() {
        console.log('logging in')
		auth.loginWithPop($auth0Client).then(()=>{
            goto(`/${data.locale}`)
        })   
	}

    onMount(()=> {
        if($isAuthenticated) {
            goto(`/${data.locale}`)
        }
    })
</script>

<section class="flex flex-col mx-auto w-full max-w-xl md:w-3/4">
    <div class="card bg-base-200 shadow-2xl">
        <div class="card-body items-center text-center">
            <h2 class="card-title text-3xl">
                Hey there
            </h2>
            <p>Let's get you logged in.</p>
            
            <div class="card-actions justify-center mt-16">
                <div class="btn-group">
                    <button on:click="{login}" class="btn btn-primary btn-wide gap-2">
                        <i class="material-icons">login</i>
                        Login with Google
                    </button>
                    <button class="btn">
                        <i class="material-icons">help</i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>