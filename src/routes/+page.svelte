<script lang="ts">
	import "./page.sass";
	import Fa from "svelte-fa";
	import { faDiscord, faLinkedin, faTelegram } from "@fortawesome/free-brands-svg-icons";
	import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
	import { fly } from "svelte/transition";
	import { onMount } from "svelte";
	import { DateTime } from "luxon";
	import Webring from "$lib/components/webring.svelte";

	const facts: string[] = [
		"I am an ENTP if you care about that",
		"I am 1.75m as of 9th January 2023",
		"I consume too much content on Youtube",
		"I love building PCs",
		"Open source and privacy respecting software is the best software in my opinion.",
		"I have my GPG and SSH keys written down somewhere in my house."
	];

	const links = [
		{
			name: "blog",
			website: "/blog"
		},
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
		},
		{
			icon: faDiscord,
			website: "https://discord.com/users/185623219074629632"
		},
		{
			icon: faTelegram,
			website: "https://t.me/provsalt"
		}
	];
	let loaded = false;
	onMount(() => {
		loaded = true;
	});

	let born = DateTime.now().diff(DateTime.fromISO("2006-03-24"), "years").years.toFixed(7);
	let experience = DateTime.now().diff(DateTime.fromISO("2018-05-06"), "years").years.toFixed(3);
	const interval = () => {
		born = DateTime.now().diff(DateTime.fromISO("2006-03-24"), "years").years.toFixed(7);
		experience = DateTime.now().diff(DateTime.fromISO("2018-05-06"), "years").years.toFixed(3);
	}
	setInterval(interval, 1000);
</script>

<svelte:head>
	<title>Raymond goo's website</title>
	<meta name="description" content="Hmm. It looks like you found Raymond goo's website :O">
	<meta property="og:title" content="Raymond's website" />
	<meta property="og:type" content="website" />
	<meta property="og:description" content="Hmm. It looks like you found my website :O. How???" />
	<meta property="og:image" content="https://cloud-ereq0j4b0-hack-club-bot.vercel.app/0image.png" />
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:image" content="https://cloud-ereq0j4b0-hack-club-bot.vercel.app/0image.png" />
</svelte:head>
<!--	<section class="relative min-h-screen flex justify-center items-center py-4">-->
<!--		<div class="content">-->
<!--			<div class="overlay text-lg md:text-xl gap-2 md:gap-4">-->
				<div class="flex flex-col text-lg md:text-xl gap-2 md:gap-4">
					<h1 class="head text-4xl md:text-5xl font-semibold pt-10">Hey I'm Raymond</h1>
					{#if loaded}
						<p>I’ve been on earth for {born} years and have been coding for approximately {experience} years. One of my favorite
							programming language is Go!</p>
						<p>I am also known as the dragonfly supremacy advocate, arch btw™ or that hacker guy </p>
						<p>Additional fun facts:</p>
						<ul class="list-disc list-inside">
							{#each facts as fact, i}
								<li in:fly={{delay: 300 * i, duration: 500}}>{fact}</li>
							{/each}
						</ul>

						<div class="flex md:flex-col justify-between">
							<ul class="flex flex-col md:flex-row gap-6 text-amber-500 pb-2">
								{#each links as link, i}
									<li in:fly={{delay: 300 * i, duration: 500}}><a class="hover:underline" href={link.website}>{link.name}</a></li>
								{/each}
							</ul>
							<div>
								<p class="pb-4">Contact me</p>
								<ul class="flex flex-wrap gap-4">
									<li>
										<a href="https://matrix.to/#/@provsalt:matrix.org">
											<svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
												<rect width="32" height="32" fill="url(#pattern0)"/>
												<defs>
													<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
														<use xlink:href="#image0_317_53" transform="scale(0.0104167)"/>
													</pattern>
													<image id="image0_317_53" width="96" height="96" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADEklEQVR4nO2ZPWiTURiFU3ERUQcdHMRFScFBN/EHQRCcBcFFZ3EQOjoIDi5OLoKtZhBEsf6Ca6uTizqICC4u4lS1re2gFEHsI4EMUpJ7b/rm5tz2vg9kSs6X83yHJF+SRsNxHMdxHMdxHMdxHMdxHMdxHGcF9MlaP4GU5ltcodp8iytUm29xhWrzLa5Qbb7FFarNt7hCtfkWV6g2X3kBMXJ/eQExcn95ATFyf3kBMXJ/eQExcn95ATFyf3kBMXJ/eQExcn95ATFy/2EXAEaAncABYB+wo8/8FuAIcBI4BuxqH7PaAYBLPW5nVjzuEHAH+NnlaWaAFnC4x3NsAM4Br4C/XfKLwARwcNj+JQzQi6nO/ZuBcWA59lydx9wENv53/N3AG9KZBLYOy9+MtUAgOgVsBz7QP+OdYx8FZleRfw9sG4a/GWuBQPQt8I7Vcw1YMuTvDcPfjLUA5bIM7M3tb8ZaIPFk/AbuAxeBC8AN4AvptD94XwJjwHngCvA6IXc1t78Za4GEk/AJGO2S2wS8SMj/Ao73uJxtX22FmM7tb8ZaIBJfCr0NtO9LuDoaC+RHIq+Ez7n9zVgLROK3E/Kht6I/sasZ4HIgP5Pb34y1QCR+NiE/Hch/TMifDuS/5vY3Yy0QiZ9IyD8L5J8n5E8F8t9y+5uxFojE9yfknwbyd40DfM/tb8ZaIBIfNQ7QMg4wm9vfjLVA4QPM5fY3Yy0wgAGeZBxgPre/GWuBwgf4kdvfjLXAAAZ4bPweERpgIbe/GWuBwgdYzO1vxlogEm8m5B8F8j6AeIBbCXl/BRgHeJhxgOo/hJviAaq/DG0mnMDJjANU/024aRxgwjhA9b8FNRNO4IOMA1Txc/RC4LYnId8K5K8bB1j/f8isdVD7ywuIkfvLC4iR+8sLiJH7ywuIkfvLC4iR+8sLiJH7ywuIkfvLC4iR+8sLiJH7ywuIkfvLC4iR+8cKrLdBKM23uEK1+RZXqDbf4grV5ltcodp8iytUm29xhWrzLa5QZmrzdRzHcRzHcRzHcRzHcRzHcRynMXD+AVKU3sjzWkAwAAAAAElFTkSuQmCC"/>
												</defs>
											</svg>
										</a>
									</li>
									{#each contacts as contact}
										<li>
											<a href={contact.website}>
												<Fa icon={contact.icon} size="2x" />
											</a>
										</li>
									{/each}
								</ul>
							</div>
						</div>
					{/if}
					<Webring />
					<p>Background by <a
						href="https://unsplash.com/@craigmanners_com?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Craig
						Manners</a> on <a
						href="https://unsplash.com/photos/quWWY4sumSw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
					</p>
				</div>
<!--			</div>-->
<!--		</div>-->
<!--</section>-->