<script lang="ts">
	let offset = 0;
</script>

<div>
	<h1 class="text-5xl mb-2">Blogs</h1>
	{#await fetch("/blog/blogs?limit=100").then((res) => {return res.json()})}
		<p>Loading</p>
		{:then blogs}
		<div class="flex flex-col gap-4">
			{#each blogs as blog, index}
				{#if index >= offset && index < offset + 5}
					<div class="flex flex-col gap-2">
						<a href="/blog/{blog.slug}" class="text-2xl">{blog.title}</a>
						<p>{blog.description}</p>
					</div>
				{/if}
			{/each}
			{#if offset > 0}
				<button on:click={() => {offset -= 5; console.log(offset)}}>Previous Page</button>
			{/if}
			{#if offset + 5 < blogs.length}
				<button on:click={() => {offset += 5; console.log(offset)}}>Next Page</button>
			{/if}
		</div>
		{:catch error}
		<p>Unable to find any blogs at the moment</p>
	{/await}
</div>
