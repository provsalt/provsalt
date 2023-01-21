<script>
	import background from "$lib/images/craig-manners.webp";
	import "./layout.sass";
</script>

<div class="app">
	<main>
		<section class="relative min-h-screen flex justify-center items-center py-4">
			<div class="content">
				<div class="nav justify-between items-center">
					<div></div>
					<p>raymond@fedora: ~ - vite preview</p>
					<div class="inline-flex gap-2">
						<a href="/" class="cross rounded-full p-0.5"></a>
						<div id="minimize" class="rounded-full p-0.5"></div>
						<div id="enlarge" class="rounded-full p-0.5"></div>
					</div>
				</div>
				<div class="overlay text-lg md:text-xl gap-2 md:gap-4">
					<slot />
				</div>
			</div>
			<img alt="Sunset background" class="background" src={background} />
		</section>
	</main>
</div>
