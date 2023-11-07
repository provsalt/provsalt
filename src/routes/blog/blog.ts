import fs from "fs";
import { html as Experience } from "$lib/blogs/my-experience-with-sveltekit/blog.md";
import { html as FOSSASIA23 } from "$lib/blogs/fossasia_23/blog.md";
import { html as Japanese30Days } from "$lib/blogs/30_days_of_japanese/blog.md";

interface Blog {
	title: string;
	description: string;
	date: string;
	slug: string;
	content: string;
}

export const Blogs: Blog[] = [
	{
		title: "My experience with SvelteKit",
		description:
			"While I was working on my portfolio, I decided to use SvelteKit. Is it worth it learning a new framework?",
		date: "2023-01-23",
		slug: "my-experience-with-sveltekit",
		content: Experience
	},
	{
		title: "Taking part in FOSSASIA 2023!",
		description: "I had the opportunity to join HackClub to run a community booth over at FOSSASIA 2023! It was truly an amazing experience.",
		date: "2023-04-24",
		slug: "taking-part-in-fossasia-2023",
		content: FOSSASIA23
	},
	{
		title: "三十日時に日本語を勉強した",
		description: "一ヶ月前に日本語を初めてを勉強した、すごいね！",
		date: "2023-11-06",
		slug: "30-days-of-japanese",
		content: Japanese30Days
	}
];
