<script lang="ts">
	import Markdown from '@magidoc/plugin-svelte-marked';
	export let data;
</script>
<Markdown source={data.content} />