<script>
	import background from "$lib/images/pramod-tiwari.webp";
	import "./layout.sass";
	import { page } from "$app/stores";
	import { dev } from "$app/environment";
</script>

<div class="app">
	<main>
		<section class="relative min-h-screen flex justify-center items-center py-4">
			<div class="content">
				<div class="nav justify-between items-center">
					<div />
					<p>
						raymond@fedora: ~{$page.url.pathname === "/" ? "" : $page.url.pathname} - vite preview
					</p>
					<div class="inline-flex gap-2">
						<a href="/" class="cross rounded-full p-0.5" />
						<div id="minimize" class="rounded-full p-0.5" />
						<div id="enlarge" class="rounded-full p-0.5" />
					</div>
				</div>
				<div class="overlay text-lg md:text-xl gap-2 md:gap-4">
					<slot />
				</div>
			</div>
			<img alt="Awesome background" class="background" src={background} />
		</section>
	</main>
	{#if !dev}
		<script defer src="/_vercel/insights/script.js"></script>
		{/if}
</div>
