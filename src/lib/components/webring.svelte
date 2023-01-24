<script lang="ts">
	import "./webring.sass"
	import { onMount } from "svelte";
	let next: string
	let prev: string
	onMount(() => {
		fetch("https://webring.hackclub.com/members.json").then(r => r.json()).then(
			(data) => {
				for (let i = 0; i < data.length; i++) {
					if (data[i].url === "https://www.raygoo.tech/") {
						next = data[i+1].url
						prev = data[i-1].url
						break
					}
				}
			}
		)
	})
</script>


<div id="webring-wrapper">
		<a class="webring-anchor" href={prev ? prev : "https://webring.hackclub.com/"} title="Previous">‹</a>
		<a class="webring-logo" href="https://webring.hackclub.com/"
			 title="Hack Club Webring"></a>
		<a class="webring-anchor"  href={next ? next : "https://webring.hackclub.com/"} title="Next">›</a>
</div>