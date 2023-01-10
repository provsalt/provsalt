<script>
	import "./page.sass";
	import Fa from "svelte-fa";
	import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
	import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
	import background from "$lib/images/craig-manners.jpg";
	import { fly } from "svelte/transition";
	// import { backInOut } from "svelte/easing";
	import { onMount } from "svelte";

	const facts = [
		"I am an ENTP if you care about that",
		"I am 1.75m as of 9th January 2023",
		"I consume too much content on Youtube",
		"I love building PCs",
		"Open source and privacy respecting software is the best software in my opinion.",
		"I have my GPG and SSH keys written down somewhere in my house."
	];

	const links = [
		{
			name: "github",
			website: "https://github.com/provsalt"
		},
		{
			name: "osu!",
			website: "https://osu.ppy.sh/users/30182001"
		},
		{
			name: "resume",
			website: "#"
		},
		{
			name: "scrapbook",
			website: "https://me.raygoo.tech/"
		},
		{
			name: "spotify",
			website: "https://open.spotify.com/user/21qzgfzjmn75bez7dxkmt4qni"
		},
		{
			name: "steam",
			website: "https://steamcommunity.com/id/provsalt/"
		}
	];
	const contacts = [
		{
			icon: faLinkedin,
			website: "https://www.linkedin.com/in/raymond-goo-439406220/"
		},
		{
			icon: faEnvelope,
			website: "mailto://me@raygoo.tech"
		}
	];
	let loaded = false;
	onMount(() => {
		loaded = true;
	});
</script>

<svelte:head>
	<title>Raymond's website</title>
</svelte:head>
<!--h-screen relative px-6 py-8 md:px-20 md:py-12 lg:px-24 lg:py-16-->
<section class="relative">
	<div class="content">
		<div class="overlay text-xl gap-4">
			<h1 class="text-5xl pt-10">Hey I'm <span class="underline">Raymond</span></h1>
			{#if loaded}
				<p>I’ve been on earth for 16.7 years and have been coding for approximately 4.9 years. One of my favorite
					programming language is Go!</p>
				<p>I am also known as the dragonfly supremacy advocate, linux guy or that guy that uses neovim </p>
				<p>Additional fun facts:</p>
				<ul class="list-disc list-inside">
					{#each facts as fact, i}
						<li in:fly={{delay: 300 * i, duration: 500}}>{fact}</li>
					{/each}
				</ul>

				<ul class="inline-flex gap-6 text-amber-500 pb-2">
					{#each links as link, i}
						<li in:fly={{delay: 300 * i, duration: 500}}><a class="hover:underline" href={link.website}>{link.name}</a></li>
					{/each}
				</ul>
			{/if}
			<p>Contact me</p>
			<ul class="inline-flex gap-4">
				{#each contacts as contact}
					<li class="">
						<a href={contact.website}>
							<Fa icon={contact.icon} size="2x" />
						</a>
					</li>
				{/each}
			</ul>
			<div id="webring-wrapper">
				<a class="webring-anchor" href="https://webring.hackclub.com/" id="previousBtn" title="Previous">‹</a>
				<a class="webring-logo" href="https://webring.hackclub.com/"
					 title="Hack Club Webring"></a>
				<a class="webring-anchor" href="https://webring.hackclub.com/" id="nextBtn" title="Next">›</a>
				{@html "<script src=\"https://webring.hackclub.com/public/embed.min.js\"></script>'"}
			</div>
			<p>Background by <a
				href="https://unsplash.com/@craigmanners_com?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Craig
				Manners</a> on <a
				href="https://unsplash.com/photos/quWWY4sumSw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
			</p>
		</div>
	</div>
	<img alt="Sunset background" class="background" src={background} />
</section>