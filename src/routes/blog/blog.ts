import fs from "fs";
import { html as Experience } from "$lib/blogs/my-experience-with-sveltekit/blog.md"

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
		description: "While I was working on my portfolio, I decided to use SvelteKit. Is it worth it learning a new framework?",
		date: "2023-01-23",
		slug: "my-experience-with-sveltekit",
		content: Experience
	},
]