<script lang="ts">
	import Markdown from '@magidoc/plugin-svelte-marked';
	import "./page.sass"
	export let data;
</script>
<svelte:head>
	<title>{data.Blog.title}</title>
	<meta name="description" content="{data.Blog.description}">
</svelte:head>

<div class="markdown">
	<h1>{data.Blog.title}</h1>
	<p class="mb-4">Written on {data.Blog.date}</p>
	<Markdown source={data.Blog.content} />
</div>