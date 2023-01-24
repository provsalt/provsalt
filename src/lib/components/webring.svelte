<script lang="ts">
	import "./webring.sass"
	let myIndex: number;
</script>


<div id="webring-wrapper">
	{#await fetch("https://webring.hackclub.com/members.json").then(r => r.json())}
		<a class="webring-anchor" href="https://webring.hackclub.com/" title="Previous">‹</a>
		<a class="webring-logo" href="https://webring.hackclub.com/"
			 title="Hack Club Webring"></a>
		<a class="webring-anchor" href="https://webring.hackclub.com/" title="Next">›</a>
	{:then webring}
		{#each webring as member, index}
			{#if member.url === "https://www.raygoo.tech/"}
				myIndex = index;
			{/if}
		{/each}
		{@debug myIndex}
		<a class="webring-anchor" href={myIndex ? webring[myIndex-1] : "https://webring.hackclub.com/"} title="Previous">‹</a>
		<a class="webring-logo" href="https://webring.hackclub.com/"
			 title="Hack Club Webring"></a>
		<a class="webring-anchor"  href={myIndex ? webring[myIndex+1] : "https://webring.hackclub.com/"} title="Next">›</a>
		{/await}
</div>