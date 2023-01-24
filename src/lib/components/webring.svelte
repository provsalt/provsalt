<script lang="ts">
	import "./webring.sass"
</script>


<div id="webring-wrapper">

	{#await fetch("https://webring.hackclub.com/members.json").then(r => r.json())}
	{:then webring}
		{#each webring as member, index}
			{#if member.url === "https://www.raygoo.tech/"}
				<a class="webring-anchor" href={webring[index-1].url ? webring[index-1].url : "https://webring.hackclub.com/"} id="previousBtn" title="Previous">‹</a>
				<a class="webring-logo" href="https://webring.hackclub.com/"
					 title="Hack Club Webring"></a>
				<a class="webring-anchor" href={webring[index+1].url ? webring[index+1].url : "https://webring.hackclub.com/"} id="nextBtn" title="Next">›</a>
			{/if}
		{/each}
		{/await}
</div>