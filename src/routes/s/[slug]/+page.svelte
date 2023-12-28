<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import { error } from "@sveltejs/kit";
	const shorten = [
		{ url: "https://github.com/provsalt/notes", short: "notes" },
		{ url: "https://github.com/provsalt", short: "gh" }
	];
	let location = "";
	onMount(() => {
		for (const loc in shorten) {
			if ($page.params.slug === shorten[loc].short) {
				location = loc;
				window.location.href = shorten[loc].url;
			}
		}
		if (location === "") {
			error(404, "Not found");
		}
	});
</script>

<div>
	{#if location === ""}
		<h1 class="text-3xl font-bold mb-4" style="font-family: 'Inter', sans-serif">
			Woops! I couldn't find this shorten link.
		</h1>
		<a class="border-4 p-2" href="/">Back home</a>
	{:else}
		<a href={location}>Click here if you are not redirected within 3 seconds</a>
	{/if}
</div>
