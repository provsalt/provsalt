<script lang="ts">
	let offset = 0;
	export let data;
</script>

<div>
	<h1 class="text-5xl mb-4 inter-font font-bold">Blogs</h1>
		<div class="flex flex-col gap-4">
			{#each data.blogs as blog, index}
				{#if index >= offset && index < offset + 5}
					<div class="flex flex-col gap-2">
						<a href="/blog/{blog.slug}"><p class="text-2xl inter-font">{blog.title}</p><p class="text-lg">About {(blog.content.split(" ").length /190).toFixed(0)} minutes</p><p>{blog.description}</p></a>
					</div>
				{/if}
			{/each}
			{#if offset > 0}
				<button
					on:click={() => {
						offset -= 5;
						console.log(offset);
					}}>Previous Page</button
				>
			{/if}
			{#if offset + 5 < data.blogs.length}
				<button
					on:click={() => {
						offset += 5;
						console.log(offset);
					}}>Next Page</button
				>
			{/if}
		</div>
</div>
